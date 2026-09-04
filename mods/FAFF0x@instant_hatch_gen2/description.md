# Instant Hatch Gen 2

Adds **INSTANT HATCH** to the submenu of every Pokémon Egg in Gold, Silver and Crystal.

## Usage

1. Open **POKéMON** from the START menu.
2. Select an **EGG**.
3. Choose **INSTANT HATCH**.
4. The menu closes and the Egg immediately begins the normal Gen 2 hatch sequence.

There is no extra confirmation prompt.

## What is preserved

The mod does **not** directly convert an Egg into a Pokémon. It delegates to the engine's normal `World:hatchEggs()` flow, preserving:

- the standard Egg hatch animation and music;
- the `Huh?` / hatch announcement sequence;
- the nickname question and naming screen;
- original DVs, inherited moves, level and experience;
- hatch happiness and full HP initialization;
- player OT and Trainer ID assignment;
- Pokédex Seen/Caught updates;
- Crystal caught-data fields (time/location/player gender);
- the special Togepi-hatched event flag;
- the engine `egg.hatched` event.

Only the selected Egg is forced into the hatch queue. If another Egg was already naturally ready to hatch, its state is preserved and it is not accidentally hatched by this action.

## Compatibility

- Gen 2 only.
- Uses the standard `ui.party.submenu` hook and does not replace `Gen2PartyMenu`.
- Compatible with dynamic party-menu entries from other mods such as DV/EV editors.
- `gen2_modern_ui` is optional; Modern UI versions that render dynamic `state.submenu.items` will display the new row automatically.
