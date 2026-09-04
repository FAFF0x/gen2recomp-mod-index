# gen2recomp mod index

Community mod index for the **Generation II Pokémon Recomp** mod collection.

## Source repository

The automatic index synchronizes versioned mod ZIP files from:

- `FAFF0x/gen2recomp`
- branch: `main`
- expected filename format: `<mod_name>_vX.Y.Z.zip`

Each ZIP is inspected for its `manifest.json`. The newest version of each manifest `id` is converted into an index entry under `mods/FAFF0x@<id>/`.

## Automatic synchronization

GitHub Actions runs on every push, manually, and once per hour. The workflow:

1. scans `FAFF0x/gen2recomp`;
2. selects the newest versioned ZIP for each mod;
3. reads `manifest.json` and optional `README.md`;
4. updates metadata under `mods/`;
5. builds `site/data/index.json`;
6. deploys the `site/` directory to GitHub Pages.

If the source repository contains no versioned ZIP files yet, the build remains valid and publishes an empty index.

## Published feed

Once GitHub Pages is enabled for this repository, the feed is expected at:

`https://faff0x.github.io/gen2recomp-mod-index/data/index.json`

The submission helper is expected at:

`https://faff0x.github.io/gen2recomp-mod-index/`

## Local checks

```sh
node scripts/validate.mjs --examples
node scripts/check-links.mjs
node scripts/build-index.mjs
node --test scripts/test.mjs
```

The index contains metadata only. Installable mod ZIPs remain in `FAFF0x/gen2recomp`.



