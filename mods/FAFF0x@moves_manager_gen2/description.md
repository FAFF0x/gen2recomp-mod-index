# Moves Manager - Gen 2

A **Generation 2-only** port of Moves Manager for Gen1Recomp's Gold / Silver / Crystal engine.

The mod adds **MOVES** immediately after **STATS** in the normal out-of-battle Pokémon submenu. Eggs and the in-battle party submenu are intentionally unchanged.

## Main page

- Four move slots, including empty slots.
- Current / maximum PP.
- PP Up-aware Gen 2 maximum PP.
- `SELECT` marks a move; move the cursor and press `SELECT` or `A` to reorder it.

## Technical pages

Each move has three pages containing, when the engine record provides the field:

- Type.
- **Physical / Special / Status using Generation 2's type-based split**.
- Power and accuracy.
- Current PP, maximum PP and PP Ups.
- Priority.
- Increased critical-hit flag.
- Effect and effect kind.
- Fixed damage.
- Multi-hit range.
- Counter compatibility.
- Charge flag / charge text.
- Semi-invulnerability.
- Internal index.
- Move ID, effect ID and animation metadata.

Gen 2 classification is correct for the new types: **Steel is Physical and Dark is Special**. Zero-power moves display as Status.

## Move memory

The initial memory is reconstructed from:

1. currently known moves;
2. the current species and its pre-evolutions;
3. every `levelMoves` entry on that evolutionary line whose required level is not above the Pokémon's current level.

This includes level-1 / starting moves because Gen 2 stores them in the same `levelMoves` table. Current TM/HM, egg, traded and modded moves are always remembered too.

Moves subsequently replaced through the manager stay in the manager's per-Pokémon memory.

## Replacing moves

Press `A` on a move's technical page to open the remembered-move list. Select a candidate, inspect it, then press `A` again to teach it.

The manager prevents:

- duplicate known moves;
- replacing a slot with the same move;
- deleting Gen 2 HM moves: **CUT, FLY, SURF, STRENGTH, FLASH, WATERFALL and WHIRLPOOL**.

A newly restored move starts at its normal maximum PP with zero PP Ups.

## Controls

### Known moves
- Up / Down: select slot.
- A: details; an empty slot opens remembered moves.
- SELECT: mark / reorder.
- B: cancel reorder or close.

### Details
- Left / Right or SELECT: page.
- A: change move.
- B: back.

### Remembered moves
- Up / Down: select.
- Left / Right: jump six rows.
- A: details / teach.
- B: back.

## Gen2 Modern UI

Optional dependency: `gen2_modern_ui`.

The mod exports the `gen2ModernUi` compatibility API and registers a `Gen2MovesManager` adapter. Modern UI may suppress the native 160x144 drawing, but Moves Manager retains ownership of navigation, memory, reordering and move replacement.

## Import / coexistence safety

This package deliberately uses unique Gen 2 identifiers:

- mod ID: `moves_manager_gen2`
- screen ID: `Gen2MovesManager`
- save-memory field: `movesManagerGen2Memory`
- display name: `Moves Manager - Gen 2`

It declares **no installer conflicts** with `moves_manager`. If an older copy also injects an exact `MOVES` row on a Gen 2 boot, this port replaces that row in-place instead of adding a duplicate, so the Gen 2 implementation wins without duplicate menu entries.
