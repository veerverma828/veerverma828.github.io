import { useEffect, useState } from 'react';

/**
 * True once `ms` have passed after mount, so heavy work (3D, below-the-fold sections) stays out of
 * the way of the hero name reveal. Reduced-motion visitors get it immediately because there is no
 * reveal to protect. With `wakeOnInput`, the first scroll, tap, key press or hash change also
 * flips it, so a visitor who starts navigating early never waits on the timer.
 */
export function useAfterReveal(ms: number, wakeOnInput = false): boolean {
  const [ready, setReady] = useState<boolean>(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    if (ready) return;
    let idle: number | undefined;
    const go = () => setReady(true);
    const timer = window.setTimeout(() => {
      // Wait for a quiet moment after the timer so it never lands on a busy frame.
      if (typeof window.requestIdleCallback === 'function') idle = window.requestIdleCallback(go, { timeout: 600 });
      else go();
    }, ms);

    const events = ['scroll', 'pointerdown', 'keydown', 'touchstart', 'hashchange'] as const;
    if (wakeOnInput) events.forEach((e) => window.addEventListener(e, go, { once: true, passive: true }));

    return () => {
      window.clearTimeout(timer);
      if (idle !== undefined) window.cancelIdleCallback(idle);
      if (wakeOnInput) events.forEach((e) => window.removeEventListener(e, go));
    };
  }, [ready, ms, wakeOnInput]);

  return ready;
}
