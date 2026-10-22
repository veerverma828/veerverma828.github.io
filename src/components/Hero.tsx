import React, { Suspense, lazy } from 'react';
import { ArrowRight, FileText, Sparkles, Terminal, Brain, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { personalInfo } from '../data';
import SpotlightGlow from './ui/SpotlightGlow';
import RotatingText from './ui/RotatingText';
import SplitChars from './ui/SplitChars';

// 3D bot is code-split so it never delays first paint; falls back to the 2D graphic.
const HeroBot = lazy(() => import('./HeroBot'));

function hasWebGL(): boolean {
  try {
    const c = document.createElement('canvas');
    const gl = c.getContext('webgl2') || c.getContext('webgl');
    // Release the probe context right away so it doesn't count against the browser's limit.
    gl?.getExtension('WEBGL_lose_context')?.loseContext();
    return Boolean(gl);
  } catch {
    return false;
  }
}

interface HeroProps {
  onOpenResume: () => void;
}

export default function Hero({ onOpenResume }: HeroProps) {
  const [webgl] = React.useState<boolean>(hasWebGL);
  const handleScrollToContact = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      window.scrollTo({
        top: contactElem.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  const handleScrollToProjects = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const projectsElem = document.getElementById('projects');
    if (projectsElem) {
      window.scrollTo({
        top: projectsElem.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  // Modern node structure for the interactive hero graphic - AI Focused
  const nodes = [
    { name: 'Agentic AI', x: '50%', y: '10%', icon: Brain, color: 'text-cyan-400 bg-cyan-950/40 border-cyan-500/50 shadow-cyan-500/10' },
    { name: 'RAG Systems', x: '18%', y: '32%', icon: Search, color: 'text-emerald-400 bg-emerald-950/40 border-emerald-500/50 shadow-emerald-500/10' },
    { name: 'LLM Orchestration', x: '78%', y: '68%', icon: Sparkles, color: 'text-indigo-400 bg-indigo-950/40 border-indigo-500/50 shadow-indigo-500/10' },
    { name: 'MCP & Tools', x: '50%', y: '90%', icon: Terminal, color: 'text-teal-400 bg-teal-950/40 border-teal-500/50 shadow-teal-500/10' }
  ];

  return (
    <section
      id="hero"
      className="relative flex items-center justify-between pt-32 pb-20 overflow-hidden bg-[#050505] text-white"
    >
      {/* Decorative dot matrix grid matching the geometric design */}
      <div 
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(circle, white 1.5px, transparent 1.5px)`,
          backgroundSize: '32px 32px',
        }}
      />
      <div aria-hidden="true" className="animate-drift-a absolute top-10 right-[8%] w-[420px] h-[420px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div aria-hidden="true" className="animate-drift-b absolute bottom-0 left-[4%] w-[360px] h-[360px] bg-cyan-500/[0.07] blur-[120px] rounded-full pointer-events-none" />
      <SpotlightGlow size={640} opacity={0.09} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 md:gap-8 lg:gap-12 items-center">

          {/* Hero Left: Information */}
          <div className="sm:col-span-7 flex flex-col justify-center space-y-6 text-left">
            
            {/* Tag Badge */}
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-emerald-500/10 border-l-2 border-emerald-500 px-3 py-1 rounded-none w-max"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[11px] font-bold tracking-widest text-emerald-300 uppercase font-mono">
                {personalInfo.location.toUpperCase()} • B.TECH CSE (DS)
              </span>
            </motion.div>

            {/* Title & Name */}
            <div className="space-y-4">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-[11px] sm:text-xs font-bold tracking-[0.1em] sm:tracking-[0.2em] text-zinc-400 uppercase font-mono"
              >
                {personalInfo.title}
              </motion.p>
              
              <h1
                className="hero-rise text-6xl sm:text-7xl md:text-8xl xl:text-9xl font-black tracking-tighter text-white leading-[0.88] uppercase"
              >
                <span className="block text-lg sm:text-2xl font-semibold normal-case tracking-tight text-zinc-400 mb-4">Hello, I&apos;m</span>
                <SplitChars text="Veer" delay={0.15} />
                <br />
                <SplitChars text="Verma" delay={0.4} gradient={[[52, 211, 153], [34, 211, 238]]} />
              </h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-lg sm:text-xl font-semibold text-zinc-200"
            >
              I build <RotatingText className="text-emerald-400" words={['full-stack web apps', 'REST APIs & backends', 'RAG systems & agents', 'LLM integrations & MCP tools']} />
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-base md:text-lg text-zinc-300 max-w-xl leading-relaxed"
            >
              {personalInfo.summary}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="inline-flex items-center gap-2.5 text-xs font-mono text-zinc-300"
            >
              <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 bg-emerald-500" />
              </span>
              Open to Full-Stack and GenAI roles
            </motion.div>

            {/* CTA Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap items-stretch sm:items-center gap-3 pt-4"
            >
              <button
                onClick={handleScrollToProjects}
                className="flex items-center justify-center space-x-2 px-6 py-3.5 rounded-none bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer"
              >
                <span>Projects</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>

              <button
                onClick={handleScrollToContact}
                className="flex items-center justify-center space-x-2 px-6 py-3.5 rounded-none bg-zinc-900 border border-white/10 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                <span>Contact Me</span>
              </button>

              <button
                onClick={onOpenResume}
                className="flex items-center justify-center space-x-2 px-6 py-3.5 rounded-none bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-400 font-bold text-xs uppercase tracking-widest border border-emerald-500/20 hover:border-emerald-500/40 transition-all cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Open Resume</span>
              </button>
            </motion.div>
          </div>

          {/* Hero Right: 3D bot (WebGL) or the 2D constellation fallback */}
          {webgl ? (
            <Suspense fallback={<div aria-hidden="true" className="hidden sm:block sm:col-span-5 sm:h-[380px] md:h-[520px]" />}>
              <HeroBot />
            </Suspense>
          ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            aria-hidden="true"
            className="hidden sm:flex sm:col-span-5 h-[320px] w-full relative items-center justify-center pointer-events-auto"
          >
            {/* Ambient Background Circles */}
            <div className="absolute w-72 h-72 rounded-none border border-white/5 animate-[spin_60s_linear_infinite]" />
            <div className="absolute w-[360px] h-[360px] rounded-none border border-dashed border-white/5 animate-[spin_80s_linear_infinite_reverse]" />
            
            {/* Connection Rays */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
              <line x1="50%" y1="10%" x2="18%" y2="32%" stroke="url(#line-emerald-gradient)" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="50%" y1="10%" x2="78%" y2="68%" stroke="url(#line-emerald-gradient)" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="18%" y1="32%" x2="50%" y2="90%" stroke="url(#line-emerald-gradient)" strokeWidth="1" />
              <line x1="78%" y1="68%" x2="50%" y2="90%" stroke="url(#line-emerald-gradient)" strokeWidth="1" />

              <defs>
                <linearGradient id="line-emerald-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#27272a" />
                </linearGradient>
              </defs>
            </svg>

            {/* Glowing Center Core */}
            <div className="absolute w-16 h-16 bg-gradient-to-tr from-emerald-500/20 to-zinc-900/50 rounded-none blur-[40px] opacity-45 animate-pulse" />

            {/* Orbiting Interactive Constellation Nodes */}
            {nodes.map((node, i) => {
              const IconComponent = node.icon;
              return (
                <motion.div
                  key={node.name}
                  style={{ left: node.x, top: node.y }}
                  animate={{ y: [0, -7, 0] }}
                  transition={{ duration: 4 + i * 0.7, repeat: Infinity, ease: 'easeInOut' }}
                  whileHover={{ scale: 1.08 }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center p-3 rounded-none border backdrop-blur-md transition-all duration-200 cursor-default ${node.color}`}
                >
                  <IconComponent className="w-4 h-4 mb-1" />
                  <span className="text-[11px] font-bold uppercase font-mono tracking-wider">{node.name}</span>
                </motion.div>
              );
            })}

            {/* Center Brand Tag */}
            <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 px-4 py-2.5 bg-zinc-950 border border-white/10 rounded-none text-center shadow-2xl z-20">
              <span className="text-[11px] font-black tracking-widest text-emerald-500 uppercase font-mono block">FULL-STACK + GENAI</span>
              <span className="text-[11px] tracking-wide text-zinc-400 uppercase block">Web &amp; AI</span>
            </div>
          </motion.div>
          )}
          
        </div>
      </div>
    </section>
  );
}
