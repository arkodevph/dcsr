import { createInquiryHandler } from '../server/inquiry-handler.js';
import { createMailOptions } from '../server/mail.js';

const mail = createMailOptions();
const handleInquiry = createInquiryHandler(mail);

export default function inquiries(req, res) {
  if (req.method === 'GET') {
    res.json({ available: Boolean(mail.sendMail && mail.from && mail.to) });
    return;
  }
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    res.status(405).json({ error: 'Use POST to send an inquiry.' });
    return;
  }
  return handleInquiry(req, res);
}
