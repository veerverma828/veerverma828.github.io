import { personalInfo } from '../data';
import WhatsAppIcon from './ui/WhatsAppIcon';

// wa.me needs the number as digits only, with country code and no "+".
const whatsappLink = `https://wa.me/${personalInfo.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
  "Hi Veer, I saw your portfolio and I'd like to connect.",
)}`;

/** Fixed bottom-right shortcut that opens a WhatsApp chat. Sits above the docked bot. */
export default function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Veer Verma on WhatsApp (opens in a new tab)"
      title="Chat on WhatsApp"
      className="fixed bottom-[84px] right-3 md:bottom-[116px] md:right-4 z-40 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.6)] hover:scale-110 transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      <WhatsAppIcon className="w-7 h-7 md:w-8 md:h-8" />
    </a>
  );
}
