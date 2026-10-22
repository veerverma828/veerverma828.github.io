import React, { useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle2, AlertCircle, RefreshCw, Copy, Check, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { personalInfo } from '../data';
import { openGmailCompose } from '../utils/gmail';

/** lucide has no brand icons, so the WhatsApp mark is inlined. */
function WhatsAppIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.52.146-.181.194-.301.297-.497.1-.21.049-.375-.025-.525-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.18 2.095 3.195 5.076 4.483.709.3 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  // wa.me needs the number as digits only, with country code and no "+".
  const whatsappLink = `https://wa.me/${personalInfo.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
    "Hi Veer, I saw your portfolio and I'd like to connect.",
  )}`;

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(personalInfo.email).catch(() => {});
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (emailStr: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
  };

  const handleOpenGmail = () => {
    const subjectLine = formData.subject.trim() ? formData.subject.trim() : `Portfolio Contact from ${formData.name.trim() || 'Visitor'}`;
    const mailBody = `Name: ${formData.name.trim()}\nEmail: ${formData.email.trim()}\nSubject: ${subjectLine}\n\nMessage:\n${formData.message.trim()}`;
    openGmailCompose({ to: personalInfo.email, subject: subjectLine, body: mailBody });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot: real visitors never fill this hidden field, bots do
    if (honeypot) {
      setStatus('success');
      return;
    }

    // Client validations
    if (!formData.name.trim()) {
      setStatus('error');
      setErrorMessage('Please state your name or organization.');
      return;
    }
    if (!formData.email.trim() || !validateEmail(formData.email)) {
      setStatus('error');
      setErrorMessage('Please state a valid contact email address.');
      return;
    }
    if (!formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please type a short inquiry message.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    const subjectLine = formData.subject.trim() ? formData.subject.trim() : `Portfolio Contact from ${formData.name.trim()}`;

    try {
      // FormSubmit AJAX submission directly to target email
      const response = await fetch(`https://formsubmit.co/ajax/${personalInfo.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: subjectLine,
          message: formData.message.trim(),
          _subject: `[Portfolio Inquiry] ${subjectLine}`,
          _template: 'table',
          _captcha: 'false'
        })
      });

      const resData = await response.json().catch(() => null);

      if (response.ok && (resData?.success === 'true' || resData?.success === true)) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage("Your message couldn't be sent. Please try again or use the Gmail button below.");
      }
    } catch {
      setStatus('error');
      setErrorMessage("Network error: your message wasn't sent. Please try again or use the Gmail button below.");
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#050505] transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-emerald-500/10 border-l-2 border-emerald-500 text-emerald-400 px-3.5 py-1 rounded-none text-xs font-semibold tracking-wider uppercase font-mono mb-4"
          >
            <Mail className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Get In Touch</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter text-white leading-[1]"
          >
            Let&apos;s <span className="text-emerald-500">talk</span>
          </motion.h2>
          <p className="text-zinc-300 mt-5 max-w-2xl mx-auto text-base leading-relaxed">
            I am open to full-time roles, freelance projects, and collaborations. Send me a message!
          </p>
          <div className="w-16 h-[2px] bg-emerald-500 mx-auto mt-6" />
        </div>

        {/* Contact Info vs Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mt-8">
          
          {/* Left Block: Contact channels */}
          <div className="lg:col-span-5">
            <div className="h-full p-8 rounded-none bg-zinc-900/40 border border-white/5 flex flex-col">

              <div className="space-y-3">
                <h3 className="text-lg font-bold tracking-tight text-white">Contact details</h3>
                <p className="text-sm text-zinc-300 leading-relaxed max-w-prose">
                  Feel free to reach out anytime via email or phone. I will get back to you as soon as possible.
                </p>
              </div>

              {/* One consistent row per channel: icon, label + value, action */}
              <ul className="mt-6 divide-y divide-white/5 border-y border-white/5">
                {/* Email */}
                <li className="flex items-center gap-4 py-4">
                  <span className="p-3 bg-zinc-950 text-emerald-400 border border-white/5 shrink-0">
                    <Mail className="w-4 h-4" />
                  </span>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="min-w-0 flex-1 group"
                    aria-label={`Email ${personalInfo.email}`}
                  >
                    <span className="block text-[11px] font-black uppercase text-zinc-400 tracking-widest font-mono">Email</span>
                    <span className="block text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors truncate">
                      {personalInfo.email}
                    </span>
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label={copiedEmail ? 'Email address copied' : 'Copy email address'}
                    className="shrink-0 min-h-[44px] px-3 flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-colors cursor-pointer"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                  </button>
                </li>

                {/* Phone */}
                <li>
                  <a
                    href={`tel:${personalInfo.phone}`}
                    className="flex items-center gap-4 py-4 group"
                    aria-label={`Call ${personalInfo.phone}`}
                  >
                    <span className="p-3 bg-zinc-950 text-emerald-400 border border-white/5 shrink-0 group-hover:bg-emerald-500 group-hover:text-black transition-colors">
                      <Phone className="w-4 h-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[11px] font-black uppercase text-zinc-400 tracking-widest font-mono">Phone</span>
                      <span className="block text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">
                        {personalInfo.phone}
                      </span>
                    </span>
                    <ArrowUpRight className="w-4 h-4 shrink-0 text-zinc-500 group-hover:text-emerald-400 transition-colors" />
                  </a>
                </li>

                {/* WhatsApp */}
                <li>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-label="WhatsApp"
                    aria-label="Connect with Veer Verma on WhatsApp (opens in a new tab)"
                    className="flex items-center gap-4 py-4 group"
                  >
                    <span className="p-3 bg-zinc-950 text-[#25D366] border border-white/5 shrink-0 group-hover:bg-[#25D366] group-hover:text-black transition-colors">
                      <WhatsAppIcon className="w-4 h-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[11px] font-black uppercase text-zinc-400 tracking-widest font-mono">WhatsApp</span>
                      <span className="block text-sm font-semibold text-white group-hover:text-[#25D366] transition-colors">
                        Connect with me
                      </span>
                    </span>
                    <ArrowUpRight className="w-4 h-4 shrink-0 text-zinc-500 group-hover:text-[#25D366] transition-colors" />
                  </a>
                </li>

                {/* Location (not interactive) */}
                <li className="flex items-center gap-4 py-4">
                  <span className="p-3 bg-zinc-950 text-emerald-400 border border-white/5 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] font-black uppercase text-zinc-400 tracking-widest font-mono">Location</span>
                    <span className="block text-sm font-semibold text-white">{personalInfo.location}</span>
                  </span>
                </li>
              </ul>

              {/* Social profiles, pinned to the bottom of the card */}
              <div className="mt-auto pt-6">
                <p className="mb-3 text-[11px] font-black uppercase text-zinc-400 tracking-widest font-mono">Social links</p>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    referrerPolicy="no-referrer"
                    className="flex items-center justify-center gap-2 min-h-[44px] bg-zinc-950 border border-white/5 hover:border-emerald-500/40 text-zinc-300 hover:text-white text-xs font-bold font-mono uppercase tracking-widest transition-colors"
                  >
                    <Github className="w-4 h-4 text-emerald-400" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    referrerPolicy="no-referrer"
                    className="flex items-center justify-center gap-2 min-h-[44px] bg-zinc-950 border border-white/5 hover:border-emerald-500/40 text-zinc-300 hover:text-white text-xs font-bold font-mono uppercase tracking-widest transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-emerald-400" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Right Block: Interactive Form Panel */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-none bg-zinc-900/40 border border-white/5 h-full relative overflow-hidden flex flex-col shadow-none">
              
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center space-y-6 py-12 my-auto flex flex-col items-center justify-center"
                  >
                    <div className="w-16 h-16 rounded-none bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/25">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-base font-bold uppercase tracking-wider text-white">Message Sent!</h4>
                      <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
                        Your message has been sent to <span className="text-emerald-400 font-mono font-semibold">{personalInfo.email}</span>.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-xs">
                      <button
                        type="button"
                        onClick={handleOpenGmail}
                        className="w-full px-4 py-2.5 rounded-none bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-bold font-mono tracking-widest text-[11px] uppercase transition-colors flex items-center justify-center space-x-2 border border-emerald-500/30 cursor-pointer"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Open in Gmail</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setStatus('idle')}
                        className="w-full px-4 py-2.5 rounded-none bg-zinc-950 hover:bg-zinc-900 text-zinc-300 font-bold font-mono tracking-widest text-[11px] uppercase transition-colors flex items-center justify-center space-x-1 border border-white/10 cursor-pointer"
                      >
                        <span>Send Another</span>
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    onSubmit={handleFormSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                    noValidate
                  >
                    <div className="space-y-1">
                      <h4 className="text-lg font-bold tracking-tight text-white">Send me a message</h4>
                      <p className="text-xs text-zinc-300">Fill out your details below to get in touch.</p>
                    </div>

                    {/* Show error notification */}
                    {status === 'error' && (
                      <div role="alert" className="p-3.5 bg-red-950/20 text-red-400 border border-red-500/10 rounded-none text-xs flex items-start space-x-2 font-mono">
                        <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    {/* Honeypot field (hidden from humans) */}
                    <input
                      type="text"
                      name="_honey"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      className="hidden"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name field */}
                      <div className="space-y-1">
                        <label htmlFor="name-field" className="block text-[11px] font-bold uppercase text-zinc-400 font-mono tracking-widest">Your Name *</label>
                        <input
                          id="name-field"
                          type="text"
                          autoComplete="name"
                          required
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your Name"
                          disabled={status === 'submitting'}
                          className="w-full px-4 py-3 bg-zinc-950 border border-white/5 rounded-none text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors font-mono"
                        />
                      </div>

                      {/* Email field */}
                      <div className="space-y-1">
                        <label htmlFor="email-field" className="block text-[11px] font-bold uppercase text-zinc-400 font-mono tracking-widest">Your Email *</label>
                        <input
                          id="email-field"
                          type="email"
                          autoComplete="email"
                          required
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@example.com"
                          disabled={status === 'submitting'}
                          className="w-full px-4 py-3 bg-zinc-950 border border-white/5 rounded-none text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors font-mono"
                        />
                      </div>
                    </div>

                    {/* Subject field */}
                    <div className="space-y-1">
                      <label htmlFor="subject-field" className="block text-[11px] font-bold uppercase text-zinc-400 font-mono tracking-widest">Subject</label>
                      <input
                        id="subject-field"
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="e.g., Job Opportunity"
                        disabled={status === 'submitting'}
                        className="w-full px-4 py-3 bg-zinc-950 border border-white/5 rounded-none text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors font-mono"
                      />
                    </div>

                    {/* Message field */}
                    <div className="space-y-1">
                      <label htmlFor="message-field" className="block text-[11px] font-bold uppercase text-zinc-400 font-mono tracking-widest">Message *</label>
                      <textarea
                        id="message-field"
                        rows={4}
                        required
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Type your message here..."
                        disabled={status === 'submitting'}
                        className="w-full px-4 py-3 bg-zinc-950 border border-white/5 rounded-none text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors font-mono resize-none"
                      />
                    </div>

                    {/* Action trigger button */}
                    <div className="space-y-2">
                      <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="w-full py-3.5 px-4 rounded-none font-bold text-xs uppercase tracking-widest bg-emerald-500 text-black hover:bg-emerald-400 flex items-center justify-center space-x-2 transition-colors duration-250 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-center"
                      >
                        {status === 'submitting' ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin text-black" />
                            <span>Sending Message...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <Send className="w-3.5 h-3.5 text-black" />
                          </>
                        )}
                      </button>

                      <div className="pt-1 flex items-center justify-between gap-3 text-[11px] font-mono text-zinc-400">
                        <span>Prefer to use Gmail directly?</span>
                        <button
                          type="button"
                          onClick={handleOpenGmail}
                          className="text-emerald-400 hover:underline hover:text-emerald-300 font-bold uppercase tracking-wider flex items-center space-x-1 min-h-[44px] cursor-pointer bg-transparent border-0 px-1"
                        >
                          <Mail className="w-3 h-3" />
                          <span>Compose in Gmail</span>
                        </button>
                      </div>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
