# Voxel Performance Fix Gen 2 v1.5.0

External optimization/compatibility patch for **BATTLE_ART_VOXEL_GEN2 2.0.9**.
The original mod is not modified.

## What v1.5 changes

- Keeps the Gen 2 empty-StateStack visibility correction.
- Keeps BODY-first loading so the current map gets usable 3D geometry early.
- Keeps v1.4's foreground slice caps:
  - BODY bootstrap: up to **6.5 ms** per visible frame.
  - FULL completion: up to **4.75 ms** per visible frame.
- Makes BATTLE ART's cooperative budget substantially more precise while the overworld is visible:
  - upstream `BuildBudget.tick()` samples the deadline every 32 calls;
  - v1.5 checks every **4 calls** during visible foreground meshing.
  - This targets the 30-55 ms overshoots seen even with a 4.75 ms nominal slice.
- Staggers newly-ready neighbour maps so at most one fresh neighbour becomes drawable every **6 frames**.
  - The current map and maps that were already visible are never hidden.
  - This spreads first-time atlas/aux activation instead of allowing several neighbours to hit the same frame.
- Covered/menu/transition loading keeps BATTLE ART's original 30 ms behavior.
- Idle neighbour meshing keeps the original 5 ms budget.

## Install

Install together with BATTLE_ART_VOXEL_GEN2 2.0.9. Replace any older
`voxel_performance_fix_gen2` version; do not keep multiple versions installed.
