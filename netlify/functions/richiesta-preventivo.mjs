import nodemailer from 'nodemailer';

const recipient = 'todarocompany@libero.it';
const techniques = new Set([
  '',
  'Serigrafia',
  'DTF',
  'Stampa digitale / plotter',
  'Applicazioni e Brik',
  'Da valutare insieme',
]);

function errorResponse(statusCode, message) {
  return {
    statusCode,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
    body: `<!doctype html><html lang="it"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Invio non riuscito | Todaro Company</title><body><main><h1>Non siamo riusciti a inviare la richiesta.</h1><p>${message}</p><p>Puoi contattarci direttamente a <a href="mailto:${recipient}">${recipient}</a>.</p><p><a href="/contatti/">Torna ai contatti</a></p></main></body></html>`,
  };
}

export function parseQuoteRequest(event) {
  if (!event.body) return { error: 'La richiesta non contiene dati.' };

  const body = event.isBase64Encoded
    ? Buffer.from(event.body, 'base64').toString('utf8')
    : event.body;

  if (Buffer.byteLength(body, 'utf8') > 12_000) {
    return { error: 'La richiesta è troppo lunga.' };
  }

  const params = new URLSearchParams(body);
  if (params.get('bot-field')) return { spam: true };

  const fields = {
    name: params.get('name')?.trim() ?? '',
    email: params.get('email')?.trim() ?? '',
    phone: params.get('phone')?.trim() ?? '',
    support: params.get('support')?.trim() ?? '',
    quantity: params.get('quantity')?.trim() ?? '',
    technique: params.get('technique')?.trim() ?? '',
    message: params.get('message')?.trim() ?? '',
  };

  if (!fields.name || !fields.email || !fields.message) {
    return { error: 'Compila tutti i campi obbligatori.' };
  }
  if (fields.name.length > 120 || fields.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    return { error: 'Controlla il nome e l’indirizzo email inseriti.' };
  }
  if (fields.phone.length > 40 || fields.support.length > 200 || fields.quantity.length > 80 || fields.message.length > 4000) {
    return { error: 'Uno o più campi superano la lunghezza consentita.' };
  }
  if (!techniques.has(fields.technique)) {
    return { error: 'Seleziona una lavorazione valida.' };
  }

  return { fields };
}

function getSmtpConfig() {
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASSWORD } = process.env;
  const port = Number(SMTP_PORT);

  if (
    !SMTP_HOST ||
    !SMTP_USER ||
    !SMTP_PASSWORD ||
    !Number.isInteger(port) ||
    port < 1 ||
    port > 65535 ||
    (SMTP_SECURE !== 'true' && SMTP_SECURE !== 'false')
  ) {
    return null;
  }

  return { host: SMTP_HOST, port, secure: SMTP_SECURE === 'true', auth: { user: SMTP_USER, pass: SMTP_PASSWORD } };
}

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { ...errorResponse(405, 'Metodo non consentito.'), headers: { 'Content-Type': 'text/html; charset=utf-8', Allow: 'POST' } };
  }

  const contentType = event.headers?.['content-type'] ?? event.headers?.['Content-Type'] ?? '';
  if (!contentType.toLowerCase().startsWith('application/x-www-form-urlencoded')) {
    return errorResponse(415, 'Formato della richiesta non supportato.');
  }

  const parsed = parseQuoteRequest(event);
  if (parsed.error) return errorResponse(400, parsed.error);
  if (parsed.spam) return { statusCode: 303, headers: { Location: '/richiesta-inviata/' }, body: '' };

  const smtp = getSmtpConfig();
  if (!smtp) {
    return errorResponse(503, 'Il modulo non è ancora configurato. Scrivici direttamente via email.');
  }

  const { fields } = parsed;
  const transporter = nodemailer.createTransport(smtp);

  try {
    await transporter.sendMail({
      from: smtp.auth.user,
      to: recipient,
      replyTo: { name: fields.name, address: fields.email },
      subject: 'Nuova richiesta di preventivo dal sito',
      text: [
        `Nome: ${fields.name}`,
        `Email: ${fields.email}`,
        `Telefono: ${fields.phone || 'Non indicato'}`,
        `Supporto: ${fields.support || 'Non indicato'}`,
        `Quantità: ${fields.quantity || 'Non indicata'}`,
        `Lavorazione: ${fields.technique || 'Non indicata'}`,
        '',
        'Descrizione del progetto:',
        fields.message,
      ].join('\n'),
    });
  } catch (error) {
    console.error('Quote request email delivery failed', error instanceof Error ? error.name : 'Unknown error');
    return errorResponse(502, 'Si è verificato un problema durante l’invio. Riprova o contattaci direttamente via email.');
  }

  return { statusCode: 303, headers: { Location: '/richiesta-inviata/' }, body: '' };
};
