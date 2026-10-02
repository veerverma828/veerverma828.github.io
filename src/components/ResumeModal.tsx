import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Link as LinkIcon, Download, Loader2, ExternalLink } from 'lucide-react';
import jsPDF from 'jspdf';
import { personalInfo } from '../data';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDownloadPdf = async (e?: React.MouseEvent) => {
    if (e) {
      // Allow default only if fetch is not supported
    }

    try {
      setIsGenerating(true);

      // Attempt 1: Fetch the pre-built clean vector PDF from /public
      const response = await fetch('/Veer_Verma_Resume.pdf');
      if (response.ok) {
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'Veer_Verma_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => window.URL.revokeObjectURL(blobUrl), 1000);
        setIsGenerating(false);
        return;
      }
    } catch (fetchErr) {
      console.warn('Direct fetch failed, using programmatic jsPDF generator', fetchErr);
    }

    // Attempt 2: Programmatic client-side vector jsPDF generation (no canvas dependency)
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = 210;
      const margin = 14;
      const contentWidth = pageWidth - margin * 2;
      let y = 16;

      const addSection = (title: string) => {
        y += 2.5;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(12, 74, 138);
        doc.text(title.toUpperCase(), margin, y);
        y += 1.8;
        doc.setDrawColor(12, 74, 138);
        doc.setLineWidth(0.6);
        doc.line(margin, y, margin + contentWidth, y);
        y += 3.5;
      };

      const addBullet = (text: string, indent = 4) => {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.2);
        doc.setTextColor(30, 41, 59);
        const bulletX = margin + indent;
        const textX = bulletX + 3;
        const maxW = contentWidth - indent - 3;
        doc.setFillColor(30, 41, 59);
        doc.circle(bulletX, y - 1, 0.6, 'F');
        const lines = doc.splitTextToSize(text, maxW);
        doc.text(lines, textX, y);
        y += lines.length * 3.6 + 0.8;
      };

      // Header
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(20);
      doc.setTextColor(15, 23, 42);
      doc.text('Veer Verma', pageWidth / 2, y, { align: 'center' });
      y += 5.5;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(51, 65, 85);
      doc.text('Gen AI Developer · Building Across Web & Mobile', pageWidth / 2, y, { align: 'center' });
      y += 4.5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(71, 85, 105);
      doc.text('+91 7983773466 · veerverma828@gmail.com · LinkedIn · GitHub · Portfolio', pageWidth / 2, y, { align: 'center' });
      y += 3.5;

      // Objective
      addSection('OBJECTIVE');
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(30, 41, 59);
      const obj = 'Computer Science graduate who builds Gen AI applications end-to-end, from multiple AI agents working together to connecting them with real apps on web and mobile. Comfortable working across the whole process, from picking and using the right AI models to putting the final product together, with an eye for getting the details right.';
      const objLines = doc.splitTextToSize(obj, contentWidth);
      doc.text(objLines, margin, y);
      y += objLines.length * 3.8 + 1;

      // Skills
      addSection('TECHNICAL SKILLS');
      const skills = [
        { label: 'Generative AI / LLMs', items: 'LLM APIs, Prompt Engineering, Structured Outputs, Function/Tool Calling, RAG, Embeddings, Hybrid Search, Grounding & Citations' },
        { label: 'AI Agents', items: 'ReAct Agents, Tool-Using Agents, LangGraph, Agent Memory, MCP, Human-in-the-Loop' },
        { label: 'LLM Evaluation', items: 'Golden Datasets, LLM-as-a-Judge, Error Analysis, RAGAS, Regression Testing, Context Precision/Recall, Faithfulness, Answer Relevancy' },
        { label: 'LLM Engineering', items: 'Tokenization, Context Windows, Streaming, Async APIs, Cost Optimization, Prompt Caching, Rate-Limit Handling, Model Routing, Latency Optimization' },
        { label: 'AI Application Development', items: 'Python, FastAPI, REST APIs, SSE, Observability (Langfuse), Environment/Secret Management, MERN Stack' },
        { label: 'AI Security', items: 'Prompt Injection, Indirect Prompt Injection, PII Redaction, Guardrails, Sensitive Information Protection, DPDP Basics' },
      ];
      skills.forEach(s => {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.2);
        doc.setTextColor(15, 23, 42);
        doc.text(s.label, margin, y);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(51, 65, 85);
        const itemLines = doc.splitTextToSize(s.items, contentWidth - 46);
        doc.text(itemLines, margin + 44, y);
        y += itemLines.length * 3.5 + 0.8;
      });

      // Projects
      addSection('TECHNICAL PROJECTS');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.8);
      doc.setTextColor(15, 23, 42);
      doc.text('Qwerywise — Local Retrieval-Augmented Generation (RAG) System', margin, y);
      y += 3.8;
      addBullet('Built a local RAG pipeline with LangChain, Chroma, and Ollama that answers questions grounded in custom documents, using local embedding and generation models with no external API calls.');
      addBullet('Implemented document ingestion and chunking, persistent vector storage, and a retrieval chain (top-k similarity search into a context-injected LLM prompt) with an on-demand re-indexing workflow.');
      y += 0.8;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.8);
      doc.setTextColor(15, 23, 42);
      doc.text('Aggrify — Real-Time Grocery Price Comparison Engine', margin, y);
      y += 3.8;
      addBullet('Aggregates live grocery prices across 5 quick-commerce platforms (Blinkit, Zepto, Instamart, JioMart, and Flipkart) using concurrent Playwright scrapers coordinated through a multi-agent blackboard architecture, streaming results to the React UI via Server-Sent Events.');
      addBullet('Includes a Gemini-powered shopping assistant for basket optimization, fake-discount detection (flags markdowns over 70% as suspicious), and trust scoring (alerts below an 80% reliability threshold).');
      y += 0.8;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.8);
      doc.setTextColor(15, 23, 42);
      doc.text('Media discovery & streaming platform (torrent-gamma.vercel.app)', margin, y);
      y += 3.4;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.2);
      doc.setTextColor(30, 41, 59);
      doc.text('Full-stack MERN platform for movie and series discovery.', margin, y);
      y += 3.2;
      addBullet('Chains 4 external APIs — Cinemeta (metadata/posters), Torrentio (streaming sources), Jackett (torrent search with seeders/size), and Real-Debrid (download/unrestriction) — behind an Express backend.');
      addBullet('Features season-to-episode navigation, IMDb direct search, and debounced auto-search in a state-driven React UI.');
      y += 0.8;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.8);
      doc.setTextColor(15, 23, 42);
      doc.text('NovaShare — Peer-to-Peer File Sharing Application (veerverma828.github.io/novashare)', margin, y);
      y += 3.4;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.2);
      doc.setTextColor(30, 41, 59);
      doc.text('Built a cross-platform P2P sharing app using React, Capacitor, WebRTC, and PeerJS.', margin, y);
      y += 3.2;
      addBullet('Ships 9 features: QR-based device pairing, multi-file/folder transfers, pause/resume, nearby discovery, Wi-Fi Direct, hotspot fallback, clipboard sharing, chat, and transfer history.');
      y += 0.8;

      // Education
      addSection('EDUCATION & CERTIFICATIONS');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.8);
      doc.setTextColor(15, 23, 42);
      doc.text('B.Tech in CSE(Data Science), CGPA: 7.72', margin + 2, y);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(71, 85, 105);
      doc.text('2021 – 2025', margin + contentWidth, y, { align: 'right' });
      y += 5;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.8);
      doc.setTextColor(15, 23, 42);
      doc.text('Google × Kaggle — 5-Day AI Agents Intensive', margin + 2, y);
      y += 3.5;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.2);
      doc.setTextColor(30, 41, 59);
      const kaggle = 'Hands-on Vibe Coding certification: built AI agents that take actions, call tools, and handle multi-step tasks, with memory of past interactions, safety guardrails, and automated testing. Launched and monitored production AI apps using Google AI Studio (Gemini API).';
      const kLines = doc.splitTextToSize(kaggle, contentWidth - 3);
      doc.text(kLines, margin + 2, y);
      y += kLines.length * 3.5 + 2.5;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.2);
      doc.setTextColor(15, 23, 42);
      doc.text('Languages: English (Professional), Hindi (Native)', margin, y);

      doc.save('Veer_Verma_Resume.pdf');
    } catch (err) {
      console.error('Vector PDF generation error:', err);
      window.open('/Veer_Verma_Resume.pdf', '_blank');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyText = () => {
    const resumeText = `
Veer Verma
Gen AI Developer · Building Across Web & Mobile
+91 7983773466 · veerverma828@gmail.com · LinkedIn: https://www.linkedin.com/in/veer-verma · GitHub: https://github.com/veerverma828 · Portfolio: https://veerverma828.github.io

OBJECTIVE
Computer Science graduate who builds Gen AI applications end-to-end, from multiple AI agents working together to connecting them with real apps on web and mobile. Comfortable working across the whole process, from picking and using the right AI models to putting the final product together, with an eye for getting the details right.

TECHNICAL SKILLS
Generative AI / LLMs: LLM APIs, Prompt Engineering, Structured Outputs, Function/Tool Calling, RAG, Embeddings, Hybrid Search, Grounding & Citations
AI Agents: ReAct Agents, Tool-Using Agents, LangGraph, Agent Memory, MCP, Human-in-the-Loop
LLM Evaluation: Golden Datasets, LLM-as-a-Judge, Error Analysis, RAGAS, Regression Testing, Context Precision/Recall, Faithfulness, Answer Relevancy
LLM Engineering: Tokenization, Context Windows, Streaming, Async APIs, Cost Optimization, Prompt Caching, Rate-Limit Handling, Model Routing, Latency Optimization
AI Application Development: Python, FastAPI, REST APIs, SSE, Observability (Langfuse), Environment/Secret Management, MERN Stack
AI Security: Prompt Injection, Indirect Prompt Injection, PII Redaction, Guardrails, Sensitive Information Protection, DPDP Basics

TECHNICAL PROJECTS
Qwerywise — Local Retrieval-Augmented Generation (RAG) System [RAG, LangChain, ChromaDB, Ollama]
• Built a local RAG pipeline with LangChain, Chroma, and Ollama that answers questions grounded in custom documents, using local embedding and generation models with no external API calls.
• Implemented document ingestion and chunking, persistent vector storage, and a retrieval chain (top-k similarity search into a context-injected LLM prompt) with an on-demand re-indexing workflow.

Aggrify — Real-Time Grocery Price Comparison Engine [React, Express, Playwright, Gemini]
• Aggregates live grocery prices across 5 quick-commerce platforms (Blinkit, Zepto, Instamart, JioMart, and Flipkart) using concurrent Playwright scrapers coordinated through a multi-agent blackboard architecture, streaming results to the React UI via Server-Sent Events.
• Includes a Gemini-powered shopping assistant for basket optimization, fake-discount detection (flags markdowns over 70% as suspicious), and trust scoring (alerts below an 80% reliability threshold).

Media discovery & streaming platform [React.js, Node.js, Express.js] (https://torrent-gamma.vercel.app)
• Full-stack MERN platform for movie and series discovery.
• Chains 4 external APIs — Cinemeta (metadata/posters), Torrentio (streaming sources), Jackett (torrent search with seeders/size), and Real-Debrid (download/unrestriction) — behind an Express backend.
• Features season-to-episode navigation, IMDb direct search, and debounced auto-search in a state-driven React UI.

NovaShare — Peer-to-Peer File Sharing Application [React, Capacitor, WebRTC, PeerJS] (https://veerverma828.github.io/novashare)
• Built a cross-platform P2P sharing app using React, Capacitor, WebRTC, and PeerJS.
• Ships 9 features: QR-based device pairing, multi-file/folder transfers, pause/resume, nearby discovery, Wi-Fi Direct, hotspot fallback, clipboard sharing, chat, and transfer history.

EDUCATION & CERTIFICATIONS
B.Tech in CSE(Data Science), CGPA: 7.72 | 2021 – 2025
Google × Kaggle — 5-Day AI Agents Intensive
Hands-on Vibe Coding certification: built AI agents that take actions, call tools, and handle multi-step tasks, with memory of past interactions, safety guardrails, and automated testing. Launched and monitored production AI apps using Google AI Studio (Gemini API).

Languages: English (Professional), Hindi (Native)
    `;

    navigator.clipboard.writeText(resumeText.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 print:p-0 print:bg-white print:relative print:inset-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Modal Container */}
      <div className="bg-[#111111] border border-white/10 rounded-lg w-full max-w-4xl shadow-2xl relative overflow-hidden flex flex-col h-[94vh] print:h-auto print:border-none print:shadow-none print:bg-white print:rounded-none">
        
        {/* Top Header Bar (Hidden in print) */}
        <div className="px-5 py-3.5 bg-zinc-950 border-b border-white/10 flex items-center justify-between print:hidden">
          <div className="flex items-center space-x-3">
            <span className="text-[10px] bg-emerald-500 text-black px-2.5 py-0.5 rounded font-bold uppercase tracking-widest font-mono">
              Live Resume
            </span>
            <span className="text-xs sm:text-sm font-semibold text-zinc-300 font-mono">Veer_Verma_Resume.pdf</span>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Copy button */}
            <button
              onClick={handleCopyText}
              className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded border border-white/10 flex items-center space-x-1.5 text-xs font-medium cursor-pointer transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Copy Text</span>
                </>
              )}
            </button>

            {/* Direct Native PDF Download Anchor */}
            <a
              href="/Veer_Verma_Resume.pdf"
              download="Veer_Verma_Resume.pdf"
              onClick={handleDownloadPdf}
              className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded flex items-center space-x-1.5 text-xs cursor-pointer transition-all shadow-sm"
              title="Download Veer_Verma_Resume.pdf directly to your computer"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Save PDF</span>
                </>
              )}
            </a>

            {/* Open in New Tab */}
            <a
              href="/Veer_Verma_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded border border-white/10 flex items-center space-x-1.5 text-xs font-medium cursor-pointer transition-colors"
              title="Open PDF in a new browser tab"
            >
              <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
              <span className="hidden sm:inline">Open PDF</span>
            </a>

            {/* Modal Exit */}
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-white/10 cursor-pointer transition-colors ml-1"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Document Sheet */}
        <div className="p-4 sm:p-8 md:p-10 flex-1 overflow-y-auto bg-white text-slate-900 print:overflow-visible print:p-0">
          
          {/* Custom print CSS for pixel-exact 1-page formatting */}
          <style dangerouslySetInnerHTML={{__html: `
            @media print {
              @page {
                size: letter portrait;
                margin: 0.4in;
              }
              body {
                background: white !important;
                color: #0f172a !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              body * {
                visibility: hidden;
              }
              #printable-cv, #printable-cv * {
                visibility: visible;
              }
              #printable-cv {
                position: absolute !important;
                top: 0 !important;
                left: 0 !important;
                width: 100% !important;
                padding: 0 !important;
                margin: 0 !important;
              }
            }
          `}} />

          {/* Printable Resume Core (exact recreation of user's PDF) */}
          <div id="printable-cv" className="max-w-[760px] mx-auto space-y-4 select-text font-sans text-[11px] leading-tight text-slate-800">
            
            {/* Header: Name, Title, Contact */}
            <div className="text-center space-y-1">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-serif">
                Veer Verma
              </h1>
              <p className="text-[12px] font-semibold text-slate-700">
                Gen AI Developer <span className="text-slate-400">·</span> Building Across Web &amp; Mobile
              </p>
              
              {/* Contact details */}
              <div className="flex flex-wrap justify-center items-center gap-x-2 text-[10.5px] text-slate-650 pt-0.5">
                <span>+91 7983773466</span>
                <span className="text-slate-400">·</span>
                <a 
                  href={`mailto:${personalInfo.email}`} 
                  className="hover:text-blue-700 transition-colors"
                >
                  {personalInfo.email}
                </a>
                <span className="text-slate-400">·</span>
                <a 
                  href="https://www.linkedin.com/in/veer-verma" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-700 hover:underline gap-0.5"
                >
                  <LinkIcon className="w-2.5 h-2.5" /> LinkedIn
                </a>
                <span className="text-slate-400">·</span>
                <a 
                  href="https://github.com/veerverma828" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-700 hover:underline gap-0.5"
                >
                  <LinkIcon className="w-2.5 h-2.5" /> GitHub
                </a>
                <span className="text-slate-400">·</span>
                <a 
                  href="https://veerverma828.github.io" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-700 hover:underline gap-0.5"
                >
                  <LinkIcon className="w-2.5 h-2.5" /> Portfolio
                </a>
              </div>
            </div>

            {/* OBJECTIVE */}
            <div className="space-y-1">
              <h2 className="text-[11.5px] font-bold text-[#0c4a8a] tracking-wider uppercase border-b-[2px] border-[#0c4a8a] pb-0.5">
                OBJECTIVE
              </h2>
              <p className="text-[10.5px] text-slate-800 leading-[1.35] text-justify font-normal">
                Computer Science graduate who builds Gen AI applications end-to-end, from multiple AI agents working together to connecting them with real apps on web and mobile. Comfortable working across the whole process, from picking and using the right AI models to putting the final product together, with an eye for getting the details right.
              </p>
            </div>

            {/* TECHNICAL SKILLS */}
            <div className="space-y-1.5">
              <h2 className="text-[11.5px] font-bold text-[#0c4a8a] tracking-wider uppercase border-b-[2px] border-[#0c4a8a] pb-0.5">
                TECHNICAL SKILLS
              </h2>
              <div className="space-y-1 text-[10.5px] leading-[1.3]">
                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                  <span className="font-bold text-slate-900 w-48 shrink-0">Generative AI / LLMs</span>
                  <span className="text-slate-800 font-normal">LLM APIs, Prompt Engineering, Structured Outputs, Function/Tool Calling, RAG, Embeddings, Hybrid Search, Grounding &amp; Citations</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                  <span className="font-bold text-slate-900 w-48 shrink-0">AI Agents</span>
                  <span className="text-slate-800 font-normal">ReAct Agents, Tool-Using Agents, LangGraph, Agent Memory, MCP, Human-in-the-Loop</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                  <span className="font-bold text-slate-900 w-48 shrink-0">LLM Evaluation</span>
                  <span className="text-slate-800 font-normal">Golden Datasets, LLM-as-a-Judge, Error Analysis, RAGAS, Regression Testing, Context Precision/Recall, Faithfulness, Answer Relevancy</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                  <span className="font-bold text-slate-900 w-48 shrink-0">LLM Engineering</span>
                  <span className="text-slate-800 font-normal">Tokenization, Context Windows, Streaming, Async APIs, Cost Optimization, Prompt Caching, Rate-Limit Handling, Model Routing, Latency Optimization</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                  <span className="font-bold text-slate-900 w-48 shrink-0">AI Application Development</span>
                  <span className="text-slate-800 font-normal">Python, FastAPI, REST APIs, SSE, Observability (Langfuse), Environment/Secret Management, MERN Stack</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                  <span className="font-bold text-slate-900 w-48 shrink-0">AI Security</span>
                  <span className="text-slate-800 font-normal">Prompt Injection, Indirect Prompt Injection, PII Redaction, Guardrails, Sensitive Information Protection, DPDP Basics</span>
                </div>
              </div>
            </div>

            {/* TECHNICAL PROJECTS */}
            <div className="space-y-2.5">
              <h2 className="text-[11.5px] font-bold text-[#0c4a8a] tracking-wider uppercase border-b-[2px] border-[#0c4a8a] pb-0.5">
                TECHNICAL PROJECTS
              </h2>

              <div className="space-y-2.5 text-[10.5px]">
                {/* Project 1: Qwerywise */}
                <div className="space-y-0.5">
                  <div className="flex items-baseline justify-between flex-wrap gap-1">
                    <h3 className="font-bold text-slate-900 text-[11px]">
                      Qwerywise <span className="font-normal">— Local Retrieval-Augmented Generation (RAG) System</span>
                    </h3>
                    <span className="bg-[#eaf1fb] text-[#0c4a8a] px-2 py-0.5 rounded text-[9.5px] font-semibold border border-[#cbe0f8]">
                      RAG, LangChain, ChromaDB, Ollama
                    </span>
                  </div>
                  <ul className="list-disc pl-4 space-y-0.5 text-slate-800 leading-[1.3]">
                    <li>Built a local RAG pipeline with LangChain, Chroma, and Ollama that answers questions grounded in custom documents, using local embedding and generation models with no external API calls.</li>
                    <li>Implemented document ingestion and chunking, persistent vector storage, and a retrieval chain (top-k similarity search into a context-injected LLM prompt) with an on-demand re-indexing workflow.</li>
                  </ul>
                </div>

                {/* Project 2: Aggrify */}
                <div className="space-y-0.5">
                  <div className="flex items-baseline justify-between flex-wrap gap-1">
                    <h3 className="font-bold text-slate-900 text-[11px]">
                      Aggrify <span className="font-normal">— Real-Time Grocery Price Comparison Engine</span>
                    </h3>
                    <span className="bg-[#eaf1fb] text-[#0c4a8a] px-2 py-0.5 rounded text-[9.5px] font-semibold border border-[#cbe0f8]">
                      React, Express, Playwright, Gemini
                    </span>
                  </div>
                  <ul className="list-disc pl-4 space-y-0.5 text-slate-800 leading-[1.3]">
                    <li>Aggregates live grocery prices across 5 quick-commerce platforms (Blinkit, Zepto, Instamart, JioMart, and Flipkart) using concurrent Playwright scrapers coordinated through a multi-agent blackboard architecture, streaming results to the React UI via Server-Sent Events.</li>
                    <li>Includes a Gemini-powered shopping assistant for basket optimization, fake-discount detection (flags markdowns over 70% as suspicious), and trust scoring (alerts below an 80% reliability threshold).</li>
                  </ul>
                </div>

                {/* Project 3: Media discovery & streaming platform */}
                <div className="space-y-0.5">
                  <div className="flex items-baseline justify-between flex-wrap gap-1">
                    <h3 className="font-bold text-slate-900 text-[11px]">
                      Media discovery &amp; streaming platform
                    </h3>
                    <span className="bg-[#eaf1fb] text-[#0c4a8a] px-2 py-0.5 rounded text-[9.5px] font-semibold border border-[#cbe0f8]">
                      React.js · Node.js · Express.js
                    </span>
                  </div>
                  <div>
                    <a 
                      href="https://torrent-gamma.vercel.app" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#0c4a8a] hover:underline text-[10px] inline-flex items-center gap-0.5 font-medium"
                    >
                      <span>↗ torrent-gamma.vercel.app</span>
                    </a>
                  </div>
                  <p className="text-slate-800 leading-[1.3]">Full-stack MERN platform for movie and series discovery.</p>
                  <ul className="list-disc pl-4 space-y-0.5 text-slate-800 leading-[1.3]">
                    <li>Chains 4 external APIs — Cinemeta (metadata/posters), Torrentio (streaming sources), Jackett (torrent search with seeders/size), and Real-Debrid (download/unrestriction) — behind an Express backend.</li>
                    <li>Features season-to-episode navigation, IMDb direct search, and debounced auto-search in a state-driven React UI.</li>
                  </ul>
                </div>

                {/* Project 4: NovaShare */}
                <div className="space-y-0.5">
                  <div className="flex items-baseline justify-between flex-wrap gap-1">
                    <h3 className="font-bold text-slate-900 text-[11px]">
                      NovaShare <span className="font-normal">— Peer-to-Peer File Sharing Application</span>
                    </h3>
                    <span className="bg-[#eaf1fb] text-[#0c4a8a] px-2 py-0.5 rounded text-[9.5px] font-semibold border border-[#cbe0f8]">
                      React, Capacitor, WebRTC, PeerJS
                    </span>
                  </div>
                  <div>
                    <a 
                      href="https://veerverma828.github.io/novashare" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#0c4a8a] hover:underline text-[10px] inline-flex items-center gap-0.5 font-medium"
                    >
                      <span>↗ veerverma828.github.io/novashare</span>
                    </a>
                  </div>
                  <p className="text-slate-800 leading-[1.3]">Built a cross-platform P2P sharing app using React, Capacitor, WebRTC, and PeerJS.</p>
                  <ul className="list-disc pl-4 space-y-0.5 text-slate-800 leading-[1.3]">
                    <li>Ships 9 features: QR-based device pairing, multi-file/folder transfers, pause/resume, nearby discovery, Wi-Fi Direct, hotspot fallback, clipboard sharing, chat, and transfer history.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* EDUCATION & CERTIFICATIONS */}
            <div className="space-y-2">
              <h2 className="text-[11.5px] font-bold text-[#0c4a8a] tracking-wider uppercase border-b-[2px] border-[#0c4a8a] pb-0.5">
                EDUCATION &amp; CERTIFICATIONS
              </h2>

              <div className="space-y-2 text-[10.5px]">
                {/* Degree */}
                <div className="flex justify-between items-baseline border-l-[3px] border-[#0c4a8a] pl-2">
                  <h3 className="font-bold text-slate-900 text-[11px]">
                    B.Tech in CSE(Data Science), CGPA: 7.72
                  </h3>
                  <span className="font-semibold text-slate-700 text-[10.5px]">2021 – 2025</span>
                </div>

                {/* Kaggle Cert */}
                <div className="space-y-0.5 border-l-[3px] border-[#0c4a8a] pl-2">
                  <h3 className="font-bold text-slate-900 text-[11px]">
                    Google × Kaggle — 5-Day AI Agents Intensive
                  </h3>
                  <p className="text-slate-800 leading-[1.3]">
                    Hands-on Vibe Coding certification: built AI agents that take actions, call tools, and handle multi-step tasks, with memory of past interactions, safety guardrails, and automated testing. Launched and monitored production AI apps using Google AI Studio (Gemini API).
                  </p>
                </div>

                {/* Languages */}
                <div className="pt-0.5 text-slate-800">
                  <span className="font-bold text-slate-900">Languages:</span> English (Professional), Hindi (Native)
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Modal Footer Controls (Hidden during printing) */}
        <div className="px-5 py-3 bg-zinc-950 border-t border-white/10 flex items-center justify-between print:hidden">
          <span className="text-[11px] font-mono text-zinc-400">
            Click &apos;Download PDF&apos; to save your clean 1-page resume directly as a PDF file.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded border border-white/10 text-xs font-semibold cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
