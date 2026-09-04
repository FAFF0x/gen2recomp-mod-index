# NEW ITEM ICONS - Gen 2

Gen 2-only port of NEW ITEM ICONS for Gold, Silver and Crystal.

## What it changes

- Adds full-colour item artwork to the live Gen 2 item definitions.
- Native **PACK** shows a compact icon next to item rows.
- The same applies to the **Battle PACK** because it uses Gen2PackMenu.
- **POKéMART BUY** lists show item thumbnails.
- **Item PC** withdraw/toss lists show item thumbnails.
- **Gen2 Modern UI** receives the same artwork through a dedicated additive adapter.
- Item logic, inventory counts, pockets, USE/GIVE/TOSS/SEL, shop logic and save data are untouched.

## TM / HM artwork

Gen 2 machines use the taught move stored in `item.teaches` (and custom machine
records may expose `item.machine.move`). The mod reads that move's live type and
selects the matching icon from `assets/items/tm-hm/`.

This covers TM01-TM50 and HM01-HM07, including **WATERFALL** and **WHIRLPOOL**.
Compatible custom TM/HM items also inherit type artwork automatically.

## Gen 2-only package / importer safety

This is a separate package:

- mod ID: `new_item_icons_gen2`
- name: `NEW ITEM ICONS - Gen 2`
- game gate: `games: ["gen2"]`
- no conflict declaration against the Gen 1 `new_item_icons`
- no Gen 1 Bag/ListMenu/PartyMenu patching

The original and Gen 2 package can therefore coexist in a mod index without an
ID/name collision. If multiple visual item packs are enabled at the same time,
normal mod load order determines which runtime presentation metadata is last.

## Asset coverage

The supplied source archive contains 70 individual item images and 18 TM/HM
type images. Items that exist in Gen 2 and match those assets receive custom art.
Gen 2-exclusive items for which the supplied archive has no artwork are left
untouched rather than being given a misleading unrelated icon.

`PARK_BALL` uses the supplied Safari Ball artwork as the closest matching
contest-ball asset.

No save migration is required.
