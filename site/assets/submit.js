// The submission helper: build a meta.json from the form, validate it against
// the same schema CI runs, then push the folder to a fork and open the PR.

import { CONFIG } from './config.js';
import { auth, gh, toBase64 } from './github.js';
import { renderMarkdown } from './markdown.js';
import { validate } from './jsonschema.js';

const $ = (id) => document.getElementById(id);
const MAX_THUMB_BYTES = 2 * 1024 * 1024;
const MAX_DESCRIPTION_BYTES = 64 * 1024;

let schema = null;
let user = null;
let thumb = null; // { name, bytes, type }
// An empty form is invalid by definition; saying so before anyone has typed
// is just noise. Problems appear once the form has been touched.
let touched = false;

// ------------------------------------------------------------------ startup

$('nav-repo').href = `https://github.com/${CONFIG.owner}/${CONFIG.repo}`;
$('nav-wiki').href = CONFIG.wiki;

boot();

async function boot() {
  schema = await fetch('data/mod.schema.json').then((r) => r.json());
  renderCategories();
  wireForm();
  wireThumbnail();
  wireDescription();
  wireManual();
  await wireAuth();
  refresh();
}

// --------------------------------------------------------------------- auth

async function wireAuth() {
  $('oauth-btn').hidden = !auth.canOAuth;
  $('oauth-btn').addEventListener('click', () => auth.beginOAuth());
  $('token-toggle').addEventListener('click', () => {
    $('token-field').hidden = !$('token-field').hidden;
  });
  $('token-save').addEventListener('click', async () => {
    const value = $('token').value.trim();
    if (!value) return;
    auth.token = value;
    $('token').value = '';
    $('token-field').hidden = true;
    await identify();
  });
  $('signout-btn').addEventListener('click', () => {
    auth.signOut();
    user = null;
    setAuthStatus('Signed out.', 'A submission is a pull request, so it needs your account.');
    $('signout-btn').hidden = true;
  });

  try {
    if (await auth.completeOAuth()) log('signed in with GitHub', 'ok');
  } catch (err) {
    log(`sign-in failed: ${err.message}`, 'err');
  }
  if (auth.token) await identify();
}

async function identify() {
  try {
    user = await gh.whoami();
    setAuthStatus(`Signed in as ${user.login}.`, 'Submissions open from your fork of the index.');
    $('signout-btn').hidden = false;
    // A blank Author is almost always the signed-in user.
    if (!$('author').value) {
      $('author').value = user.name || user.login;
      refresh();
    }
  } catch (err) {
    user = null;
    auth.signOut();
    setAuthStatus('Token rejected.', err.message);
  }
}

function setAuthStatus(strong, rest) {
  $('auth-status').innerHTML = '';
  const label = document.createElement('span');
  label.textContent = strong;
  $('auth-status').append(label, ` ${rest}`);
}

// --------------------------------------------------------------------- form

function renderCategories() {
  const values = schema.properties.categories.items.enum;
  $('categories').innerHTML = '';
  for (const value of values) {
    const label = document.createElement('label');
    const box = document.createElement('input');
    box.type = 'checkbox';
    box.className = 'cat';
    box.value = value;
    label.append(box, ` ${value.toLowerCase().replace(/_/g, ' ')}`);
    $('categories').append(label);
  }
}

function wireForm() {
  const onEdit = () => {
    touched = true;
    refresh();
  };
  document.querySelectorAll('input, select, textarea').forEach((el) => {
    if (el.id === 'token') return;
    el.addEventListener('input', onEdit);
    el.addEventListener('change', onEdit);
  });

  // profile drives the affects_link default, exactly like the manifest does.
  $('profile').addEventListener('change', () => {
    $('affects_link').checked = $('profile').value !== 'content';
    refresh();
  });

  // Paste a repo URL, get owner/repo — the field shows what will be written.
  $('github').addEventListener('change', () => {
    $('github').value = normalizeGithub($('github').value.trim());
    refresh();
  });

  $('submit-btn').addEventListener('click', submit);
  $('copy-btn').addEventListener('click', async () => {
    await navigator.clipboard.writeText(JSON.stringify(buildMeta(), null, 2));
    log('meta.json copied to the clipboard', 'ok');
  });
}

