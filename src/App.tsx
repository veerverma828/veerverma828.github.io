/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Suspense, lazy, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { MotionConfig } from 'motion/react';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';
import ScrollProgress from './components/ui/ScrollProgress';
import AgentCursor from './components/ui/AgentCursor';
import { useAfterReveal } from './hooks/useAfterReveal';

// Everything below the fold is split out of the first bundle so the hero paints sooner.
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Education = lazy(() => import('./components/Education'));
const WhyWorkWithMe = lazy(() => import('./components/WhyWorkWithMe'));
const TechStack = lazy(() => import('./components/TechStack'));
const Contact = lazy(() => import('./components/Contact'));
const BotCompanion = lazy(() => import('./components/BotCompanion'));

/** Keeps the section's id in the DOM while its chunk loads, so nav links never miss. */
function LazySection({ id, ready, children }: { id: string; ready: boolean; children: ReactNode }) {
  const placeholder = <section id={id} aria-hidden="true" className="min-h-[40vh]" />;
  if (!ready) return placeholder;
  return <Suspense fallback={placeholder}>{children}</Suspense>;
}

export default function App() {
  const [resumeOpen, setResumeOpen] = useState<boolean>(false);

  // The hero name reveal runs for ~1.7s. Rendering the sections below the fold (and the docked bot,
  // which pulls in the 3D chunk) waits until it is over, or until the visitor starts to scroll.
  const belowFoldReady = useAfterReveal(1800, true);

  // The docked corner bot shares the 3D code with the hero bot, which now runs in a worker. Loading
  // that code on the main thread is only worth it once the visitor scrolls (the corner bot only shows
  // after the hero has left the screen anyway).
  const [scrolledPastTop, setScrolledPastTop] = useState(false);
  useEffect(() => {
    const check = () => {
      if (window.scrollY > 200) setScrolledPastTop(true);
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen font-sans bg-[#050505] text-white antialiased overflow-x-clip selection:bg-emerald-500 selection:text-black">
      {/* Lets keyboard users jump past the navigation */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2 focus:bg-emerald-500 focus:text-black focus:font-bold focus:text-xs focus:uppercase focus:tracking-wider"
      >
        Skip to content
      </a>

      <AgentCursor />
      <ScrollProgress />
      <Header onOpenResume={() => setResumeOpen(true)} />

      <main id="main" className="relative">
        <Hero onOpenResume={() => setResumeOpen(true)} />
        <LazySection id="about" ready={belowFoldReady}><About /></LazySection>
        <LazySection id="skills" ready={belowFoldReady}><Skills /></LazySection>
        <LazySection id="projects" ready={belowFoldReady}><Projects /></LazySection>
        <LazySection id="education" ready={belowFoldReady}><Education /></LazySection>
        <LazySection id="why-work-with-me" ready={belowFoldReady}><WhyWorkWithMe /></LazySection>
        <LazySection id="tech-stack" ready={belowFoldReady}><TechStack /></LazySection>
        <LazySection id="contact" ready={belowFoldReady}><Contact /></LazySection>
      </main>

      <Footer />

      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />

      {scrolledPastTop && (
        <Suspense fallback={null}>
          <BotCompanion />
        </Suspense>
      )}
    </div>
    </MotionConfig>
  );
}
