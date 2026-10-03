import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { createApp } from './app.js';
import { MAX_FILE_BYTES, MAX_TOTAL_BYTES } from './inquiries.js';

const sent = [];
let server;
let endpoint;

before(async () => {
  server = createApp({
    sendMail: async (message) => { sent.push(message); },
    from: 'website@example.com',
    to: 'dcsr@example.com',
  }).listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  endpoint = `http://127.0.0.1:${server.address().port}/api/inquiries`;
});

after(() => server?.close());

function requestForm() {
  const form = new FormData();
  for (const [key, value] of Object.entries({
    name: 'Test Customer', phone: '09123456789', email: 'customer@example.com',
    service: 'Repair', location: 'Capas', unit: 'Window type',
    concern: 'The unit is no longer cooling.', date: '2026-10-05', time: 'Morning',
  })) form.append(key, value);
  return form;
}

async function submit(form) {
  const response = await fetch(endpoint, { method: 'POST', body: form });
  return { status: response.status, body: await response.json() };
}

test('reports whether online submissions are available', async () => {
  const response = await fetch(endpoint);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { available: true });
});

test('sends the inquiry and attachments in one email', async () => {
  const form = requestForm();
  form.append('attachments', new Blob(['image data'], { type: 'image/png' }), 'unit.png');
  form.append('attachments', new Blob(['document data'], { type: 'application/pdf' }), 'report.pdf');
  const result = await submit(form);
  assert.equal(result.status, 200);
  assert.equal(sent.length, 1);
  assert.equal(sent[0].to, 'dcsr@example.com');
  assert.equal(sent[0].replyTo, 'customer@example.com');
  assert.match(sent[0].text, /The unit is no longer cooling/);
  assert.deepEqual(sent[0].attachments.map(({ filename }) => filename), ['unit.png', 'report.pdf']);
  assert.deepEqual(sent[0].attachments.map(({ content }) => content.toString()), ['image data', 'document data']);
});

test('rejects more than four attachments before sending', async () => {
  const form = requestForm();
  for (let index = 0; index < 5; index++) {
    form.append('attachments', new Blob(['x'], { type: 'image/png' }), `unit-${index}.png`);
  }
  const result = await submit(form);
  assert.equal(result.status, 400);
  assert.match(result.body.error, /no more than 4/);
  assert.equal(sent.length, 1);
});

test('rejects an oversized attachment before sending', async () => {
  const form = requestForm();
  form.append('attachments', new Blob([new Uint8Array(MAX_FILE_BYTES + 1)], { type: 'image/png' }), 'large.png');
  const result = await submit(form);
  assert.equal(result.status, 413);
  assert.match(result.body.error, /4 MB/);
  assert.equal(sent.length, 1);
});

test('rejects attachments that exceed the combined limit', async () => {
  const form = requestForm();
  const chunk = new Uint8Array(MAX_TOTAL_BYTES / 2 + 1);
  form.append('attachments', new Blob([chunk], { type: 'image/png' }), 'unit-1.png');
  form.append('attachments', new Blob([chunk], { type: 'image/png' }), 'unit-2.png');
  const result = await submit(form);
  assert.equal(result.status, 413);
  assert.match(result.body.error, /total 4 MB/);
  assert.equal(sent.length, 1);
});

test('rejects unsupported files before sending', async () => {
  const form = requestForm();
  form.append('attachments', new Blob(['x'], { type: 'application/javascript' }), 'script.js');
  const result = await submit(form);
  assert.equal(result.status, 400);
  assert.equal(sent.length, 1);
});

test('rejects a date that does not exist', async () => {
  const form = requestForm();
  form.set('date', '2026-02-31');
  const result = await submit(form);
  assert.equal(result.status, 400);
  assert.match(result.body.error, /valid preferred date/);
  assert.equal(sent.length, 1);
});
