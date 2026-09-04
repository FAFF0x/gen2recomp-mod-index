# Pokédex Plus - Gen 2

A Gen 2-only port of Pokédex Plus for Pokémon Recomp. It replaces the standard
START-menu Pokédex destination with a more complete research interface while
leaving game progression and encounter data read-only.

## Gen 2 features

- Caught Pokémon indicator.
- Automatic caught scan of the active party and every Gen 2 PC Box.
- **STATS**: type, HP, Attack, Defense, Speed, Sp. Atk, Sp. Def and base-stat total.
- **HABITAT**: reads the live merged Gen 2 grass, water and fishing tables.
- Grass encounters are separated by **MORN / DAY / NITE**.
- Fishing distinguishes **OLD ROD / GOOD ROD / SUPER ROD**, including time-group fish.
- Habitat details include slot chance, level range and an estimated overall encounter chance when the source table exposes a rate.
- **AREA MAP**: opens the native `Gen2PokedexMenu` area view for the selected species.
- **EVOLUTION**: supports Gen 2 level, item, trade/held-item, happiness/time and stat-comparison evolutions.
- **LEVEL MOVES**: reads Gen 2 `levelMoves` and shows move details.
- Press **START** in the main Pokédex+ list for search by name or type.
- Reads merged Pokémon/encounter tables, so species and encounter records supplied by other compatible Gen 2 mods are included automatically.
- Optional `dexDisplay`, `dexVariant` and `dexVariantOrder` display metadata remains supported for custom species.

## Gen 2 only

The manifest declares:

```json
"games": ["gen2"]
```

The mod therefore does not load for Gen 1 games. Gen 1-only integration code,
Gen 1 Town Map calls and the original Gen1 Modern UI adapter were removed.

## Collision-safe install

This port intentionally uses its own identity:

- Manifest ID: `pokemonmod_gen2_pokedex_plus`
- Screen namespace: `PokemonModGen2PokedexPlus*`
- Display name: `Pokédex Plus - Gen 2`

This means it can be imported alongside the original `pokedex_plus` package
without the launcher treating them as the same mod. At runtime the START-menu
hook also refuses to create a second `POKéDEX+` row when another enabled mod
already owns one.

## Controls

- **A**: open/select.
- **B**: back.
- **Up / Down**: move in lists.
- **Left / Right**: page jump where available.
- **START** from the main list: search.
- **START** from HABITAT: native Gen 2 area map.

## Notes

`REVEAL UNSEEN DATA` is enabled by default and can be disabled in mod options.
The mod requires `engine_internals` only for the native Gen 2 Pokédex screen and
shared renderer/sound helpers used by its custom pages.


## 1.0.2

- Added stable semantic IDs/markers for the main Pokédex+ list and search-result lists.
- Species rows now publish `species`, `seen` and `ball` presentation metadata without changing callbacks or Pokédex logic.
- With **Gen2 Modern UI Enhanced v1.0.8+**, Pokédex+ gets Pokémon row icons and a large selected-Pokémon preview with sprite, Pokédex number, types and caught/seen state.
- Hidden/unseen entries remain hidden from the preview when `REVEAL UNSEEN DATA` is disabled.

## 1.0.1

- Se più metodi portano allo stesso Pokémon, il Pokédex preferisce il percorso non-trade.
- Compatibilità con Trade Evolution Fix v1.2.0: mostra LEVEL al posto di TRADE duplicato.
- Le evoluzioni LEVEL che richiedono un held item mostrano anche il nome dell'oggetto.


## v1.0.3 search/UI integration

- START/GO name search closes the keyboard before opening filtered results, preventing opaque-stack presentation conflicts.
- Main and search-result rows expose species, dex, icon, seen and caught metadata so Modern UI can render Pokémon icons and a selected-species preview card reliably.
