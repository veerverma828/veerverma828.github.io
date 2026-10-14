import { useEffect, useMemo, useRef, useState } from 'react';
import type { MutableRefObject } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

export type Pointer = { x: number; y: number; last?: number };

/** Rounded box built from three's own geometry (keeps the bundle small, no drei). */
function RoundedBox({
  args,
  radius = 0.1,
  smoothness = 3,
  position,
  children,
}: {
  args: [number, number, number];
  radius?: number;
  smoothness?: number;
  position?: [number, number, number];
  children?: React.ReactNode;
}) {
  const geometry = useMemo(
    () => new RoundedBoxGeometry(args[0], args[1], args[2], smoothness, radius),
    [args[0], args[1], args[2], smoothness, radius],
  );
  useEffect(() => () => geometry.dispose(), [geometry]);
  return (
    <mesh geometry={geometry} position={position}>
      {children}
    </mesh>
  );
}

const EMERALD = '#34d399';
/** What the bot types, as [text, colour] segments per line. */
const TERMINAL_SCRIPT: Array<Array<[string, string]>> = [
  [['// welcome.ts', '#6b7280']],
  [['say', '#22d3ee'], ['(', '#e5e7eb'], ['"Hi,"', '#fbbf24'], [');', '#e5e7eb']],
  [['say', '#22d3ee'], ['(', '#e5e7eb'], ['"welcome to"', '#fbbf24'], [');', '#e5e7eb']],
  [['say', '#22d3ee'], ['(', '#e5e7eb'], ['"my portfolio!"', '#fbbf24'], [');', '#e5e7eb']],
  [['> ', '#34d399'], ['Hi, welcome to', '#ffffff']],
  [['> ', '#34d399'], ['my portfolio!', '#ffffff']],
];
const TERMINAL_CHARS = TERMINAL_SCRIPT.reduce((n, line) => n + line.reduce((m, [t]) => m + t.length, 0), 0);

/**
 * Time (seconds) at which each character appears. Roughly 6-7 characters per second with
 * uneven gaps, a slightly longer pause after spaces/punctuation, and a breath between lines.
 */
