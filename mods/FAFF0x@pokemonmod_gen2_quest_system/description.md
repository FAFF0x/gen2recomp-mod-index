# Quest System - Gen 2 (Pokemon MOD) v1.0.1

A Gen 2-only port of Quest System for Pokemon Recomp.

## Player features

- Adds **QUESTS** to the Start menu in Gold, Silver and Crystal.
- Separate **ACTIVE** and **COMPLETED** tabs.
- Shows objective, location, progress, description, reward and source mod.
- Press **SELECT** to track/untrack a quest.
- Supports cached `!`, `?` and `*` NPC indicators on Gen 2 overworld NPCs.
- Optional **Gen2 Modern UI** presentation through the public compatibility adapter.
- Quest state is stored in this mod's own save namespace.

## Gen 2 conversion

- Manifest is restricted to `games: ["gen2"]`.
- Uses the live Gen 2 game through the mod API instead of the Gen 1 Game singleton.
- The journal screen id is `PokemonModGen2QuestJournal`.
- Closing the journal pops back to the existing Gen 2 Start Menu instead of pushing a Gen 1 `StartMenu` screen.
- Gen 1 story adapters (Team Rocket Returns, The Mirage of Mew and Rocket Gym Ambushes) are intentionally not bundled into this Gen 2 build.
- `src.world.NPC` is used only for the NPC marker renderer; on Gen 2 the engine maps it to the live Gen 2 NPC class.

## Coexistence / import safety

- Installed mod id: `pokemonmod_gen2_quest_system`.
- No hard manifest conflicts are declared.
- `quest_system` is an optional dependency only for ordering/detection. If a legacy Quest System is force-enabled on Gen 2, this build defers and does not install a second QUESTS row or NPC draw wrapper.
- The Start-menu hook also refuses to add a duplicate `QUESTS` label.

## API for Gen 2 quest mods

Find this mod by its unique id:

```lua
local journal = assert(mod.find("pokemonmod_gen2_quest_system"), "Gen 2 Quest System is required")
local quests = journal.exports

quests.register({
  id = "my_gen2_mod.first_quest",
  title = "A New Objective",
  description = "Example Gen 2 quest.",
  objective = "Talk to the NPC.",
  location = "NEW_BARK_TOWN",
  reward = "RARE CANDY",
  status = "available",
  progress = { current = 0, total = 1 },
})
```

Public methods: `register`, `remove`, `start`, `update`, `advance`, `complete`, `fail`, `track`, `addMarker`, `get`, `list`, `open`.

Notification events use this build's namespace:

- `mod.pokemonmod_gen2_quest_system.registered`
- `mod.pokemonmod_gen2_quest_system.changed`
- `mod.pokemonmod_gen2_quest_system.completed`
- `mod.pokemonmod_gen2_quest_system.tracked`


## Crash safety

Version 1.0.1 fixes the Gen 2 NPC draw recursion present in 1.0.0. Quest markers preserve the native four-argument NPC renderer and marker drawing is isolated so a presentation error cannot terminate the game.
