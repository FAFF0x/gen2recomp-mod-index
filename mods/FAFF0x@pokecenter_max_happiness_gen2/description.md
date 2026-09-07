# Pokecenter Max Happiness Gen 2 v1.0.2

This build targets the **gen1recomp multi-generation runtime** used by the
launcher that shows the `GEN 1 / GEN 2` chip and the per-cartridge
`Enable for:` toggles.

## The actual Gen 2 manifest field

The launcher classifies mods from:

```json
"games": ["gen2"]
```

If the `games` key is missing, this runtime intentionally falls back to the
legacy rule: **Gen 1 only**.

That is why v1.0.1 was shown as GEN 1.

## The actual Gen 2 healing path

On this runtime Gold/Silver/Crystal do not use `g2_heal_party`.

The real path is:

`src.script.gen2.Specials -> HealParty -> src.world.gen2.World:healParty()`

v1.0.2 wraps that real Gen 2 method.

## Behavior

When the normal Nurse heals you while you are inside a Pokemon Center:

1. the vanilla Gen 2 heal runs normally;
2. every non-Egg Pokemon in the current party gets `happiness = 255`.

Eggs are skipped.

Other uses of HealParty outside Pokemon Centers (whiteout, Mom, Sacred Ash,
Battle Tower, scripted heals elsewhere) are left unchanged.

## Installation

Delete the old `pokecenter_max_happiness_gen2` installation before importing
this ZIP, then import v1.0.2.

The launcher should classify it as **GEN 2**, with Gold/Silver/Crystal as its
supported games.
