import emailjs from '@emailjs/browser';

/**
 * emailService
 * Client-side email dispatch using EmailJS browser SDK.
 * Reads public keys from environment variables with safe client fallbacks
 * ensuring seamless functionality on deployed platforms (e.g. Vercel) where .env is gitignored.
 */
const DEFAULT_SERVICE_ID = 'service_ynyrjba';
const DEFAULT_TEMPLATE_ID = 'template_zzy0ymh';
const DEFAULT_PUBLIC_KEY = 'vSPImVsmgsRsxsr3N';

export async function sendContactEmail({ name, email, message }) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || DEFAULT_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || DEFAULT_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || DEFAULT_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error('SERVICE_UNAVAILABLE');
  }

  // Initialize EmailJS with public key
  try {
    emailjs.init({ publicKey });
  } catch (initErr) {
    // If already initialized or init signature differs, proceed to send
  }

  const templateParams = {
    name: name.trim(),
    from_name: name.trim(),
    email: email.trim(),
    from_email: email.trim(),
    reply_to: email.trim(),
    message: message.trim(),
    to_name: 'Aman',
    to_email: 'aman.developer029@gmail.com',
  };

  const response = await emailjs.send(serviceId, templateId, templateParams, {
    publicKey,
  });

  return response;
}
