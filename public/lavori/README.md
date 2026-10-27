# Foto e video dei lavori

Inserisci qui le foto e i video da mostrare nella galleria. Sono file del sito: non serve caricarli su CMS, CDN o altri servizi.

Poi aggiungi ogni progetto all'elenco in `src/data/projects.ts`, usando un percorso che inizia con `/lavori/`.

Per una foto:

```ts
{
  type: 'image',
  title: 'T-shirt serigrafata',
  technique: 'Serigrafia',
  src: '/lavori/tshirt-serigrafata.webp',
  alt: 'T-shirt nera con stampa serigrafica colorata',
  summary: 'Stampa a più colori su cotone.'
}
```

Per un video:

```ts
{
  type: 'video',
  title: 'Dettaglio della lavorazione',
  technique: 'DTF',
  src: '/lavori/dettaglio-dtf.mp4',
  poster: '/lavori/dettaglio-dtf.webp',
  summary: 'Applicazione della grafica sul capo.'
}
```

Preferisci immagini WebP o AVIF ridimensionate per il web e video MP4 compressi. Per non appesantire il repository, tieni i video sotto i 50 MB; GitHub rifiuta i singoli file oltre 100 MB. Dopo aver copiato i file e aggiornato l'elenco, avvia `npm run dev` per vederli in anteprima.
