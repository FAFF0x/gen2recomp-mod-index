# Repel Reuse Prompt - Gen 2

Versione **esclusiva Gen 2** della mod Repel Reuse Prompt.

## Funzionamento

Quando l'effetto di un Repel termina, viene mostrata automaticamente una scelta:

- **YES** — consuma e attiva immediatamente un altro Repel.
- **NO** — continua senza usare un altro Repel.
- Se nella Bag non rimane alcun Repel, non viene mostrata nessuna scelta e resta il normale messaggio Gen 2 di fine effetto.

## Priorità di selezione

La mod prova prima a riutilizzare lo stesso tipo di Repel che aveva attivato l'effetto appena terminato.

Se quel tipo è esaurito, seleziona automaticamente:

1. **MAX REPEL**
2. **SUPER REPEL**
3. **REPEL**

Durate native Gen 2:

- REPEL: 100 passi
- SUPER REPEL: 200 passi
- MAX REPEL: 250 passi

## Compatibilità Gen 2

Questa build non riutilizza il percorso Gen 1 `ItemEffects.use`.

In Gen 2 si aggancia direttamente al World Gen 2:

- `repelWoreOff()` per la scadenza;
- `useRepel()` per consumo e nuova durata.

Il manifest contiene `games: ["gen2"]`, quindi la mod non viene caricata in Gen 1.

## Compatibilità con altre copie/mod simili

Questa build usa un'identità separata dall'originale:

- ID: `pokemonmod_gen2_repel_reuse_prompt`
- Nome: `Repel Reuse Prompt - Gen 2`

Inoltre utilizza un dispatcher globale specifico Gen 2 e marca ogni World già gestito, così due copie/varianti di questa stessa conversione non installano due wrapper e non mostrano due prompt consecutivi.

## Installazione

Importa direttamente lo ZIP nel Mod Manager e abilita **Repel Reuse Prompt - Gen 2**.
