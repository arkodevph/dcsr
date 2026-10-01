import { config } from 'dotenv';
import nodemailer from 'nodemailer';
import { createApp } from './app.js';

config({ path: '.env.local', quiet: true });
config({ path: '.env', quiet: true });

const production = process.env.NODE_ENV === 'production';
const port = Number(process.env.PORT || (production ? 3000 : 5173));
const smtpPort = Number(process.env.SMTP_PORT || 587);
const smtpReady = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD && process.env.SMTP_FROM);
const transporter = smtpReady ? nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: smtpPort,
  secure: smtpPort === 465,
  requireTLS: smtpPort !== 465,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
}) : null;

const vite = production ? null : await import('vite').then(({ createServer }) => createServer({
  server: { middlewareMode: true },
  appType: 'spa',
}));

const app = createApp({
  sendMail: transporter && ((message) => transporter.sendMail(message)),
  from: process.env.SMTP_FROM,
  to: process.env.INQUIRY_TO || 'dickson.gutierrez@yahoo.com',
  vite,
});

app.listen(port, '0.0.0.0', () => {
  console.log(`DCSR website listening on http://localhost:${port}`);
  if (!smtpReady) console.warn('SMTP is not configured; online inquiry submissions will be unavailable.');
});
