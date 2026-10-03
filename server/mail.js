import nodemailer from 'nodemailer';

export function createMailOptions(env = process.env) {
  const port = Number(env.SMTP_PORT || 587);
  const ready = Boolean(env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASSWORD && env.SMTP_FROM);
  const transporter = ready ? nodemailer.createTransport({
    host: env.SMTP_HOST,
    port,
    secure: port === 465,
    requireTLS: port !== 465,
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASSWORD },
  }) : null;

  return {
    sendMail: transporter && ((message) => transporter.sendMail(message)),
    from: env.SMTP_FROM,
    to: env.INQUIRY_TO || 'dickson.gutierrez@yahoo.com',
  };
}
