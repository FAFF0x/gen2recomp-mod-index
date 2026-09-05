# Rocket Gym Ambushes - Gen 2

A Gen 2 quest mod for Pokemon Recomp.

## Quest flow

After each Johto Gym Badge, entering the city/town outside that Gym causes a Team Rocket operative to appear near the Gym entrance. Talk to the Rocket to start a trainer battle. After winning, choose one of the three Pokemon from that Rocket's team to recruit.

There are eight chapters: Violet, Azalea, Goldenrod, Ecruteak, Cianwood, Olivine, Mahogany, and Blackthorn.

The Rocket remains available after the battle until a recruit is actually chosen. Pressing B / DECIDE LATER does not lose the reward. If the party is full, the recruit goes to the first free PC box. If every box is full, the reward remains pending.

The final recruit carries BLACKGLASSES when that item exists in the active Gen 2 data.

## Quest System Gen 2 compatibility

The mod detects either framework id:

- `pokemonmod_gen2_quest_system` (current project build)
- `quest_system_gen2` (alternate/future naming)

When found, it registers `Rocket Gym Ambushes` in the Quest journal, publishes 8-step progress, dynamic objectives/locations, and `!` NPC markers for active Rocket ambushes. The quest gameplay remains safe if the framework is temporarily unavailable and will register on a later `game.ready` / map entry.

## Compatibility

- Gen 2 only.
- Uses runtime NPC spawning rather than patching map ROM data.
- Uses the native Gen 2 trainer battle engine.
- Recruits use normal Gen 2 Pokemon data and move generation.
- Works with Advanced Box System; reward boxing uses the same 14-box storage data.
- Quest System owns the journal UI, so Gen2 Modern UI integration is inherited through Quest System.


## v1.0.1 interaction fix

Rocket NPC interaction now follows the Gen 2 talk dispatch used by `World:interactBody`, while retaining the generic `world.talk` fallback.

## v1.0.2 defeated-NPC behavior

After an ambusher is defeated, the Rocket is removed from the Gym entrance immediately.

The recruit choice still opens after the battle. If the player postpones the choice or storage is full, the reward remains persistent and can be reopened from **START > RKT GIFT**. The defeated Rocket never respawns just to hold the reward.
