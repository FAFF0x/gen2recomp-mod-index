# Reusable Machines - Gen 2 v2.0.0

Port Gen 2 di **Reusable Machines** per Pokémon Recomp Gold / Silver / Crystal.

## Funzioni

- **TM01-TM50 riutilizzabili**: dopo aver insegnato con successo una TM, la copia rimane nella tasca TM/HM.
- **HM dimenticabili durante il normale apprendimento mosse**: CUT, FLY, SURF, STRENGTH, FLASH, WATERFALL e WHIRLPOOL possono essere sostituite quando un Pokémon conosce già quattro mosse.
- Le **HM restano riutilizzabili** come nel comportamento nativo Gen 2.
- La tasca **TM/HM Gen 2 mostra già nativamente il nome della mossa** accanto alla macchina; questa mod non sostituisce il PackMenu e quindi resta compatibile con presenter/UI moderni.
- Vendita e TOSS rimangono nativi: rendere una TM riutilizzabile quando viene insegnata **non** la rende impossibile da vendere o eliminare.

## Compatibilità

La mod usa il flusso Gen 2 reale (`Game2`, `Gen2MoveDeleter`, tasca `TM_HM`) e non riutilizza le strutture Gen 1 `machine.kind` / `machine.move`.

Compatibilità opzionale prevista con:

- `gen2_modern_ui`
- `moves_manager`
- `hm_anywhere`

La patch HM interviene solo sul `Gen2MoveDeleter` aperto con `layout = "forget"`, cioè la selezione della mossa da sostituire durante l'apprendimento. Il resto del Move Deleter e dei menu rimane engine-owned.

## Installazione

1. Importa `reusable_machines_gen2_v2.0.0.zip` dalla scheda MODS.
2. Abilita **Reusable Machines - Gen 2**.
3. Riavvia completamente il gioco.

La mod ha ID separato `reusable_machines_gen2`, quindi può convivere installata con la versione Gen 1 `reusable_machines`.
