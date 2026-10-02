import { useEffect } from 'react';
import { X, Download, ExternalLink, FileText } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RESUME_URL = '/Veer_Verma_Resume.pdf';

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-[#111111] border border-white/10 rounded-lg w-full max-w-4xl shadow-2xl relative overflow-hidden flex flex-col h-[94vh]">
        {/* Top bar */}
        <div className="px-4 sm:px-5 py-3.5 bg-zinc-950 border-b border-white/10 flex items-center justify-between gap-3">
          <div className="flex items-center space-x-3 min-w-0">
            <span className="text-[10px] bg-emerald-500 text-black px-2.5 py-0.5 rounded font-bold uppercase tracking-widest font-mono shrink-0">
              Resume
            </span>
            <span className="hidden sm:inline text-sm font-semibold text-zinc-300 font-mono truncate">
              Veer_Verma_Resume.pdf
            </span>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            <a
              href={RESUME_URL}
              download="Veer_Verma_Resume.pdf"
              className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded flex items-center space-x-1.5 text-xs transition-all"
              title="Download Veer_Verma_Resume.pdf"
            >
              <Download className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Save PDF</span>
            </a>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded border border-white/10 flex items-center space-x-1.5 text-xs font-medium transition-colors"
              title="Open PDF in a new tab"
            >
              <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
              <span className="hidden sm:inline">Open PDF</span>
            </a>
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-white/10 cursor-pointer transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* The resume PDF itself. Browsers that can't embed PDFs (most phones) show the fallback. */}
        <object
          data={`${RESUME_URL}#view=FitH`}
          type="application/pdf"
          className="flex-1 w-full bg-white"
          aria-label="Veer Verma resume"
        >
          <div className="h-full flex flex-col items-center justify-center text-center gap-4 p-8 bg-zinc-950">
            <FileText className="w-10 h-10 text-emerald-400" />
            <p className="text-sm text-zinc-300 max-w-xs">
              Your browser can&apos;t preview PDFs here. Open or download the resume instead.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 py-3 bg-emerald-500 text-black font-bold text-xs uppercase tracking-wider text-center"
              >
                Open Resume
              </a>
              <a
                href={RESUME_URL}
                download="Veer_Verma_Resume.pdf"
                className="flex-1 px-4 py-3 bg-zinc-900 border border-white/10 text-zinc-200 font-bold text-xs uppercase tracking-wider text-center"
              >
                Download
              </a>
            </div>
          </div>
        </object>
      </div>
    </div>
  );
}
