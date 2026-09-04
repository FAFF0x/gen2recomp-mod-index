# NEW ICONS - Gen 2

Gen 2-only port of **NEW ICONS** for Gold, Silver and Crystal.

## What it changes

- Replaces the small party/menu icon for all **251 species**.
- Every species receives its **own** two-frame icon sheet.
- Runtime sheets use the native Gen 2 format: **16×32**, with two 16×16 frames stacked vertically.
- The artwork keeps the authored full colours instead of being recoloured by the stock GBC party palette.
- Held-item and mail markers in the party screen are preserved.
- The trade animation also uses the replacement icon in true colour.

## Gen 2 only / import safety

This package is intentionally separate from the original Gen 1 mod:

- mod id: `new_icons_gen2`
- name: `NEW ICONS - Gen 2`
- `games: ["gen2"]`
- unique sheet ids: `ICON_NEW_ICONS_GEN2_<SPECIES>`
- no declared conflicts with `new_icons` or other icon packs

The mod does **not** overwrite the 39 shared vanilla Gen 2 icon sheets. Instead it registers a new sheet for each species and changes only that species' assignment. If another icon mod loads later and changes a species assignment, the true-colour wrappers automatically stop intercepting that species, so normal mod priority decides which art wins.

## Modern UI

`Gen2 Modern UI` reads the same live `gen2Icons` descriptors. Because this mod registers real per-species descriptors, Modern UI can resolve the artwork directly without a Gen 1 compatibility shim.

## Scope

This is presentation-only. It does not modify:

- Pokémon stats
- moves
- DVs / Stat EXP
- party or box data
- encounters
- battle sprites
- saves

## Credits

The supplied icon set credits the MiniDex icon artwork to **Chamber, Solo0993, Blue Emerald, Lake, Neslug, and Pikachu25**. Artwork credit remains with the original artists.

## v2.0.1 icon-size optimization

The 251 runtime sheets are rebuilt from the original 32×64 artwork. Transparent padding is removed before scaling, and the union of both animation frames is fitted into a 15×15 area inside each native 16×16 Gen 2 frame. This makes small Pokémon icons substantially larger and clearer without changing the engine's expected sheet format or draw coordinates.
