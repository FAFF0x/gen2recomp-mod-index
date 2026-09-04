# Free Master Ball + Rare Candy - Gen 2

Pokemon MOD Gen 2-only build.

## What it does

- Adds **MASTER BALL** to the BUY list of every standard Gen 2 Poke Mart.
- Adds **RARE CANDY** to the BUY list of every standard Gen 2 Poke Mart.
- Sets the items handled by this build to price **0**.
- Leaves BITTER, BARGAIN and PHARMACY shops untouched.
- Keeps the native `Gen2MartMenu`, so Modern UI and other mart presenters keep working.

## Import / coexistence safety

This package uses the unique manifest ID:

`pokemonmod_gen2_free_master_rare`

It is restricted to:

`games: ["gen2"]`

It declares no hard conflicts, so the Mod Manager can keep other similarly named packages installed.

For runtime coexistence, the mod also detects the older IDs `free_master_rare_gen2`,
`free_master_ball`, and `free_rare_candy`. If an equivalent active mod already owns
an item, this build does not install duplicate behaviour for that item.

## Compatibility

- Gold / Silver / Crystal only.
- Mod API 2.
- Compatible with `gen2_modern_ui` because it does not replace the native mart screen.
- No save migration required.
