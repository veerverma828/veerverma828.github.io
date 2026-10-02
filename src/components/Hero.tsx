import React from 'react';
import { ArrowRight, FileText, Sparkles, Terminal, Code2, Database, Cpu, Atom, Brain, Search, Server, Wand2 } from 'lucide-react';
import { motion } from 'motion/react';
import { personalInfo } from '../data';

interface HeroProps {
  onOpenResume: () => void;
}

export default function Hero({ onOpenResume }: HeroProps) {
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
    { name: 'RAG Systems', x: '15%', y: '50%', icon: Search, color: 'text-emerald-400 bg-emerald-950/40 border-emerald-500/50 shadow-emerald-500/10' },
    { name: 'LLM Orchestration', x: '85%', y: '50%', icon: Sparkles, color: 'text-indigo-400 bg-indigo-950/40 border-indigo-500/50 shadow-indigo-500/10' },
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
      <div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left: Information */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-left">
            
            {/* Tag Badge */}
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-emerald-500/10 border-l-2 border-emerald-500 px-3 py-1 rounded-none w-max"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[10px] font-bold tracking-widest text-emerald-300 uppercase font-mono">
                {personalInfo.location.toUpperCase()} • AI ENGINEERING &amp; SYSTEMS
              </span>
            </motion.div>

            {/* Title & Name */}
            <div className="space-y-4">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xs font-bold tracking-[0.2em] text-zinc-500 uppercase font-mono"
              >
                {personalInfo.title}
              </motion.p>
              
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter text-white leading-[0.95]"
              >
                AI Engineer<br />
                <span className="text-emerald-500">Web, Mobile &amp; Beyond.</span>
              </motion.h1>
            </div>

            {/* Headline Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-sm md:text-base text-zinc-400 max-w-xl italic leading-relaxed"
            >
              "{personalInfo.headline}"
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="text-xs text-zinc-500 max-w-xl border-l-2 border-white/10 pl-4 py-1 leading-relaxed"
            >
              {personalInfo.summary}
            </motion.p>

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

          {/* Hero Right: Interactive Visual Vector Graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-5 h-[320px] w-full relative flex items-center justify-center pointer-events-auto"
          >
            {/* Ambient Background Circles */}
            <div className="absolute w-72 h-72 rounded-none border border-white/5 animate-[spin_60s_linear_infinite]" />
            <div className="absolute w-[360px] h-[360px] rounded-none border border-dashed border-white/5 animate-[spin_80s_dashed_infinite]" />
            
            {/* Connection Rays */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
              <line x1="50%" y1="10%" x2="15%" y2="50%" stroke="url(#line-emerald-gradient)" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="50%" y1="10%" x2="85%" y2="50%" stroke="url(#line-emerald-gradient)" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="15%" y1="50%" x2="50%" y2="90%" stroke="url(#line-emerald-gradient)" strokeWidth="1" />
              <line x1="85%" y1="50%" x2="50%" y2="90%" stroke="url(#line-emerald-gradient)" strokeWidth="1" />

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
            {nodes.map((node) => {
              const IconComponent = node.icon;
              return (
                <motion.div
                  key={node.name}
                  style={{ left: node.x, top: node.y }}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center p-3 rounded-none border backdrop-blur-md transition-all duration-200 cursor-help ${node.color}`}
                >
                  <IconComponent className="w-4 h-4 mb-1" />
                  <span className="text-[9px] font-bold uppercase font-mono tracking-wider">{node.name}</span>
                </motion.div>
              );
            })}

            {/* Center Brand Tag */}
            <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 px-4 py-2.5 bg-zinc-950 border border-white/10 rounded-none text-center shadow-2xl z-20">
              <span className="text-[10px] font-black tracking-widest text-emerald-500 uppercase font-mono block">AI ENGINEER</span>
              <span className="text-[8px] tracking-wide text-zinc-500 uppercase block">Autonomous Systems</span>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