const CHAR_TIMES: number[] = (() => {
  const text = TERMINAL_SCRIPT.flat().map(([t]) => t).join('');
  const lineEnds = new Set<number>();
  let count = 0;
  TERMINAL_SCRIPT.forEach((line) => {
    count += line.reduce((m, [t]) => m + t.length, 0);
    lineEnds.add(count - 1);
  });
  let acc = 0.5; // short beat before the first key
  return Array.from(text).map((ch, i) => {
    const jitter = ((i * 7919) % 11) / 11; // deterministic, uneven
    acc += 0.1 + jitter * 0.11;
    if (/[ ,.;("]/.test(ch)) acc += 0.06;
    if (lineEnds.has(i)) acc += 0.35;
    return acc;
  });
})();
const TERMINAL_DURATION = CHAR_TIMES[CHAR_TIMES.length - 1] ?? 0;

/** How many characters are visible at `local` seconds into the cycle. */
function charsTypedAt(local: number): number {
  let lo = 0;
  let hi = CHAR_TIMES.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (CHAR_TIMES[mid] <= local) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}
const TYPE_HOLD = 2.6; // seconds the finished text stays before restarting
const TERM_W = 600;
const TERM_H = 470;

/** Draws the terminal window with the first `typed` characters of the script. */
function drawTerminal(ctx: CanvasRenderingContext2D, typed: number, cursorOn: boolean) {
  ctx.clearRect(0, 0, TERM_W, TERM_H);
  ctx.fillStyle = '#04100c';
  ctx.fillRect(0, 0, TERM_W, TERM_H);
  ctx.strokeStyle = 'rgba(52, 211, 153, 0.7)';
  ctx.lineWidth = 4;
  ctx.strokeRect(2, 2, TERM_W - 4, TERM_H - 4);

  // title bar
  ctx.fillStyle = '#0b1f18';
  ctx.fillRect(4, 4, TERM_W - 8, 46);
  ['#3f3f46', '#3f3f46', '#34d399'].forEach((c, i) => {
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.arc(30 + i * 26, 27, 8, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.fillStyle = '#9ca3af';
  ctx.font = "bold 22px 'JetBrains Mono', ui-monospace, monospace";
  ctx.textBaseline = 'middle';
  ctx.fillText('veer@portfolio: ~', 130, 28);

  // body: only the typed prefix is drawn
  ctx.font = "bold 44px 'JetBrains Mono', ui-monospace, monospace";
  ctx.textBaseline = 'alphabetic';
  let remaining = typed;
  let lastX = 24;
  let lastY = 118;
  for (let li = 0; li < TERMINAL_SCRIPT.length; li++) {
    let x = 24;
    const y = 118 + li * 62;
    lastX = x;
    lastY = y;
    for (const [text, color] of TERMINAL_SCRIPT[li]) {
      if (remaining <= 0) break;
      const part = text.slice(0, remaining);
      ctx.fillStyle = color;
      ctx.fillText(part, x, y);
      x += ctx.measureText(part).width;
      remaining -= part.length;
      lastX = x;
    }
    if (remaining <= 0) break;
  }
  if (cursorOn) {
    ctx.fillStyle = '#34d399';
    ctx.fillRect(lastX + 2, lastY - 36, 24, 44);
  }
}

const SHELL = '#1d2128';
const SHELL_DARK = '#10131a';

/** Original low-poly "AI developer" bot. Head and eyes follow the cursor. */
export function Bot({
  pointer,
  live,
  compact = false,
}: {
  pointer: MutableRefObject<Pointer>;
  live: boolean;
  /** Docked bust mode: drops the orbiting ring and tokens. */
  compact?: boolean;
}) {
  const root = useRef<THREE.Group>(null);
  const body = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const eyes = useRef<THREE.Group>(null);
  const eyeL = useRef<THREE.Mesh>(null);
  const eyeR = useRef<THREE.Mesh>(null);
  const antenna = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);
  const tokens = useRef<THREE.Group>(null);
  const armL = useRef<THREE.Group>(null);
  const armR = useRef<THREE.Group>(null);
  // Own timer: R3F resets state.clock to 0 whenever the frame loop is paused/resumed,
  // which used to leave the eyes shut (negative elapsed time) after scrolling away and back.
  const blink = useRef({ time: 0, next: 2.2, start: -1 });
  // 0 = watching the cursor, 1 = sitting behind a laptop, typing
  const work = useRef(0);
  const laptop = useRef<THREE.Group>(null);
  // Terminal drawn into a canvas, shown on the hologram panel
  const terminal = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = TERM_W;
    canvas.height = TERM_H;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    drawTerminal(ctx, 0, true);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return { ctx, texture };
  }, []);
  useEffect(() => () => terminal.texture.dispose(), [terminal]);
  const typing = useRef({ t: 0, lastChars: -1, lastCursor: true });
  // Each typed character presses a key with alternating hands. press[hand]: 1 = just pressed, decays to 0.
  const taps = useRef({ press: [0, 0], nextHand: 0 });
  const screenLight = useRef<THREE.PointLight>(null);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    const p = pointer.current;
    const idle = !p.last || performance.now() - p.last > 3000;
    const { x: rx, y: ry } = !live
      ? { x: 0, y: 0 }
      : idle
        ? { x: Math.sin(t * 0.55) * 0.55, y: Math.sin(t * 0.37 + 1) * 0.18 }
        : p;
    const damp = THREE.MathUtils.damp;

    // Away for a while: pull out a laptop and type. Any pointer or touch activity ends it.
    const awayMs = p.last ? performance.now() - p.last : blink.current.time * 1000;
    // Only the big hero bot works at a laptop; the docked corner bust (compact) keeps watching the cursor.
    const wantsWork = live && !compact && awayMs > (p.last ? 8000 : 6000);
    work.current = damp(work.current, wantsWork ? 1 : 0, wantsWork ? 2.2 : 6, dt);
    const w = work.current;
    // While working the gaze drops to the screen instead of following the cursor.
    const x = rx * (1 - w);
    const y = ry * (1 - w) + 0.7 * w;

    if (root.current) {
      root.current.position.y = live ? Math.sin(t * 1.3) * 0.07 : 0;
      root.current.position.x = -0.5 * w;
    }

    if (head.current) {
      head.current.rotation.y = damp(head.current.rotation.y, x * 0.75, 6, dt);
      head.current.rotation.x = damp(head.current.rotation.x, y * 0.4, 6, dt);
      head.current.rotation.z = damp(head.current.rotation.z, -x * 0.08, 5, dt);
    }
    if (body.current) body.current.rotation.y = damp(body.current.rotation.y, x * 0.28, 4, dt);

    // Eyes slide slightly toward the cursor on top of the head turn.
    if (eyes.current) {
      eyes.current.position.x = damp(eyes.current.position.x, x * 0.09, 8, dt);
      eyes.current.position.y = damp(eyes.current.position.y, -y * 0.05, 8, dt);
    }

    // Occasional blink.
    const b = blink.current;
    b.time += Math.min(dt, 0.1); // a long pause must not count as a blink
    if (live && b.time > b.next) {
      b.start = b.time;
      b.next = b.time + 2.5 + Math.random() * 3;
    }
    const closed = b.start >= 0 && b.time - b.start >= 0 && b.time - b.start < 0.14;
    const eyeScale = closed ? 0.12 : 1;
    if (eyeL.current) eyeL.current.scale.y = damp(eyeL.current.scale.y, eyeScale, 30, dt);
    if (eyeR.current) eyeR.current.scale.y = damp(eyeR.current.scale.y, eyeScale, 30, dt);

    // Arms reach forward onto the keys; a hand dips each time a character is typed.
    const press = taps.current.press;
    const release = Math.exp(-dt * 16);
    press[0] *= release;
    press[1] *= release;
    if (armL.current) armL.current.rotation.x = THREE.MathUtils.lerp(0, -1.02 + press[0] * 0.22, w);
    if (armR.current) armR.current.rotation.x = THREE.MathUtils.lerp(0, -1.02 + press[1] * 0.22, w);
    if (laptop.current) {
      laptop.current.visible = w > 0.01;
      laptop.current.scale.setScalar(Math.max(0.001, w));
      laptop.current.position.y = -1.95 + w * 0.5;
    }
    // Typing: restarts each time the laptop comes out, loops with a short pause when finished.
    const ty = typing.current;
    if (w > 0.6) {
      ty.t += Math.min(dt, 0.1);
      const cycle = TERMINAL_DURATION + TYPE_HOLD;
      const local = ty.t % cycle;
      const chars = Math.min(TERMINAL_CHARS, charsTypedAt(local));
      const cursorOn = Math.floor(ty.t * 2.5) % 2 === 0;
      if (ty.lastChars >= 0 && chars > ty.lastChars) {
        for (let n = ty.lastChars; n < chars; n++) {
          taps.current.press[taps.current.nextHand] = 1;
          taps.current.nextHand = 1 - taps.current.nextHand;
        }
      }
      if (chars !== ty.lastChars || cursorOn !== ty.lastCursor) {
        ty.lastChars = chars;
        ty.lastCursor = cursorOn;
        drawTerminal(terminal.ctx, chars, cursorOn);
        terminal.texture.needsUpdate = true;
      }
    } else if (w < 0.05 && ty.t !== 0) {
      ty.t = 0;
      ty.lastChars = -1;
    }
    if (screenLight.current) screenLight.current.intensity = 2.5 * w;

    if (live) {
      if (antenna.current) {
        const mat = antenna.current.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = 1.4 + Math.sin(t * 3) * 0.9;
      }
      if (ring.current) ring.current.rotation.z = t * 0.5;
      if (tokens.current) tokens.current.rotation.y = t * 0.6;
      if (armL.current) armL.current.rotation.z = 0.12 + Math.sin(t * 1.3) * 0.04;
      if (armR.current) armR.current.rotation.z = -0.12 - Math.sin(t * 1.3 + 1) * 0.04;
    }
  });

  return (
    <group ref={root} position={[0, -0.15, 0]}>
      <group ref={body}>
        {/* Torso */}
        <RoundedBox args={[1.5, 1.25, 0.85]} radius={0.28} smoothness={4} position={[0, -1.05, 0]}>
          <meshStandardMaterial color={SHELL} metalness={0.55} roughness={0.38} />
        </RoundedBox>
        {/* Chest core */}
        <mesh position={[0, -1.0, 0.44]}>
          <sphereGeometry args={[0.14, 24, 24]} />
          <meshStandardMaterial color={EMERALD} emissive={EMERALD} emissiveIntensity={2} />
        </mesh>
        <mesh position={[0, -1.0, 0.43]}>
          <torusGeometry args={[0.26, 0.02, 12, 48]} />
          <meshStandardMaterial color={EMERALD} emissive={EMERALD} emissiveIntensity={0.9} />
        </mesh>
        {/* Neck */}
        <mesh position={[0, -0.32, 0]}>
          <cylinderGeometry args={[0.2, 0.26, 0.28, 24]} />
          <meshStandardMaterial color={SHELL_DARK} metalness={0.6} roughness={0.4} />
        </mesh>

        {/* Arms */}
        <group ref={armL} position={[-0.98, -0.65, 0]}>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.2, 20, 20]} />
            <meshStandardMaterial color={SHELL_DARK} metalness={0.6} roughness={0.4} />
          </mesh>
          <RoundedBox args={[0.3, 0.85, 0.3]} radius={0.12} position={[0, -0.5, 0]}>
            <meshStandardMaterial color={SHELL} metalness={0.5} roughness={0.4} />
          </RoundedBox>
        </group>
        <group ref={armR} position={[0.98, -0.65, 0]}>
          <mesh>
            <sphereGeometry args={[0.2, 20, 20]} />
            <meshStandardMaterial color={SHELL_DARK} metalness={0.6} roughness={0.4} />
          </mesh>
          <RoundedBox args={[0.3, 0.85, 0.3]} radius={0.12} position={[0, -0.5, 0]}>
            <meshStandardMaterial color={SHELL} metalness={0.5} roughness={0.4} />
          </RoundedBox>
        </group>

        {/* Head */}
        <group ref={head} position={[0, 0.5, 0]}>
          <RoundedBox args={[1.7, 1.25, 1.2]} radius={0.38} smoothness={5}>
            <meshStandardMaterial color={SHELL} metalness={0.5} roughness={0.35} />
          </RoundedBox>
          {/* Visor */}
          <RoundedBox args={[1.35, 0.68, 0.12]} radius={0.2} smoothness={4} position={[0, 0.02, 0.58]}>
            <meshStandardMaterial color="#04060a" metalness={0.9} roughness={0.12} />
          </RoundedBox>
          {/* Eyes */}
          <group ref={eyes} position={[0, 0.04, 0.66]}>
            <mesh ref={eyeL} position={[-0.3, 0, 0]}>
              <capsuleGeometry args={[0.085, 0.16, 8, 16]} />
              <meshStandardMaterial color={EMERALD} emissive={EMERALD} emissiveIntensity={2.4} />
            </mesh>
            <mesh ref={eyeR} position={[0.3, 0, 0]}>
              <capsuleGeometry args={[0.085, 0.16, 8, 16]} />
              <meshStandardMaterial color={EMERALD} emissive={EMERALD} emissiveIntensity={2.4} />
            </mesh>
          </group>
          {/* Ear plates */}
          {[-1, 1].map((s) => (
            <group key={s} position={[s * 0.88, 0, 0]}>
              <mesh rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.24, 0.24, 0.14, 28]} />
                <meshStandardMaterial color={SHELL_DARK} metalness={0.7} roughness={0.3} />
              </mesh>
              <mesh position={[s * 0.08, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.13, 0.13, 0.06, 24]} />
                <meshStandardMaterial color={EMERALD} emissive={EMERALD} emissiveIntensity={1.1} />
              </mesh>
            </group>
          ))}
          {/* Antenna */}
          <mesh position={[0, 0.78, 0]}>
            <cylinderGeometry args={[0.035, 0.035, 0.34, 12]} />
            <meshStandardMaterial color={SHELL_DARK} metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh ref={antenna} position={[0, 1.0, 0]}>
            <sphereGeometry args={[0.11, 20, 20]} />
            <meshStandardMaterial color={EMERALD} emissive={EMERALD} emissiveIntensity={1.6} />
          </mesh>
        </group>
      </group>

      {/* Laptop that appears when the visitor is away. It sits between the bot and the camera with
          its screen facing the bot (we see the lid's back). A hologram panel beside the bot shows
          the code being typed, so the viewer can still see it. */}
      <group ref={laptop} position={[0, -1.95, 0.75]} scale={0.001} visible={false}>
        {/* keyboard deck */}
        <RoundedBox args={[1.5, 0.07, 0.95]} radius={0.03}>
          <meshStandardMaterial color="#14171c" metalness={0.6} roughness={0.4} />
        </RoundedBox>
        <mesh position={[0, 0.04, -0.05]}>
          <boxGeometry args={[1.2, 0.01, 0.4]} />
          <meshStandardMaterial color="#0b0e12" emissive="#064e3b" emissiveIntensity={0.6} />
        </mesh>

        {/* lid: camera-side edge, leaning back toward the bot */}
        <group position={[0, 0.02, 0.45]} rotation={[-0.12, 0, 0]}>
          <RoundedBox args={[1.5, 0.95, 0.05]} radius={0.04} position={[0, 0.5, 0]}>
            <meshStandardMaterial color="#1b1f26" metalness={0.6} roughness={0.35} />
          </RoundedBox>
          {/* glowing mark on the back of the lid */}
          <mesh position={[0, 0.5, 0.03]}>
            <circleGeometry args={[0.1, 32]} />
            <meshStandardMaterial color={EMERALD} emissive={EMERALD} emissiveIntensity={2} />
          </mesh>
          {/* screen surface, facing the bot */}
          <mesh position={[0, 0.5, -0.03]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[1.36, 0.82]} />
            <meshStandardMaterial color="#04100c" emissive="#10b981" emissiveIntensity={0.7} />
          </mesh>
        </group>

        {/* screen glow lands on the bot's face */}
        <pointLight ref={screenLight} position={[0, 0.9, -0.25]} color="#34d399" intensity={0} distance={4} />

        {/* hologram: a real terminal typing out code, angled toward the viewer */}
        <group position={[1.95, 0.95, -0.2]} rotation={[0, -0.25, 0]}>
          <mesh>
            <planeGeometry args={[1.5, 1.18]} />
            <meshBasicMaterial map={terminal.texture} transparent opacity={0.96} toneMapped={false} />
          </mesh>
        </group>
      </group>

      {/* Neural ring + orbiting tokens */}
      {!compact && (
      <>
      <mesh ref={ring} position={[0, 0.5, 0]} rotation={[Math.PI / 2.6, 0, 0]}>
        <torusGeometry args={[1.35, 0.015, 12, 96]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={1.1} transparent opacity={0.8} />
      </mesh>
      <group ref={tokens} position={[0, 0.5, 0]}>
        {[0, 1, 2, 3].map((i) => {
          const a = (i / 4) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(a) * 1.5, Math.sin(a * 2) * 0.4, Math.sin(a) * 1.5]}>
              <octahedronGeometry args={[0.1 + (i % 2) * 0.04]} />
              <meshStandardMaterial
                color={i % 2 ? '#22d3ee' : EMERALD}
                emissive={i % 2 ? '#22d3ee' : EMERALD}
                emissiveIntensity={1.4}
              />
            </mesh>
          );
        })}
      </group>
      </>
      )}
    </group>
  );
}

