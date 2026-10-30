import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { personalInfo } from '../data';
import WhatsAppIcon from './ui/WhatsAppIcon';

// wa.me needs the number as digits only, with country code and no "+".
const whatsappLink = `https://wa.me/${personalInfo.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
  "Hi Veer, I saw your portfolio and I'd like to connect.",
)}`;

/** True while the contact section is on screen or about to be (within half a viewport). */
function useNearContact() {
  const [near, setNear] = useState(false);
  useEffect(() => {
    const check = () => {
      const el = document.getElementById('contact');
      if (!el) return;
      const r = el.getBoundingClientRect();
      const margin = window.innerHeight * 0.5;
      setNear(r.top < window.innerHeight + margin && r.bottom > -margin);
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, []);

  // Lets the docked bot hide while the button is showing, so the two never share the corner.
  useEffect(() => {
    document.documentElement.toggleAttribute('data-wa', near);
    return () => document.documentElement.removeAttribute('data-wa');
  }, [near]);

  return near;
}

/** Bottom-right shortcut that opens a WhatsApp chat, shown only around the contact section. */
export default function WhatsAppFloat() {
  const near = useNearContact();
  return (
    <AnimatePresence>
      {near && (
        <motion.a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Veer Verma on WhatsApp (opens in a new tab)"
          title="Chat on WhatsApp"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          className="fixed bottom-3 right-3 md:bottom-4 md:right-4 z-40 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.6)] hover:scale-110 transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <WhatsAppIcon className="w-7 h-7 md:w-8 md:h-8" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
