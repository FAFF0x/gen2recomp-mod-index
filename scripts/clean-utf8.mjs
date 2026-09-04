#!/usr/bin/env node
// Remove bytes that are not valid UTF-8 from the text files of index entries.
//
//   node scripts/clean-utf8.mjs             report every mods/ entry, fix nothing
//   node scripts/clean-utf8.mjs --write     rewrite offending files in place
//   node scripts/clean-utf8.mjs mods/You@my_mod [--write]   one entry
//
// Only meta.json and description.md are considered; thumbnails are binary and
// left alone. Invalid sequences are dropped, not replaced, so a cleaned file
// never gains U+FFFD replacement characters. Exit code is the number of files
// that contained invalid bytes (0 = already clean), so CI can gate on it.

import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const args = process.argv.slice(2);
const write = args.includes('--write');
const targets = args.filter((a) => a !== '--write');

const roots = targets.length ? targets : ['mods'];
const files = [];
const pushEntryFiles = (dir) => {
  for (const name of ['meta.json', 'description.md']) {
    const p = join(dir, name);
    try {
      statSync(p);
      files.push(p);
    } catch {
      /* optional file absent */
    }
  }
};
for (const root of roots) {
  if (statSync(root).isFile()) {
    files.push(root);
  } else if (readdirSync(root).includes('meta.json')) {
    pushEntryFiles(root); // a single mods/<Author>@<id> entry
  } else {
    for (const dir of readdirSync(root)) pushEntryFiles(join(root, dir));
  }
}

const strict = new TextDecoder('utf-8', { fatal: true });
const lossy = new TextDecoder('utf-8'); // invalid sequences become U+FFFD

let dirty = 0;
for (const file of files) {
  const buf = readFileSync(file);
  try {
    strict.decode(buf);
    continue; // already valid UTF-8
  } catch {
    dirty++;
  }
  const cleaned = lossy.decode(buf).replaceAll('�', '');
  const removed = buf.length - Buffer.byteLength(cleaned, 'utf8');
  console.log(`${write ? 'cleaned' : 'would clean'} ${file}: ${removed} invalid byte(s)`);
  if (write) writeFileSync(file, cleaned);
}

console.log(
  dirty === 0
    ? `OK - ${files.length} file(s) checked, all valid UTF-8.`
    : `${dirty} of ${files.length} file(s) contained invalid UTF-8${write ? ', rewritten' : ''}.`
);
process.exitCode = dirty;
