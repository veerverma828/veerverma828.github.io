import { motion, useScroll, useSpring } from 'motion/react';

/** Thin emerald reading-progress bar pinned to the top of the viewport. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] origin-left bg-gradient-to-r from-emerald-500 via-emerald-400 to-cyan-400 z-[60]"
    />
  );
}
