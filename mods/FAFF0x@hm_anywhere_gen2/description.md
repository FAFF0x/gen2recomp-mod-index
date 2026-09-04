# HM Anywhere - Gen 2

Port nativo Gen 2 di **HM Anywhere** per Pokémon Gold / Silver / Crystal in Gen1Recomp.

## Funzione principale

Per usare una HM fuori dalla lotta **non devi più insegnarla a un Pokémon**.
È sufficiente possedere la relativa HM nella Bag.

La mod supporta tutte le sette HM da campo della Gen 2:

- **CUT**
- **FLY**
- **SURF**
- **STRENGTH**
- **FLASH**
- **WATERFALL**
- **WHIRLPOOL**

## Badge e restrizioni NON vengono rimossi

HM Anywhere sostituisce soltanto il requisito "un Pokémon deve conoscere la mossa".
Tutto il resto continua a essere deciso dal motore Gen 2 originale.

Badge richiesti:

- CUT → **HIVE BADGE**
- FLASH → **ZEPHYR BADGE**
- SURF → **FOG BADGE**
- FLY → **STORM BADGE**
- STRENGTH → **PLAIN BADGE**
- WHIRLPOOL → **GLACIER BADGE**
- WATERFALL → **RISING BADGE**

Restano inoltre valide le normali restrizioni di terreno e mappa: FLY solo dove consentito,
SURF solo sull'acqua valida, FLASH nelle aree appropriate, WATERFALL/WHIRLPOOL sui relativi
tiles, ecc.

## Start → HM

Se possiedi almeno una HM, nel menu START compare **HM**.
Il sottomenu mostra dinamicamente solo le HM realmente possedute e permette di usarle
senza scegliere un Pokémon.

La schermata espone `screenId = Gen2HmAnywhereMenu` e campi semantici `items/index`, quindi
**Gen2 Modern UI** può modernizzarla senza una patch dedicata.

## CTX ON / CTX OFF

Nel menu HM è presente il toggle:

- **CTX ON**: le normali azioni contestuali Gen 2 possono usare l'HM posseduta anche se
  nessun Pokémon conosce la mossa. Questo copre CUT, SURF, STRENGTH, WATERFALL e WHIRLPOOL.
- **CTX OFF**: le interazioni contestuali tornano vanilla; un Pokémon che conosce davvero
  la mossa continua naturalmente a funzionare. Start → HM continua invece a usare le HM
  direttamente dalla Bag.

La preferenza è salvata tramite il sistema di save della mod.

## Compatibilità

La mod non sostituisce PartyMenu, StartMenu o le routine dei field move. Usa gli hook
`fieldmove.eligibility`, `ui.party.submenu` e `ui.start_menu.items`, poi delega ogni azione
manuale a `World:useFieldMove`. Questo mantiene i testi, le animazioni, i Badge e le regole
native di Gold/Silver/Crystal.

Le HM restano insegnabili e utilizzabili normalmente in battaglia.
