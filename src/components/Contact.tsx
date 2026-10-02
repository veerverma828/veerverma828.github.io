import React, { useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle2, AlertCircle, RefreshCw, Copy, Check, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { personalInfo } from '../data';

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

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
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
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(personalInfo.email)}&su=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(mailBody)}`;
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
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
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-emerald-500/10 border-l-2 border-emerald-500 text-emerald-400 px-3.5 py-1.5 rounded-none text-xs font-semibold tracking-wider uppercase font-mono mb-4"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase"
          >
            Contact Me
          </motion.h2>
          <p className="text-zinc-400 mt-3 max-w-xl mx-auto text-xs font-light">
            I am open to full-time roles, freelance projects, and collaborations. Send me a message!
          </p>
          <div className="w-16 h-[2px] bg-emerald-500 mx-auto mt-4" />
        </div>

        {/* Contact Info vs Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mt-8">
          
          {/* Left Block: Communication Nodes */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="p-8 rounded-none bg-zinc-900/40 border border-white/5 flex-1 flex flex-col justify-between space-y-8 shadow-none">
              
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">Contact Details</h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                  Feel free to reach out anytime via email or phone. I will get back to you as soon as possible.
                </p>
              </div>

              {/* Numeric & Grid channels */}
              <div className="space-y-4 pt-4 border-t border-white/5">
                
                {/* Email Item */}
                <div className="p-3 bg-zinc-950/60 border border-white/5 rounded-none space-y-3">
                  <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3">
                    <div className="flex items-center space-x-3 overflow-hidden">
                      <div className="p-2.5 bg-zinc-900 text-emerald-400 rounded-none border border-white/5 shrink-0">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[9px] font-black uppercase text-zinc-500 tracking-widest font-mono truncate">Email Address</p>
                        <p className="text-xs font-bold text-white uppercase tracking-wider truncate">{personalInfo.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleCopyEmail}
                      className="px-2.5 py-1.5 text-[10px] font-mono font-bold uppercase bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-all flex items-center justify-center space-x-1 shrink-0 self-start xl:self-auto"
                      title="Copy email to clipboard"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Alternative Action Links */}
                  <div className="pt-2 border-t border-white/5 flex flex-wrap gap-2 text-[10px] font-mono">
                    <button
                      onClick={handleCopyEmail}
                      className="px-2 py-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-white/10 transition-colors flex items-center space-x-1"
                    >
                      <Copy className="w-3 h-3 text-emerald-400" />
                      <span>{copiedEmail ? 'Copied!' : 'Copy Email'}</span>
                    </button>
                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.email}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-white/10 transition-colors flex items-center space-x-1"
                    >
                      <ExternalLink className="w-3 h-3 text-emerald-400" />
                      <span>Open Gmail</span>
                    </a>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="px-2 py-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-white/10 transition-colors flex items-center space-x-1"
                    >
                      <Mail className="w-3 h-3 text-emerald-400" />
                      <span>Mail App</span>
                    </a>
                  </div>
                </div>

                {/* Secure Cell */}
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="flex items-center space-x-4 p-3 rounded-none border border-transparent hover:border-emerald-500/25 hover:bg-emerald-500/5 transition-all group"
                >
                  <div className="p-3 bg-zinc-950 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-black rounded-none transition-all border border-white/5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase text-zinc-500 tracking-widest font-mono">Phone Number</p>
                    <p className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors uppercase tracking-wider">{personalInfo.phone}</p>
                  </div>
                </a>

                {/* Location Map Pin */}
                <div className="flex items-center space-x-4 p-3">
                  <div className="p-3 bg-zinc-950 text-emerald-400 rounded-none border border-white/5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase text-zinc-500 tracking-widest font-mono">Location</p>
                    <p className="text-xs font-bold text-white uppercase tracking-wider">{personalInfo.location}</p>
                  </div>
                </div>

              </div>

              {/* Social profile logs */}
              <div className="space-y-3 pt-6 border-t border-white/5">
                <p className="text-[9px] font-black uppercase text-zinc-500 tracking-widest font-mono">Social Links</p>
                <div className="flex items-center space-x-3">
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    referrerPolicy="no-referrer"
                    className="flex-1 flex items-center justify-center space-x-2 p-3 rounded-none bg-zinc-950 border border-white/5 text-zinc-400 hover:text-white text-xs font-bold font-mono uppercase tracking-widest transition-all"
                  >
                    <Github className="w-4 h-4 text-emerald-400" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    referrerPolicy="no-referrer"
                    className="flex-1 flex items-center justify-center space-x-2 p-3 rounded-none bg-zinc-950 border border-white/5 text-zinc-400 hover:text-white text-xs font-bold font-mono uppercase tracking-widest transition-all"
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
            <div className="p-8 rounded-none bg-zinc-900/40 border border-white/5 h-full relative overflow-hidden flex flex-col justify-center shadow-none">
              
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center space-y-6 py-12 flex flex-col items-center justify-center"
                  >
                    <div className="w-16 h-16 rounded-none bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/25">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-base font-bold uppercase tracking-wider text-white">Message Sent!</h4>
                      <p className="text-xs text-zinc-400 max-w-sm mx-auto font-light leading-relaxed">
                        Your message has been sent to <span className="text-emerald-400 font-mono font-semibold">{personalInfo.email}</span>.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-xs">
                      <button
                        type="button"
                        onClick={handleOpenGmail}
                        className="w-full px-4 py-2.5 rounded-none bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-bold font-mono tracking-widest text-[10px] uppercase transition-colors flex items-center justify-center space-x-2 border border-emerald-500/30 cursor-pointer"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Open in Gmail</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setStatus('idle')}
                        className="w-full px-4 py-2.5 rounded-none bg-zinc-950 hover:bg-zinc-900 text-zinc-300 font-bold font-mono tracking-widest text-[10px] uppercase transition-colors flex items-center justify-center space-x-1 border border-white/10 cursor-pointer"
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
                      <h4 className="text-sm font-bold uppercase tracking-wider text-white">Send Me A Message</h4>
                      <p className="text-xs text-zinc-450 font-light">Fill out your details below to get in touch.</p>
                    </div>

                    {/* Show error notification */}
                    {status === 'error' && (
                      <div className="p-3.5 bg-red-955/25 bg-red-950/20 text-red-400 border border-red-500/10 rounded-none text-xs flex items-start space-x-2 font-mono">
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
                        <label htmlFor="name-field" className="block text-[10px] font-bold uppercase text-zinc-500 font-mono tracking-widest">Your Name *</label>
                        <input
                          id="name-field"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your Name"
                          disabled={status === 'submitting'}
                          className="w-full px-4 py-3 bg-zinc-950 border border-white/5 rounded-none text-xs text-white placeholder-zinc-650 focus:outline-none focus:border-emerald-500 transition-colors font-mono"
                        />
                      </div>

                      {/* Email field */}
                      <div className="space-y-1">
                        <label htmlFor="email-field" className="block text-[10px] font-bold uppercase text-zinc-500 font-mono tracking-widest">Your Email *</label>
                        <input
                          id="email-field"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@example.com"
                          disabled={status === 'submitting'}
                          className="w-full px-4 py-3 bg-zinc-950 border border-white/5 rounded-none text-xs text-white placeholder-zinc-650 focus:outline-none focus:border-emerald-500 transition-colors font-mono"
                        />
                      </div>
                    </div>

                    {/* Subject field */}
                    <div className="space-y-1">
                      <label htmlFor="subject-field" className="block text-[10px] font-bold uppercase text-zinc-500 font-mono tracking-widest">Subject</label>
                      <input
                        id="subject-field"
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="e.g., Job Opportunity"
                        disabled={status === 'submitting'}
                        className="w-full px-4 py-3 bg-zinc-950 border border-white/5 rounded-none text-xs text-white placeholder-zinc-650 focus:outline-none focus:border-emerald-500 transition-colors font-mono"
                      />
                    </div>

                    {/* Message field */}
                    <div className="space-y-1">
                      <label htmlFor="message-field" className="block text-[10px] font-bold uppercase text-zinc-500 font-mono tracking-widest">Message *</label>
                      <textarea
                        id="message-field"
                        rows={4}
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Type your message here..."
                        disabled={status === 'submitting'}
                        className="w-full px-4 py-3 bg-zinc-950 border border-white/5 rounded-none text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors font-mono resize-none"
                      />
                    </div>

                    {/* Action trigger button */}
                    <div className="space-y-2">
                      <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="w-full py-3.5 px-4 rounded-none font-bold text-xs uppercase tracking-widest bg-emerald-500 text-black hover:bg-emerald-450 flex items-center justify-center space-x-2 transition-colors duration-250 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-center"
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

                      <div className="pt-1 flex items-center justify-between gap-3 text-[10px] font-mono text-zinc-500">
                        <span>Prefer to use Gmail directly?</span>
                        <button
                          type="button"
                          onClick={handleOpenGmail}
                          className="text-emerald-400 hover:underline hover:text-emerald-300 font-bold uppercase tracking-wider flex items-center space-x-1 cursor-pointer bg-transparent border-0 p-0"
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
