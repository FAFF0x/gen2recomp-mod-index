# Gen2 Modern UI Enhanced — v1.0.12

A Gen 2 port of **Gen1 Modern UI Enhanced 0.10.0** for Pokémon Recomp. This package is generation-scoped and targets **Pokémon Gold, Pokémon Silver, and Pokémon Crystal** through the Gen 2 runtime.

## v1.0.12 Advanced Box WITHDRAW / SWAP fix

- Advanced Box System Gen 2 remains inside the Modern UI presenter for **WITHDRAW**, **DEPOSIT**, **SWAP BOX**, **SWAP PARTY**, and swap-target selection.
- The compatibility gate now accepts Advanced Box's public `getPokemonList()` / row metadata instead of requiring the native `Gen2BoxMenu:list()` method.
- Pokémon icons and the selected-Pokémon sprite/details preview therefore remain visible after entering a storage action instead of reverting to the 160×144 vanilla box.
- Advanced Box still owns all storage mutations, MAIL restrictions, box switching and action callbacks; Modern UI changes presentation only.



## v1.0.10 Bill's PC Pokémon preview

- The native Gen 2 `Gen2BoxMenu` now has its own Modern UI presenter instead of being treated as a generic Chrome list.
- Every stored/party Pokémon row in Bill's PC shows a Pokémon icon.
- The currently highlighted Pokémon gets a full preview card with its front sprite plus a small icon, nickname/species, level, type(s), HP/status, ATK, DEF, SPEED, SP.ATK, SP.DEF and up to four moves with PP.
- WITHDRAW, DEPOSIT, MOVE, INSERT, STATS, RELEASE, box switching and CANCEL still use the game's own Gen 2 `BoxMenu` state and callbacks; Modern UI changes only presentation.
- The action submenu is drawn as a modal over the rich box browser so the preview stays visible while deciding what to do with the selected Pokémon.
- Pokégear remains a native compatibility island and Modern Battle UI Gen 2 still retains battle authority when installed.



## v1.0.9 compatibility / Pokédex Plus / Pokégear fix

- **Pokégear is now a native compatibility island.** While `Gen2Pokegear` is anywhere in the visible stack, Modern UI does not suppress or decorate the Pokégear or its child TextBox/ChoiceBox states. This avoids the crash caused by mixing the source Pokégear renderer with the generic Modern UI presenter.
- **Pokédex Plus - Gen 2** species lists are routed through Modern UI's dedicated Pokédex layout. Rows can use authored Pokémon icons and the selected entry gets a large sprite preview with number, types and caught/seen state.
- Pokédex Plus remains the input/data owner: START search, A details, HABITAT, EVOLUTION, LEVEL MOVES and callbacks are not replaced.
- If **Modern Battle UI - Gen 2** is enabled, Modern UI defers battle presentation to it instead of drawing/suppressing a second battle HUD. Outside battle, the rest of Modern UI remains active.
- Unknown or custom third-party screens still fail open to their native renderer.

## v1.0.7 PACK contextual-menu fix

- The Gen 2 PACK keeps its contextual item menu inside `state.submenu` rather than pushing a separate screen. Modern UI now renders that live submenu as a modern modal instead of suppressing it with the native PACK draw.
- Stock actions **USE / GIVE / TOSS / SEL / QUIT** are visible and selectable. Third-party rows are read dynamically, so **ASSIGN SHORTCUT** from Item Shortcut Gen 2 appears automatically.
- TOSS quantity, yes/no confirmation and PACK-owned messages are now rendered by Modern UI too, including the PACK's tokenized multi-page text format.
- MOVE ITEM mode is visually marked and pointer/touch input is isolated from the underlying item list while a PACK modal is open.
- No Pack behavior methods are replaced by Modern UI: item effects, TM/HM teaching, Item Shortcut and Modern Bag continue to own their native logic.

## v1.0.6 full UI routing / Party submenu fix

