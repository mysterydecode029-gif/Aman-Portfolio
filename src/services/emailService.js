import emailjs from '@emailjs/browser';

/**
 * emailService
 * Client-side email dispatch using EmailJS browser SDK.
 * Reads public keys safely from environment variables (VITE_EMAILJS_*).
 */
export async function sendContactEmail({ name, email, message }) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error('SERVICE_UNAVAILABLE');
  }

  const templateParams = {
    from_name: name.trim(),
    name: name.trim(),
    from_email: email.trim(),
    email: email.trim(),
    reply_to: email.trim(),
    message: message.trim(),
    to_email: 'aman.developer029@gmail.com',
    to_name: 'Aman',
  };

  const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
  return response;
}
