# Stable Menu Navigation - Gen 2

A Gen 2-only quality-of-life mod for Pokemon Recomp / Gen1Recomp.

## What it fixes

Increasing GAME SPEED accelerates the fixed-step logic clock. The native Gen 2
menu repeat system counts its delay/rate in logic frames, so holding a direction
can become extremely fast at high GAME SPEED values.

This mod makes **held directional repeat use real time instead of logic time**.

- A directional press still moves immediately.
- Holding a direction uses the Gen 2 cadence in real time:
  - about 0.25 seconds before repeat starts;
  - about 0.083 seconds between repeats.
- Changing GAME SPEED no longer changes that held-repeat cadence.
- Overworld, battle, animations, text speed and GAME SPEED itself are untouched.

## Coverage

The patch operates at `src.ui.MenuRepeat`, so it covers the native Gen 2 screens
that use the shared repeat helper (notably PACK and POKEDEX), plus generic/custom
ListMenu screens that use the same helper.

Screens that use single edge presses only (for example the Gen 2 Start Menu)
already move once per physical press and are intentionally left untouched.

## Compatibility

- Gen 2 only (`games: ["gen2"]`).
- No hard conflicts declared.
- Does not change `core.logic_speed`.
- Does not touch overworld movement.
- Does not modify Modern UI rendering.
- Uses a global patch marker to prevent the same implementation being wrapped
  twice if an equivalent copy is accidentally active.

The mod requests `engine_internals` because there is currently no public hook for
`MenuRepeat.direction` itself.
