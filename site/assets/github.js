// The GitHub half of the submit page: hold a token, fork, commit, open a PR.
//
// Two ways in, because a static page cannot keep an OAuth client secret:
//   * CONFIG.oauthProxy set -> real "Sign in with GitHub" (see oauth-worker/)
//   * otherwise             -> a fine-grained or classic PAT the user pastes
// Either way the token only ever lives in this tab's sessionStorage, and every
// call below is a plain fetch from the browser. Nothing is proxied.

import { CONFIG } from './config.js';

const API = 'https://api.github.com';
const TOKEN_KEY = 'gen2recomp-mod-index:token';
const STATE_KEY = 'gen2recomp-mod-index:oauth-state';

export const auth = {
  get token() {
    return sessionStorage.getItem(TOKEN_KEY) || '';
  },
  set token(value) {
    if (value) sessionStorage.setItem(TOKEN_KEY, value);
    else sessionStorage.removeItem(TOKEN_KEY);
  },
  get canOAuth() {
    return Boolean(CONFIG.oauthProxy && CONFIG.oauthClientId);
  },
  signOut() {
    auth.token = '';
  },
  // Kick off the authorize redirect. `public_repo` is the narrowest scope that
  // still lets us push a branch to the user's own fork and open a PR.
  beginOAuth() {
    const state = crypto.randomUUID();
    sessionStorage.setItem(STATE_KEY, state);
    const url = new URL('https://github.com/login/oauth/authorize');
    url.searchParams.set('client_id', CONFIG.oauthClientId);
    url.searchParams.set('scope', 'public_repo');
    url.searchParams.set('state', state);
    url.searchParams.set('redirect_uri', location.origin + location.pathname);
    location.assign(url.toString());
  },
  // Call once on page load: turns ?code=... into a token, then cleans the URL.
  async completeOAuth() {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    if (!code) return false;
    const expected = sessionStorage.getItem(STATE_KEY);
    history.replaceState(null, '', location.pathname);
    if (!expected || params.get('state') !== expected) {
      throw new Error('OAuth state mismatch — sign in again.');
    }
    sessionStorage.removeItem(STATE_KEY);
    const res = await fetch(CONFIG.oauthProxy, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });
    const doc = await res.json().catch(() => ({}));
    if (!res.ok || !doc.access_token) {
      throw new Error(doc.error_description || doc.error || `token exchange failed (${res.status})`);
    }
    auth.token = doc.access_token;
    return true;
  },
};

async function api(path, { method = 'GET', body, accept } = {}) {
  const res = await fetch(path.startsWith('http') ? path : API + path, {
    method,
    headers: {
      Accept: accept || 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      ...(auth.token ? { Authorization: `Bearer ${auth.token}` } : {}),
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (res.status === 204) return null;
  const doc = await res.json().catch(() => null);
  if (!res.ok) {
    const detail = doc?.errors?.map((e) => e.message || e.code).filter(Boolean).join('; ');
    throw Object.assign(new Error(detail ? `${doc.message}: ${detail}` : doc?.message || `GitHub ${res.status}`), {
      status: res.status,
      doc,
    });
  }
  return doc;
}

export const gh = {
  api,

  whoami: () => api('/user'),

  // Fork on demand and wait for GitHub to actually create it. A fresh fork can
  // 404 for a few seconds after the 202.
  async ensureFork(login) {
    const target = `/repos/${login}/${CONFIG.repo}`;
    try {
      return await api(target);
    } catch (err) {
      if (err.status !== 404) throw err;
    }
    await api(`/repos/${CONFIG.owner}/${CONFIG.repo}/forks`, { method: 'POST' });
    for (let attempt = 0; attempt < 20; attempt += 1) {
      await sleep(1500);
      try {
        return await api(target);
      } catch (err) {
        if (err.status !== 404) throw err;
      }
    }
    throw new Error('fork did not become available — try again in a minute');
  },

  // Best-effort: an old fork branching off a stale main makes a noisy diff.
  async syncFork(login) {
    try {
      await api(`/repos/${login}/${CONFIG.repo}/merge-upstream`, {
        method: 'POST',
        body: { branch: CONFIG.branch },
      });
    } catch {
      /* diverged or nothing to do — the PR still opens */
    }
  },

  // One commit carrying every file, so a submission never lands half-written.
  // files: [{ path, content: base64 }]
  async commitFiles(login, branch, files, message) {
    const repo = `/repos/${login}/${CONFIG.repo}`;
    const head = await api(`${repo}/git/ref/heads/${encodeURIComponent(CONFIG.branch)}`);
    const baseSha = head.object.sha;
    const baseCommit = await api(`${repo}/git/commits/${baseSha}`);

    await api(`${repo}/git/refs`, {
      method: 'POST',
      body: { ref: `refs/heads/${branch}`, sha: baseSha },
    });

    const tree = [];
    for (const file of files) {
      const blob = await api(`${repo}/git/blobs`, {
        method: 'POST',
        body: { content: file.content, encoding: 'base64' },
      });
      tree.push({ path: file.path, mode: '100644', type: 'blob', sha: blob.sha });
    }

    const newTree = await api(`${repo}/git/trees`, {
      method: 'POST',
      body: { base_tree: baseCommit.tree.sha, tree },
    });
    const commit = await api(`${repo}/git/commits`, {
      method: 'POST',
      body: { message, tree: newTree.sha, parents: [baseSha] },
    });
    await api(`${repo}/git/refs/heads/${branch}`, {
      method: 'PATCH',
      body: { sha: commit.sha, force: true },
    });
    return commit.sha;
  },

  openPullRequest({ login, branch, title, body }) {
    return api(`/repos/${CONFIG.owner}/${CONFIG.repo}/pulls`, {
      method: 'POST',
      body: { title, body, head: `${login}:${branch}`, base: CONFIG.branch, maintainer_can_modify: true },
    });
  },

  // Does mods/<folder>/ already exist upstream? Decides "add" vs "update"
  // wording, and warns before someone overwrites another author's entry.
  async folderExists(folder) {
    try {
      await api(`/repos/${CONFIG.owner}/${CONFIG.repo}/contents/mods/${encodeURIComponent(folder)}`);
      return true;
    } catch (err) {
      if (err.status === 404) return false;
      throw err;
    }
  },
};

// btoa() is byte-oriented; text has to be UTF-8 encoded first or any non-ASCII
// character in a description throws.
export function toBase64(input) {
  const bytes = typeof input === 'string' ? new TextEncoder().encode(input) : new Uint8Array(input);
  let binary = '';
  const CHUNK = 0x8000;
  for (let i = 0; i < bytes.length; i += CHUNK) {
    binary += String.fromCharCode(...bytes.subarray(i, i + CHUNK));
  }
  return btoa(binary);
}

const sleep = (ms) => new Promise((done) => setTimeout(done, ms));
