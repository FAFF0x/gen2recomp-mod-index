#!/usr/bin/env node
// Validate index entries.
//
//   node scripts/validate.mjs                  # every folder under mods/
//   node scripts/validate.mjs mods/Ash@my_mod  # just these
//   node scripts/validate.mjs --examples       # also check examples/
//   node scripts/validate.mjs --json
//
// Exit 0 clean, 1 on any error. Warnings never fail the run.

import { existsSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { checkCollisions, checkModFolder, listModFolders, loadSchema } from './lib/index-rules.mjs';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const asJson = args.includes('--json');
const withExamples = args.includes('--examples');
const targets = args.filter((a) => !a.startsWith('--'));

const schema = loadSchema(repoRoot);
const dirs = [];

if (targets.length) {
  for (const target of targets) {
    // Accept a folder or any path inside it, so `--changed` file lists work.
    let dir = resolve(repoRoot, target);
    if (!existsSync(dir)) continue;
    if (!existsSync(join(dir, 'meta.json')) && existsSync(join(dirname(dir), 'meta.json'))) {
      dir = dirname(dir);
    }
    if (!dirs.includes(dir)) dirs.push(dir);
  }
} else {
  const roots = ['mods', ...(withExamples ? ['examples'] : [])];
  for (const root of roots) {
    const abs = join(repoRoot, root);
    if (!existsSync(abs)) continue;
    for (const folder of listModFolders(abs)) dirs.push(join(abs, folder));
  }
}

const results = dirs.map((dir) => checkModFolder(dir, basename(dir), schema));
const errors = results.flatMap((r) => r.errors);
const warnings = results.flatMap((r) => r.warnings);

// Collisions are only meaningful against the whole index, so always load it.
const allFolders = listModFolders(join(repoRoot, 'mods'));
const everything = allFolders.map((folder) => {
  const known = results.find((r) => r.folder === folder);
  return known ?? checkModFolder(join(repoRoot, 'mods', folder), folder, schema);
});
errors.push(...checkCollisions(everything));

if (asJson) {
  console.log(JSON.stringify({ checked: dirs.length, errors, warnings }, null, 2));
} else {
  for (const w of warnings) console.log(`warning  ${w}`);
  for (const e of errors) console.log(`error    ${e}`);
  const label = dirs.length === 1 ? 'entry' : 'entries';
  console.log(
    errors.length
      ? `\n${errors.length} error(s), ${warnings.length} warning(s) across ${dirs.length} ${label}.`
      : `\nOK — ${dirs.length} ${label} checked, ${warnings.length} warning(s).`,
  );
}

process.exit(errors.length ? 1 : 0);
