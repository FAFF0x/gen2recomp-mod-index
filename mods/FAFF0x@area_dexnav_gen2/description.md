# Area DexNav Gen 2

Press **SELECT** while exploring the overworld to immediately encounter an
**uncaught Pokémon** that really appears in the current Gold/Silver/Crystal
area.

## Gen 2 behaviour

- Uses the current map's extracted Gen 2 wild encounter data.
- Grass/cave/indoor encounters use the correct **MORN / DAY / NITE** list.
- While **SURFing**, DexNav exclusively uses the current map's water table.
- Active **swarm** replacements are respected because DexNav reads the world's
  live wild tables rather than the unmodified cache directly.
- During the **Bug-Catching Contest**, it uses the Contest encounter table and
  starts a real Contest battle with PARK BALL rules intact.
- Species already present in `save.pokedex.caught` are excluded.
- Duplicate slots and their original Gen 2 probabilities are preserved, then
  renormalized after caught species are removed.
- The encounter keeps the level from the real slot. Contest levels keep their
  original min/max range.
- Ruins of Alph **Unown** are only available after at least one Unown puzzle has
  actually unlocked forms, and generated Unown use the unlocked-form DV rules.
- DexNav intentionally bypasses the normal encounter-rate roll and **REPEL**.

## What is not included

Fishing, Headbutt trees, roaming beasts, static encounters, gifts, trades and
evolutions are not part of the normal local grass/water table and are therefore
not scanned by DexNav.

## SELECT in Gen 2

Gold/Silver/Crystal normally use SELECT for the registered-item shortcut. While
this mod is enabled, **SELECT is owned by Area DexNav in the overworld**, so the
registered-item SELECT action does not run. START and the rest of the controls
are unchanged.

## Compatibility

This is a separate Gen 2 port with id `area_dexnav_gen2`; the original Gen 1
`area_dexnav` can remain installed for Gen 1. The mod does not replace battle UI
or menu screens and can coexist with **Gen2 Modern UI**.