const list = (value) =>
  value
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

function buildMeta() {
  const meta = {
    id: $('id').value.trim(),
    title: $('title').value.trim(),
    author: $('author').value.trim(),
    version: $('version').value.trim(),
    categories: [...document.querySelectorAll('.cat:checked')].map((b) => b.value),
    repo: $('repo').value.trim(),
  };

  const optional = {
    summary: $('summary').value.trim(),
    tags: list($('tags').value.toLowerCase()),
    github: normalizeGithub($('github').value.trim()),
    downloadURL: $('downloadURL').value.trim(),
    fixed_release_tag: $('fixed_release_tag').value.trim(),
    game_version: $('game_version').value.trim(),
    license: $('license').value.trim(),
    dependencies: list($('dependencies').value),
    conflicts: list($('conflicts').value),
    permissions: [...document.querySelectorAll('.perm:checked')].map((b) => b.value),
    api: Number($('api').value),
    profile: $('profile').value,
    affects_link: $('affects_link').checked,
    experimental: $('experimental').checked,
    automatic_version_check: $('automatic_version_check').checked,
  };

  for (const [key, value] of Object.entries(optional)) {
    const empty = value === '' || (Array.isArray(value) && value.length === 0);
    if (empty) continue;
    // Defaults stay out of the file so a diff shows only what the author meant.
    if (key === 'experimental' && value === false) continue;
    if (key === 'automatic_version_check' && value === true) continue;
    if (key === 'affects_link' && value === ($('profile').value !== 'content')) continue;
    meta[key] = value;
  }

  return meta;
}

function normalizeGithub(value) {
  if (!value) return '';
  const match = /github\.com\/([^/]+)\/([^/#?]+)/i.exec(value);
  const pair = match ? `${match[1]}/${match[2]}` : value;
  return pair.replace(/\.git$/, '').replace(/\/$/, '');
}

// Folder names live in paths, branch names and URLs; keep them boring.
const sanitize = (s) => s.replace(/[^A-Za-z0-9._-]/g, '');
const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]/g, '');
const defaultFolder = (meta) => `${sanitize(meta.author) || 'Author'}@${meta.id || 'modid'}`;

function currentFolder(meta) {
  const override = $('folder').value.trim();
  return override || defaultFolder(meta);
}

// ------------------------------------------------------------- live refresh

function refresh() {
  const meta = buildMeta();
  const folder = currentFolder(meta);
  $('folder-resolved').textContent = `mods/${folder}/`;
  $('meta-preview').textContent = JSON.stringify(meta, null, 2);

  const problems = check(meta, folder);
  $('problems').hidden = problems.length === 0 || !touched;
  $('problem-list').innerHTML = '';
  for (const problem of problems) {
    const li = document.createElement('li');
    li.className = 'err';
    li.textContent = problem;
    $('problem-list').append(li);
  }
  $('submit-btn').disabled = problems.length > 0;
  return problems;
}

