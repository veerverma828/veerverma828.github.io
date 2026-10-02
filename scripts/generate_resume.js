import { jsPDF } from 'jspdf';
import fs from 'fs';
import path from 'path';

const doc = new jsPDF({
  orientation: 'portrait',
  unit: 'mm',
  format: 'a4', // 210 x 297 mm
});

const pageWidth = 210;
const pageHeight = 297;
const margin = 14;
const contentWidth = pageWidth - margin * 2; // 182mm

let y = 16;

// Helper: Section title with blue underline
function addSectionHeader(title) {
  y += 2.5;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(12, 74, 138); // #0c4a8a
  doc.text(title.toUpperCase(), margin, y);
  
  y += 1.8;
  doc.setDrawColor(12, 74, 138);
  doc.setLineWidth(0.6);
  doc.line(margin, y, margin + contentWidth, y);
  y += 3.5;
}

// Helper: Bullet point
function addBullet(text, indent = 4) {
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.2);
  doc.setTextColor(30, 41, 59); // slate-800
  
  const bulletX = margin + indent;
  const textX = bulletX + 3;
  const maxW = contentWidth - indent - 3;
  
  // draw small dot
  doc.setFillColor(30, 41, 59);
  doc.circle(bulletX, y - 1, 0.6, 'F');
  
  const lines = doc.splitTextToSize(text, maxW);
  doc.text(lines, textX, y);
  y += lines.length * 3.6 + 0.8;
}

// 1. Header: Name & Title
doc.setFont('helvetica', 'bold');
doc.setFontSize(20);
doc.setTextColor(15, 23, 42); // slate-900
doc.text('Veer Verma', pageWidth / 2, y, { align: 'center' });
y += 5.5;

doc.setFont('helvetica', 'bold');
doc.setFontSize(10);
doc.setTextColor(51, 65, 85); // slate-700
doc.text('Gen AI Developer  ·  Building Across Web & Mobile', pageWidth / 2, y, { align: 'center' });
y += 4.5;

// Contact Line
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(71, 85, 105);

const contactText = '+91 7983773466   ·   veerverma828@gmail.com   ·   LinkedIn   ·   GitHub   ·   Portfolio';
doc.text(contactText, pageWidth / 2, y, { align: 'center' });
y += 3.5;

// 2. OBJECTIVE
addSectionHeader('OBJECTIVE');
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(30, 41, 59);
const objective = 'Computer Science graduate who builds Gen AI applications end-to-end, from multiple AI agents working together to connecting them with real apps on web and mobile. Comfortable working across the whole process, from picking and using the right AI models to putting the final product together, with an eye for getting the details right.';
const objLines = doc.splitTextToSize(objective, contentWidth);
doc.text(objLines, margin, y);
y += objLines.length * 3.8 + 1;

// 3. TECHNICAL SKILLS
addSectionHeader('TECHNICAL SKILLS');

const skillsList = [
  { label: 'Generative AI / LLMs', items: 'LLM APIs, Prompt Engineering, Structured Outputs, Function/Tool Calling, RAG, Embeddings, Hybrid Search, Grounding & Citations' },
  { label: 'AI Agents', items: 'ReAct Agents, Tool-Using Agents, LangGraph, Agent Memory, MCP, Human-in-the-Loop' },
  { label: 'LLM Evaluation', items: 'Golden Datasets, LLM-as-a-Judge, Error Analysis, RAGAS, Regression Testing, Context Precision/Recall, Faithfulness, Answer Relevancy' },
  { label: 'LLM Engineering', items: 'Tokenization, Context Windows, Streaming, Async APIs, Cost Optimization, Prompt Caching, Rate-Limit Handling, Model Routing, Latency Optimization' },
  { label: 'AI Application Development', items: 'Python, FastAPI, REST APIs, SSE, Observability (Langfuse), Environment/Secret Management, MERN Stack' },
  { label: 'AI Security', items: 'Prompt Injection, Indirect Prompt Injection, PII Redaction, Guardrails, Sensitive Information Protection, DPDP Basics' },
];

skillsList.forEach(s => {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.2);
  doc.setTextColor(15, 23, 42);
  const labelW = 44;
  doc.text(s.label, margin, y);
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);
  const itemsW = contentWidth - labelW - 2;
  const itemLines = doc.splitTextToSize(s.items, itemsW);
  doc.text(itemLines, margin + labelW, y);
  y += itemLines.length * 3.5 + 0.8;
});

