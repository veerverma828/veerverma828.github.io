import React from 'react';
import { HelpCircle, Workflow, Cpu, Sparkles, FileCode, Brain, CheckCircle2, Smartphone, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { whyWorkWithMe } from '../data';
import SpotlightGlow from './ui/SpotlightGlow';

const iconMap: { [key: string]: React.ComponentType<any> } = {
  Workflow,
  Cpu,
  Sparkles,
  FileCode,
  Brain,
  CheckCircle2,
  Smartphone,
};

export default function WhyWorkWithMe() {
  return (
    <section id="why-work-with-me" className="py-24 bg-[#050505] transition-colors duration-300 relative overflow-hidden">
      {/* Background Soft dot grids */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-emerald-500/10 border-l-2 border-emerald-500 text-emerald-400 px-3.5 py-1 rounded-none text-xs font-semibold tracking-wider uppercase font-mono mb-4"
          >
            <HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Why Work With Me</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter text-white leading-[1]"
          >
            What I bring <span className="text-emerald-500">to the team</span>
          </motion.h2>
          <p className="text-zinc-300 mt-5 max-w-2xl mx-auto text-base leading-relaxed">
            I build full-stack apps with generative AI built in: autonomous agents, RAG pipelines and LLM integrations, using modern, production-grade frameworks.
          </p>
          <div className="w-16 h-[2px] bg-emerald-500 mx-auto mt-6" />
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyWorkWithMe.map((item, idx) => {
            const VisualIcon = iconMap[item.icon] || Cpu;
            
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                viewport={{ once: true }}
                className="relative overflow-hidden p-6 rounded-none bg-zinc-900/40 border border-white/5 hover:border-emerald-500/30 transition-all duration-300 flex flex-col justify-between group shadow-none"
              >
                <SpotlightGlow />
                <div className="space-y-4">
                  {/* Dynamic glow card icon */}
                  <div className="p-3 rounded-none bg-zinc-950 border border-white/5 text-emerald-400 w-max group-hover:bg-emerald-500/10 group-hover:text-emerald-400 transition-all">
                    <VisualIcon className="w-5 h-5" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold tracking-tight text-white group-hover:text-emerald-400 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 mt-6 flex items-center justify-between text-[11px] text-zinc-400 group-hover:text-emerald-400 font-mono transition-colors">
                  <span>Key Strength</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all transform translate-x-1 group-hover:translate-x-0" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
