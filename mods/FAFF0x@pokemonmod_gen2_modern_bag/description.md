# Modern Bag - Gen 2 (Pokemon MOD)

A Gen 2-only build of Modern Bag for Gold, Silver and Crystal.

This package uses the unique manifest ID `pokemonmod_gen2_modern_bag`, so it can be imported alongside other Modern Bag variants without the mod manager treating them as the same installed mod.

## Coexistence

- `games: ["gen2"]`
- no hard manifest conflicts
- unique mod/options/save namespace
- keeps the shared Pack/Input patch keys only as a technical mutex
- if an active equivalent `modern_bag_gen2` or `modern_bag` is detected, this build defers and does not install a second Pack renderer or inventory patch
- optional integration with `gen2_modern_ui`

## Features

- Favorites
- Medicine / Balls / TM HM / Battle / Key Items / Other logical pockets
- persistent favorites and pins
- quick search
- TM/HM search, filters and sorting
- move information
- configurable opening pocket
- configurable hold-scroll speed
- unlimited Gen 2 pocket capacity and stack size
- native Gen 2 item use, give, toss, teach and battle behavior preserved
- Item Shortcut Gen 2 integration preserved through the native Pack submenu

## Compatibility note

The screen IDs and semantic behavior used by Gen2 Modern UI are intentionally preserved. Only the installed mod identity, data namespace and adapter owner were separated.
