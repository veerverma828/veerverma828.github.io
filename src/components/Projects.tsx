import React, { useState } from 'react';
import { ExternalLink, Github, FolderGit2, Check, Tv, Calendar, FileText, Play, Plus, Clock, FileCheck, Award, Upload, Settings, Search, ArrowRight, Star, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { projects, personalInfo } from '../data';
import { Project } from '../types';

export default function Projects() {
  const [activeTab, setActiveTab] = useState<'All' | 'AI Systems' | 'Full Stack' | 'Utility'>('All');

  const filteredProjects = projects.filter((project) => {
    if (activeTab === 'All') return true;
    return project.category === activeTab;
  });

  // Pure CSS Render helper for Premium Visual Mockup
  const renderVisualMockup = (placeholderType: string, title: string) => {
    switch (placeholderType) {
      case 'movie-discovery':
        return (
          <div className="w-full h-48 bg-[#0B0D14] rounded-xl relative p-2 overflow-hidden flex flex-col font-sans border border-slate-800/60">
            {/* Top Bar Navigation Mockup */}
            <div className="relative z-10 flex items-start justify-between mb-2">
              <div className="w-5" /> {/* Spacer for centering */}
              <div className="flex flex-col items-center">
                <div className="flex flex-col items-center leading-none">
                  <span className="text-[12px] font-black italic text-white tracking-widest drop-shadow-md">TORRENT</span>
                  <div className="flex items-center -mt-0.5">
                    <ArrowRight className="w-2 h-2 text-white rotate-90 mr-0.5 drop-shadow-md" />
                    <span className="text-[6px] font-bold text-white tracking-[0.2em] drop-shadow-md">DEBRID</span>
                  </div>
                </div>
                <div className="flex bg-[#1A1C23] rounded-full mt-1.5 p-0.5">
                  <span className="px-2 py-0.5 bg-[#2A2D35] text-white rounded-full text-[5px] font-medium">Real-Debrid</span>
                  <span className="px-2 py-0.5 text-slate-400 text-[5px] font-medium">Torbox</span>
                </div>
              </div>
              <div className="w-5 h-5 rounded-full bg-[#1A1C23] flex items-center justify-center text-slate-400 border border-slate-700/50">
                <Settings className="w-3 h-3" />
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative z-10 mx-auto w-[85%] h-5 bg-[#1A1C23] border border-slate-700/50 rounded-full flex items-center justify-between px-2 mb-1.5">
              <div className="flex items-center space-x-1.5 text-slate-400">
                <Search className="w-2.5 h-2.5" />
                <span className="text-[6px]">Search movies or series...</span>
              </div>
              <div className="w-3.5 h-3.5 bg-[#2A2D35] rounded-full flex items-center justify-center">
                <ArrowRight className="w-2 h-2 text-white" />
              </div>
            </div>

            {/* Hero Banner */}
            <div className="relative z-10 h-[76px] w-[95%] mx-auto rounded-lg bg-gradient-to-r from-[#11131A] to-[#1A1C23] overflow-hidden border border-slate-700/50 p-1.5 flex flex-col justify-center mb-1.5 shrink-0">
              <div className="absolute top-0 right-0 bottom-0 w-2/3 bg-gradient-to-l from-[#3b3a32]/20 to-transparent pointer-events-none" />
              
              <div className="relative z-10 w-[75%]">
                <h4 className="text-[10px] font-black text-white leading-tight mb-0.5">Breaking Bad</h4>
                
                {/* Badges */}
                <div className="flex flex-wrap gap-1 mb-1 items-center">
                  <div className="flex items-center space-x-0.5 border border-yellow-600/50 px-1 rounded-sm text-[4px] text-yellow-500 bg-yellow-900/20">
                    <Star className="w-1.5 h-1.5 fill-current" />
                    <span className="font-bold">9.5</span>
                  </div>
                  <span className="bg-[#1A1C23] border border-slate-700/80 px-1 rounded-sm text-[4px] text-slate-300">2008–2013</span>
                  <span className="bg-[#1A1C23] border border-[#1d4ed8]/50 px-1 rounded-sm text-[4px] text-blue-400">Crime</span>
                  <span className="bg-[#1A1C23] border border-[#1d4ed8]/50 px-1 rounded-sm text-[4px] text-blue-400">Drama</span>
                  <span className="bg-[#1A1C23] border border-[#1d4ed8]/50 px-1 rounded-sm text-[4px] text-blue-400">Thriller</span>
                </div>

                {/* Synopsis */}
                <p className="text-[4.5px] text-slate-300 leading-tight mb-1.5 line-clamp-2">
                  A chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine with a former student to secure his family's future.
                </p>

                {/* Buttons */}
                <div className="flex space-x-1.5">
                  <div className="bg-white text-black px-2 py-0.5 rounded-sm text-[4.5px] font-bold flex items-center space-x-0.5">
                    <Play className="w-2 h-2 fill-current" />
                    <span>Play</span>
                  </div>
                  <div className="bg-[#2A2D35] text-white border border-slate-600/50 px-2 py-0.5 rounded-sm text-[4.5px] font-bold flex items-center space-x-0.5">
                    <Info className="w-2 h-2" />
                    <span>More Info</span>
                  </div>
                </div>
              </div>

              {/* Carousel Dots */}
              <div className="absolute bottom-1.5 right-2 flex space-x-0.5">
                <div className="w-1.5 h-0.5 bg-red-600 rounded-full" />
                <div className="w-0.5 h-0.5 bg-slate-500 rounded-full" />
                <div className="w-0.5 h-0.5 bg-slate-500 rounded-full" />
                <div className="w-0.5 h-0.5 bg-slate-500 rounded-full" />
                <div className="w-0.5 h-0.5 bg-slate-500 rounded-full" />
              </div>
            </div>

            {/* Trending Movies Snippet */}
            <div className="relative z-10 px-1">
              <h5 className="text-[6px] font-bold text-white mb-1">Trending Movies</h5>
              <div className="flex space-x-1.5 overflow-hidden">
                <div className="w-8 h-10 bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded border border-slate-700 shrink-0 relative overflow-hidden">
                  <div className="absolute top-0.5 right-0.5 bg-black/80 text-yellow-500 text-[4px] px-0.5 rounded-sm flex items-center font-bold"><Star className="w-1 h-1 fill-current mr-[1px]"/>6.9</div>
                </div>
                <div className="w-8 h-10 bg-gradient-to-br from-indigo-900/30 to-slate-800 rounded border border-slate-700 shrink-0 relative overflow-hidden">
                  <div className="absolute top-0.5 right-0.5 bg-black/80 text-yellow-500 text-[4px] px-0.5 rounded-sm flex items-center font-bold"><Star className="w-1 h-1 fill-current mr-[1px]"/>8.0</div>
                </div>
                <div className="w-8 h-10 bg-gradient-to-br from-emerald-900/20 to-slate-800 rounded border border-slate-700 shrink-0 relative overflow-hidden">
                  <div className="absolute top-0.5 right-0.5 bg-black/80 text-yellow-500 text-[4px] px-0.5 rounded-sm flex items-center font-bold"><Star className="w-1 h-1 fill-current mr-[1px]"/>6.7</div>
                </div>
                <div className="w-8 h-10 bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded border border-slate-700 shrink-0 relative overflow-hidden">
                  <div className="absolute top-0.5 right-0.5 bg-black/80 text-yellow-500 text-[4px] px-0.5 rounded-sm flex items-center font-bold"><Star className="w-1 h-1 fill-current mr-[1px]"/>8.2</div>
                </div>
                <div className="w-8 h-10 bg-gradient-to-br from-yellow-900/30 to-slate-800 rounded border border-slate-700 shrink-0 relative overflow-hidden">
                  <div className="absolute top-0.5 right-0.5 bg-black/80 text-yellow-500 text-[4px] px-0.5 rounded-sm flex items-center font-bold"><Star className="w-1 h-1 fill-current mr-[1px]"/>7.0</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'doctor-booking':
        return (
          <div className="w-full h-48 bg-slate-950 rounded-xl relative p-3 overflow-hidden flex flex-col justify-between border border-slate-800">
            {/* Top Bar Mockup */}
            <div className="flex items-center justify-between border-b border-slate-850 pb-2">
              <div className="flex items-center space-x-1.5">
                <span className="text-[9px] font-sans font-bold text-teal-400">⚡ DocAppoint</span>
              </div>
              <span className="text-[7px] bg-teal-500/10 text-teal-350 px-1.5 py-0.5 rounded font-mono">Live Logs</span>
            </div>

            {/* Profile / Selector */}
            <div className="flex items-center space-x-2 my-1">
              <div className="w-7 text-[8px] h-7 rounded-full bg-teal-500/15 border border-teal-500 flex items-center justify-center font-bold text-teal-300">
                Dr.
              </div>
              <div className="flex-1 space-y-0.5">
                <h4 className="text-[10px] font-bold text-white leading-tight">Dr. Veer Verma, MD</h4>
                <p className="text-[7px] text-slate-450">Cardiology Specialist • Available Today</p>
              </div>
              <span className="text-[8px] bg-slate-800 text-teal-400 px-1.5 py-0.5 rounded font-mono font-bold border border-slate-700">9:00 AM</span>
            </div>

            {/* Mini Calendar Scheduler Grid */}
            <div className="grid grid-cols-6 gap-1 pr-1">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, ix) => (
                <div key={day} className={`p-1 rounded text-center border transition-all ${
                  ix === 2 
                    ? 'bg-teal-505/20 border-teal-500 text-teal-300' 
                    : ix === 1 
                    ? 'bg-red-500/10 border-red-500/20 text-red-400 opacity-60' 
                    : 'bg-slate-900 border-slate-850 text-slate-400'
                }`}>
                  <p className="text-[6px] uppercase font-mono font-black">{day}</p>
                  <p className="text-[8px] font-bold mt-0.5">{16 + ix}</p>
                </div>
              ))}
            </div>

            {/* Bottom Status bar */}
            <div className="flex items-center justify-between text-[7px] text-slate-450 border-t border-slate-850 pt-1">
              <span className="flex items-center text-[7px]"><Clock className="w-2.5 h-2.5 text-teal-500 mr-1" /> Slot Confirmed</span>
              <span className="text-teal-400 font-mono font-bold uppercase text-[7px]">Feedback 4.9★</span>
            </div>
          </div>
        );

      case 'resume-builder':
        return (
          <div className="w-full h-48 bg-slate-950 rounded-xl relative p-3 overflow-hidden flex flex-col justify-between border border-slate-800">
            {/* Split layout: Edit Panel vs Preview Sheet */}
            <div className="grid grid-cols-12 gap-3 h-full">
              
              {/* Left Side: Form entry simulation */}
              <div className="col-span-6 border-r border-slate-850 pr-2 flex flex-col justify-between">
                <span className="text-[7px] text-slate-550 font-bold uppercase font-mono">Draft Fields</span>
                <div className="space-y-1">
                  <div className="space-y-0.5">
                    <div className="text-[6px] text-slate-450">Full Name</div>
                    <div className="h-3 bg-slate-900 rounded border border-slate-800 text-[6px] text-white flex items-center px-1"> Veer Verma</div>
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-[6px] text-slate-450">Primary Role</div>
                    <div className="h-3 bg-slate-900 rounded border border-slate-800 text-[6px] text-slate-400 flex items-center px-1 truncate"> Full Stack Engineer</div>
                  </div>
                </div>
                <div className="p-1 rounded bg-teal-500/10 border border-teal-500/20 text-[6px] text-teal-300 font-bold text-center">
                  ✨ Instant PDF Print Ready
                </div>
              </div>

              {/* Right Side: Virtual Document Sheet preview */}
              <div className="col-span-6 bg-white dark:bg-white rounded p-1.5 text-slate-900 flex flex-col justify-between shadow-md">
                <div className="space-y-1">
                  <div className="border-b-[0.5px] border-slate-300 pb-1 text-center">
                    <h5 className="text-[9px] font-black text-slate-900 leading-tight">VEER VERMA</h5>
                    <p className="text-[5px] text-teal-600 font-mono tracking-widest font-bold">FULL STACK DEVELOPER</p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[5px] font-extrabold text-slate-700 uppercase">Core Skills</p>
                    <div className="flex flex-wrap gap-0.5">
                      <span className="text-[4px] bg-slate-100 text-slate-800 px-0.5 rounded">MERN</span>
                      <span className="text-[4px] bg-slate-100 text-slate-800 px-0.5 rounded">REST APIs</span>
                      <span className="text-[4px] bg-slate-100 text-slate-800 px-0.5 rounded">Linux</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-1 border-t-[0.5px] border-slate-100">
                  <span className="text-[4px] text-slate-400 font-mono">veerverma.pdf</span>
                  <FileCheck className="w-2 h-2 text-teal-650" />
                </div>
              </div>

            </div>
          </div>
        );

      case 'nova-share':
        return (
          <div className="w-full h-48 bg-[#0B0D14] rounded-xl relative p-3 overflow-hidden flex flex-col border border-slate-800/60 font-sans">
            {/* Header */}
            <div className="relative z-10 text-center mb-2">
              <h4 className="text-[11px] font-bold text-white tracking-wide">Secure P2P File Sharing</h4>
              <p className="text-[6px] text-slate-400 mt-0.5 leading-tight px-4">
                Transfer files directly browser-to-browser. Encrypted, private, with zero size limits.
              </p>
            </div>

            {/* Tabs */}
            <div className="relative z-10 flex border border-slate-800 rounded-md overflow-hidden mb-2">
              <div className="flex-1 bg-violet-600 text-white text-[7px] font-bold text-center py-1">Home</div>
              <div className="flex-1 bg-transparent text-slate-400 text-[7px] font-bold text-center py-1">Apps</div>
            </div>

            {/* Drag & Drop Area */}
            <div className="relative z-10 border border-dashed border-violet-900/50 rounded-lg bg-violet-950/10 flex flex-col items-center justify-center py-2 mb-2">
              <div className="w-6 h-6 rounded-md bg-violet-900/30 flex items-center justify-center mb-1">
                <Upload className="w-3.5 h-3.5 text-violet-400" />
              </div>
              <span className="text-[8px] font-bold text-white mb-0.5">Drag & drop your files here</span>
              <span className="text-[5px] text-slate-500 mb-1.5">or click to browse files from your device</span>
              <span className="text-[5px] font-semibold text-violet-400 border border-violet-900 bg-violet-950/30 px-2 py-0.5 rounded-full">NO FILE SIZE LIMITS</span>
            </div>

            {/* Receive Section */}
            <div className="relative z-10 mt-auto">
              <div className="flex items-center justify-center mb-1.5">
                <div className="h-[1px] w-12 bg-slate-800" />
                <span className="text-[5px] text-slate-500 px-2">or receive a file</span>
                <div className="h-[1px] w-12 bg-slate-800" />
              </div>
              
              <div className="flex space-x-1 mb-1.5">
                <div className="flex-1 border border-slate-800 rounded flex items-center bg-[#0F111A] px-1.5 h-5">
                  <span className="text-slate-500 text-[6px] mr-1">↓</span>
                  <span className="text-[6px] text-slate-600 font-mono flex-1">Enter Room Code (e.g. 4D8G2X)</span>
                </div>
                <div className="w-5 h-5 border border-slate-800 rounded flex items-center justify-center bg-[#0F111A]">
                  <span className="text-[6px] text-slate-500 font-mono">QR</span>
                </div>
              </div>
              
              <div className="w-full h-5 border border-slate-800 rounded flex items-center justify-center bg-[#0F111A] text-white text-[7px] font-bold">
                Connect & Download
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="w-full h-48 bg-slate-900 rounded-xl flex items-center justify-center">
            <FolderGit2 className="w-12 h-12 text-slate-700 animate-pulse" />
          </div>
        );
    }
  };

  return (
    <section id="projects" className="py-24 bg-[#050505] transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            margin={{ once: true }}
            className="inline-flex items-center space-x-2 bg-emerald-500/10 border-l-2 border-emerald-500 text-emerald-400 px-3 py-1 rounded-none text-xs font-semibold tracking-wider uppercase font-mono mb-4"
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>My Work</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            margin={{ once: true }}
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase"
          >
            Featured Projects
          </motion.h2>
          <p className="text-zinc-400 mt-3 max-w-xl mx-auto text-xs font-light">
            Here are key AI systems and intelligent applications I have engineered, focusing on agentic workflows, LLM orchestration, vector search, and robust software architecture.
          </p>
          <div className="w-16 h-[2px] bg-emerald-500 mx-auto mt-4" />
        </div>

        {/* Tab Selection Row */}
        <div className="w-full overflow-x-auto pb-2 sm:pb-0 mb-8 sm:mb-12 scrollbar-none touch-pan-x">
          <div className="flex sm:flex-wrap items-center sm:justify-center gap-2.5 min-w-max sm:min-w-0 px-1">
            {['All', 'AI Systems', 'Full Stack', 'Utility'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-5 py-2.5 rounded-none text-xs font-bold uppercase tracking-widest transition-all cursor-pointer min-h-[44px] flex items-center justify-center touch-manipulation active:scale-95 whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-emerald-500 text-black shadow-md font-extrabold'
                    : 'bg-zinc-900 text-zinc-400 border border-white/10 hover:bg-zinc-800 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
        >
          <AnimatePresence>
            {filteredProjects.map((project: Project) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                key={project.id}
                className="flex flex-col bg-[#0b0b0b] border border-white/5 rounded-none hover:border-emerald-500/30 transition-all duration-300 overflow-hidden group shadow-none"
              >
                
                {/* Visual Mockup Container (Interactive SVG replacement for images) */}
                <div className="p-4 bg-zinc-950 rounded-none relative overflow-hidden border-b border-white/5">
                  <div className="absolute top-2 left-2 z-10">
                    <span className="text-[8px] font-black uppercase tracking-widest font-mono px-2 py-0.5 rounded-none bg-emerald-500 text-black">
                      {project.category}
                    </span>
                  </div>
                  {renderVisualMockup(project.imagePlaceholder, project.title)}
                </div>

                {/* Content Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-3.5">
                    {/* Project Title */}
                    <h3 className="text-base font-bold uppercase tracking-wider text-white leading-snug group-hover:text-emerald-450 transition-colors">
                      {project.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-xs text-zinc-400 leading-relaxed font-light">
                      {project.description}
                    </p>

                    {/* Tags row */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-[10px] font-bold font-mono tracking-wider text-emerald-400 bg-emerald-500/5 px-2 py-0.5 border border-emerald-500/10 rounded-none uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Divider */}
                    <div className="border-t border-white/5 pt-3.5" />

                    {/* Highlights Title */}
                    <p className="text-[10px] font-bold uppercase text-zinc-500 tracking-wider font-mono">Highlights &amp; Features</p>

                    {/* Highlight Items */}
                    <ul className="space-y-1.5 pl-0 text-xs">
                      {project.keyHighlights.slice(0, 5).map((hl) => (
                        <li key={hl} className="flex items-start space-x-2 text-zinc-400 leading-snug">
                          <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                          <span className="font-light">{hl}</span>
                        </li>
                      ))}
                      {project.keyHighlights.length > 5 && (
                        <li className="text-[10px] text-zinc-500 italic pl-5">
                          + {project.keyHighlights.length - 5} more integrated capabilities
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Actions Link Row */}
                  <div className="flex items-center space-x-3 pt-3">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      referrerPolicy="no-referrer"
                      className="flex-1 flex items-center justify-center space-x-1.5 px-3 py-2 bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold uppercase tracking-wider rounded-none transition-all duration-200"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        referrerPolicy="no-referrer"
                        className="flex items-center justify-center p-2 bg-zinc-900 border border-white/5 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-none transition-all duration-200"
                        title="Source Code"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Call to action for secondary assets */}
        <div className="mt-16 text-center">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            referrerPolicy="no-referrer"
            className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-emerald-400 hover:text-emerald-300 border-b border-emerald-500/20 pb-1"
          >
            <span>Browse more repositories on GitHub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
