# DV EV Editor Gen 2 v2.0.1

A native Generation II port of DV EV Editor for Gold, Silver and Crystal.

## What it adds

Open the normal out-of-battle **POKéMON** party menu, select a Pokémon and choose **DV/EV**. The editor changes the Pokémon's actual saved Gen 2 values and recalculates its stats immediately.

### DVs

Generation II has four editable DVs, each from **0 to 15**:

- Attack
- Defense
- Speed
- Special

**HP DV is derived automatically** from the low bits of those four values and cannot be edited directly. Gen 2 also uses the single Special DV for both Special Attack and Special Defense.

Changing DVs is routed through Gen 2's own Pokémon identity/stat helpers, so DV-dependent data such as gender and Unown form is refreshed with the edited record.

### Stat EXP

Gen 2 still stores exactly five 16-bit Stat EXP values, each from **0 to 65,535**:

- HP
- Attack
- Defense
- Speed
- Special

There are **not separate Sp. Atk and Sp. Def Stat EXP values** in the Gen 2 party structure. Both final special stats use the same Special Stat EXP word. The editor displays both resulting Sp. Atk and Sp. Def values.

The effective EV term used by the Gen 2 stat formula is also shown as **0–63**.

## Controls

- **Up / Down** — select a stat
- **Left / Right** — switch DV / Stat EXP page
- **SELECT** — switch page
- **A** — edit / confirm
- While editing, **Left / Right** selects a digit and **Up / Down** changes it
- **B** — cancel edit / go back
- **START** — instantly maximize every DV and Stat EXP value

## START — MAX ALL

START sets:

- Attack / Defense / Speed / Special DV = **15**
- Derived HP DV = **15**
- all five Stat EXP values = **65,535**

Stats recalculate immediately. Missing HP is preserved, and a fainted Pokémon remains fainted.

## Safety / battle behavior

The **DV/EV** row is added only to the normal field party submenu. It is deliberately absent from the battle party submenu so a currently initialized battler cannot be edited underneath an active battle.

## Gen2 Modern UI

`gen2_modern_ui` is optional. This mod publishes a public Modern UI adapter for `DvEvEditorGen2`, so compatible Gen2 Modern UI builds can render the editor with the active modern theme while this mod remains the sole owner of DV/Stat EXP mutation.

Without Modern UI, a native Gen 2 Chrome editor is used.

## Special Attack / Special Defense

Gen 2 stores one shared Special DV and one shared Special Stat EXP value, but v2.0.1 displays **SP. ATK STAT** and **SP. DEF STAT** on separate read-only rows so the two final stats are always visually distinct.
