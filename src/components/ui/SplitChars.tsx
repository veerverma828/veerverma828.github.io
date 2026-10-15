interface SplitCharsProps {
  text: string;
  delay?: number;
  stagger?: number;
  /** Optional [from, to] rgb pairs; characters are interpolated across the word. */
  gradient?: [[number, number, number], [number, number, number]];
  className?: string;
}

/**
 * Per-character reveal (rise + de-blur), staggered.
 *
 * The motion is a plain CSS animation (`.split-char` in index.css), so the browser runs it on the
 * compositor. The previous version used JavaScript-driven animation for the rise, which froze whenever
 * the main thread was busy (for example while the page sections were being rendered).
 *
 * The wrapper carries the accessible name so screen readers hear the word once, not letter by letter.
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
          <span
            key={i}
            aria-hidden="true"
            className="split-char"
            style={{ animationDelay: `${(delay + i * stagger).toFixed(3)}s`, color }}
          >
            {ch}
          </span>
        );
      })}
    </span>
  );
}
