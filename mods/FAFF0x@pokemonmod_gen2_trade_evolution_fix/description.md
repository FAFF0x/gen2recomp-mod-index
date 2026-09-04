# Trade Evolution Fix - Gen 2

A Gen 2-only version of Trade Evolution Fix for Pokémon Recomp.

Version 1.2.0 converts **all ten vanilla Generation II trade evolution lines** into real level-based evolution rows. The original `TRADE` row is replaced, so Pokédex screens and other UI mods read the evolution as a level evolution instead of reporting `TRADE`.

## Evolutions

- Kadabra → Alakazam — Level 40
- Machoke → Machamp — Level 40
- Graveler → Golem — Level 40
- Haunter → Gengar — Level 40
- Poliwhirl + King's Rock → Politoed — Level 40
- Slowpoke + King's Rock → Slowking — Level 37
- Onix + Metal Coat → Steelix — Level 40
- Scyther + Metal Coat → Scizor — Level 40
- Seadra + Dragon Scale → Kingdra — Level 40
- Porygon + Up-Grade → Porygon2 — Level 40

For the six Generation II held-item evolutions, the Pokémon must hold the original item when it reaches the required level. The item is consumed only when the evolution succeeds.

Slowpoke is handled specially: at level 37, King's Rock selects Slowking; without King's Rock, the normal Slowbro evolution remains available.

## Compatibility

- Gen 2 only (`games: ["gen2"]`).
- Unique mod id: `pokemonmod_gen2_trade_evolution_fix`.
- Does not declare conflicts with the old Gen 1 mod.
- If another mod has already supplied a level evolution to the same target, this mod leaves that path untouched instead of adding a duplicate.
- Supports both current `LEVEL`/`TRADE` naming and older Gen 2 `EVOLVE_LEVEL`/`EVOLVE_TRADE` data.
