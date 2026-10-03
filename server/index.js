import { config } from 'dotenv';
import { createApp } from './app.js';
import { createMailOptions } from './mail.js';

config({ path: '.env.local', quiet: true });
config({ path: '.env', quiet: true });

const production = process.env.NODE_ENV === 'production';
const port = Number(process.env.PORT || (production ? 3000 : 5173));
const mail = createMailOptions();

const vite = production ? null : await import('vite').then(({ createServer }) => createServer({
  server: { middlewareMode: true },
  appType: 'spa',
}));

const app = createApp({
  ...mail,
  vite,
});

app.listen(port, '0.0.0.0', () => {
  console.log(`DCSR website listening on http://localhost:${port}`);
  if (!mail.sendMail) console.warn('SMTP is not configured; online inquiry submissions will be unavailable.');
});
