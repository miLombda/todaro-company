
# Todaro Company

Sito vetrina per Todaro Company, realizzato con Astro. Le pagine, i testi, le fotografie e i video sono gestiti direttamente nel repository; non sono richiesti CMS, account o servizi esterni.

## Requisiti

- Node.js 22 o superiore
- npm

## Avvio locale

```powershell
npm install
npm run dev
```

Il sito è disponibile su `http://localhost:4321`.

## Aggiungere lavori alla galleria

1. Copia le fotografie e i video nella cartella `public/lavori/`.
2. Apri `src/data/projects.ts` e aggiungi un elemento all'array `projects`, seguendo gli esempi in `public/lavori/README.md`.
3. Usa il percorso del file a partire da `/lavori/`, per esempio `/lavori/tshirt-serigrafata.webp`.
4. Avvia il sito con `npm run dev` per controllare il risultato; `npm run build` genera il sito aggiornato in `dist/`.

Esempi di formati e limiti consigliati:

- Foto: WebP o AVIF, compresse e dimensionate per la galleria.
- Video: MP4 compresso, preferibilmente sotto i 50 MB. GitHub non accetta singoli file oltre i 100 MB.

Ogni lavoro può essere una foto o un video, con titolo, tecnica, descrizione e testo alternativo (per le immagini). Ordina i progetti direttamente nell'array.

## Modulo preventivi: inoltro email

Il modulo è predisposto per una Netlify Function che inoltra le richieste via SMTP alla casella aziendale. Non usa Netlify Forms e non archivia le submissions nel relativo pannello. Netlify e il fornitore SMTP trattano comunque i dati durante l'invio.

Prima di attivarlo:

1. Pubblica il sito su Netlify.
2. Nelle variabili d'ambiente del sito, configura `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER` e `SMTP_PASSWORD` secondo i parametri ufficiali del provider della casella. Assicurati che le variabili siano disponibili alle **Functions**; non inserirle nel codice o in Git.
3. Esegui un nuovo deploy.
4. Invia una richiesta di prova dal sito pubblicato e verifica che arrivi a `todarocompany@libero.it`. Il form non funziona tramite il solo server Astro locale.
5. Prima di raccogliere richieste reali, verifica gli accordi e i trasferimenti dei fornitori Netlify/SMTP e definisci tempi e criteri per cancellare le richieste dalla casella e le eventuali copie. Aggiorna l'informativa Privacy in base alla configurazione effettiva.

## Build e anteprima

```powershell
npm run build
npm run preview
```
