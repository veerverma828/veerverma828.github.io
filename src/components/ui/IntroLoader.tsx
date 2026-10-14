import { useEffect, useRef, useState } from 'react';

interface IntroLoaderProps {
  onDone: () => void;
  /** 0..1: how far the 3D bot has got (chunk loaded, canvas created, first frames drawn). 1 = ready. */
  botProgress?: number;
}

type Phase = 'loading' | 'complete' | 'expand';

// How much of the bar each real loading signal is worth. They sum to 100.
const WEIGHTS = { dom: 15, fonts: 25, load: 20, bot: 40 } as const;
type Signal = keyof typeof WEIGHTS;

/** 0 = always show the intro (it plays once per tab session, see App.tsx). */
const SKIP_IF_READY_WITHIN_MS = 0;
/** The bar never reaches 100% sooner than this, so the first visit always sees the intro. */
const MIN_DISPLAY_MS = 2000;
/** Never hang: after this long, treat the page as loaded. */
const HARD_CAP_MS = 8000;

/**
 * Loading intro driven by REAL readiness (DOM, web fonts, window load).
 * There is no minimum duration: if the page is already loaded the intro is
 * skipped outright, otherwise the bar finishes the moment loading does and a
 * short reveal hands over to the hero.
 */
export default function IntroLoader({ onDone, botProgress = 0 }: IntroLoaderProps) {
  const [percent, setPercent] = useState(0);
  const [phase, setPhase] = useState<Phase>('loading');
  const [skipped, setSkipped] = useState(false);
  // Stays hidden until loading has genuinely taken a moment, so quick loads never flash it.
  const [visible, setVisible] = useState(false);
  const target = useRef(0);
  const markRef = useRef<((s: Signal) => void) | null>(null);
  const recomputeRef = useRef<(() => void) | null>(null);
  const botFrac = useRef(0);
  // Weight (in %) of the step the loader is currently waiting on. Used to keep the meter creeping
  // forward while that step is in progress, instead of freezing until it reports.
  const nextWeight = useRef<number>(WEIGHTS.dom);
  const shown = useRef(0);
  const startRef = useRef(performance.now());
  const doneRef = useRef(false);
  const pillRef = useRef<HTMLDivElement>(null);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    onDone();
  };

  // Lock scroll while the intro is on screen.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Collect real loading signals; `target` is the true progress (0..100).
  useEffect(() => {
    const start = performance.now();
    const done = new Set<Signal>();
    // The bot is the only step with partial credit: its share grows as it gets further.
    const recompute = () => {
      target.current = (Object.keys(WEIGHTS) as Signal[]).reduce((sum, k) => {
        if (k === 'bot') return sum + WEIGHTS.bot * (done.has('bot') ? 1 : botFrac.current);
        return sum + (done.has(k) ? WEIGHTS[k] : 0);
      }, 0);
      const waitingOn = (['dom', 'fonts', 'load', 'bot'] as Signal[]).find((k) => !done.has(k));
      nextWeight.current = !waitingOn
        ? 0
        : waitingOn === 'bot'
          ? WEIGHTS.bot * (1 - botFrac.current)
          : WEIGHTS[waitingOn];
    };
    const mark = (s: Signal) => {
      done.add(s);
      recompute();
      if (target.current >= 100 && performance.now() - start < SKIP_IF_READY_WITHIN_MS) {
        setSkipped(true);
        finish();
      }
    };

    markRef.current = mark;
    recomputeRef.current = recompute;

    // DOM: this component only mounts once the app script has run.
    mark('dom');

    const fonts = (document as Document & { fonts?: { ready: Promise<unknown> } }).fonts;
    (fonts?.ready ?? Promise.resolve()).then(() => mark('fonts'));

    if (document.readyState === 'complete') mark('load');
    else window.addEventListener('load', () => mark('load'), { once: true });

    const reveal = window.setTimeout(() => setVisible(true), SKIP_IF_READY_WITHIN_MS);
    const cap = window.setTimeout(() => {
      mark('fonts');
      mark('load');
      mark('bot');
    }, HARD_CAP_MS);
    return () => {
      window.clearTimeout(reveal);
      window.clearTimeout(cap);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // The 3D bot reports each stage behind the loader (module loaded, canvas created, frames drawn),
  // so the meter keeps moving instead of waiting at 60% and jumping to 100%.
  useEffect(() => {
    botFrac.current = Math.min(1, Math.max(0, botProgress));
    if (botFrac.current >= 1) markRef.current?.('bot');
    else recomputeRef.current?.();
  }, [botProgress]);

  // Smooth display. Real progress arrives in steps (fonts, page, bot stages), so showing it directly
  // freezes between steps. The shown value therefore:
  //   1. catches up quickly to real progress, and
  //   2. while a step is still running, creeps slowly into that step (never more than 85% of its
  //      weight, never past 99%), so the number keeps moving.
  // It still reaches 100% only when the real work is done.
  useEffect(() => {
    if (skipped) return;
    const id = window.setInterval(() => {
      const elapsed = performance.now() - startRef.current;
      const timeCap = Math.min(100, (elapsed / MIN_DISPLAY_MS) * 100);
      const real = Math.min(target.current, timeCap);
      let v = shown.current;
      if (v < real) {
        v = Math.min(real, v + Math.max(1, (real - v) * 0.3));
      } else if (target.current < 100) {
        const ceiling = Math.min(99, target.current + nextWeight.current * 0.85, timeCap);
        if (v < ceiling) v += Math.max(0.12, (ceiling - v) * 0.025);
      }
      shown.current = Math.min(100, v);
      setPercent(Math.floor(shown.current + 1e-6));
    }, 30);
    return () => window.clearInterval(id);
  }, [skipped]);

  // Short reveal once loading is genuinely complete.
  useEffect(() => {
    if (skipped || percent < 100) return;
    const t1 = window.setTimeout(() => setPhase('complete'), 150);
    const t2 = window.setTimeout(() => setPhase('expand'), 650);
    const t3 = window.setTimeout(finish, 1500);
    return () => [t1, t2, t3].forEach((t) => window.clearTimeout(t));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percent >= 100, skipped]);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = pillRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  if (skipped) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={`Loading ${percent} percent`}
      style={{ visibility: visible ? 'visible' : 'hidden' }}
      className={`intro-screen ${phase === 'complete' ? 'is-complete' : ''} ${phase === 'expand' ? 'is-complete is-expand' : ''}`}
    >
      <div className="intro-header">
        <span>VeerVerma</span>
        <button type="button" onClick={finish} className="intro-skip">
          Skip intro
        </button>
      </div>

      <div className="intro-marquee" aria-hidden="true">
        <div className="intro-marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="intro-marquee-row">
              {['Full Stack Developer', 'GenAI Developer', 'Full Stack Developer', 'GenAI Developer'].map((t, i) => (
                <span key={i}>{t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div ref={pillRef} className="intro-pill" onMouseMove={onMouseMove}>
        <div className="intro-glow" aria-hidden="true" />
        <div className="intro-pill-inner">
          <div className="intro-welcome">Welcome</div>
          <div className="intro-loading">
            <span className="intro-loading-label">
              Loading <span className="intro-pct">{percent}%</span>
            </span>
            <span className="intro-caret" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}
