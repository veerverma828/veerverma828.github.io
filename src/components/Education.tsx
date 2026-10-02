import React, { useState } from 'react';
import { Award, GraduationCap, Calendar, Star, Sparkles, Terminal, Shield, Users, Bot, CheckCircle2, Eye, FileCheck, Image as ImageIcon, ChevronDown, ChevronUp, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { educationHistory, achievements } from '../data';
import { Achievement } from '../types';
import CertificateModal from './CertificateModal';

// Map icon names to Lucide icons
const iconMap: { [key: string]: React.ComponentType<any> } = {
  Terminal: Terminal,
  Award: Award,
  Layers: Shield,
  Users: Users,
  Bot: Bot,
};

export default function Education() {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [isCertModalOpen, setIsCertModalOpen] = useState<boolean>(false);
  const [revealedCertTitles, setRevealedCertTitles] = useState<{ [key: string]: boolean }>({});

  const handleOpenCert = (ach: Achievement) => {
    setSelectedAchievement(ach);
    setIsCertModalOpen(true);
  };

  const toggleInlineCert = (title: string) => {
    setRevealedCertTitles(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  return (
    <section id="education" className="py-24 bg-[#050505] transition-colors duration-300 relative overflow-hidden">
      {/* Background Soft Dot Matrix */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-emerald-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-emerald-500/10 border-l-2 border-emerald-500 text-emerald-400 px-3.5 py-1.5 rounded-none text-xs font-semibold tracking-wider uppercase font-mono mb-4"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic &amp; Certification Logs</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase"
          >
            Education &amp; Qualifications
          </motion.h2>
          <div className="w-16 h-[2px] bg-emerald-500 mx-auto mt-4" />
        </div>

        {/* Grid: Education (Left) vs Achievements (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Education Timeline Cards */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-lg font-bold uppercase tracking-wider text-white flex items-center space-x-2 mb-4 border-b border-white/5 pb-3">
              <GraduationCap className="w-5 h-5 text-emerald-400" />
              <span>Academic History</span>
            </h3>

            <div className="space-y-6 relative border-l border-white/5 pl-6 ml-3">
              {educationHistory.map((edu, idx) => (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.12 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  {/* Timeline Node Point */}
                  <div className="absolute -left-[30px] top-1.5 w-3 h-3 rounded-none bg-zinc-950 border border-emerald-500 group-hover:bg-emerald-500 transition-colors" />

                  {/* Education Detail Card */}
                  <div className="p-5 rounded-none bg-zinc-900/40 border border-white/5 hover:border-emerald-500/20 backdrop-blur-sm transition-all duration-300">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-none text-[9px] font-bold font-mono tracking-widest text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 mb-3 uppercase">
                      <Calendar className="w-3 h-3 mr-1" />
                      {edu.duration}
                    </span>
                    
                    <h4 className="text-sm font-bold uppercase tracking-wider text-white leading-snug">
                      {edu.degree}
                    </h4>
                    
                    <p className="text-xs font-semibold text-zinc-400 mt-1 flex items-center space-x-1 uppercase tracking-wider">
                      <span className="text-emerald-400">{edu.institution}</span>
                    </p>

                    <div className="inline-flex items-center mt-3 px-2 py-0.5 bg-zinc-950 border border-white/5 rounded-none">
                      <Star className="w-3 h-3 text-emerald-400 mr-1.5 fill-current" />
                      <span className="text-[10px] font-bold font-mono text-white uppercase tracking-widest">{edu.grade} </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Achievements Cards */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-lg font-bold uppercase tracking-wider text-white flex items-center space-x-2 mb-4 border-b border-white/5 pb-3">
              <Award className="w-5 h-5 text-emerald-400" />
              <span>Achievements &amp; Certifications</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {achievements.map((ach, idx) => {
                const CoreIcon = iconMap[ach.icon] || Award;
                const isFeatured = Boolean(ach.keyPoints && ach.keyPoints.length > 0);

                return (
                  <motion.div
                    key={ach.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className={`p-5 rounded-none bg-zinc-900/40 border transition-all duration-300 group flex flex-col justify-between ${
                      isFeatured
                        ? 'sm:col-span-2 border-emerald-500/30 bg-emerald-950/10 hover:border-emerald-500/50'
                        : 'border-white/5 hover:border-emerald-500/30'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3.5">
                        {/* Icon wrapper */}
                        <div className="p-2.5 rounded-none bg-zinc-950 text-emerald-400 w-max border border-white/5">
                          <CoreIcon className="w-4 h-4 text-emerald-400" />
                        </div>
                        {ach.year && (
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 uppercase tracking-widest font-bold">
                            {ach.year}
                          </span>
                        )}
                      </div>
                      
                      {/* Organization */}
                      <span className="text-[9px] font-black uppercase text-emerald-400 tracking-widest font-mono">
                        {ach.organization}
                      </span>
                      
                      {/* Title */}
                      <h4 className="text-sm font-bold text-white mt-1 leading-snug uppercase tracking-wide">
                        {ach.title}
                      </h4>
                      
                      {/* Description */}
                      <p className="text-[11px] text-zinc-300 mt-2 font-light leading-relaxed">
                        {ach.description}
                      </p>

                      {/* Layman Key Highlights */}
                      {ach.keyPoints && ach.keyPoints.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-white/10 space-y-2">
                          <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest block mb-2">
                            What I Learned (Layman Terms):
                          </span>
                          {ach.keyPoints.map((point, pIdx) => (
                            <div key={pIdx} className="flex items-start space-x-2 text-[11px] text-zinc-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span className="leading-snug">{point}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Skills Badges */}
                      {ach.skills && ach.skills.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {ach.skills.map((skill) => (
                            <span
                              key={skill}
                              className="text-[9px] font-mono font-semibold px-2 py-0.5 bg-zinc-950 text-zinc-300 border border-white/10 uppercase tracking-wider"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Animated Inline Certificate Image Reveal Container */}
                      <AnimatePresence>
                        {revealedCertTitles[ach.title] && (
                          <motion.div
                            initial={{ opacity: 0, height: 0, scale: 0.98 }}
                            animate={{ opacity: 1, height: 'auto', scale: 1 }}
                            exit={{ opacity: 0, height: 0, scale: 0.98 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden mt-5 pt-4 border-t border-emerald-500/30"
                          >
                            <div className="relative group bg-zinc-950 border border-emerald-500/40 p-3 sm:p-4 shadow-2xl">
                              <div className="flex items-center justify-between mb-3 font-mono text-[10px] text-emerald-400 uppercase tracking-widest border-b border-emerald-500/20 pb-2">
                                <div className="flex items-center space-x-2 font-bold">
                                  <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
                                  <span>Official Certificate Image (Google × Kaggle)</span>
                                </div>
                                <span className="text-zinc-400 font-normal">Issued July 30, 2026</span>
                              </div>

                              <div className="relative overflow-hidden bg-black border border-white/10 group cursor-pointer" onClick={() => handleOpenCert(ach)}>
                                <img
                                  src={ach.certificateImage || '/certificate.png'}
                                  alt={`${ach.title} Official Certificate`}
                                  className="w-full h-auto object-contain max-h-[380px] transition-transform duration-500 group-hover:scale-[1.02]"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = '/certificate.svg';
                                  }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                                  <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-500 text-black font-mono text-xs font-bold uppercase tracking-wider shadow-lg">
                                    <Maximize2 className="w-3.5 h-3.5" />
                                    <span>Click to Inspect Fullscreen</span>
                                  </span>
                                </div>
                              </div>

                              <div className="mt-3 flex items-center justify-end text-[11px] font-mono">
                                <button
                                  onClick={() => handleOpenCert(ach)}
                                  className="text-emerald-400 hover:text-emerald-300 font-bold uppercase tracking-wider flex items-center space-x-1"
                                >
                                  <span>Full Details &amp; Verification</span>
                                  <Maximize2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Action Bar */}
                    <div className="pt-4 border-t border-white/5 mt-4 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center space-x-1.5 text-[9px] text-emerald-400 font-mono uppercase tracking-widest">
                        <Sparkles className="w-3 h-3 text-emerald-400" />
                        <span>Verified Google Certification</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        {/* Reveal Animation Button */}
                        <button
                          onClick={() => toggleInlineCert(ach.title)}
                          className={`inline-flex items-center space-x-1.5 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider transition-all border ${
                            revealedCertTitles[ach.title]
                              ? 'bg-emerald-500 text-black border-emerald-400 shadow-md'
                              : 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/20'
                          }`}
                        >
                          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                          <span>{revealedCertTitles[ach.title] ? 'Hide Certificate' : 'Reveal Certificate ✨'}</span>
                          {revealedCertTitles[ach.title] ? (
                            <ChevronUp className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                          )}
                        </button>

                        {/* Fullscreen Modal View Button */}
                        <button
                          onClick={() => handleOpenCert(ach)}
                          className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-zinc-950 border border-white/10 text-zinc-300 hover:text-white hover:border-emerald-500/50 font-mono text-[10px] font-bold uppercase tracking-wider transition-all"
                          title="Open Fullscreen Viewer"
                        >
                          <Eye className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="hidden sm:inline">Inspect</span>
                        </button>
                      </div>
                    </div>

                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* Certificate Viewer Modal */}
      <CertificateModal
        achievement={selectedAchievement}
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
      />
    </section>
  );
}
