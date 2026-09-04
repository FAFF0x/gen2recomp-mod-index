# Item Shortcut - Gen 2 (Pokemon MOD)

Standalone Gold / Silver / Crystal build of **Item Shortcut** for Gen1Recomp.

## Compatibility / installation

- **Gen 2 only**: the manifest is limited to `games: ["gen2"]`.
- Unique mod ID: `pokemonmod_gen2_item_shortcut`.
- No hard manifest conflicts (`conflicts: []`), so legacy/equivalent Item Shortcut packages can remain installed in the mod manager.
- Save data and global control options use this build's unique mod ID, so they do not overwrite the `item_shortcut_gen2` or `item_shortcut` option bucket.
- Known equivalent packages are optional dependencies only for load ordering. If one is actually active, this build defers runtime ownership instead of installing a second input/Pack dispatcher.
- The raw input and Pack wrapper markers remain shared intentionally as a final mutex against duplicate wrappers during hot reloads or unusual load orders.
- Compatible with **Gen2 Modern UI** through the existing `Gen2ItemShortcut*` semantic screen IDs.
- Does not alter the native SELECT registered-item feature.

## Default controls

| Action | Keyboard | Controller |
| --- | --- | --- |
| Open Shortcut Menu | `I` | `Y` |
| Use FAST Item | `K` | `X` |

Shortcuts only take priority while the Gen 2 overworld is idle.

## Features

Five persistent Pack shortcut slots are available. Selecting an assigned slot offers:

- **USE** — dispatch the item through the native Gen 2 item path.
- **SET FAST / REMOVE FAST** — mark one slot for immediate use.
- **CLEAR** — remove the shortcut assignment.
- **CONTROL MAPPING** — remap menu/FAST keyboard and controller inputs.

Items are assigned from the real Gen 2 Pack:

`PACK → Item → ASSIGN SHORTCUT → Slot 1–5`

The action is added only to the normal field Pack submenu, not the Battle Pack, deposit chooser, tutorial Pack, or other chooser-only modes.

## Native Gen 2 item behavior

Shortcut use follows the same two-stage path as the real Pack:

1. `World:useFieldItem`
2. `Game2:useFieldItem` when the world dispatcher declines the item

This keeps native behavior for bicycles, rods, Repels, medicine, Rare Candy, evolution stones, Ether/Elixer items, TM/HM teaching, Escape Rope, key items, and party-target items.

## FAST item

Mark one slot as **FAST**, then use:

- Keyboard: `K`
- Controller: `X`

Target selection, refusal text, teaching/evolution screens, item consumption, and other effects remain owned by the Gen 2 engine.

## Modern UI integration

The custom screens retain these semantic IDs for compatibility:

- `Gen2ItemShortcutMenu`
- `Gen2ItemShortcutActions`
- `Gen2ItemShortcutAssign`
- `Gen2ItemShortcutControls`
- `Gen2ItemShortcutCapture`

`ListMenu.rows` remains engine-owned and numeric; Modern UI discovery uses `items` and `screenId`.
