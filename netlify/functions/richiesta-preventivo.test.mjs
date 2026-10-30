import assert from 'node:assert/strict';
import test from 'node:test';
import { handler, parseQuoteRequest } from './richiesta-preventivo.mjs';

const validFields = {
  name: 'Mario Rossi',
  email: 'mario@example.com',
  message: 'Richiesta di preventivo',
};

function event(fields) {
  return {
    body: new URLSearchParams(fields).toString(),
    isBase64Encoded: false,
  };
}

test('accepts a valid quote request', () => {
  assert.deepEqual(parseQuoteRequest(event(validFields)), { fields: { ...validFields, phone: '', support: '', quantity: '', technique: '' } });
});

test('rejects a missing required field and malformed email', () => {
  assert.match(parseQuoteRequest(event({ ...validFields, name: '' })).error, /obbligatori/);
  assert.match(parseQuoteRequest(event({ ...validFields, email: 'not-an-email' })).error, /email/);
});

test('rejects unsupported techniques and oversized requests', () => {
  assert.match(parseQuoteRequest(event({ ...validFields, technique: 'Unknown' })).error, /lavorazione/);
  assert.match(parseQuoteRequest({ body: 'x'.repeat(12_001) }).error, /troppo lunga/);
});

test('treats a filled honeypot as spam without returning the submitted fields', () => {
  assert.deepEqual(parseQuoteRequest(event({ ...validFields, 'bot-field': 'bot' })), { spam: true });
});

test('rejects unsupported methods and does not report success when SMTP is unconfigured', async () => {
  const methodResponse = await handler({ httpMethod: 'GET' });
  assert.equal(methodResponse.statusCode, 405);

  const smtpKeys = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_SECURE', 'SMTP_USER', 'SMTP_PASSWORD'];
  const previousValues = new Map(smtpKeys.map((key) => [key, process.env[key]]));
  for (const key of smtpKeys) delete process.env[key];

  try {
    const response = await handler({
      ...event(validFields),
      httpMethod: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
    });
    assert.equal(response.statusCode, 503);
  } finally {
    for (const [key, value] of previousValues) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
});
