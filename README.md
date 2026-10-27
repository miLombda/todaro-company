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

## Modulo preventivi su Netlify

Il modulo nella pagina Contatti è predisposto per Netlify Forms. Per ricevere le richieste:

1. Pubblica il sito su Netlify.
2. Nel pannello del sito, apri **Forms** e attiva **Form detection**.
3. Esegui un nuovo deploy del sito dopo aver attivato il rilevamento.
4. In **Forms → Notifications**, aggiungi una notifica email per il modulo `richiesta-preventivo` e indica `todarocompany@libero.it`.
5. Invia una richiesta di prova dal sito pubblicato e verifica sia la notifica email sia la submission nel pannello Netlify.

Il campo `email` imposta l'indirizzo di risposta (Reply-To) nella notifica. Il campo nascosto antispam è già incluso. L'invio non può essere verificato dall'anteprima locale: Netlify Forms elabora il form soltanto dopo il deploy.

Prima di attivare il modulo in produzione, conferma nell'account Netlify i termini di trattamento dei dati, la conservazione delle richieste e le impostazioni del servizio, quindi verifica che l'informativa Privacy corrisponda alla configurazione effettiva.

## Build e anteprima

```powershell
npm run build
npm run preview
```
