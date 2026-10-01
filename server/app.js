import express from 'express';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { inquiryMessage, parseInquiry, validateInquiry } from './inquiries.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export function createApp({ sendMail, from, to, vite } = {}) {
  const app = express();
  app.disable('x-powered-by');

  app.post('/api/inquiries', async (req, res) => {
    if (!sendMail || !from || !to) {
      res.status(503).json({ error: 'Online inquiries are temporarily unavailable. Please call DCSR or try again later.' });
      return;
    }
    if (!req.headers['content-type']?.startsWith('multipart/form-data')) {
      res.status(415).json({ error: 'The inquiry must include form data.' });
      return;
    }
    try {
      const { fields, attachments } = await parseInquiry(req);
      const error = validateInquiry(fields);
      if (error) {
        res.status(400).json({ error });
        return;
      }
      await sendMail(inquiryMessage(fields, attachments, from, to));
      res.json({ ok: true });
    } catch (error) {
      if (error.status) {
        res.status(error.status).json({ error: error.message });
        return;
      }
      console.error('Inquiry delivery failed:', error);
      res.status(502).json({ error: 'The inquiry could not be sent. Please try again or call DCSR.' });
    }
  });

  if (vite) {
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(root, 'dist')));
    app.use((req, res, next) => {
      if (req.method !== 'GET' || !req.accepts('html')) return next();
      res.sendFile(path.join(root, 'dist', 'index.html'));
    });
  }
  return app;
}
