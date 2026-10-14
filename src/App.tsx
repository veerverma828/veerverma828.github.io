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
function LazySection({ id, children }: { id: string; children: ReactNode }) {
  return (
    <Suspense fallback={<section id={id} aria-hidden="true" className="min-h-[40vh]" />}>{children}</Suspense>
  );
}

/** The name reveal runs about 1.7s. The 3D bot waits for that, then starts when the browser is idle. */
const TEXT_REVEAL_MS = 1700;

export default function App() {
  const [resumeOpen, setResumeOpen] = useState<boolean>(false);
  const [heavyReady, setHeavyReady] = useState<boolean>(false);

  // Text first, then the bot: wait out the reveal, then start the 3D work in an idle moment.
  useEffect(() => {
    let idleId: number | undefined;
    const start = () => setHeavyReady(true);
    const timer = window.setTimeout(() => {
      if (typeof window.requestIdleCallback === 'function') {
        idleId = window.requestIdleCallback(start, { timeout: 800 });
      } else {
        start();
      }
    }, TEXT_REVEAL_MS);
    return () => {
      window.clearTimeout(timer);
      if (idleId !== undefined && typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(idleId);
    };
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
        <Hero onOpenResume={() => setResumeOpen(true)} botEnabled={heavyReady} />
        <LazySection id="about"><About /></LazySection>
        <LazySection id="skills"><Skills /></LazySection>
        <LazySection id="projects"><Projects /></LazySection>
        <LazySection id="education"><Education /></LazySection>
        <LazySection id="why-work-with-me"><WhyWorkWithMe /></LazySection>
        <LazySection id="tech-stack"><TechStack /></LazySection>
        <LazySection id="contact"><Contact /></LazySection>
      </main>

      <Footer />

      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />

      {heavyReady && (
        <Suspense fallback={null}>
          <BotCompanion />
        </Suspense>
      )}
    </div>
    </MotionConfig>
  );
}
