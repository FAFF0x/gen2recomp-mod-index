# Universal Free TM/HM Shop Gen 2 — v1.1.0

A standalone Gold / Silver / Crystal port of **Universal Free TM Shop** for Pokémon Recomp Gen 2.

## Features

- Every Gen 2 mart opens a chooser with **NORMAL SHOP**, **TM/HM SHOP**, and **LEAVE**.
- The dedicated machine catalogue contains **TM01–TM50 and HM01–HM07**, ordered exactly in machine-number order.
- Every TM and HM costs **¥0**.
- TM purchases support quantities up to 99.
- HMs are reusable, so the shop allows only one copy of each HM; if you already own it, the shop tells you.
- **Press SELECT on the highlighted TM/HM to open full move information.**
- The SELECT info screen shows:
  - move name
  - type
  - Gen 2 physical/special category
  - power
  - accuracy
  - PP
  - move effect
  - effect chance
  - ROM move description
- While the info screen is open, Up/Down or Left/Right can change the highlighted machine; SELECT, A, or B returns to the catalogue.
- The normal shop keeps the original Gen 2 dialogue and BUY/SELL behavior, but TM/HM machines are kept in the dedicated free catalogue to avoid duplicate entries.
- Native Gen 2 TM/HM pocket rules remain in use; the mod does not enlarge the normal ITEM pocket.
- Existing TM/HM item prices are set to zero so the free-machine catalogue cannot become a money exploit.
- Separate mod id: `all_tm_shop_gen2`.

## Controls

In **TM/HM SHOP**: Up/Down selects a machine, Left/Right jumps one page, A buys, SELECT opens move info, and B returns.

In the **move info** screen: Up/Down and Left/Right browse other machines without closing the panel; SELECT, A, or B returns.

## Gen 2 implementation

Gen 2 identifies machines through `pocket = "TM_HM"`, `tmNumber`, `tmLabel`, and `teaches`. TM01–TM50 map to machine numbers 1–50; HM01–HM07 map to 51–57. Move details come directly from the Gen 2 move registry (`type`, `power`, `accuracy`, `pp`, `effect`, `effectChance`, `description`).

## Installation

Place the `all_tm_shop_gen2` folder in the Pokémon Recomp mods directory, enable it for a Gen 2 game, restart, and speak to any mart clerk.
