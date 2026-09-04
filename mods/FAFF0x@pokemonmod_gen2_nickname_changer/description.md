# Nickname Changer - Gen 2

A Gen 2-only nickname changer for Pokémon Gold, Silver and Crystal in Pokémon Recomp.

It adds **RENAME** directly to the normal field Pokémon submenu. The intended order around the stock actions is:

```text
STATS
RENAME
SWITCH
```

Field moves such as **CUT**, **HEADBUTT**, **SURF**, **STRENGTH**, **FLASH**, etc. remain available above the normal actions.

## v1.1.0: contextual field moves

Generation II's native field Pokémon submenu is visually designed for at most eight rows. A Pokémon with several contextual field moves can already fill those eight slots before a mod adds anything.

This version no longer hides RENAME in that case. If the menu grows beyond eight rows, the mod keeps the native eight-row box and scrolls its contents as the cursor moves. No vanilla action is removed.

Example with four field moves:

```text
CUT
SURF
HEADBUTT
STRENGTH
STATS
RENAME
SWITCH
MOVE
ITEM
```

Only eight rows are shown at once; moving UP/DOWN reveals the remaining row.

## Usage

1. Open **POKéMON** from the Start menu.
2. Select a non-Egg Pokémon.
3. Choose **RENAME**.
4. Enter the nickname in the native Gen 2 naming screen.
5. Confirm with **END**.

## Compatibility

- Gen 2 only (`games: ["gen2"]`).
- Unique manifest id: `pokemonmod_gen2_nickname_changer`.
- Unique injected row id: `POKEMONMOD_GEN2_RENAME`.
- Does not add RENAME in battle switch menus or Egg menus.
- Detects existing RENAME/NICKNAME rows to avoid duplicate entries when another compatible nickname mod is active.
- Uses a presentation-only patch to the Gen 2 PartyMenu renderer when more than eight field-submenu rows exist; native input and field-move execution remain unchanged.

## Permission

v1.1.0 declares `engine_internals` because the current public submenu hook can add rows but does not expose the Gen 2 submenu's drawing window. The private PartyMenu renderer is patched only to add scrolling for lists longer than eight rows.
