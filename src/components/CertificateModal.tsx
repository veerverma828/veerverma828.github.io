import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Award, 
  ExternalLink, 
  CheckCircle2, 
  Maximize2
} from 'lucide-react';
import { Achievement } from '../types';

interface CertificateModalProps {
  achievement: Achievement | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CertificateModal({ achievement, isOpen, onClose }: CertificateModalProps) {
  const [certImage, setCertImage] = useState<string>('/certificate.png');
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  useEffect(() => {
    if (achievement) {
      if (achievement.certificateImage) {
        setCertImage(achievement.certificateImage);
      } else {
        setCertImage('/certificate.png');
      }
    }
  }, [achievement]);

  if (!isOpen || !achievement) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto bg-black/80 backdrop-blur-md">
        
        {/* Backdrop click to close */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.4 }}
          className="relative w-full max-w-4xl bg-zinc-950 border border-emerald-500/30 rounded-none shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 bg-zinc-900/90 border-b border-white/10 shrink-0">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 block">
                  Official Credentials & Certificate
                </span>
                <h3 className="text-base font-bold text-white uppercase tracking-wider leading-tight">
                  {achievement.title}
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              title="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            
            {/* Certificate Display Screen / Preview Canvas */}
            <div className="relative group bg-zinc-900 border border-white/10 rounded-none overflow-hidden p-4 min-h-[320px] flex items-center justify-center">
              <div className="relative w-full flex flex-col items-center">
                <img
                  src={certImage}
                  alt={`${achievement.title} Certificate`}
                  className={`max-w-full rounded border border-white/10 shadow-xl object-contain transition-transform duration-300 ${
                    isZoomed ? 'scale-125 cursor-zoom-out' : 'max-h-[500px] cursor-zoom-in'
                  }`}
                  onClick={() => setIsZoomed(!isZoomed)}
                  onError={() => {
                    setCertImage('/certificate.svg');
                  }}
                />
                
                {/* Image Action Overlay Toolbar */}
                <div className="mt-3 flex items-center space-x-3">
                  <button
                    onClick={() => setIsZoomed(!isZoomed)}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-mono font-semibold bg-zinc-950 border border-white/20 text-zinc-300 hover:text-white hover:border-emerald-500/50"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{isZoomed ? 'Zoom Out' : 'Zoom In'}</span>
                  </button>

                  <a
                    href={certImage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-mono font-semibold bg-zinc-950 border border-white/20 text-zinc-300 hover:text-white hover:border-emerald-500/50"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Open High Resolution Image</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Achievement Specification Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 font-mono">
              {achievement.certificateId && (
                <div className="p-4 bg-zinc-900/60 border border-white/5">
                  <span className="text-[10px] text-zinc-400 uppercase tracking-widest block mb-1">
                    Credential ID
                  </span>
                  <span className="text-xs font-bold text-white">
                    {achievement.certificateId}
                  </span>
                </div>
              )}

              <div className="p-4 bg-zinc-900/60 border border-white/5">
                <span className="text-[10px] text-zinc-400 uppercase tracking-widest block mb-1">
                  Issuing Organization
                </span>
                <span className="text-xs font-bold text-emerald-400">
                  {achievement.organization}
                </span>
              </div>
            </div>

            {/* Key Skills & Competencies */}
            {achievement.skills && achievement.skills.length > 0 && (
              <div>
                <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-2">
                  Verified Skills &amp; Competencies:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {achievement.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-mono px-2.5 py-1 bg-zinc-900 border border-emerald-500/20 text-emerald-400 font-semibold"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}



          </div>

          {/* Footer Bar */}
          <div className="px-6 py-3 bg-zinc-900 border-t border-white/10 flex items-center justify-between shrink-0 font-mono text-xs">
            <span className="text-zinc-500">
              Veer Verma • Portfolio Certificate Viewer
            </span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