// The browser half of scripts/lib/index-rules.mjs: same schema, same shape
// rules, so CI does not reject something this page called fine.
function check(meta, folder) {
  const problems = validate(meta, schema);

  const parts = /^([A-Za-z0-9._-]{1,64})@([A-Za-z0-9_-]{1,64})$/.exec(folder);
  if (!parts) {
    problems.push(`folder "${folder}" must look like Author@modid`);
  } else {
    // The override exists to tidy the author half, not to rename the mod.
    if (meta.id && parts[2] !== meta.id) problems.push(`folder id "${parts[2]}" must match the mod id "${meta.id}"`);
    if (meta.author && slug(parts[1]) !== slug(meta.author)) {
      problems.push(`folder author "${parts[1]}" must match the author "${meta.author}"`);
    }
  }
  const description = $('description').value;
  if (!description.trim()) problems.push('description is required');
  if (new TextEncoder().encode(description).length > MAX_DESCRIPTION_BYTES) {
    problems.push('description is over 64 KB');
  }
  if (!meta.github && !meta.downloadURL) {
    problems.push('needs either a GitHub owner/repo or a direct download URL');
  }
  if (meta.downloadURL && !/\.zip($|[?#])/i.test(meta.downloadURL)) {
    problems.push('download URL must point straight at a .zip, not a release page');
  }
  if (thumb && thumb.bytes.byteLength > MAX_THUMB_BYTES) {
    problems.push('thumbnail is over 2 MB');
  }
  return problems;
}

// --------------------------------------------------------------- thumbnail

function wireThumbnail() {
  const zone = $('dropzone');
  const input = $('thumb-input');

  zone.addEventListener('click', () => input.click());
  zone.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      input.click();
    }
  });
  zone.addEventListener('dragover', (e) => {
    e.preventDefault();
    zone.dataset.over = 'true';
  });
  zone.addEventListener('dragleave', () => delete zone.dataset.over);
  zone.addEventListener('drop', (e) => {
    e.preventDefault();
    delete zone.dataset.over;
    if (e.dataTransfer.files[0]) acceptThumb(e.dataTransfer.files[0]);
  });
  input.addEventListener('change', () => {
    if (input.files[0]) acceptThumb(input.files[0]);
  });
  $('thumb-clear').addEventListener('click', () => {
    thumb = null;
    input.value = '';
    $('thumb-preview').hidden = true;
    $('thumb-preview').removeAttribute('src');
    $('dropzone-text').hidden = false;
    $('thumb-clear').hidden = true;
    refresh();
  });
}

async function acceptThumb(file) {
  const png = file.type === 'image/png';
  const jpg = file.type === 'image/jpeg';
  if (!png && !jpg) {
    log(`${file.name} is ${file.type || 'an unknown type'} — PNG or JPEG only`, 'err');
    return;
  }
  if (file.size > MAX_THUMB_BYTES) {
    log(`${file.name} is ${(file.size / 1048576).toFixed(2)} MB — the cap is 2 MB`, 'err');
    return;
  }
  thumb = {
    name: png ? 'thumbnail.png' : 'thumbnail.jpg',
    bytes: new Uint8Array(await file.arrayBuffer()),
    type: file.type,
  };
  const preview = $('thumb-preview');
  preview.src = URL.createObjectURL(file);
  preview.hidden = false;
  $('dropzone-text').hidden = true;
  $('thumb-clear').hidden = false;
  log(`thumbnail ready — will commit as ${thumb.name}`, 'ok');
  refresh();
}

// -------------------------------------------------------------- description

function wireDescription() {
  const edit = $('tab-edit');
  const preview = $('tab-preview');
  const show = (previewing) => {
    edit.setAttribute('aria-pressed', String(!previewing));
    preview.setAttribute('aria-pressed', String(previewing));
    $('description-field').hidden = previewing;
    $('preview').hidden = !previewing;
    if (previewing) $('preview').innerHTML = renderMarkdown($('description').value);
  };
  edit.addEventListener('click', () => show(false));
  preview.addEventListener('click', () => show(true));
}

// ------------------------------------------------------------------ submit

function log(message, kind = '') {
  const li = document.createElement('li');
  li.className = kind;
  li.textContent = message;
  $('log').append(li);
  li.scrollIntoView({ block: 'nearest' });
}

