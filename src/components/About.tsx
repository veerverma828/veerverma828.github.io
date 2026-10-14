import { User, Terminal, Calendar, Award, Star, Brain } from 'lucide-react';
import { motion } from 'motion/react';
import { personalInfo } from '../data';
import CountUp from './ui/CountUp';
import SpotlightGlow from './ui/SpotlightGlow';

export default function About() {
  const stats = [
    { label: 'CGPA', value: <CountUp to={7.72} decimals={2} />, description: 'MIET Meerut', icon: Award },
    { label: 'Degree', value: 'B.Tech CSE(DS)', description: '2021 – 2025', icon: Calendar },
    { label: 'Key Projects', value: <CountUp to={5} suffix="+" />, description: 'AI & Full Stack', icon: Star },
    { label: 'Main Focus', value: 'Full-Stack AI', description: 'Web apps + GenAI, RAG, Agents', icon: Brain },
  ];

  return (
    <section id="about" className="py-24 bg-[#050505] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-emerald-500/10 border-l-2 border-emerald-500 text-emerald-400 px-3.5 py-1 rounded-none text-xs font-semibold tracking-wider uppercase font-mono mb-4"
          >
            <User className="w-3.5 h-3.5" aria-hidden="true" />
            <span>My Story</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter text-white leading-[1]"
          >
            About <span className="text-emerald-500">me</span>
          </motion.h2>
          <div className="w-16 h-[2px] bg-emerald-500 mx-auto mt-6" />
        </div>

        {/* Story & Statistics Grid */}
        <div className="grid grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] gap-3 sm:gap-6 lg:grid-cols-12 lg:gap-x-16 lg:gap-y-8 items-start">
          
          {/* Left Column: Portrait */}
          <motion.figure
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full max-lg:sticky max-lg:top-20 lg:col-span-5 lg:row-span-2 lg:max-w-xs xl:max-w-sm [@media(min-width:1024px)_and_(min-height:680px)]:sticky [@media(min-width:1024px)_and_(min-height:680px)]:top-28"
          >
            <div className="border border-white/10 bg-zinc-900/40 p-2 sm:p-3 shadow-xl">
              <div className="relative overflow-hidden rounded-md bg-zinc-900">
                <img
                  src="/veer-verma.jpg"
                  alt="Portrait of Veer Verma"
                  width={640}
                  height={640}
                  loading="lazy"
                  className="w-full aspect-[4/5] object-cover object-[50%_20%] brightness-95"
                />
                {/* faint bottom shade so the bright sky sits quietly on the dark page */}
                <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent" />
              </div>
              <figcaption className="px-1 sm:px-2 pt-3 sm:pt-4 pb-1 sm:pb-2">
                <p className="text-sm sm:text-xl font-bold text-white tracking-tight">{personalInfo.name}</p>
                <p className="mt-1 text-[11px] sm:text-sm leading-snug text-zinc-300">Full-Stack &amp; GenAI Developer</p>
                <p className="mt-0.5 text-[11px] sm:text-sm text-zinc-400">{personalInfo.location}</p>
                <p className="mt-3 sm:mt-4 inline-flex items-center gap-2 bg-zinc-950 border border-white/10 px-2 sm:px-3 py-1 sm:py-1.5 text-[11px] font-mono text-zinc-100">
                  <span className="relative flex h-2 w-2" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full animate-ping bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 bg-emerald-500" />
                  </span>
                  Open to work
                </p>
              </figcaption>
            </div>
          </motion.figure>

          {/* Right Column: Terminal bio, background and stats */}
          <div className="contents">
          <div className="min-w-0 lg:col-span-7">
            <div className="w-full bg-zinc-950 rounded-none shadow-2xl overflow-hidden border border-white/10">
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between gap-2 px-2 sm:px-4 py-2 sm:py-3 bg-zinc-900 border-b border-white/5">
                <div className="flex space-x-1.5">
                  <div className="w-2.5 h-2.5 bg-zinc-800" />
                  <div className="w-2.5 h-2.5 bg-zinc-800" />
                  <div className="w-2.5 h-2.5 bg-emerald-500/80" />
                </div>
                <div className="min-w-0 text-[11px] text-zinc-400 font-mono flex items-center space-x-1.5 uppercase tracking-wider">
                  <Terminal className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="truncate">veer_verma_ai.sh</span>
                </div>
                <div className="hidden sm:block w-6" /> {/* spacer */}
              </div>

              {/* Terminal Window Body */}
              <div className="p-3 sm:p-6 text-[11px] sm:text-xs text-zinc-300 font-mono space-y-3 sm:space-y-4 overflow-x-auto leading-relaxed break-words">
                <div>
                  <span className="text-emerald-500">veer@ai-station</span>:<span className="text-zinc-400">~$</span> cat about.txt
                </div>
                <p className="text-zinc-400 italic">
                  "I am a Full-Stack and GenAI developer and Computer Science graduate. I build web apps with generative AI built in: multi-agent workflows, RAG pipelines and LLM integrations, connected to robust full-stack production environments."
                </p>
                <div>
                  <span className="text-emerald-500 font-bold">veer@ai-station</span>:<span className="text-zinc-400">~$</span> ./get_info.sh
                </div>
                <div className="pl-2 sm:pl-4 space-y-1.5 text-zinc-400">
                  <p><span className="text-zinc-400">▸ Passionate_About:</span> ['Autonomous Agents', 'RAG & Vector Search', 'LLM Applications']</p>
                  <p><span className="text-zinc-400">▸ Code_Philosophy:</span> ['Deterministic Reliability', 'Scalable AI Pipelines']</p>
                  <p><span className="text-zinc-400">▸ Current_Focus:</span> ['Multi-Agent Workflows', 'MCP Protocol', 'Fine-Tuning']</p>
                  <p><span className="text-zinc-400">▸ Status:</span> 'Open to Full-Stack and GenAI developer roles.'</p>
                </div>
                <div className="pt-2">
                  <span className="text-emerald-500">veer@ai-station</span>:<span className="text-zinc-400">~$</span> <span className="animate-pulse">▮</span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Professional Stats Grid */}
          <div className="col-span-2 lg:col-span-7 space-y-6 mt-4 lg:mt-0">
            <h3 className="text-xl font-bold text-white flex items-center space-x-2 tracking-tight">
              <span>Education &amp; Background</span>
            </h3>
            <p className="text-zinc-300 leading-relaxed text-base max-w-prose">
              I graduated from <span className="font-semibold text-white">MIET, Meerut</span> with a Bachelor of Technology in CSE - Data Science &amp; AI (B.Tech CSE(DS)). Over the last 4 years, I built real systems ranging from agentic code copilots to RAG discovery pipelines. I focus on high-reliability model execution, clean code, and intuitive interfaces.
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
                    viewport={{ once: true }}
                    className="relative overflow-hidden p-5 rounded-none bg-zinc-900/40 border border-white/5 hover:border-emerald-500/30 transition-all duration-300 group"
                  >
                    <SpotlightGlow />
                    <div className="flex items-center space-x-3 mb-2.5">
                      <div className="p-2 bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 group-hover:text-emerald-300 transition-all">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="text-2xl font-black text-white font-mono tracking-tight">{stat.value}</span>
                    </div>
                    <p className="text-xs font-bold text-zinc-300 tracking-widest uppercase">{stat.label}</p>
                    <p className="text-[11px] text-zinc-400 mt-0.5">{stat.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
          </div>

        </div>

      </div>
    </section>
  );
}
