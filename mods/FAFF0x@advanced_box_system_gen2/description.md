# Advanced Box System Gen 2 v1.0.0

A native Gold / Silver / Crystal port of **Advanced Box System v1.1.0** for Pokémon Recomp.

## What it changes

Bill's PC keeps the engine's native Gen 2 PC screen, but its storage operations become:

1. WITHDRAW POKéMON
2. DEPOSIT POKéMON
3. RELEASE POKéMON
4. SWAP POKéMON
5. CHANGE BOX

The PC's own **SEE YA!** exit remains native. House-PC extras such as MAIL BOX / DECORATION are preserved when the engine supplies them.

## Gen 2 storage features

- **14 boxes**, 20 Pokémon each.
- **LEFT / RIGHT instant box switching** while browsing WITHDRAW, RELEASE, SWAP, and while choosing the destination box for DEPOSIT.
- **Direct party/box swap**, including when the party is full.
- **Quick SWAP** from WITHDRAW and DEPOSIT.
- **Browse empty/full boxes** instead of being thrown out of the workflow.
- **Release while switching boxes**.
- **Native Gen 2 stats** with separate Special Attack / Special Defense calculations.
- **Native Gen 2 Summary** from STATS.

## Gen 2 safety rules retained

This port does not reuse the Gen 1 storage mutations. It uses `src.core.gen2.Boxes` and the Gen 2 mon model, so it respects:

- party size 6;
- box capacity 20;
- the last usable Pokémon deposit rule;
- MAIL not being allowed to enter a box;
- PP/status restoration when a Pokémon is deposited;
- HP/status restoration when a Pokémon is withdrawn;
- Eggs not being releasable from the Advanced RELEASE workflow.

Direct SWAP also refuses to box a Pokémon holding MAIL and refuses a swap that would replace the party's only usable Pokémon with an Egg.

## Controls

### WITHDRAW
UP/DOWN selects a boxed Pokémon. LEFT/RIGHT changes box. A opens WITHDRAW / SWAP / STATS / CANCEL. B goes back.

### DEPOSIT
UP/DOWN selects a party Pokémon. LEFT/RIGHT changes the destination box immediately. A opens DEPOSIT / SWAP / STATS / CANCEL. B goes back.

### SWAP
Choose a boxed Pokémon, then choose the party Pokémon to exchange with it. Party size stays unchanged.

### RELEASE
UP/DOWN selects. LEFT/RIGHT changes box. A asks for confirmation. B goes back.

## Compatibility

Target: **Pokémon Recomp Gen 2** (`games: ["gen2"]`), meaning Gold, Silver, and Crystal on current Gen 2-enabled builds.

`gen2_modern_ui` is an optional dependency only. The storage logic works without it.

The Gen 1 mod has a different id, so both packages can stay installed together. The engine generation gate loads this package only for Gen 2 and the original package only for Gen 1.


## Modern UI integration (v1.0.1)

`AdvancedBoxBrowserGen2` exposes presentation-only Pokémon metadata and stable
read-only accessors. With Gen2 Modern UI v1.0.11 or newer, the advanced browser
is rendered with Pokémon icons plus a selected-Pokémon sprite/details preview.
Advanced Box remains fully functional without Modern UI; all storage actions
remain owned by this mod.