- The current Gen 2 Party screen stores its action menu in `state.submenu.items`. v1.0.5 read that model in generic row extraction but its dedicated Party renderer still drew the obsolete `state.subItems` shape. v1.0.6 renders the live submenu directly, so mod-injected actions such as **DV/EV** and **INSTANT HATCH** no longer become invisible.
- Future `Gen2*` menu/dialog screens also get a semantic Modern UI catch-all when they expose live rows/items/entries/choices/options, submenus, messages or confirmations. This prevents newly added UI from silently dropping back to 160×144 Chrome just because its exact screen id is newer than this release.
- Gen 2 Pokédex ENTRY, AREA, OPTION, SEARCH and UNOWN pages now have dedicated Modern UI views; the list is no longer the only modern part of the Pokédex.
- Modern semantic presenters now cover the main Chrome-owned Gen 2 utility screens: Bank of Mom, Battle Tower, Buena, Contest prompts, Day Care, Decoration, Elevator, Gender Select, Held Item, Init Clock, Mail/Mailbox, Map Radio, Move Deleter/Tutor, Name Pick, Photo Studio, Pokégear, Trade and Unown Printer.
- Mail Compose uses the Modern UI naming/keyboard surface while retaining its native text buffer and input semantics.
- Pokégear keeps the real source town/fly map as map content, but wraps it in Modern UI; phone, radio and clock data are modeled directly from the live Pokegear state.
- Source-art screens such as evolution/hatch/trade animations, Card Flip, Slot Machine and the Unown puzzle keep their animation/game board. They are explicitly recognized so they no longer force unrelated UI layers to fall back; Modern UI adds prompt/control chrome where applicable.
- The New Game/Oak flow no longer disables Modern UI wholesale. Oak's picture/shrink animation remains source art while its dialogue, clock, gender choice, name choice and naming keyboard can be modern.
- Battle UI is enabled by default through `battleUi`. `BATTLE UI SAFETY FALLBACK` and `LEAVE 3D BATTLES ALONE` remain enabled so unsupported source scenes fail open rather than losing controls or animation.
- Gen 2 display macros such as `<PK><MN>`, `<LV>` and `<ID>` are normalized only at the Modern UI presentation boundary.


## v1.0.5 text / PokéMart / Summary fix

- Gen 2 Game Boy font macros are normalized at the Modern UI presentation boundary. `<PK><MN>` now renders as `POKéMON`, while `<LV>`, `<ID>`, and related common display macros no longer leak as literal markup.
- Added Modern UI ownership for `AllTmShopGen2Chooser` and `AllTmShopGen2Catalogue`, including the TM/HM list, quantity/confirmation states, and SELECT move-information screen. The native `Gen2MartMenu` path remains modernized as well.
- `Gen2SummaryMenu` is now modern on all three native Gen 2 pages: STATUS, MOVES, and TRAINER / STATS.
- The Gen 2 MoveScreen/SELECT detail view is now modern too, while native input continues to own move swapping, party cycling, page changes, and close behavior.
- Gen 2 stats use Attack, Defense, Sp. Atk, Sp. Def, and Speed on the trainer/stat page instead of incorrectly treating page 3 as a Gen 1 DV page.

## v1.0.4 Full Gen 2 menu routing

The Gen 2 engine has several important Chrome-based screens that do not inherit
from the shared `Menu` / `ListMenu` classes. Earlier releases therefore left
Bill's PC, the Pokémon box list, PokéMart, Item PC and script menus on the
vanilla 160×144 renderer. v1.0.4 adds native Gen 2 adapters for
`Gen2MainMenu`, `Gen2CenterPcMenu`, `Gen2PcMenu`, `Gen2ItemPcMenu`,
`Gen2BoxMenu`, `Gen2MartMenu` and `Gen2ScriptMenu`.

Modern UI now presents the complete storage flow (box selection, Pokémon list,
withdraw/deposit/move/release submenus and prompts), the complete mart flow
(BUY, SELL, quantities, YES/NO and clerk text), and embedded Gen 2 Typer text
without changing the source screen's input, callbacks, save mutation or shop
logic. Boxed Gen 2 Pokémon with no calculated stat block use Gen 2's own
`Mon.stats` formula for display only.

## v1.0.3 Save + Trainer Card fix

- `Gen2SaveMenu` now has a dedicated Modern UI presenter. The native SaveMenu still owns confirmation, overwrite checks, file writing, timing, and SFX; Modern UI replaces only its visual layer.
- Trainer Card now reads Gen 2 `playTime` as `{ hours, minutes, seconds, frames }` instead of treating it as a numeric Gen 1 timer.
- Johto badges now read from Gen 2 `save.player.badges`; Kanto badges continue to use `save.player.kantoBadges`.
- Direct Gen 2 TrainerCard instances are detected by generation/class as well as `screenId`, avoiding a wrong Gen 1 fallback when a caller did not stamp the screen id.

