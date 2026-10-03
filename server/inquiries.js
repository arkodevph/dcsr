import path from 'node:path';
import Busboy from 'busboy';

export const MAX_ATTACHMENTS = 4;
export const MAX_FILE_BYTES = 4 * 1024 * 1024;
export const MAX_TOTAL_BYTES = 4 * 1024 * 1024;

const allowedTypes = new Map([
  ['image/jpeg', ['.jpg', '.jpeg']],
  ['image/png', ['.png']],
  ['image/webp', ['.webp']],
  ['image/gif', ['.gif']],
  ['image/heic', ['.heic']],
  ['image/heif', ['.heif']],
  ['image/avif', ['.avif']],
  ['application/pdf', ['.pdf']],
  ['application/msword', ['.doc']],
  ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', ['.docx']],
  ['text/plain', ['.txt']],
]);

export function parseInquiry(req) {
  return new Promise((resolve, reject) => {
    let parser;
    try {
      parser = Busboy({
        headers: req.headers,
        limits: {
          files: MAX_ATTACHMENTS,
          fileSize: MAX_FILE_BYTES,
          fields: 10,
          fieldSize: 4000,
          parts: 14,
        },
      });
    } catch {
      reject({ status: 415, message: 'Send the inquiry as a multipart form.' });
      return;
    }

    const fields = Object.create(null);
    const attachments = [];
    let totalBytes = 0;
    let error = null;
    const fail = (status, message) => { error ||= { status, message }; };

    parser.on('field', (name, value, info) => {
      if (info.valueTruncated || info.nameTruncated || Object.hasOwn(fields, name)) {
        fail(400, 'The inquiry contains an invalid field.');
        return;
      }
      fields[name] = value;
    });
    parser.on('file', (name, stream, info) => {
      const filename = path.basename(info.filename.replaceAll('\\', '/')).replace(/[\x00-\x1f\x7f]/g, '').slice(0, 128);
      const mimeType = info.mimeType.toLowerCase();
      if (name !== 'attachments' || !filename || !allowedTypes.get(mimeType)?.includes(path.extname(filename).toLowerCase())) {
        fail(400, 'Attach only JPG, PNG, WebP, GIF, HEIC, HEIF, AVIF, PDF, DOC, DOCX, or TXT files.');
      }
      const chunks = [];
      stream.on('data', (chunk) => {
        totalBytes += chunk.length;
        if (totalBytes > MAX_TOTAL_BYTES) fail(413, 'Attachments must total 4 MB or less.');
        if (!error) chunks.push(chunk);
      });
      stream.on('limit', () => fail(413, 'Each attachment must be 4 MB or less.'));
      stream.on('end', () => {
        if (stream.truncated) fail(413, 'Each attachment must be 4 MB or less.');
        if (!error) attachments.push({ filename, content: Buffer.concat(chunks), contentType: mimeType });
      });
    });
    parser.on('filesLimit', () => fail(400, `Attach no more than ${MAX_ATTACHMENTS} files.`));
    parser.on('fieldsLimit', () => fail(400, 'The inquiry contains too many fields.'));
    parser.on('partsLimit', () => fail(400, 'The inquiry contains too many parts.'));
    parser.on('error', () => fail(400, 'The inquiry could not be read.'));
    req.on('aborted', () => fail(400, 'The upload was interrupted.'));
    parser.on('close', () => error ? reject(error) : resolve({ fields, attachments }));
    req.pipe(parser);
  });
}

export function validateInquiry(fields) {
  const required = ['name', 'phone', 'service', 'location', 'concern', 'date', 'time'];
  if (required.some((key) => !fields[key]?.trim())) return 'Complete all required inquiry fields.';
  if (fields.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) return 'Enter a valid email address.';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fields.date)) return 'Choose a valid preferred date.';
  const [year, month, day] = fields.date.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return 'Choose a valid preferred date.';
  return null;
}

export function inquiryMessage(fields, attachments, from, to) {
  const preferredDate = new Date(`${fields.date}T12:00:00`).toLocaleDateString('en-PH', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
  return {
    from,
    to,
    ...(fields.email ? { replyTo: fields.email } : {}),
    subject: `Job request: ${fields.service} — ${fields.name}`,
    text: [
      `Name: ${fields.name}`,
      `Phone: ${fields.phone}`,
      `Email: ${fields.email || 'Not provided'}`,
      `Service: ${fields.service}`,
      `Location: ${fields.location}`,
      `Unit type / model: ${fields.unit || 'Not sure'}`,
      `Preferred date: ${preferredDate}`,
      `Preferred time: ${fields.time}`,
      `Attachments: ${attachments.length}`,
      '',
      'Concern:',
      fields.concern,
    ].join('\n'),
    attachments,
  };
}