// 4. TECHNICAL PROJECTS
addSectionHeader('TECHNICAL PROJECTS');

// Project 1: Qwerywise
doc.setFont('helvetica', 'bold');
doc.setFontSize(8.8);
doc.setTextColor(15, 23, 42);
doc.text('Qwerywise', margin, y);
const qweryW = doc.getTextWidth('Qwerywise');
doc.setFont('helvetica', 'normal');
doc.text(' — Local Retrieval-Augmented Generation (RAG) System', margin + qweryW, y);

// Pill on right
const pill1 = 'RAG, LangChain, ChromaDB, Ollama';
doc.setFont('helvetica', 'bold');
doc.setFontSize(7.5);
doc.setTextColor(12, 74, 138);
const pill1W = doc.getTextWidth(pill1) + 4;
doc.setFillColor(234, 241, 251);
doc.setDrawColor(203, 224, 248);
doc.setLineWidth(0.2);
doc.roundedRect(margin + contentWidth - pill1W, y - 3, pill1W, 4.2, 1, 1, 'FD');
doc.text(pill1, margin + contentWidth - pill1W + 2, y);
y += 3.8;

addBullet('Built a local RAG pipeline with LangChain, Chroma, and Ollama that answers questions grounded in custom documents, using local embedding and generation models with no external API calls.');
addBullet('Implemented document ingestion and chunking, persistent vector storage, and a retrieval chain (top-k similarity search into a context-injected LLM prompt) with an on-demand re-indexing workflow.');
y += 0.8;

// Project 2: Aggrify
doc.setFont('helvetica', 'bold');
doc.setFontSize(8.8);
doc.setTextColor(15, 23, 42);
doc.text('Aggrify', margin, y);
const aggrW = doc.getTextWidth('Aggrify');
doc.setFont('helvetica', 'normal');
doc.text(' — Real-Time Grocery Price Comparison Engine', margin + aggrW, y);

const pill2 = 'React, Express, Playwright, Gemini';
doc.setFont('helvetica', 'bold');
doc.setFontSize(7.5);
doc.setTextColor(12, 74, 138);
const pill2W = doc.getTextWidth(pill2) + 4;
doc.setFillColor(234, 241, 251);
doc.setDrawColor(203, 224, 248);
doc.roundedRect(margin + contentWidth - pill2W, y - 3, pill2W, 4.2, 1, 1, 'FD');
doc.text(pill2, margin + contentWidth - pill2W + 2, y);
y += 3.8;

addBullet('Aggregates live grocery prices across 5 quick-commerce platforms (Blinkit, Zepto, Instamart, JioMart, and Flipkart) using concurrent Playwright scrapers coordinated through a multi-agent blackboard architecture, streaming results to the React UI via Server-Sent Events.');
addBullet('Includes a Gemini-powered shopping assistant for basket optimization, fake-discount detection (flags markdowns over 70% as suspicious), and trust scoring (alerts below an 80% reliability threshold).');
y += 0.8;

// Project 3: Media discovery
doc.setFont('helvetica', 'bold');
doc.setFontSize(8.8);
doc.setTextColor(15, 23, 42);
doc.text('Media discovery & streaming platform', margin, y);

const pill3 = 'React.js · Node.js · Express.js';
doc.setFont('helvetica', 'bold');
doc.setFontSize(7.5);
doc.setTextColor(12, 74, 138);
const pill3W = doc.getTextWidth(pill3) + 4;
doc.setFillColor(234, 241, 251);
doc.setDrawColor(203, 224, 248);
doc.roundedRect(margin + contentWidth - pill3W, y - 3, pill3W, 4.2, 1, 1, 'FD');
doc.text(pill3, margin + contentWidth - pill3W + 2, y);
y += 3.4;

doc.setFont('helvetica', 'normal');
doc.setFontSize(7.8);
doc.setTextColor(12, 74, 138);
doc.text('^ torrent-gamma.vercel.app', margin, y);
y += 3.4;

doc.setFont('helvetica', 'normal');
doc.setFontSize(8.2);
doc.setTextColor(30, 41, 59);
doc.text('Full-stack MERN platform for movie and series discovery.', margin, y);
y += 3.2;

