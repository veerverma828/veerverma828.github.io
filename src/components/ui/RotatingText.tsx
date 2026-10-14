import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

interface RotatingTextProps {
  words: string[];
  interval?: number;
  className?: string;
}

/** Cycles through `words` with a vertical slide. Static when reduced motion is on. */
export default function RotatingText({ words, interval = 2600, className = '' }: RotatingTextProps) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || words.length < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => window.clearInterval(id);
  }, [reduce, words.length, interval]);

  return (
    <span className={`relative inline-flex overflow-hidden align-bottom ${className}`}>
      {/* Reserves width of the longest word so the layout never jumps */}
      <span className="invisible whitespace-nowrap" aria-hidden="true">
        {words.reduce((a, b) => (b.length > a.length ? b : a), '')}
      </span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[index]}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="absolute inset-0 whitespace-nowrap"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
