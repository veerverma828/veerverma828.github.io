import { motion } from 'motion/react';

interface SplitCharsProps {
  text: string;
  delay?: number;
  stagger?: number;
  /** Optional [from, to] rgb pairs; characters are interpolated across the word. */
  gradient?: [[number, number, number], [number, number, number]];
  className?: string;
}

/**
 * Per-character reveal (rise + de-blur), staggered. The wrapper carries the
 * accessible name so screen readers hear the word once, not letter by letter.
 */
export default function SplitChars({ text, delay = 0, stagger = 0.05, gradient, className = '' }: SplitCharsProps) {
  const chars = Array.from(text);
  return (
    <span aria-label={text} className={`inline-block ${className}`}>
      {chars.map((ch, i) => {
        let color: string | undefined;
        if (gradient) {
          const t = chars.length > 1 ? i / (chars.length - 1) : 0;
          const [a, b] = gradient;
          color = `rgb(${a.map((v, k) => Math.round(v + (b[k] - v) * t)).join(',')})`;
        }
        return (
          <motion.span
            key={i}
            aria-hidden="true"
            initial={{ opacity: 0, y: 70, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.0, delay: delay + i * stagger, ease: [0.65, 0, 0.35, 1] }}
            style={{ display: 'inline-block', color }}
          >
            {ch}
          </motion.span>
        );
      })}
    </span>
  );
}
