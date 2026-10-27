import { defineField, defineType } from 'sanity';

const techniques = ['Serigrafia', 'DTF', 'Stampa Latex / Plotter', 'Applicazioni', 'Altro'];

export const project = defineType({
  name: 'project',
  title: 'Lavoro',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Titolo', type: 'string', validation: (rule) => rule.required().max(80) }),
    defineField({
      name: 'slug',
      title: 'Indirizzo',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'technique',
      title: 'Lavorazione',
      type: 'string',
      options: { list: techniques.map((value) => ({ title: value, value })) },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'summary', title: 'Descrizione breve', type: 'text', rows: 3, validation: (rule) => rule.max(180) }),
    defineField({
      name: 'cover',
      title: 'Immagine di copertina',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Testo alternativo', type: 'string' })],
    }),
    defineField({
      name: 'video',
      title: 'Video del lavoro',
      type: 'file',
      description: 'Carica un video MP4, WebM o QuickTime. Per una riproduzione ottimale, preferisci file compressi.',
      options: { accept: 'video/mp4,video/webm,video/quicktime' },
    }),
    defineField({ name: 'featured', title: 'In evidenza', type: 'boolean', initialValue: false }),
    defineField({ name: 'order', title: 'Ordine', type: 'number', initialValue: 100, validation: (rule) => rule.integer().min(0) }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'technique', media: 'cover' },
  },
  orderings: [
    { title: 'Prima i lavori in evidenza', name: 'featured', by: [{ field: 'featured', direction: 'desc' }, { field: 'order', direction: 'asc' }] },
    { title: 'Più recenti', name: 'createdAt', by: [{ field: '_createdAt', direction: 'desc' }] },
  ],
});

export const schemaTypes = [project];
