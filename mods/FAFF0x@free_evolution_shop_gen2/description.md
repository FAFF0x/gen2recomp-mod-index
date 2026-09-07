# Free Evolution Shop Gen 2 v1.0.3

## What v1.0.3 fixes

v1.0.2 targeted the correct generation, but its menu integration was wrong.

Modern UI Gen 2 v1.0.15 does not render the native `drawTopMenu()` function
when it owns `Gen2MartMenu`. It reconstructs the top Mart rows from semantic
state and renders exactly BUY / SELL / QUIT.

Also, `all_tm_shop_gen2` replaces the `Gen2MartMenu` screen with its own
NORMAL SHOP / TM-HM SHOP / LEAVE chooser.

That meant the old EVOLUTION row could be hidden even though the mod loaded.

v1.0.3 no longer patches a native Mart instance.

## New architecture

The root Mart screen is a dynamic chooser that exposes the public
`Gen2ScriptMenu` semantic fields:

- `screenId = "Gen2ScriptMenu"`
- `items`
- `row`
- `col`
- `cols`
- `title`

Modern UI v1.0.15 already renders this interface dynamically.

### Without All TM Shop

The clerk opens:

- NORMAL SHOP
- EVOLUTION SHOP
- LEAVE

### With All TM Shop Gen 2 v1.1.0

The clerk opens:

- NORMAL SHOP
- TM/HM SHOP
- EVOLUTION SHOP
- LEAVE

The mods remain separate. Free Evolution Shop declares All TM Shop as an
optional dependency only so the loader orders them correctly when both are
enabled.

## Evolution catalogue

EVOLUTION SHOP opens the real native Gen 2 `MartMenu` directly in BUY mode.
All native purchase logic stays intact:

- quantity selector;
- confirmation;
- Gen 2 bag pocket limits;
- 99-item stack limit;
- native purchase messages;
- Modern UI's existing Gen2MartMenu presentation.

Every evolution-catalogue entry costs 0.

The mod discovers `EVOLVE_ITEM` and held-item `EVOLVE_TRADE` requirements from
the merged Gen 2 Pokemon data and has the standard G/S/C fallback list:

- Sun Stone
- Moon Stone
- Fire Stone
- Thunderstone
- Water Stone
- Leaf Stone
- King's Rock
- Metal Coat
- Dragon Scale
- Up-Grade

## Supported games

The manifest uses:

`"games": ["gen2"]`

so the launcher targets Gold, Silver and Crystal only.

## Installation

Remove v1.0.2 of `free_evolution_shop_gen2`, import v1.0.3, then restart the
game.

If `all_tm_shop_gen2` and/or `modern_ui_gen2` are enabled, leave them enabled:
v1.0.3 is designed to compose with them rather than replace them.
