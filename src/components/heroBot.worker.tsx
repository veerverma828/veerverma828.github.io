import { useEffect, useRef, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { render } from '@react-three/offscreen';
import { HeroBotScene } from './HeroBot';
import type { Pointer } from './HeroBot';

/**
 * Runs the hero bot's WebGL scene off the main thread, so loading Three.js, compiling shaders and
 * drawing every frame never competes with the name reveal. The page (HeroBotWorkerHost) sends the
 * canvas, the cursor position, whether the bot is on screen and whether the layout is a phone's.
 */
const pointer: Pointer = { x: 0, y: 0 };
let narrow = false;
let frameloop: 'always' | 'demand' = 'always';
const subscribers = new Set<() => void>();

self.addEventListener('message', (e: MessageEvent) => {
  const d = e.data;
  if (!d || d.type !== 'bot') return;
  if (d.pointer) {
    pointer.x = d.pointer.x;
    pointer.y = d.pointer.y;
    // The worker has its own clock, so "last activity" is stamped here rather than sent over.
    pointer.last = performance.now();
  }
  if (typeof d.narrow === 'boolean') narrow = d.narrow;
  if (d.frameloop) frameloop = d.frameloop;
  if (typeof d.narrow === 'boolean' || d.frameloop) subscribers.forEach((f) => f());
});

function WorkerScene() {
  const pointerRef = useRef<Pointer>(pointer);
  const [isNarrow, setIsNarrow] = useState(narrow);
  const setFrameloop = useThree((s) => s.setFrameloop);

  useEffect(() => {
    const sync = () => {
      setIsNarrow(narrow);
      setFrameloop(frameloop);
    };
    subscribers.add(sync);
    sync();
    return () => {
      subscribers.delete(sync);
    };
  }, [setFrameloop]);

  return (
    <HeroBotScene
      pointer={pointerRef}
      live
      narrow={isNarrow}
      onReady={() => (self as unknown as Worker).postMessage({ type: 'bot-ready' })}
    />
  );
}

render(<WorkerScene />);
