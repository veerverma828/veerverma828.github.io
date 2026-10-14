import { useEffect, useRef } from 'react';

interface SpotlightGlowProps {
  /** rgb triplet, e.g. "16,185,129" */
  color?: string;
  size?: number;
  opacity?: number;
}

/**
 * Cursor-following radial glow. Attaches to its parent element (which must be
 * `relative`). Uses CSS variables, so mouse movement never triggers a re-render.
 * Disabled on touch devices.
 */
export default function SpotlightGlow({ color = '16,185,129', size = 360, opacity = 0.14 }: SpotlightGlowProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    if (window.matchMedia('(hover: none)').matches) return;

    const onMove = (e: MouseEvent) => {
      const r = parent.getBoundingClientRect();
      el.style.setProperty('--sx', `${e.clientX - r.left}px`);
      el.style.setProperty('--sy', `${e.clientY - r.top}px`);
      el.style.opacity = '1';
    };
    const onLeave = () => {
      el.style.opacity = '0';
    };

    parent.addEventListener('mousemove', onMove);
    parent.addEventListener('mouseleave', onLeave);
    return () => {
      parent.removeEventListener('mousemove', onMove);
      parent.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
      style={{
        opacity: 0,
        background: `radial-gradient(${size}px circle at var(--sx, 50%) var(--sy, 50%), rgba(${color},${opacity}), transparent 70%)`,
      }}
    />
  );
}
