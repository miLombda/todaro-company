# Todaro Company

Sito vetrina per Todaro Company, realizzato con Astro. Le pagine dei servizi e i contatti sono statici; la galleria dei lavori e l'area editoriale sono predisposte per Sanity.

## Requisiti

- Node.js 22 o superiore
- npm

## Avvio locale

```powershell
npm install
npm run dev
```

Il sito è disponibile su `http://localhost:4321`.

## Collegare Sanity

1. Crea un progetto e un dataset pubblico su [sanity.io/manage](https://www.sanity.io/manage).
2. Copia `.env.example` in `.env` e inserisci l'ID del progetto nei campi `PUBLIC_SANITY_PROJECT_ID` e `SANITY_STUDIO_PROJECT_ID`.
3. Lascia `PUBLIC_SANITY_DATASET` e `SANITY_STUDIO_DATASET` su `production`, a meno che il dataset Sanity abbia un nome diverso.
4. Avvia il CMS con `npm run studio` e accedi con il tuo account Sanity.
5. Pubblica i lavori nello Studio: ogni scheda supporta titolo, tecnica, descrizione, copertina, video, ordinamento e stato in evidenza.

La galleria del sito mostra un messaggio esplicito finché il progetto Sanity non è collegato. Errori di accesso a un progetto configurato interrompono la build invece di nascondere i problemi.

## Build e anteprima

```powershell
npm run build
npm run preview
```

La build pubblica il sito statico in `dist/`. Le variabili `PUBLIC_SANITY_*` devono essere disponibili durante la build per includere i lavori pubblicati.
