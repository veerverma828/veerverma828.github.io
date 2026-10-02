import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  Code2,
  Cpu,
  Server,
  Globe,
  Terminal,
  Brain,
  Bot,
  Search,
  Activity,
  Code,
  Wand2,
  Gauge,
  Zap,
  ShieldCheck,
  Sliders,
  Mic,
  FileJson,
  Filter,
  FileCheck,
  GitBranch,
  Database,
  UserCheck,
  Scale,
  AlertCircle,
  CheckCircle2,
  Target,
  Coins,
  HardDrive,
  Clock,
  Route,
  Radio,
  Eye,
  Key,
  Laptop,
  ShieldAlert,
  AlertTriangle,
  EyeOff,
  Shield,
  Lock,
  FileText,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { skills } from '../data';
import { Skill } from '../types';

// React components dictionary of Lucide Icons
const iconMap: { [key: string]: React.ComponentType<any> } = {
  Sparkles,
  Layers,
  Code2,
  Cpu,
  Server,
  Globe,
  Terminal,
  Brain,
  Bot,
  Search,
  Activity,
  Code,
  Wand2,
  Gauge,
  Zap,
  ShieldCheck,
  Sliders,
  Mic,
  FileJson,
  Filter,
  FileCheck,
  GitBranch,
  Database,
  UserCheck,
  Scale,
  AlertCircle,
  CheckCircle2,
  Target,
  Coins,
  HardDrive,
  Clock,
  Route,
  Radio,
  Eye,
  Key,
  Laptop,
  ShieldAlert,
  AlertTriangle,
  EyeOff,
  Shield,
  Lock,
  FileText,
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Skills' },
    { id: 'genai', label: 'Generative AI / LLMs' },
    { id: 'agents', label: 'AI Agents' },
    { id: 'evaluation', label: 'LLM Evaluation' },
    { id: 'engineering', label: 'LLM Engineering' },
    { id: 'appdev', label: 'AI App Dev' },
    { id: 'security', label: 'AI Security' },
  ];

  const filteredSkills = skills.filter((skill) => {
    if (activeCategory === 'all') return true;
    return skill.category === activeCategory;
  });

  const getCleanLabel = (cat: string) => {
    switch (cat) {
      case 'genai': return 'Gen AI / LLMs';
      case 'agents': return 'AI Agents';
      case 'evaluation': return 'LLM Evaluation';
      case 'engineering': return 'LLM Engineering';
      case 'appdev': return 'AI App Dev';
      case 'security': return 'AI Security';
      default: return 'GenAI Systems';
    }
  };

  return (
    <section id="skills" className="py-24 bg-[#050505] transition-colors duration-300 relative overflow-hidden">
      {/* Decorative backdrop dot matrix */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-80 h-80 bg-emerald-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-emerald-500/10 border-l-2 border-emerald-500 text-emerald-400 px-3.5 py-1 rounded-none text-xs font-semibold tracking-wider uppercase font-mono mb-4"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Technical Skills</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase"
          >
            Core Technical Arsenal
          </motion.h2>
          <p className="text-zinc-400 mt-3 max-w-xl mx-auto text-xs font-light">
            Directly from verified technical expertise across Generative AI, autonomous agents, evaluation benchmarks, LLM engineering, application development, and security.
          </p>
          <div className="w-16 h-[2px] bg-emerald-500 mx-auto mt-4" />
        </div>

        {/* Categories Tab selector - horizontally scrollable on mobile, flex wrap on desktop */}
        <div className="w-full overflow-x-auto pb-3 sm:pb-0 mb-8 sm:mb-12 scrollbar-none touch-pan-x">
          <div className="flex sm:flex-wrap items-center sm:justify-center gap-2 min-w-max sm:min-w-0 px-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 rounded-none text-xs font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer min-h-[44px] flex items-center justify-center touch-manipulation active:scale-95 whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-emerald-500 text-black shadow-md'
                    : 'bg-zinc-900 text-zinc-400 border border-white/10 hover:bg-zinc-800 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Skills Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          <AnimatePresence>
            {filteredSkills.map((skill: Skill) => {
              // Retrieve configured Icon component or fallback to Code icon
              const IdealIcon = iconMap[skill.icon] || Code;
              return (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  key={skill.name}
                  whileHover={{ y: -3, borderColor: 'rgba(16, 185, 129, 0.4)' }}
                  className="p-5 bg-zinc-900/40 backdrop-blur-sm border border-white/5 rounded-none flex flex-col justify-between text-left group transition-all hover:bg-zinc-900/70"
                >
                  <div>
                    {/* Skill icon & category badge */}
                    <div className="flex items-start justify-between mb-3.5">
                      <div className="p-2.5 rounded-none bg-zinc-950 group-hover:bg-emerald-500/10 group-hover:text-emerald-400 text-emerald-400/90 border border-white/5 group-hover:border-emerald-500/20 transition-all">
                        <IdealIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
                      </div>
                      <span className="px-2 py-0.5 rounded-none text-[8px] font-mono font-bold tracking-widest border border-zinc-800 text-zinc-400 bg-[#0e0e0e] uppercase">
                        {getCleanLabel(skill.category)}
                      </span>
                    </div>

                    {/* Skill Name */}
                    <h3 className="text-white text-sm font-bold tracking-tight group-hover:text-emerald-300 transition-colors">
                      {skill.name}
                    </h3>

                    {/* Description */}
                    {skill.description && (
                      <p className="mt-2 text-xs text-zinc-400 font-light leading-relaxed">
                        {skill.description}
                      </p>
                    )}
                  </div>

                  {/* Category technical reference tag */}
                  {skill.techName && (
                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[9px] font-mono text-zinc-500 tracking-wider uppercase truncate" title={skill.techName}>
                        {skill.techName}
                      </span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Quick Footer Insight */}
        <div className="mt-12 text-center bg-zinc-900/20 p-4 border border-white/10 rounded-none max-w-md mx-auto">
          <span className="text-[10px] text-zinc-500 leading-relaxed block font-mono uppercase tracking-wider">
            🛠️ Equipped to engineer multi-agent AI pipelines, RAG systems, and robust full-stack applications.
          </span>
        </div>

      </div>
    </section>
  );
}
