# Modern Battle UI - Gen 2 v2.2.0

A native Gold/Silver/Crystal port of Modern Battle UI.

## Battle HUD

- Floating player and opponent cards.
- Name, level, type, status and animated/displayed HP.
- Optional exact enemy HP.
- Caught marker when the opposing species is already owned.

## Horizontal command menu

The original Gen 2 2x2 cursor is presented and navigated as:

`FIGHT -> BAG -> POKéMON -> RUN`

Directional presses are remapped, but the original `Gen2BattleState:chooseMenu()`
remains the action owner.

## FIGHT

The modern 2x2 move panel shows:

- move name;
- current PP / max PP when available;
- type;
- Gen 2 PHYSICAL / SPECIAL / STATUS category;
- power;
- accuracy;
- move description/effect when available;
- matchup against the current opponent:
  - SUPER x4
  - SUPER x2
  - NORMAL x1
  - RESIST x0.5
  - RESIST x0.25
  - NO EFFECT

The effectiveness calculation uses Gen 2's own type chart and the live battle's
Foresight/identified matchup table when available.

## Battle dialogue

Battle messages are now presented in the same high-resolution visual language as
the rest of the mod instead of falling back to the vanilla Gen 2 textbox. The
source `Gen2BattleState` still owns text timing, paging and input.

Modern YES/NO cards mirror the native selection for battle prompts including:

- `Use next POKéMON?`;
- trainer SHIFT prompts (`Will <player> change POKéMON?`);
- nickname and move-learning confirmations that occur inside battle.

Level-up stat screens and the four-move forget-selection flow are also rendered
by the modern presenter. Gen 2 still owns the selection index, HM protection,
cancel/decline behavior and the actual move replacement.

## In-battle Party

The source `Gen2PartyMenu` keeps input and switch validation. The modern
presentation adds a compact party list and a detail panel with:

- icon;
- name and level;
- types;
- status and HP;
- Attack, Defense, Sp. Atk, Sp. Def and Speed;
- moves and their effectiveness against the live opponent;
- BEST OPTION highlight for the strongest damaging matchup.

BattleMonMenu (SWITCH / STATS / CANCEL) remains source-owned and is mirrored as
an overlay when open.

## In-battle Pack

The source `Gen2PackMenu` remains the item authority. The modern presentation
shows:

- current pocket and item list;
- quantity;
- item name;
- item icon when the active item registry supplies one;
- category;
- description;
- TM/HM taught move details;
- the live battle item submenu.

Using an item still goes through the original Gen 2 battle item logic.

## Compatibility

- Optional `gen2_modern_ui`: this mod has higher HUD priority and paints the
  battle-specific layer last. Gen2 Modern UI can continue to handle the rest of
  the game; battle dialogue/transient prompts are now owned by this mod while active.
- Does not replace `Gen2BattleState`, `Gen2PartyMenu` or `Gen2PackMenu`.
- Does not change damage, turn order, catches, switching, item effects or battle
  callbacks.

## v2.2.0 battle progression UI
During Gen 2 battles, level-up stat panels and the move-learning/forget selection are now rendered by the modern high-resolution UI. The native Gen 2 battle state still owns A/B input, move selection indices, HM restrictions, cancel behavior, and the actual learned/replaced move.
