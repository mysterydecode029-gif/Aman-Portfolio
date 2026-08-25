import React, { useState } from 'react';
import { CONTACT_INFO, PERSONAL_INFO } from '../../data/portfolioData';
import { sendContactEmail } from '../../services/emailService';

// Minimalist Monochrome Contact Icons
const ContactIcon = ({ type }) => {
  switch (type) {
    case 'whatsapp':
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      );
    case 'calling':
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      );
    case 'twitter':
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 4l11.733 16h4.267l-11.733-16z" />
          <path d="M4 20l6.768-6.768m2.464-2.464L20 4" />
        </svg>
      );
    case 'github':
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
      );
    case 'email':
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      );
    default:
      return null;
  }
};

/**
 * ContactSection
 * Final section presenting Aman's real contact details and functional EmailJS inquiry form.
 */
export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address.';
      }
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      await sendContactEmail(formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        'Something went wrong. Please try again.'
      );
    }
  };

  const contactList = [
    { key: 'whatsapp', ...CONTACT_INFO.whatsapp },
    { key: 'calling', ...CONTACT_INFO.calling },
    { key: 'email', ...CONTACT_INFO.email },
    { key: 'instagram', ...CONTACT_INFO.instagram },
    { key: 'twitter', ...CONTACT_INFO.twitter },
    { key: 'github', ...CONTACT_INFO.github },
  ];

  return (
    <section 
      id="contact" 
      className="w-full h-full flex flex-col justify-between px-4 sm:px-8 pt-16 sm:pt-24 pb-4 sm:pb-6 bg-transparent select-none overflow-y-auto"
    >
      <div className="max-w-5xl mx-auto w-full my-auto flex flex-col justify-center">
        
        {/* Section Heading */}
        <div className="mb-3 sm:mb-4 lg:mb-5">
          <h2 className="font-serif text-xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-none">
            CONTACT
          </h2>
          <div className="w-8 sm:w-10 h-[1px] bg-white/30 mt-1.5 sm:mt-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-10 items-start">
          
          {/* Left Column: 6 Functional Contact Channel Links */}
          <div className="lg:col-span-6 space-y-2.5 sm:space-y-3">
            <h3 className="font-serif text-base sm:text-xl md:text-2xl text-white font-normal leading-snug">
              Let's create something thoughtful and intentional.
            </h3>
            
            <p className="font-poppins text-[10.5px] sm:text-xs text-white/60 leading-relaxed font-light">
              Available for web design, interface engineering, and prototyping collaborations. Reach out directly through any method below:
            </p>

            {/* 6 Functional Interactive Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 pt-1">
              {contactList.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  target={item.isExternal ? '_blank' : undefined}
                  rel={item.isExternal ? 'noopener noreferrer' : undefined}
                  className="p-2.5 sm:p-3 rounded-xl glass-panel border border-white/10 hover:border-white/40 hover:bg-white/[0.06] transition-all group flex items-center justify-between cursor-pointer active:scale-[0.98]"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="p-1.5 rounded-lg bg-white/5 text-white group-hover:bg-white group-hover:text-black transition-colors flex-shrink-0">
                      <ContactIcon type={item.key} />
                    </div>
                    <div className="min-w-0">
                      <span className="font-poppins text-[9.5px] font-semibold text-white/50 uppercase tracking-wider block">
                        {item.label}
                      </span>
                      <span className="font-poppins text-xs font-medium text-white tracking-wide truncate block group-hover:text-white transition-colors">
                        {item.value}
                      </span>
                    </div>
                  </div>

                  {item.isExternal && (
                    <span className="text-white/30 group-hover:text-white text-xs pl-1 transition-colors">
                      ↗
                    </span>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Functional EmailJS Inquiry Form */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl glass-panel border border-white/10 p-3.5 sm:p-5">
              <h4 className="font-poppins text-[11px] sm:text-xs uppercase tracking-widest text-white font-semibold mb-2.5">
                Send a Message
              </h4>

              {status === 'success' ? (
                <div className="py-6 text-center space-y-2">
                  <div className="w-7 h-7 mx-auto rounded-full bg-white text-black flex items-center justify-center font-bold text-xs">
                    ✓
                  </div>
                  <h5 className="font-poppins text-xs font-semibold text-white">
                    Message sent successfully.
                  </h5>
                  <p className="font-poppins text-[10px] text-white/60">
                    Thank you, Aman will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="text-[10px] uppercase tracking-widest font-poppins text-white/50 hover:text-white underline pt-1 cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-2">
                  {/* Name Field */}
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: '' });
                      }}
                      className={`w-full px-3 py-1.5 sm:py-2 rounded-xl bg-black/60 border text-white placeholder-white/25 text-xs font-poppins focus:outline-none transition-colors ${
                        errors.name ? 'border-white/60 ring-1 ring-white/40' : 'border-white/15 focus:border-white'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-[10px] text-white/80 font-poppins mt-1 tracking-wide">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <input
                      type="email"
                      placeholder="Your Email Address"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      className={`w-full px-3 py-1.5 sm:py-2 rounded-xl bg-black/60 border text-white placeholder-white/25 text-xs font-poppins focus:outline-none transition-colors ${
                        errors.email ? 'border-white/60 ring-1 ring-white/40' : 'border-white/15 focus:border-white'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[10px] text-white/80 font-poppins mt-1 tracking-wide">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <textarea
                      rows="2"
                      placeholder="Describe your project or inquiry..."
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: '' });
                      }}
                      className={`w-full px-3 py-1.5 sm:py-2 rounded-xl bg-black/60 border text-white placeholder-white/25 text-xs font-poppins focus:outline-none transition-colors resize-none ${
                        errors.message ? 'border-white/60 ring-1 ring-white/40' : 'border-white/15 focus:border-white'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-[10px] text-white/80 font-poppins mt-1 tracking-wide">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Error Notification */}
                  {status === 'error' && (
                    <div className="p-2 rounded-lg bg-white/5 border border-white/20 text-[10.5px] text-white/80 font-poppins">
                      {errorMessage || 'Something went wrong. Please try again.'}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-2 rounded-xl bg-white text-black font-poppins text-[11px] sm:text-xs uppercase tracking-widest font-semibold hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                  >
                    {status === 'loading' ? (
                      <>
                        <span className="w-3 h-3 rounded-full border-2 border-black border-t-transparent animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      'Submit Inquiry'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Seamless Infinite Copyright Footer Marquee */}
      <footer className="w-full max-w-5xl mx-auto pt-2.5 sm:pt-3.5 border-t border-white/10 overflow-hidden select-none relative">
        <div 
          className="w-full overflow-hidden py-1 pointer-events-none select-none relative"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          }}
        >
          <div className="flex w-max animate-marquee">
            {/* Track 1 */}
            <div className="flex items-center gap-8 sm:gap-12 shrink-0 pr-8 sm:pr-12">
              {['© 2026 AMAN. All Rights Reserved.', '© 2026 AMAN. All Rights Reserved.', '© 2026 AMAN. All Rights Reserved.', '© 2026 AMAN. All Rights Reserved.'].map((text, idx) => (
                <div key={`c1-${idx}`} className="flex items-center gap-8 sm:gap-12">
                  <span className="font-poppins text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-white/40 font-light whitespace-nowrap">
                    {text}
                  </span>
                  <span className="text-white/20 text-[9px] select-none">•</span>
                </div>
              ))}
            </div>

            {/* Track 2 (Duplicate for Seamless Loop) */}
            <div className="flex items-center gap-8 sm:gap-12 shrink-0 pr-8 sm:pr-12" aria-hidden="true">
              {['© 2026 AMAN. All Rights Reserved.', '© 2026 AMAN. All Rights Reserved.', '© 2026 AMAN. All Rights Reserved.', '© 2026 AMAN. All Rights Reserved.'].map((text, idx) => (
                <div key={`c2-${idx}`} className="flex items-center gap-8 sm:gap-12">
                  <span className="font-poppins text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-white/40 font-light whitespace-nowrap">
                    {text}
                  </span>
                  <span className="text-white/20 text-[9px] select-none">•</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}
