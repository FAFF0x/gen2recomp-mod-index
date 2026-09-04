# Summon - Gen 2

Versione **solo Gen 2** di Summon per Pokémon Recomp.

Aggiunge **SUMMON** al menu Start di Gold, Silver e Crystal. Inserendo un numero Pokédex, viene avviato un normale incontro selvatico con il Pokémon corrispondente. Il Pokémon non viene regalato direttamente: deve essere catturato normalmente.

## Uso

1. Apri il menu Start.
2. Seleziona **SUMMON**.
3. Inserisci il numero Pokédex.
4. Controlla il nome mostrato.
5. Seleziona **OK** o premi START/Invio.
6. Inizia il normale incontro selvatico Gen 2.

Il livello del Pokémon evocato corrisponde al livello del primo Pokémon sano della squadra.

## Compatibilità Gen 2

Questa conversione non usa `BattleState.newWild`, che non ha un equivalente valido nella Gen 2. L'incontro viene avviato attraverso il percorso nativo Gen 2 `World:startScriptedBattle`, che costruisce il Pokémon con il sistema Gen 2 e poi passa a `World:startBattle` per transizione, musica, cattura, EXP, ritorno dall'incontro e gestione della sconfitta.

La schermata legge `game.data.pokemon`, cioè il dataset finale già unito dal loader. In questo modo possono essere selezionate anche specie aggiunte da altre mod quando possiedono un numero Pokédex e un indice Gen 2 validi, indipendentemente dal loro ordine di caricamento.

## Nessun conflitto con la mod Gen 1

- ID manifest: `pokemonmod_gen2_summon`
- Screen ID: `PokemonModGen2SummonScreen`
- Target: `games: ["gen2"]`
- Nessuna dipendenza dalla mod originale `summon`
- Nessun `conflict` dichiarato con la versione Gen 1
- Se un'altra mod ha già inserito una voce **SUMMON** nel menu Start, questa conversione non ne aggiunge una seconda.

## Controlli

- Frecce / D-pad: muovi il cursore
- A: seleziona
- B / ESC: annulla
- SELECT: cancella tutto il numero
- START / Invio: conferma
- DEL / Backspace: cancella una cifra
- Tastiera 0-9 e tastierino numerico: inserimento diretto