addBullet('Chains 4 external APIs — Cinemeta (metadata/posters), Torrentio (streaming sources), Jackett (torrent search with seeders/size), and Real-Debrid (download/unrestriction) — behind an Express backend.');
addBullet('Features season-to-episode navigation, IMDb direct search, and debounced auto-search in a state-driven React UI.');
y += 0.8;

// Project 4: NovaShare
doc.setFont('helvetica', 'bold');
doc.setFontSize(8.8);
doc.setTextColor(15, 23, 42);
doc.text('NovaShare', margin, y);
const novaW = doc.getTextWidth('NovaShare');
doc.setFont('helvetica', 'normal');
doc.text(' — Peer-to-Peer File Sharing Application', margin + novaW, y);

const pill4 = 'React, Capacitor, WebRTC, PeerJS';
doc.setFont('helvetica', 'bold');
doc.setFontSize(7.5);
doc.setTextColor(12, 74, 138);
const pill4W = doc.getTextWidth(pill4) + 4;
doc.setFillColor(234, 241, 251);
doc.setDrawColor(203, 224, 248);
doc.roundedRect(margin + contentWidth - pill4W, y - 3, pill4W, 4.2, 1, 1, 'FD');
doc.text(pill4, margin + contentWidth - pill4W + 2, y);
y += 3.4;

doc.setFont('helvetica', 'normal');
doc.setFontSize(7.8);
doc.setTextColor(12, 74, 138);
doc.text('^ veerverma828.github.io/novashare', margin, y);
y += 3.4;

doc.setFont('helvetica', 'normal');
doc.setFontSize(8.2);
doc.setTextColor(30, 41, 59);
doc.text('Built a cross-platform P2P sharing app using React, Capacitor, WebRTC, and PeerJS.', margin, y);
y += 3.2;

addBullet('Ships 9 features: QR-based device pairing, multi-file/folder transfers, pause/resume, nearby discovery, Wi-Fi Direct, hotspot fallback, clipboard sharing, chat, and transfer history.');
y += 0.8;

// 5. EDUCATION & CERTIFICATIONS
addSectionHeader('EDUCATION & CERTIFICATIONS');

// B.Tech
doc.setDrawColor(12, 74, 138);
doc.setLineWidth(0.8);
doc.line(margin, y - 2.8, margin, y + 1.2);

doc.setFont('helvetica', 'bold');
doc.setFontSize(8.8);
doc.setTextColor(15, 23, 42);
doc.text('B.Tech in CSE(Data Science), CGPA: 7.72', margin + 2.5, y);

doc.setFont('helvetica', 'bold');
doc.setTextColor(71, 85, 105);
doc.text('2021 – 2025', margin + contentWidth, y, { align: 'right' });
y += 5;

// Kaggle
doc.setDrawColor(12, 74, 138);
doc.setLineWidth(0.8);
doc.line(margin, y - 2.8, margin, y + 8.5);

doc.setFont('helvetica', 'bold');
doc.setFontSize(8.8);
doc.setTextColor(15, 23, 42);
doc.text('Google x Kaggle — 5-Day AI Agents Intensive', margin + 2.5, y);
y += 3.5;

doc.setFont('helvetica', 'normal');
doc.setFontSize(8.2);
doc.setTextColor(30, 41, 59);
const kaggleDesc = 'Hands-on Vibe Coding certification: built AI agents that take actions, call tools, and handle multi-step tasks, with memory of past interactions, safety guardrails, and automated testing. Launched and monitored production AI apps using Google AI Studio (Gemini API).';
const kaggleLines = doc.splitTextToSize(kaggleDesc, contentWidth - 3);
doc.text(kaggleLines, margin + 2.5, y);
y += kaggleLines.length * 3.5 + 2.5;

// Languages
doc.setFont('helvetica', 'bold');
doc.setFontSize(8.2);
doc.setTextColor(15, 23, 42);
doc.text('Languages:', margin, y);
doc.setFont('helvetica', 'normal');
doc.setTextColor(51, 65, 85);
doc.text('English (Professional), Hindi (Native)', margin + 18, y);

// Output to /public/Veer_Verma_Resume.pdf
const outDir = path.resolve(process.cwd(), 'public');
const outFile = path.join(outDir, 'Veer_Verma_Resume.pdf');
fs.writeFileSync(outFile, Buffer.from(doc.output('arraybuffer')));
console.log('Successfully generated:', outFile);
