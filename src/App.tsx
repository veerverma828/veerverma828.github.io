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

/**
 * Below-the-fold sections, in page order. Rendering all of them in one go put a ~27ms frame right in
 * the middle of the name reveal, so they are mounted one per idle slice after the reveal instead.
 */
const SECTIONS: Array<{ id: string; node: ReactNode }> = [
  { id: 'about', node: <About /> },
  { id: 'skills', node: <Skills /> },
  { id: 'projects', node: <Projects /> },
  { id: 'education', node: <Education /> },
  { id: 'why-work-with-me', node: <WhyWorkWithMe /> },
  { id: 'tech-stack', node: <TechStack /> },
  { id: 'contact', node: <Contact /> },
];

/** The name reveal runs about 1.7s. The 3D bot waits for that, then starts when the browser is idle. */
const TEXT_REVEAL_MS = 1700;

export default function App() {
  const [resumeOpen, setResumeOpen] = useState<boolean>(false);
  const [heavyReady, setHeavyReady] = useState<boolean>(false);
  // How many of SECTIONS are mounted so far.
  const [mounted, setMounted] = useState<number>(0);

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

  // After the text reveal, mount one section per idle slice (top to bottom).
  useEffect(() => {
    let cancelled = false;
    let handle: number | undefined;
    const schedule = (fn: () => void) => {
      if (typeof window.requestIdleCallback === 'function') {
        handle = window.requestIdleCallback(fn, { timeout: 300 });
      } else {
        handle = window.setTimeout(fn, 60);
      }
    };
    const step = () => {
      if (cancelled) return;
      setMounted((m) => {
        if (m >= SECTIONS.length) return m;
        return m + 1;
      });
      schedule(step);
    };
    const timer = window.setTimeout(() => schedule(step), TEXT_REVEAL_MS);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      if (handle !== undefined) {
        if (typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(handle);
        window.clearTimeout(handle);
      }
    };
  }, []);

  // The visitor starts scrolling/tapping/typing early: they want the content now, so mount it all.
  useEffect(() => {
    const all = () => setMounted(SECTIONS.length);
    const events: Array<keyof WindowEventMap> = ['scroll', 'wheel', 'touchstart', 'keydown', 'pointerdown'];
    events.forEach((e) => window.addEventListener(e, all, { once: true, passive: true }));
    return () => events.forEach((e) => window.removeEventListener(e, all));
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
        {SECTIONS.map((section, i) =>
          i < mounted ? (
            <LazySection key={section.id} id={section.id}>
              {section.node}
            </LazySection>
          ) : (
            // Keeps the id in the page so nav links and the scroll spy still find it.
            <section key={section.id} id={section.id} aria-hidden="true" className="min-h-[40vh]" />
          ),
        )}
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
