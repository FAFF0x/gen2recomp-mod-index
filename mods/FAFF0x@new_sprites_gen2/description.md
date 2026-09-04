# NEW SPRITES - Gen 2 v2.0.0

A Gen 2-only port of NEW SPRITES for Gold, Silver and Crystal in gen1recomp.

## Features

- Modern animated full-color **front sprites for all 251 Gen 2 species**.
- Modern animated **back sprites for the 151 Kanto species** included by the source pack.
- Johto species keep their native Gen 2 back sprite because the source pack does not contain modern back artwork for those 100 species.
- Menu/preview UIs use the original high-resolution animation frames.
- Native Gen 2 battles use separately prepared battle-safe frames:
  - front: 56x56 canvas;
  - back: 48x48 canvas.
- True-color rendering avoids applying the Game Boy Color palette over the supplied artwork.
- Crystal's built-in front-pic animation is not stacked on top of the replacement timeline.

## Import / coexistence

This package is intentionally separate from the original mod:

- mod id: `new_sprites_gen2`
- game gate: `gen2` only
- no conflict declaration with `new_sprites` or other sprite packs
- no Gen 1 dependencies

If more than one sprite pack is enabled, normal mod hook priority determines which artwork is shown; this package does not modify saves or Pokemon data.
