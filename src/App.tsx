/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import WhyWorkWithMe from './components/WhyWorkWithMe';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      // Default to dark mode for modern high-profile tech aesthetic
      return true;
    }
    return true;
  });

  const [resumeOpen, setResumeOpen] = useState<boolean>(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen font-sans bg-[#050505] text-white transition-colors duration-300 antialiased overflow-x-hidden selection:bg-emerald-500 selection:text-black">
      
      {/* Sticky Top Nav bar */}
      <Header 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
        onOpenResume={() => setResumeOpen(true)} 
      />

      {/* Main Structural Portfolio Content Sections */}
      <main className="relative">
        <Hero onOpenResume={() => setResumeOpen(true)} />
        <About />
        <Skills />
        <Projects />
        <Education />
        <WhyWorkWithMe />
        <Contact />
      </main>

      {/* Structural Footer credits */}
      <Footer />

      {/* Dynamic Overlay Interactive Resume prints */}
      <ResumeModal 
        isOpen={resumeOpen} 
        onClose={() => setResumeOpen(false)} 
      />
    </div>
  );
}
