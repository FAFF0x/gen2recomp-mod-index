# EXP Share Modes - Gen 2

A native Gen 2 port of **EXP Share Modes** for Gold, Silver and Crystal.

## Modes

| Mode | Behaviour |
| --- | --- |
| **Off** | Only conscious Pokémon that participated against the defeated opponent receive EXP. They split one normal 100% pool. |
| **Classic Even Split** *(default)* | Every conscious, non-Egg Pokémon in the party shares one normal 100% pool evenly. |
| **Modern Progressive** | Conscious participants split the normal 100% pool. Conscious nonparticipants split a separate 50% pool, for roughly 1.5× total EXP before integer rounding. |

Fainted Pokémon and Eggs receive no EXP in every mode.

## Gen 2 behaviour preserved

The mod uses Gen2Recomp's native `battle.exp_award` / `Battle:giveExperiencePass` path. As a result it preserves the normal Gen 2 behaviour for:

- trainer battle EXP bonus;
- traded Pokémon EXP bonus;
- Lucky Egg;
- Stat EXP;
- Pokérus doubling of Stat EXP;
- level-up happiness;
- level-up messages;
- move learning and forget-move prompts;
- `battle.exp_gained` events.

### EXP.SHARE held item

Gen 2's original held **EXP.SHARE** normally halves the enemy EXP/stat pool and performs a second holder pass. While this mod is enabled, that vanilla distribution effect is intentionally ignored so that **Off / Classic / Modern** remain the only active distribution rule. The item itself is not removed or modified.

## Configuration

Open the Mod Manager, select **EXP Share Modes Gen 2**, open **OPTIONS**, and choose **EXP SHARE MODE**. The default is **Classic Even Split**.

## Compatibility

- Game: Gen 2 only (Gold / Silver / Crystal).
- Uses the native Gen 2 EXP hook rather than replacing the battle UI.
- Does not replace `Gen2BattleState`, so it can coexist with **Gen2 Modern UI**.
- Uses the unique manifest ID `pokemonmod_gen2_exp_share_modes`, so the launcher does not treat it as the original `exp_share_modes` or `exp_share_modes_gen2` package.
- No manifest-level conflicts are declared. If the older `exp_share_modes` or `exp_share_modes_gen2` package is also active, this build detects it and defers instead of installing a second `battle.exp_award` hook. Both packages can therefore remain installed without double EXP distribution.


## Package identity

- Manifest ID: `pokemonmod_gen2_exp_share_modes`
- Supported games: `gen2` only
- Package version: `1.0.0`
- No declared `conflicts` entries.
- Optional compatibility ordering for `exp_share_modes` and `exp_share_modes_gen2`; when either is active, this package safely defers its EXP hook.
