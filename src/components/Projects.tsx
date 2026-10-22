import React from 'react';
import { ExternalLink, Github, FolderGit2, Check, Clock, FileCheck, Upload, Settings, Search, ArrowRight, Star, Info, Play, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { projects, personalInfo } from '../data';
import { Project } from '../types';
import SpotlightGlow from './ui/SpotlightGlow';

// On phones only the first few cards show until the visitor asks for the rest.
const MOBILE_VISIBLE_PROJECTS = 3;

export default function Projects() {
  const [showAllMobile, setShowAllMobile] = React.useState(false);

  // Pure CSS render helper for the visual mockups. Decorative only (aria-hidden); all text is >=10px.
  const renderVisualMockup = (placeholderType: string, title: string) => {
    switch (placeholderType) {
      case 'movie-discovery':
        return (
          <div className="w-full h-48 bg-[#0B0D14] rounded-xl relative p-3 overflow-hidden flex flex-col font-sans border border-slate-800/60">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] font-black italic text-white tracking-widest">MEDIA<span className="text-red-500">+</span></span>
              <div className="w-5 h-5 rounded-full bg-[#1A1C23] flex items-center justify-center text-slate-400 border border-slate-700/50">
                <Settings className="w-3 h-3" />
              </div>
            </div>

            {/* Search bar */}
            <div className="h-6 bg-[#1A1C23] border border-slate-700/50 rounded-full flex items-center justify-between px-2.5 mb-2">
              <div className="flex items-center space-x-1.5 text-slate-400">
                <Search className="w-3 h-3" />
                <span className="text-[10px]">Search movies or series...</span>
              </div>
              <ArrowRight className="w-3 h-3 text-white" />
            </div>

            {/* Featured banner */}
            <div className="relative flex-1 min-h-0 rounded-lg bg-gradient-to-r from-[#11131A] to-[#1A1C23] border border-slate-700/50 px-2.5 py-2 flex flex-col justify-center mb-2">
              <div className="absolute top-0 right-0 bottom-0 w-2/3 bg-gradient-to-l from-[#3b3a32]/20 to-transparent pointer-events-none" />
              <h4 className="relative text-[12px] font-black text-white leading-tight mb-1">Breaking Bad</h4>
              <div className="relative flex items-center gap-1.5 mb-1.5">
                <span className="flex items-center gap-0.5 border border-yellow-600/50 px-1 rounded-sm text-[10px] text-yellow-500 bg-yellow-900/20 font-bold">
                  <Star className="w-2.5 h-2.5 fill-current" />9.5
                </span>
                <span className="border border-[#1d4ed8]/50 bg-[#1A1C23] px-1 rounded-sm text-[10px] text-blue-400">Crime</span>
                <span className="border border-[#1d4ed8]/50 bg-[#1A1C23] px-1 rounded-sm text-[10px] text-blue-400">Drama</span>
              </div>
              <div className="relative flex gap-1.5">
                <span className="bg-white text-black px-2 py-0.5 rounded-sm text-[10px] font-bold flex items-center gap-1">
                  <Play className="w-2.5 h-2.5 fill-current" />Play
                </span>
                <span className="bg-[#2A2D35] text-white border border-slate-600/50 px-2 py-0.5 rounded-sm text-[10px] font-bold flex items-center gap-1">
                  <Info className="w-2.5 h-2.5" />Info
                </span>
              </div>
            </div>

            {/* Poster row */}
            <div className="flex gap-1.5 overflow-hidden shrink-0">
              {['from-purple-900/30 to-blue-900/30', 'from-indigo-900/30 to-slate-800', 'from-emerald-900/20 to-slate-800', 'from-cyan-900/30 to-blue-900/30', 'from-yellow-900/30 to-slate-800', 'from-rose-900/30 to-slate-800'].map((g) => (
                <div key={g} className={`w-9 h-7 bg-gradient-to-br ${g} rounded border border-slate-700 shrink-0`} />
              ))}
            </div>
          </div>
        );

      case 'doctor-booking':
        return (
          <div className="w-full h-48 bg-slate-950 rounded-xl relative p-3 overflow-hidden flex flex-col justify-between border border-slate-800">
            {/* Top bar */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-[11px] font-sans font-bold text-teal-400">⚡ DocAppoint</span>
              <span className="text-[10px] bg-teal-500/10 text-teal-300 px-1.5 py-0.5 rounded font-mono">Live Logs</span>
            </div>

            {/* Profile */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 shrink-0 rounded-full bg-teal-500/15 border border-teal-500 flex items-center justify-center text-[10px] font-bold text-teal-300">
                Dr.
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[12px] font-bold text-white leading-tight truncate">Dr. Veer Verma, MD</h4>
                <p className="text-[10px] text-slate-400 truncate">Cardiology • Available today</p>
              </div>
              <span className="text-[10px] bg-slate-800 text-teal-400 px-1.5 py-0.5 rounded font-mono font-bold border border-slate-700">9:00 AM</span>
            </div>

            {/* Mini calendar */}
            <div className="grid grid-cols-6 gap-1">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, ix) => (
                <div key={day} className={`py-1 rounded text-center border ${
                  ix === 2
                    ? 'bg-teal-500/20 border-teal-500 text-teal-300'
                    : ix === 1
                    ? 'bg-red-500/10 border-red-500/20 text-red-400 opacity-60'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}>
                  <p className="text-[10px] uppercase font-mono font-black leading-tight">{day}</p>
                  <p className="text-[10px] font-bold leading-tight">{16 + ix}</p>
                </div>
              ))}
            </div>

            {/* Status bar */}
            <div className="flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-800 pt-1.5">
              <span className="flex items-center"><Clock className="w-3 h-3 text-teal-500 mr-1" />Slot confirmed</span>
              <span className="text-teal-400 font-mono font-bold uppercase">4.9★</span>
            </div>
          </div>
        );

      case 'resume-builder':
        return (
          <div className="w-full h-48 bg-slate-950 rounded-xl relative p-3 overflow-hidden border border-slate-800">
            <div className="grid grid-cols-12 gap-3 h-full">
              {/* Form side */}
              <div className="col-span-6 border-r border-slate-800 pr-2 flex flex-col justify-between">
                <span className="text-[10px] text-slate-400 font-bold uppercase font-mono">Draft fields</span>
                <div className="space-y-1.5">
                  <div>
                    <div className="text-[10px] text-slate-400 leading-tight">Full name</div>
                    <div className="h-4 bg-slate-900 rounded border border-slate-800 text-[10px] text-white flex items-center px-1 truncate">Veer Verma</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 leading-tight">Role</div>
                    <div className="h-4 bg-slate-900 rounded border border-slate-800 text-[10px] text-slate-300 flex items-center px-1 truncate">Full Stack Engineer</div>
                  </div>
                </div>
                <div className="py-0.5 rounded bg-teal-500/10 border border-teal-500/20 text-[10px] text-teal-300 font-bold text-center truncate">✨ PDF ready</div>
              </div>

              {/* Document preview */}
              <div className="col-span-6 bg-white rounded p-1.5 text-slate-900 flex flex-col justify-between shadow-md">
                <div className="space-y-1">
                  <div className="border-b border-slate-300 pb-1 text-center">
                    <h5 className="text-[11px] font-black text-slate-900 leading-tight">VEER VERMA</h5>
                    <p className="text-[10px] text-teal-700 font-mono font-bold truncate">FULL STACK DEV</p>
                  </div>
                  <p className="text-[10px] font-extrabold text-slate-700 uppercase leading-tight">Core skills</p>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-[10px] bg-slate-100 text-slate-800 px-1 rounded leading-tight">MERN</span>
                    <span className="text-[10px] bg-slate-100 text-slate-800 px-1 rounded leading-tight">REST</span>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-1 border-t border-slate-200">
                  <span className="text-[10px] text-slate-500 font-mono">veerverma.pdf</span>
                  <FileCheck className="w-3 h-3 text-teal-700" />
                </div>
              </div>
            </div>
          </div>
        );

      case 'nova-share':
        return (
          <div className="w-full h-48 bg-[#0B0D14] rounded-xl relative p-3 overflow-hidden flex flex-col border border-slate-800/60 font-sans">
            {/* Header */}
            <div className="text-center mb-2">
              <h4 className="text-[12px] font-bold text-white tracking-wide">Secure P2P File Sharing</h4>
              <p className="text-[10px] text-slate-400 leading-tight">Browser-to-browser. Encrypted and private.</p>
            </div>

            {/* Tabs */}
            <div className="flex border border-slate-800 rounded-md overflow-hidden mb-2">
              <div className="flex-1 bg-violet-600 text-white text-[10px] font-bold text-center py-0.5">Home</div>
              <div className="flex-1 text-slate-400 text-[10px] font-bold text-center py-0.5">Apps</div>
            </div>

            {/* Drop area */}
            <div className="flex-1 min-h-0 border border-dashed border-violet-900/60 rounded-lg bg-violet-950/10 flex flex-col items-center justify-center gap-1 mb-2">
              <Upload className="w-4 h-4 text-violet-400" />
              <span className="text-[11px] font-bold text-white">Drag &amp; drop your files here</span>
              <span className="text-[10px] font-semibold text-violet-300 border border-violet-900 bg-violet-950/30 px-2 rounded-full">NO SIZE LIMITS</span>
            </div>

            {/* Receive row */}
            <div className="flex gap-1 shrink-0">
              <div className="flex-1 min-w-0 border border-slate-800 rounded flex items-center bg-[#0F111A] px-1.5 h-6">
                <span className="text-[10px] text-slate-400 font-mono truncate">Room code, e.g. 4D8G2X</span>
              </div>
              <div className="px-2 h-6 border border-slate-800 rounded flex items-center bg-[#0F111A] text-white text-[10px] font-bold">Connect</div>
            </div>
          </div>
        );

      case 'querywise':
        return (
          <div className="w-full h-48 bg-[#0B0D14] rounded-xl relative p-3 overflow-hidden flex flex-col border border-slate-800/60 font-sans">
            {/* Header */}
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[12px] font-bold text-white tracking-wide">Querywise</span>
              <span className="text-[10px] font-mono text-emerald-400 border border-emerald-900 bg-emerald-950/30 px-1.5 rounded-full">LOCAL · QWEN 2.5 7B</span>
            </div>

            {/* User message */}
            <div className="self-end max-w-[85%] bg-emerald-600/90 text-white text-[10px] px-2 py-0.5 rounded-md mb-1.5 truncate">
              Research RAG evaluation, save a report
            </div>

            {/* Agent steps */}
            <div className="space-y-1 mb-1.5">
              <div className="flex items-center space-x-1.5 border border-slate-800 bg-[#0F111A] rounded px-1.5 py-0.5">
                <Search className="w-3 h-3 text-emerald-400 shrink-0" />
                <span className="text-[10px] text-slate-300 font-mono flex-1 truncate">web_search("RAG evaluation")</span>
                <Check className="w-3 h-3 text-emerald-500 shrink-0" />
              </div>
              <div className="flex items-center space-x-1.5 border border-slate-800 bg-[#0F111A] rounded px-1.5 py-0.5">
                <FileText className="w-3 h-3 text-emerald-400 shrink-0" />
                <span className="text-[10px] text-slate-300 font-mono flex-1 truncate">search_documents(top_k=2)</span>
                <Check className="w-3 h-3 text-emerald-500 shrink-0" />
              </div>
            </div>

            {/* Approval card */}
            <div className="mt-auto border border-amber-700/40 bg-amber-950/10 rounded-md px-1.5 py-1">
              <div className="text-[10px] font-bold text-amber-300 mb-1 truncate">Approval needed: save_report</div>
              <div className="flex gap-1">
                <span className="text-[10px] font-bold text-black bg-emerald-500 px-2 rounded">Approve</span>
                <span className="text-[10px] font-bold text-slate-300 border border-slate-700 px-2 rounded">Edit</span>
                <span className="text-[10px] font-bold text-slate-300 border border-slate-700 px-2 rounded">Reject</span>
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
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-emerald-500/10 border-l-2 border-emerald-500 text-emerald-400 px-3.5 py-1 rounded-none text-xs font-semibold tracking-wider uppercase font-mono mb-4"
          >
            <FolderGit2 className="w-3.5 h-3.5" aria-hidden="true" />
            <span>My Work</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter text-white leading-[1]"
          >
            Featured <span className="text-emerald-500">projects</span>
          </motion.h2>
          <p className="text-zinc-300 mt-5 max-w-2xl mx-auto text-base leading-relaxed">
            Here are key AI systems and intelligent applications I have engineered, focusing on agentic workflows, LLM orchestration, vector search, and robust software architecture.
          </p>
          <div className="w-16 h-[2px] bg-emerald-500 mx-auto mt-6" />
        </div>

        {/* Projects Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
        >
          <AnimatePresence>
            {projects.map((project: Project, idx: number) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                whileHover={{ y: -6 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                key={project.id}
                className={`${!showAllMobile && idx >= MOBILE_VISIBLE_PROJECTS ? 'hidden md:flex' : 'flex'} relative flex-col bg-[#0b0b0b] border border-white/5 rounded-none hover:border-emerald-500/40 hover:shadow-[0_20px_60px_-30px_rgba(16,185,129,0.35)] transition-[border-color,box-shadow] duration-300 overflow-hidden group`}
              >
                <SpotlightGlow />
                
                {/* Visual Mockup Container (Interactive SVG replacement for images) */}
                <div aria-hidden="true" className="p-4 bg-zinc-950 rounded-none relative overflow-hidden border-b border-white/5">
                  {renderVisualMockup(project.imagePlaceholder, project.title)}
                </div>

                {/* Content Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-3.5">
                    {/* Project Title */}
                    <span className="block font-mono text-3xl font-black leading-none text-transparent [-webkit-text-stroke:1px_rgba(52,211,153,0.6)]" aria-hidden="true">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-xl font-bold tracking-tight text-white leading-snug group-hover:text-emerald-400 transition-colors">
                      {project.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tags row */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-[11px] font-bold font-mono tracking-wider text-emerald-400 bg-emerald-500/5 px-2 py-0.5 border border-emerald-500/10 rounded-none uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Divider */}
                    <div className="border-t border-white/5 pt-3.5" />

                    {/* Highlights Title */}
                    <p className="text-[11px] font-bold uppercase text-zinc-400 tracking-wider font-mono">Highlights &amp; Features</p>

                    {/* Highlight Items */}
                    <ul className="space-y-2 pl-0 text-sm">
                      {project.keyHighlights.slice(0, 5).map((hl) => (
                        <li key={hl} className="flex items-start space-x-2 text-zinc-400 leading-snug">
                          <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                          <span>{hl}</span>
                        </li>
                      ))}
                      {project.keyHighlights.length > 5 && (
                        <li className="text-[11px] text-zinc-400 italic pl-5">
                          + {project.keyHighlights.length - 5} more integrated capabilities
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Actions Link Row */}
                  <div className="flex items-center space-x-3 pt-3">
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        referrerPolicy="no-referrer"
                        aria-label={`Live demo of ${project.title} (opens in a new tab)`}
                        className="flex-1 flex items-center justify-center space-x-1.5 px-3 py-3 min-h-[44px] bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold uppercase tracking-wider rounded-none transition-all duration-200"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span
                        aria-disabled="true"
                        className="flex-1 flex items-center justify-center space-x-1.5 px-3 py-2 min-h-[44px] bg-zinc-900 border border-white/10 text-zinc-400 text-xs font-bold uppercase tracking-wider rounded-none cursor-not-allowed select-none"
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>Coming Soon..</span>
                      </span>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        referrerPolicy="no-referrer"
                        aria-label={`Source code for ${project.title} on GitHub (opens in a new tab)`}
                        className="flex items-center justify-center p-3 min-h-[44px] min-w-[44px] bg-zinc-900 border border-white/5 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-none transition-all duration-200"
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

        {projects.length > MOBILE_VISIBLE_PROJECTS && (
          <div className="mt-8 text-center md:hidden">
            <button
              type="button"
              onClick={() => setShowAllMobile((v) => !v)}
              aria-expanded={showAllMobile}
              className="px-6 py-3 min-h-[44px] bg-zinc-900 border border-white/10 hover:border-emerald-500/40 text-emerald-400 text-xs font-bold uppercase tracking-widest cursor-pointer transition-colors"
            >
              {showAllMobile ? 'Show fewer projects' : `Show all ${projects.length} projects`}
            </button>
          </div>
        )}

        {/* Call to action for secondary assets */}
        <div className="mt-16 text-center">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            referrerPolicy="no-referrer"
            className="inline-flex items-center space-x-2 min-h-[44px] text-xs font-bold uppercase tracking-widest text-emerald-400 hover:text-emerald-300 border-b border-emerald-500/20"
          >
            <span>Browse more repositories on GitHub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
