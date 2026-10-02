import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Github, Linkedin, Mail, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { personalInfo } from '../data';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  onOpenResume: () => void;
}

export default function Header({ darkMode, setDarkMode, onOpenResume }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple active link detection
      const sections = ['hero', 'about', 'skills', 'projects', 'education', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050505]/90 backdrop-blur-md border-b border-white/10 shadow-lg'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Name */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-8 h-8 bg-emerald-500 flex items-center justify-center font-black text-black rounded-xs transition-transform duration-300 group-hover:scale-105">
              V
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold uppercase tracking-wider text-white transition-colors duration-300 group-hover:text-emerald-400">
                {personalInfo.name}
              </span>
              <span className="text-[10px] text-zinc-500 font-mono tracking-tight whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px] sm:max-w-none">
                AI ENGINEER &amp; LLM ARCHITECT
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`px-3 py-1.5 rounded-none text-xs font-semibold uppercase tracking-widest transition-all duration-300 ${
                  activeSection === item.href.replace('#', '')
                    ? 'text-emerald-400 border-b-2 border-emerald-500 font-bold'
                    : 'text-zinc-400 hover:text-white hover:border-b-2 hover:border-zinc-700'
                }`}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Social icons */}
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              referrerPolicy="no-referrer"
              className="text-zinc-500 hover:text-white transition-colors p-2 rounded-none hover:bg-white/5"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              onClick={() => {
                navigator.clipboard.writeText(personalInfo.email);
              }}
              className="text-zinc-500 hover:text-white transition-colors p-2 rounded-none hover:bg-white/5"
              title="Email Veer Verma (Copies email & opens contact)"
            >
              <Mail className="w-4 h-4" />
            </a>

            {/* Resume Button */}
            <button
              onClick={onOpenResume}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-none bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-none bg-zinc-900 border border-white/5 hover:bg-zinc-850 hover:border-white/10 text-emerald-500 cursor-pointer flex items-center justify-center transition-all"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex items-center space-x-3 md:hidden">
            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-none bg-zinc-900 text-emerald-500 border border-white/5 cursor-pointer"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Menu icon */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-zinc-400 hover:text-white rounded-none hover:bg-white/5"
              aria-label="Toggle Main Menu"
            >
              {isOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            // Don't animate height: 'auto' here. motion measures it by calling
            // window.scrollTo(0, 0), which cancels the smooth scroll started by a menu tap.
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="md:hidden bg-[#0c0c0c] border-b border-white/10"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`block px-4 py-2.5 rounded-none text-xs font-bold uppercase tracking-widest transition-colors ${
                    activeSection === item.href.replace('#', '')
                      ? 'text-emerald-400 bg-white/5 border-l-2 border-emerald-500'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-4 border-t border-white/10 flex flex-col space-y-3">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenResume();
                  }}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-none bg-emerald-500 text-black font-bold text-xs uppercase tracking-wider transition-all"
                >
                  <FileText className="w-4 h-4" />
                  <span>Resume Workspace</span>
                </button>
                <div className="flex justify-around items-center pt-2">
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    referrerPolicy="no-referrer"
                    className="p-3 text-zinc-400 hover:text-white rounded-none bg-zinc-900 border border-white/5 w-[28%] flex justify-center"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    referrerPolicy="no-referrer"
                    className="p-3 text-zinc-400 hover:text-white rounded-none bg-zinc-900 border border-white/5 w-[28%] flex justify-center"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      setIsOpen(false);
                      navigator.clipboard.writeText(personalInfo.email);
                      handleNavClick(e, '#contact');
                    }}
                    className="p-3 text-zinc-400 hover:text-white rounded-none bg-zinc-900 border border-white/5 w-[28%] flex justify-center"
                    title="Email Veer Verma"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
