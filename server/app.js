import express from 'express';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { createInquiryHandler } from './inquiry-handler.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export function createApp({ sendMail, from, to, vite } = {}) {
  const app = express();
  app.disable('x-powered-by');
  app.get('/api/inquiries', (_req, res) => {
    res.json({ available: Boolean(sendMail && from && to) });
  });
  app.post('/api/inquiries', createInquiryHandler({ sendMail, from, to }));

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
