import { User, Terminal, Calendar, Award, Star, Brain } from 'lucide-react';
import { motion } from 'motion/react';
import { personalInfo } from '../data';

export default function About() {
  const stats = [
    { label: 'CGPA', value: '7.72', description: 'MIET Meerut', icon: Award },
    { label: 'Degree', value: 'B.Tech CSE(DS)', description: '2021 – 2025', icon: Calendar },
    { label: 'Key Projects', value: '4 Main', description: 'AI & Full Stack', icon: Star },
    { label: 'Main Focus', value: 'AI Engineering', description: 'LLMs, Agents, RAG', icon: Brain },
  ];

  return (
    <section id="about" className="py-24 bg-[#050505] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            margin={{ once: true }}
            className="inline-flex items-center space-x-2 bg-emerald-500/10 border-l-2 border-emerald-500 text-emerald-400 px-3.5 py-1 rounded-none text-xs font-semibold tracking-wider uppercase font-mono mb-4"
          >
            <User className="w-3.5 h-3.5" />
            <span>My Story</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            margin={{ once: true }}
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase"
          >
            About Me
          </motion.h2>
          <div className="w-16 h-[2px] bg-emerald-500 mx-auto mt-4" />
        </div>

        {/* Story & Statistics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Visual Terminal Code Bio */}
          <div className="lg:col-span-6">
            <div className="w-full bg-zinc-950 rounded-none shadow-2xl overflow-hidden border border-white/10">
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-white/5">
                <div className="flex space-x-1.5">
                  <div className="w-2.5 h-2.5 bg-zinc-800" />
                  <div className="w-2.5 h-2.5 bg-zinc-800" />
                  <div className="w-2.5 h-2.5 bg-emerald-500/80" />
                </div>
                <div className="text-[10px] text-zinc-500 font-mono flex items-center space-x-1.5 uppercase tracking-wider">
                  <Terminal className="w-3.5 h-3.5 text-emerald-500" />
                  <span>veer_verma_ai.sh</span>
                </div>
                <div className="w-6" /> {/* spacer */}
              </div>

              {/* Terminal Window Body */}
              <div className="p-6 text-xs text-zinc-300 font-mono space-y-4 overflow-x-auto leading-relaxed">
                <div>
                  <span className="text-emerald-500">veer@ai-station</span>:<span className="text-zinc-500">~$</span> cat about.txt
                </div>
                <p className="text-zinc-400 italic">
                  "I am an AI Engineer and Computer Science graduate dedicated to building autonomous multi-agent workflows, RAG knowledge architectures, and LLM integrations. I connect complex neural models to robust full-stack production environments."
                </p>
                <div>
                  <span className="text-emerald-500 font-bold">veer@ai-station</span>:<span className="text-zinc-500">~$</span> ./get_info.sh
                </div>
                <div className="pl-4 space-y-1.5 text-zinc-400">
                  <p><span className="text-zinc-500">▸ Passionate_About:</span> ['Autonomous Agents', 'RAG & Vector Search', 'LLM Architectures']</p>
                  <p><span className="text-zinc-500">▸ Code_Philosophy:</span> ['Deterministic Reliability', 'Scalable AI Pipelines']</p>
                  <p><span className="text-zinc-500">▸ Current_Focus:</span> ['Multi-Agent Workflows', 'MCP Protocol', 'Fine-Tuning']</p>
                  <p><span className="text-zinc-500">▸ Status:</span> 'Open to AI Engineer roles, AI Research, &amp; System Development.'</p>
                </div>
                <div className="pt-2">
                  <span className="text-emerald-500">veer@ai-station</span>:<span className="text-zinc-500">~$</span> <span className="animate-pulse">▮</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Key Professional Stats Grid */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center space-x-2 tracking-tight uppercase">
              <span>Education &amp; AI Engineering Background</span>
            </h3>
            <p className="text-zinc-400 leading-relaxed font-light text-sm">
              I graduated from <span className="font-semibold text-emerald-450 text-white">MIET, Meerut</span> with a Bachelor of Technology in CSE - Data Science &amp; AI (B.Tech CSE(DS)). Over the last 4 years, I built real systems ranging from agentic code copilots to RAG discovery pipelines. I focus on high-reliability model execution, clean code, and intuitive interfaces.
            </p>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {stats.map((stat, i) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    margin={{ once: true }}
                    className="p-5 rounded-none bg-zinc-900/40 border border-white/5 hover:border-emerald-500/30 transition-all duration-300 group"
                  >
                    <div className="flex items-center space-x-3 mb-2.5">
                      <div className="p-2 bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 group-hover:text-emerald-300 transition-all">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="text-2xl font-black text-white font-mono tracking-tight">{stat.value}</span>
                    </div>
                    <p className="text-xs font-bold text-zinc-350 tracking-widest uppercase">{stat.label}</p>
                    <p className="text-[10px] text-zinc-500 mt-0.5">{stat.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
