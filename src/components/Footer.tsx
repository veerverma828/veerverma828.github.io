import { ChevronUp, Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { personalInfo } from '../data';

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#090909] border-t border-white/5 text-zinc-400 py-12 transition-colors duration-300 relative z-10 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright description */}
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-xs font-bold text-white tracking-widest font-mono uppercase">
              ⚡ Veer Verma Portfolio
            </h4>
            <p className="text-xs text-zinc-500 font-light">
              Designed &amp; Developed with raw passion by <span className="font-semibold text-emerald-400">{personalInfo.name}</span>.
            </p>
            <p className="text-[9px] text-zinc-650 font-mono uppercase tracking-wider">
              &copy; {currentYear} • Modern React Single-Page Architecture
            </p>
          </div>

          {/* Socials cluster */}
          <div className="flex items-center space-x-3">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              referrerPolicy="no-referrer"
              className="p-3 bg-zinc-900 text-zinc-400 hover:text-emerald-400 rounded-none border border-white/5 transition-colors"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              referrerPolicy="no-referrer"
              className="p-3 bg-zinc-900 text-zinc-400 hover:text-emerald-400 rounded-none border border-white/5 transition-colors"
              title="LinkedIn Network"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              onClick={() => {
                navigator.clipboard.writeText(personalInfo.email);
              }}
              className="p-3 bg-zinc-900 text-zinc-400 hover:text-emerald-400 rounded-none border border-white/5 transition-colors"
              title="Email Veer Verma (Copies email & opens contact)"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          {/* Quick back to top */}
          <motion.button
            onClick={handleScrollToTop}
            whileHover={{ y: -3 }}
            className="p-3 bg-zinc-900 text-zinc-300 hover:text-white rounded-none border border-white/5 cursor-pointer text-[10px] font-mono uppercase tracking-widest font-bold transition-colors"
          >
            <div className="flex items-center space-x-1.5">
              <span>Back to Top</span>
              <ChevronUp className="w-3.5 h-3.5 text-emerald-400" strokeWidth={2.5} />
            </div>
          </motion.button>
        </div>

      </div>
    </footer>
  );
}