/** Calls onReady once, after the first few frames are drawn (shaders compiled, scene on the GPU). */
function ReadyProbe({ onReady, onProgress }: { onReady?: () => void; onProgress?: (p: number) => void }) {
  const frames = useRef(0);
  useFrame(() => {
    frames.current += 1;
    if (frames.current === 1) onProgress?.(0.8); // first frame drawn: shaders compiled
    if (frames.current === 3) onReady?.();
  });
  return null;
}

export default function HeroBot({
  onReady,
  onProgress,
  visible = true,
}: {
  onReady?: () => void;
  onProgress?: (p: number) => void;
  /** false: keep preparing but stay hidden (the page is not ready to show it yet). */
  visible?: boolean;
}) {
  // Stays hidden until its first frames are drawn, then fades in: no half-built bot ever shows.
  const [drawn, setDrawn] = useState(false);
  const handleReady = () => {
    setDrawn(true);
    onReady?.();
  };
  const shown = visible && drawn;
  const wrapRef = useRef<HTMLDivElement>(null);
  const pointer = useRef<Pointer>({ x: 0, y: 0 });
  const [inView, setInView] = useState(true);
  // Closer camera on phones so the bot fills its smaller box.
  const [narrow] = useState(() => typeof window !== 'undefined' && window.innerWidth < 640);
  const [reduceMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  // Cursor position relative to the bot, normalised to roughly -1..1 across the viewport.
  useEffect(() => {
    if (reduceMotion) return;
    const onMove = (e: PointerEvent) => {
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height * 0.35;
      pointer.current.x = THREE.MathUtils.clamp((e.clientX - cx) / (window.innerWidth / 2), -1, 1);
      pointer.current.y = THREE.MathUtils.clamp((e.clientY - cy) / (window.innerHeight / 2), -1, 1);
      pointer.current.last = performance.now();
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onMove);
    };
  }, [reduceMotion]);

  // Stop rendering while scrolled out of view.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      style={{ visibility: shown ? 'visible' : 'hidden' }}
      className={`${shown ? 'bot-fade-in ' : ''}absolute right-2 top-24 z-0 w-[132px] h-[150px] pointer-events-none sm:pointer-events-auto sm:static sm:block lg:col-span-5 sm:order-first lg:order-none sm:relative sm:w-full sm:h-[380px] lg:h-[520px]`}
    >
      {/* soft backlight behind the character */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-emerald-500/20 blur-[80px]" />
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, narrow ? 0.05 : -0.1, narrow ? 7.4 : 9.2], fov: 34 }}
        frameloop={inView && !reduceMotion ? 'always' : 'demand'}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        onCreated={() => onProgress?.(0.5)}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[3, 4, 5]} intensity={1.5} />
        <directionalLight position={[-4, 2, -3]} color="#10b981" intensity={2.4} />
        <pointLight position={[0, 0.4, 3.2]} color="#34d399" intensity={6} distance={7} />
        <Bot pointer={pointer} live={!reduceMotion} />
        <ReadyProbe onReady={handleReady} onProgress={onProgress} />
      </Canvas>
    </div>
  );
}
