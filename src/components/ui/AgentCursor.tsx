import { useEffect, useRef, useState } from 'react';

type Mode = 'idle' | 'link' | 'text';

interface Context {
  mode: Mode;
  label: string;
}

const INTERACTIVE = '[data-cursor-label],a,button,[role="button"],input,textarea,select,summary,label';

/** Decide what the cursor should look like over `target`. */
function describe(target: Element | null): Context {
  // Zones where the real cursor must stay (embedded PDF viewer, iframes, rich text).
  if (target?.closest('object,iframe,embed,[contenteditable="true"]')) return { mode: 'text', label: '' };
  const el = target?.closest(INTERACTIVE);
  if (!el) return { mode: 'idle', label: '' };
  if (el.matches('input,textarea,select')) return { mode: 'text', label: '' };

  const explicit = el.getAttribute('data-cursor-label');
  const aria = el.getAttribute('aria-label') ?? '';
  const href = el.getAttribute('href') ?? '';
  const text = (el.textContent ?? '').trim();

  let label = explicit ?? '';
  if (!label) {
    if (/^contact veer/i.test(aria)) label = 'Say hi';
    else if (/^live demo/i.test(aria)) label = 'Live';
    else if (/source code|github/i.test(aria) || /github\.com/i.test(href)) label = 'Code';
    else if (/linkedin\.com/i.test(href)) label = 'LinkedIn';
    else if (/^mailto:/i.test(href)) label = 'Mail';
    else if (/resume/i.test(text) && text.length < 40) label = 'Resume';
  }

  const isAction = el.matches('a,button,[role="button"],summary,label');
  return { mode: isAction ? 'link' : 'idle', label };
}

/**
 * Pointer replacement for mouse users: one emerald dot that sits exactly on the
 * pointer, grows over clickable things and shows a small mono label.
 * The system arrow is hidden only while this is live. Not rendered on touch
 * devices or for reduced-motion users.
 */
export default function AgentCursor() {
  const posRef = useRef<HTMLDivElement>(null);
  const [enabled] = useState<boolean>(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const [ctx, setCtx] = useState<Context>({ mode: 'idle', label: '' });
  const [down, setDown] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      if (posRef.current) posRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      document.documentElement.classList.add('agent-cursor');
      setVisible(true);
    };
    const onOver = (e: MouseEvent) => {
      const next = describe(e.target as Element | null);
      setCtx((prev) => (prev.mode === next.mode && prev.label === next.label ? prev : next));
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('pointerdown', onDown, { passive: true });
    document.addEventListener('pointerup', onUp, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);
    return () => {
      document.documentElement.classList.remove('agent-cursor');
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
    };
  }, [enabled]);

  if (!enabled) return null;

  const hidden = !visible || ctx.mode === 'text';
  const grown = ctx.mode === 'link';

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[200]">
      <div ref={posRef} className="absolute left-0 top-0 will-change-transform">
        {/* The dot */}
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full ring-1 ring-black/40 transition-[width,height,opacity,background-color,scale] duration-150 ease-out ${
            hidden ? 'opacity-0' : 'opacity-100'
          } ${down ? 'scale-75' : 'scale-100'} ${
            grown ? 'w-4 h-4 bg-emerald-400/90' : 'w-2.5 h-2.5 bg-emerald-400'
          }`}
        />

        {/* Mono label with blinking caret */}
        <div
          className={`absolute left-0 top-0 translate-x-4 translate-y-3 px-2 py-1 bg-emerald-400 text-black text-[11px] leading-none font-mono font-bold uppercase tracking-widest whitespace-nowrap transition-opacity duration-150 ${
            ctx.label && !hidden ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {ctx.label}
          <span className="ml-1 inline-block animate-[intro-blink_1s_steps(2,start)_infinite]">▮</span>
        </div>
      </div>
    </div>
  );
}
