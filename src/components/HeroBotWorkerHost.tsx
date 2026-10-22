import { useEffect, useRef, useState } from 'react';

/**
 * Main-thread side of the worker-rendered hero bot. Deliberately imports no Three.js: all it does is
 * hand a canvas to the worker and pass along the cursor, visibility and size. If anything about the
 * worker fails (no OffscreenCanvas WebGL, script error) it calls onFail so the page can use the
 * ordinary main-thread bot instead.
 *
 * The messages follow the format of @react-three/offscreen's `render()` on the worker side.
 */
export default function HeroBotWorkerHost({ onReady, onFail }: { onReady?: () => void; onFail: () => void }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);
  // Keep the latest callbacks without re-running the setup effect.
  const cb = useRef({ onReady, onFail });
  cb.current = { onReady, onFail };

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    // Created here, not in JSX: a canvas can be handed to a worker only once, and React's dev
    // double-mount would otherwise try to hand over the same element twice.
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block';
    wrap.appendChild(canvas);

    let worker: Worker;
    try {
      const offscreen = canvas.transferControlToOffscreen();
      worker = new Worker(new URL('./heroBot.worker.tsx', import.meta.url), { type: 'module' });
      const narrowMq = window.matchMedia('(max-width: 639px)');
      worker.postMessage({ type: 'bot', narrow: narrowMq.matches });
      worker.postMessage(
        {
          type: 'init',
          payload: {
            props: {
              dpr: [1, 1.75],
              camera: { position: [0, narrowMq.matches ? 0.05 : -0.1, narrowMq.matches ? 7.4 : 9.2], fov: 34 },
              frameloop: 'always',
              gl: { antialias: true, alpha: true },
            },
            drawingSurface: offscreen,
            width: wrap.clientWidth,
            height: wrap.clientHeight,
            top: 0,
            left: 0,
            pixelRatio: window.devicePixelRatio,
          },
        },
        [offscreen],
      );

      let failed = false;
      const fail = () => {
        if (failed) return;
        failed = true;
        cb.current.onFail();
      };
      worker.addEventListener('message', (e: MessageEvent) => {
        if (e.data?.type === 'bot-ready') {
          setDrawn(true);
          cb.current.onReady?.();
        } else if (e.data?.type === 'error') fail();
      });
      worker.addEventListener('error', fail);

      const onNarrow = () => worker.postMessage({ type: 'bot', narrow: narrowMq.matches });
      narrowMq.addEventListener('change', onNarrow);

      // Size changes that are not window resizes (fonts loading, layout shifts).
      const ro = new ResizeObserver(() =>
        worker.postMessage({
          type: 'resize',
          payload: { width: wrap.clientWidth, height: wrap.clientHeight, top: 0, left: 0 },
        }),
      );
      ro.observe(wrap);

      // Cursor position relative to the bot, -1..1 across the window, at most once per frame.
      let pending: { x: number; y: number } | null = null;
      let raf = 0;
      const flush = () => {
        raf = 0;
        if (pending) worker.postMessage({ type: 'bot', pointer: pending });
        pending = null;
      };
      const onMove = (e: PointerEvent) => {
        const r = wrap.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height * 0.35;
        pending = {
          x: Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth / 2))),
          y: Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight / 2))),
        };
        if (!raf) raf = requestAnimationFrame(flush);
      };
      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('pointerdown', onMove, { passive: true });

      // Stop drawing while scrolled out of view.
      const io = new IntersectionObserver(
        ([entry]) => worker.postMessage({ type: 'bot', frameloop: entry.isIntersecting ? 'always' : 'demand' }),
        { threshold: 0.05 },
      );
      io.observe(wrap);

      return () => {
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerdown', onMove);
        narrowMq.removeEventListener('change', onNarrow);
        ro.disconnect();
        io.disconnect();
        if (raf) cancelAnimationFrame(raf);
        worker.terminate();
        canvas.remove();
      };
    } catch {
      canvas.remove();
      cb.current.onFail();
    }
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      style={{ visibility: drawn ? 'visible' : 'hidden' }}
      className={`${drawn ? 'bot-fade-in ' : ''}absolute right-2 top-24 z-0 w-[132px] h-[150px] pointer-events-none sm:block sm:col-start-8 sm:col-span-5 sm:row-start-1 sm:self-start sm:relative sm:w-full sm:h-[380px] md:h-[520px]`}
    >
      {/* soft backlight behind the character */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-emerald-500/20 blur-[80px]" />
    </div>
  );
}
