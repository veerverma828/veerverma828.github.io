import { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import { Bot } from './HeroBot';
import type { Pointer } from './HeroBot';

const DISMISS_KEY = 'bot-dismissed';

// One short, factual line per section. All numbers come from the portfolio data.
const hints: Record<string, string> = {
  about: "That's me. Nice to meet you.",
  skills: 'Skills across AI domains.',
  projects: 'Every card links to live demo and code.',
  education: 'B.Tech CSE (DS), CGPA 7.72.',
  'why-work-with-me': 'What I bring to a team.',
  'tech-stack': 'The tools I build with.',
  contact: "Let's build something together.",
};

function hasWebGL(): boolean {
  try {
    const c = document.createElement('canvas');
    return Boolean(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

/**
 * Small docked version of the hero bot. Appears once the hero scrolls out of view,
 * keeps tracking the cursor, comments on the current section and jumps to Contact.
 */
export default function BotCompanion() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pointer = useRef<Pointer>({ x: 0, y: 0 });
  const bubbleTimer = useRef<number | undefined>(undefined);
  const [webgl] = useState<boolean>(hasWebGL);
  const [reduceMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const [dismissed, setDismissed] = useState<boolean>(() => {
    try {
      return window.sessionStorage.getItem(DISMISS_KEY) === '1';
    } catch {
      return false;
    }
  });
  const [heroInView, setHeroInView] = useState(true);
  const [hint, setHint] = useState<string | null>(null);

  // Show only after the hero (which already has the big bot) leaves the viewport.
  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero || typeof IntersectionObserver === 'undefined') {
      setHeroInView(false);
      return;
    }
    const io = new IntersectionObserver(([e]) => setHeroInView(e.isIntersecting), { threshold: 0.15 });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  // Section-aware hint bubble, shown briefly on each new section.
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const text = hints[entry.target.id];
          if (!text) return;
          setHint(text);
          window.clearTimeout(bubbleTimer.current);
          bubbleTimer.current = window.setTimeout(() => setHint(null), 3800);
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );
    Object.keys(hints).forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => {
      io.disconnect();
      window.clearTimeout(bubbleTimer.current);
    };
  }, []);

  // Cursor tracking relative to the docked bot.
  useEffect(() => {
    if (reduceMotion) return;
    const onMove = (e: PointerEvent) => {
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height * 0.4;
      pointer.current.x = THREE.MathUtils.clamp((e.clientX - cx) / (window.innerWidth / 2), -1, 1);
      pointer.current.y = THREE.MathUtils.clamp((e.clientY - cy) / (window.innerHeight / 2), -1, 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [reduceMotion]);

  if (!webgl || dismissed) return null;

  const jumpToContact = () => {
    const el = document.getElementById('contact');
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  const dismiss = () => {
    setDismissed(true);
    try {
      window.sessionStorage.setItem(DISMISS_KEY, '1');
    } catch {
      /* storage unavailable: it simply returns on the next visit */
    }
  };

  return (
    <AnimatePresence>
      {!heroInView && (
        <motion.div
          ref={wrapRef}
          initial={{ opacity: 0, y: 40, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          className="fixed bottom-3 right-3 md:bottom-4 md:right-4 z-40"
        >
          {/* Hint bubble */}
          <AnimatePresence>
            {hint && (
              <motion.div
                key={hint}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                aria-hidden="true"
                className="absolute right-full mr-3 bottom-4 md:bottom-5 w-max max-w-[170px] md:max-w-[220px] px-3 py-2 bg-zinc-900 border border-emerald-500/40 text-[11px] md:text-xs font-mono text-zinc-100 shadow-xl"
              >
                {hint}
                <span className="absolute top-1/2 -right-[5px] w-2.5 h-2.5 -translate-y-1/2 rotate-45 bg-zinc-900 border-r border-t border-emerald-500/40" />
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={jumpToContact}
            aria-label="Contact Veer Verma"
            title="Say hello"
            className="group block w-[80px] h-[80px] md:w-[92px] md:h-[92px] rounded-full overflow-hidden border border-emerald-500/40 hover:border-emerald-400 bg-zinc-950/85 backdrop-blur shadow-[0_10px_40px_-10px_rgba(16,185,129,0.5)] cursor-pointer transition-colors"
          >
            <Canvas
              dpr={[1, 1.5]}
              camera={{ position: [0, 0.7, 5.2], fov: 34 }}
              frameloop={reduceMotion ? 'demand' : 'always'}
              gl={{ antialias: true, alpha: true }}
              style={{ background: 'transparent' }}
            >
              <ambientLight intensity={0.55} />
              <directionalLight position={[3, 4, 5]} intensity={1.5} />
              <directionalLight position={[-4, 2, -3]} color="#10b981" intensity={2.4} />
              <pointLight position={[0, 0.4, 3.2]} color="#34d399" intensity={6} distance={7} />
              <Bot pointer={pointer} live={!reduceMotion} compact />
            </Canvas>
          </button>

          <button
            type="button"
            onClick={dismiss}
            aria-label="Hide assistant"
            className="absolute -top-1 -right-1 md:top-0 md:right-0 w-8 h-8 md:w-7 md:h-7 rounded-full flex items-center justify-center bg-zinc-900 border border-white/15 text-zinc-300 hover:text-white hover:border-emerald-500/60 cursor-pointer transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