async function submit() {
  touched = true;
  if (refresh().length) return;
  if (!auth.token) {
    log('sign in first, or use "Submit by hand"', 'err');
    return;
  }

  const button = $('submit-btn');
  button.disabled = true;
  try {
    if (!user) await identify();
    if (!user) throw new Error('could not identify the signed-in account');

    const meta = buildMeta();
    const folder = currentFolder(meta);
    const exists = await gh.folderExists(folder);
    log(exists ? `mods/${folder}/ exists — this will be an update` : `mods/${folder}/ is new`);

    log('preparing your fork…');
    await gh.ensureFork(user.login);
    await gh.syncFork(user.login);

    const branch = `submit/${folder.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${meta.version}-${shortId()}`;
    const files = [
      { path: `mods/${folder}/meta.json`, content: toBase64(`${JSON.stringify(meta, null, 2)}\n`) },
      { path: `mods/${folder}/description.md`, content: toBase64(ensureTrailingNewline($('description').value)) },
    ];
    if (thumb) files.push({ path: `mods/${folder}/${thumb.name}`, content: toBase64(thumb.bytes) });

    log(`committing ${files.length} file(s) to ${branch}…`);
    const verb = exists ? 'Update' : 'Add';
    await gh.commitFiles(user.login, branch, files, `${verb} ${meta.title} ${meta.version}`);

    log('opening the pull request…');
    const pr = await gh.openPullRequest({
      login: user.login,
      branch,
      title: `${verb} ${meta.title} ${meta.version}`,
      body: prBody(meta, folder, exists),
    });

    log(`done — ${pr.html_url}`, 'ok');
    const link = document.createElement('a');
    link.className = 'button';
    link.href = pr.html_url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = `View pull request #${pr.number}`;
    $('log').append(link);
  } catch (err) {
    log(err.message, 'err');
    if (err.status === 403) log('a fine-grained token needs Contents and Pull requests write on your fork', 'err');
  } finally {
    button.disabled = false;
  }
}

function prBody(meta, folder, exists) {
  return [
    `${exists ? 'Updates' : 'Adds'} \`mods/${folder}/\` — **${meta.title}** ${meta.version} by ${meta.author}.`,
    '',
    `- Source: ${meta.repo}`,
    meta.github ? `- Releases tracked from: \`${meta.github}\`` : `- Download: ${meta.downloadURL}`,
    `- Categories: ${meta.categories.join(', ')}`,
    `- Profile: \`${meta.profile ?? 'content'}\`, mod API ${meta.api ?? 2}`,
    '',
    'Author checklist:',
    '',
    '- [ ] `modkit.py validate --strict` and `modkit.py lint` pass',
    '- [ ] the distributed archive contains no ROM-derived content',
    '- [ ] the download URL resolves to a .zip with the mod files at the archive root',
    '',
    '<sub>Opened from the submission helper.</sub>',
  ].join('\n');
}

const ensureTrailingNewline = (s) => (s.endsWith('\n') ? s : `${s}\n`);
const shortId = () => Math.random().toString(36).slice(2, 7);

// ------------------------------------------------------- manual fallback

function wireManual() {
  const dialog = $('manual-dialog');
  $('manual-close').addEventListener('click', () => dialog.close());
  $('manual-btn').addEventListener('click', () => {
    touched = true;
    if (refresh().length) return;
    const meta = buildMeta();
    const folder = currentFolder(meta);
    const base = `https://github.com/${CONFIG.owner}/${CONFIG.repo}/new/${CONFIG.branch}`;
    const rows = [
      ['meta.json', `${JSON.stringify(meta, null, 2)}\n`],
      ['description.md', ensureTrailingNewline($('description').value)],
    ];
    $('manual-links').innerHTML = '';
    for (const [name, content] of rows) {
      const url = `${base}?filename=${encodeURIComponent(`mods/${folder}/${name}`)}&value=${encodeURIComponent(content)}`;
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.className = 'button';
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = `Create mods/${folder}/${name}`;
      li.append(link);
      if (url.length > 8000) {
        const warn = document.createElement('span');
        warn.className = 'hint';
        warn.textContent = ' (long — if GitHub truncates it, paste the file instead)';
        li.append(warn);
      }
      $('manual-links').append(li);
    }
    dialog.showModal();
  });
}
