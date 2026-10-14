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
  const blink = useRef({ next: 2.2, start: -1 });

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    const p = pointer.current;
    const idle = !p.last || performance.now() - p.last > 3000;
    const { x, y } = !live
      ? { x: 0, y: 0 }
      : idle
        ? { x: Math.sin(t * 0.55) * 0.55, y: Math.sin(t * 0.37 + 1) * 0.18 }
        : p;
    const damp = THREE.MathUtils.damp;

    if (root.current) root.current.position.y = live ? Math.sin(t * 1.3) * 0.07 : 0;

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
    if (live && t > b.next) {
      b.start = t;
      b.next = t + 2.5 + Math.random() * 3;
    }
    const closed = b.start >= 0 && t - b.start < 0.14;
    const eyeScale = closed ? 0.12 : 1;
    if (eyeL.current) eyeL.current.scale.y = damp(eyeL.current.scale.y, eyeScale, 30, dt);
    if (eyeR.current) eyeR.current.scale.y = damp(eyeR.current.scale.y, eyeScale, 30, dt);

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

export default function HeroBot() {
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
      className="block lg:col-span-5 order-first lg:order-none relative w-full h-[250px] sm:h-[380px] lg:h-[520px]"
    >
      {/* soft backlight behind the character */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-emerald-500/20 blur-[80px]" />
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, narrow ? 0.05 : -0.1, narrow ? 7.4 : 9.2], fov: 34 }}
        frameloop={inView && !reduceMotion ? 'always' : 'demand'}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[3, 4, 5]} intensity={1.5} />
        <directionalLight position={[-4, 2, -3]} color="#10b981" intensity={2.4} />
        <pointLight position={[0, 0.4, 3.2]} color="#34d399" intensity={6} distance={7} />
        <Bot pointer={pointer} live={!reduceMotion} />
      </Canvas>
    </div>
  );
}