## v1.0.2 Options fix

Gen 2 Options uses a grouped `view` on the root screen and separate subpages for groups such as SPEED. Modern UI now mirrors `OptionsMenu:visible()` rather than the flat descriptor table, so the displayed cursor, A-button activation, left/right changes, and GAME SPEED page all operate on the same live row. Gen 2-native value descriptors (`text`, `values`/`display`, FRAME) are also rendered correctly.

## v1.0.1 black-screen fix

Gen 2 renders the world and UI into one finished scene texture before `render.compose`. Unlike Gen 1, `ctx.worldCanvas`, `ctx.uiCanvas`, and `ctx.sceneCanvas` point at that same texture. v1.0.0 inherited the Gen 1 fallback that cleared `uiCanvas` after a modern presenter had been validated; on Gen 2 that could also erase the world/full-screen scene for the frame.

v1.0.1 never clears or scrubs the combined Gen 2 scene texture. Native Gen 2 UI is hidden only through state-level visibility/decorator hooks, and any frame that cannot be safely replaced is left native instead of being blanked.

## What v1.0 adapts

- New mod identity: `gen2_modern_ui` with API 2 and `games: ["gen2"]`.
- Direct support for the Gen 2 `Gen2*` screen namespace instead of relying on Gen 1 screen IDs.
- Modern presentation adapters for the Gen 2 Start Menu, SAVE flow, four-pocket PACK, Pokédex list/results, Options, Party, Summary and Trainer Card.
- Gen 2 Party action submenus (`state.submenu.items`) and PACK pocket rows/counts.
- Live `Game2` compatibility aliases for `world` and the renamed Gen 2 data catalogs (`gen2Sprites`, `gen2Maps`, `gen2Text`, `gen2Palettes`, `gen2Icons`, etc.).
- Gen 2 Trainer Card money/badge storage (`save.player.money`, Johto/Kanto badge sets).
- Gen 2 Pokédex rows (`species`, `seen`, `caught`) with modern preview/art and ownership markers.
- Gold/Silver/Crystal-safe source fallback only for visual animation/minigame content; Pokédex ENTRY/AREA/OPTION/SEARCH/UNOWN and Start Menu confirmation UI are now modeled by Modern UI.
- Existing Modern UI themes, responsive layout, typography, pointer handling and integrated 0.10.0 fixes retained.

## Compatibility

- Pokémon Recomp / Gen 2 runtime: `0.0.0-dev` or `>=0.2.48 <2.0.0`
- Mod API: 2
- ROM generation: Gen 2
- Intended games: Gold, Silver, Crystal

This is a separate mod from `gen1_modern_ui`. It does not replace or overwrite the Gen 1 package.

Party submenu extensions using the released `ui.party.submenu` hook are supported dynamically; verified examples include `dv_ev_editor_gen2` and `instant_hatch_gen2`.

## Install

Install the ZIP as a normal Pokémon Recomp mod. The ZIP root contains `manifest.json`, `main.lua`, and the bundled frame assets.

## v1.0.6 coverage / safe fallback

Interactive Gen 2 menus and text surfaces are routed through Modern UI presenters. Screens whose primary content is an animation, minigame board, map, puzzle or ceremonial artwork retain that source content rather than replacing it with a generic list; they are explicitly bridged so Modern UI can still own surrounding prompts/hints without making the presentation stack incomplete.

The battle presenter is enabled by default. Safety fallback stays on, so any frame that cannot be modeled completely preserves the source-owned animation/control surface instead of clearing it.


## Pokédex Plus integration (v1.0.9)

With Pokédex Plus - Gen 2 v1.0.3, the Pokédex list uses larger Pokémon icons and a selected-species preview containing the front sprite, species icon, Pokédex number, types, seen/caught status, six Gen 2 base stats and BST. The Pokégear remains fully source-rendered/vanilla for stability.


## Advanced Box System Gen 2 integration (v1.0.11)

Modern UI recognizes `AdvancedBoxBrowserGen2` as a Pokémon box browser rather
than a generic ListMenu. With Advanced Box System Gen 2 v1.0.1+, rows expose
stable live-Pokémon metadata and Modern UI renders Pokémon icons plus the same
selected-Pokémon sprite/details preview used by the native Gen 2 BoxMenu.
A compatibility fallback also reads the `mon` field from Advanced Box v1.0.0.
Storage actions remain owned entirely by Advanced Box System.
