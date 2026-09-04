# Move Learn Stats - Gen 2 (Pokemon MOD)

A Gen 2-only build of Move Learn Stats for Gold / Silver / Crystal.

Whenever a Pokémon already knows four moves and must forget one to learn a new move, the comparison panel shows the highlighted move versus the move being learned, including POWER and maximum PP.

## Compatibility

- Manifest ID: `pokemonmod_gen2_move_learn_stats`
- Game scope: `gen2` only
- No hard manifest conflicts
- Can be imported alongside `move_learn_stats_gen2` / `move_learn_stats`
- If an older equivalent variant is active, this build defers instead of installing duplicate Game2, MoveDeleter, or HUD wrappers
- Keeps the Gen 2 Modern UI adapter and battle-level-up comparison support

## Gen 2 behavior

- Works with TM/HM teaching and other `Game2:learnMoveOn()` flows.
- Works for battle level-up move learning through the Gen 2 `choose-forget` phase.
- Uses the real selected-move maximum PP including PP Ups.
- Status moves display `---` for POWER.
- HM protection and actual move replacement remain owned by the Gen 2 engine.

The shared internal Gen 2 wrapper markers are intentionally retained as a runtime mutex; installed identity and manifest namespace are separate.
