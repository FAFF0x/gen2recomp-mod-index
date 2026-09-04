#!/usr/bin/env node
// Network half of the gate, kept out of validate.mjs so that one stays
// offline and instant. Confirms an entry can actually be installed:
// the repo exists, and the thing behind downloadURL is a zip, not a web page.
//
//   node scripts/check-links.mjs [mods/Author@id ...]   # default: all
//
// Exit 1 only on a definite failure — a rate limit or a flaky host warns.

import { existsSync, readFileSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { listModFolders } from './lib/index-rules.mjs';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const modsDir = join(repoRoot, 'mods');
const token = process.env.GITHUB_TOKEN || '';

const targets = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const folders = targets.length
  ? targets.map((t) => basename(t.replace(/\/+$/, ''))).filter((f) => existsSync(join(modsDir, f)))
  : listModFolders(modsDir);

let failed = 0;

for (const folder of folders) {
  const metaPath = join(modsDir, folder, 'meta.json');
  if (!existsSync(metaPath)) continue;
  const meta = JSON.parse(readFileSync(metaPath, 'utf8'));

  if (meta.github) {
    const res = await gh(`https://api.github.com/repos/${meta.github}`);
    if (res === 'rate-limited') {
      warn(folder, 'GitHub rate limit — skipped the repo check');
    } else if (!res.ok) {
      fail(folder, `github "${meta.github}" is not reachable (HTTP ${res.status})`);
    } else {
      const releases = await gh(`https://api.github.com/repos/${meta.github}/releases?per_page=5`);
      if (releases !== 'rate-limited' && releases.ok) {
        const list = await releases.json();
        const zips = list.flatMap((r) => (r.assets || []).filter((a) => a.name?.toLowerCase().endsWith('.zip')));
        if (list.length === 0) {
          warn(folder, 'the repo has no releases yet — Update / Versions will stay empty in the launcher');
        } else if (zips.length === 0) {
          warn(folder, 'no release carries a .zip asset — see modkit.py add-release-workflow');
        }
      }
    }
  }

  if (meta.downloadURL) {
    try {
      const res = await fetch(meta.downloadURL, { method: 'HEAD', redirect: 'follow' });
      const type = res.headers.get('content-type') || '';
      if (!res.ok) {
        fail(folder, `downloadURL returned HTTP ${res.status}`);
      } else if (/text\/html/i.test(type)) {
        fail(folder, `downloadURL serves ${type} — it must resolve straight to the .zip`);
      } else {
        ok(folder, `downloadURL ${res.status} ${type || 'no content-type'}`);
      }
    } catch (err) {
      warn(folder, `could not reach downloadURL (${err.message})`);
    }
  }
}

console.log(failed ? `\n${failed} link problem(s).` : '\nLinks look installable.');
process.exit(failed ? 1 : 0);

async function gh(url) {
  const res = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'gen2recomp-mod-index',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (res.status === 403 && res.headers.get('x-ratelimit-remaining') === '0') return 'rate-limited';
  return res;
}

function fail(folder, message) {
  failed += 1;
  console.log(`error    ${folder}: ${message}`);
}
function warn(folder, message) {
  console.log(`warning  ${folder}: ${message}`);
}
function ok(folder, message) {
  console.log(`ok       ${folder}: ${message}`);
}
