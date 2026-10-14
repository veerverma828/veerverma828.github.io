/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Suspense, lazy, useCallback, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { MotionConfig } from 'motion/react';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';
import ScrollProgress from './components/ui/ScrollProgress';
import IntroLoader from './components/ui/IntroLoader';
import AgentCursor from './components/ui/AgentCursor';
import { hasWebGL } from './utils/webgl';

// Everything below the fold is split out of the first bundle so the intro and hero paint sooner.
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

const INTRO_KEY = 'intro-seen';

/** Play the intro once per tab session, and never for reduced-motion users. */
function shouldSkipIntro(): boolean {
  if (typeof window === 'undefined') return true;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
  try {
    return window.sessionStorage.getItem(INTRO_KEY) === '1';
  } catch {
    return false;
  }
}

export default function App() {
  const [resumeOpen, setResumeOpen] = useState<boolean>(false);
  // Decided once: does the intro play this visit?
  const [introWillRun] = useState<boolean>(() => !shouldSkipIntro());
  const [introDone, setIntroDone] = useState<boolean>(!introWillRun);
  // The loader's last signal: the 3D bot has drawn its first frames (or there is no WebGL to wait for).
  const [botProgress, setBotProgress] = useState<number>(() => (hasWebGL() ? 0 : 1));
  const bumpBot = useCallback((p: number) => setBotProgress((cur) => Math.max(cur, p)), []);
  const handleBotReady = useCallback(() => bumpBot(1), [bumpBot]);
  const [webglOk] = useState<boolean>(hasWebGL);

  // Fetch the 3D chunk while the intro plays, so the bot is ready when the hero appears.
  useEffect(() => {
    // Downloading and evaluating the 3D module is the bot's first real stage.
    const warm = () => void import('./components/HeroBot').then(() => bumpBot(0.25));
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(warm, { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(warm, 800);
    return () => clearTimeout(t);
  }, [bumpBot]);

  const handleIntroDone = () => {
    try {
      window.sessionStorage.setItem(INTRO_KEY, '1');
    } catch {
      /* storage unavailable: intro simply plays again next load */
    }
    setIntroDone(true);
  };

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
      {!introDone && <IntroLoader onDone={handleIntroDone} botProgress={botProgress} />}
      <ScrollProgress />
      <Header onOpenResume={() => setResumeOpen(true)} />

      <main id="main" className="relative">
        {/* Mounted from the start so the 3D bot can prepare while the intro runs; the text waits for `play` */}
        <Hero
          onOpenResume={() => setResumeOpen(true)}
          play={introDone}
          earlyBot={webglOk}
          onBotReady={handleBotReady}
          onBotProgress={bumpBot}
        />
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

      {introDone && (
        <Suspense fallback={null}>
          <BotCompanion />
        </Suspense>
      )}
    </div>
    </MotionConfig>
  );
}
