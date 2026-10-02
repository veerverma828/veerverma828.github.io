import { Skill, Project, Education, Achievement, TimelineEvent } from './types';

export const personalInfo = {
  name: 'Veer Verma',
  title: 'AI Engineer Specialized in Full Stack',
  location: 'Meerut, India',
  email: 'veerverma828@gmail.com',
  phone: '+91 7983773466',
  github: 'https://github.com/veerverma828',
  linkedin: 'https://www.linkedin.com/in/veer-verma',
  summary: 'Computer Science graduate making artificial intelligence practical and easy to use. I build modern full-stack web apps and smart AI solutions that automate work and simplify daily tasks.',
  headline: 'Building modern web apps and smart AI solutions that solve real-world problems.',
};

export const skills: Skill[] = [
  // Generative AI / LLMs
  {
    name: 'LLM APIs',
    techName: 'Generative AI / LLMs',
    category: 'genai',
    icon: 'Cpu',
    description: 'Integrating foundation models via OpenAI, Gemini, Anthropic, and open-source API endpoints.'
  },
  {
    name: 'Prompt Engineering',
    techName: 'Generative AI / LLMs',
    category: 'genai',
    icon: 'Sparkles',
    description: 'Designing system prompts, few-shot templates, and chain-of-thought instructions for high accuracy.'
  },
  {
    name: 'Function/Tool Calling',
    techName: 'Generative AI / LLMs',
    category: 'genai',
    icon: 'Code2',
    description: 'Enabling LLMs to invoke external software functions, query databases, and execute APIs.'
  },
  {
    name: 'RAG (Retrieval-Augmented Generation)',
    techName: 'Generative AI / LLMs',
    category: 'genai',
    icon: 'Search',
    description: 'Connecting AI to custom documents, PDFs, and knowledge bases for grounded, factual answers.'
  },
  {
    name: 'Embeddings',
    techName: 'Generative AI / LLMs',
    category: 'genai',
    icon: 'Layers',
    description: 'Generating vector representations of text for semantic similarity search and intelligent clustering.'
  },
  {
    name: 'Hybrid Search',
    techName: 'Generative AI / LLMs',
    category: 'genai',
    icon: 'Filter',
    description: 'Blending dense semantic vector search with sparse keyword matching (BM25) for top-tier retrieval.'
  },
  {
    name: 'Grounding & Citations',
    techName: 'Generative AI / LLMs',
    category: 'genai',
    icon: 'FileCheck',
    description: 'Ensuring LLM answers link directly to verifiable source passages and eliminate hallucinations.'
  },

  // AI Agents
  {
    name: 'ReAct Agents',
    techName: 'AI Agents',
    category: 'agents',
    icon: 'Brain',
    description: 'Implementing Reasoning + Acting iterative loops for autonomous multi-step problem solving.'
  },
  {
    name: 'Tool-Using Agents',
    techName: 'AI Agents',
    category: 'agents',
    icon: 'Bot',
    description: 'Building autonomous agents equipped with custom calculators, web scrapers, and external APIs.'
  },
  {
    name: 'LangGraph',
    techName: 'AI Agents',
    category: 'agents',
    icon: 'GitBranch',
    description: 'Architecting stateful, multi-agent cyclical graph workflows with branch control and persistence.'
  },
  {
    name: 'Agent Memory',
    techName: 'AI Agents',
    category: 'agents',
    icon: 'Database',
    description: 'Engineering short-term conversation context buffers and persistent long-term memory stores.'
  },
  {
    name: 'MCP (Model Context Protocol)',
    techName: 'AI Agents',
    category: 'agents',
    icon: 'Server',
    description: 'Connecting AI models to external tools, local files, and enterprise databases via the open MCP standard.'
  },
  {
    name: 'Human-in-the-Loop',
    techName: 'AI Agents',
    category: 'agents',
    icon: 'UserCheck',
    description: 'Incorporating manual approval gates and user feedback checkpoints into autonomous agent workflows.'
  },
  {
    name: 'Claude Code',
    techName: 'AI Agents',
    category: 'agents',
    icon: 'Terminal',
    description: 'Agentic terminal workflows, multi-file code reasoning, shell execution, and autonomous Git operations.'
  },
  {
    name: 'Google Antigravity',
    techName: 'AI Agents',
    category: 'agents',
    icon: 'Bot',
    description: 'Autonomous multi-turn agent development, dynamic workspace editing, tool coordination, and iterative validation.'
  },
  {
    name: 'OpenAI Codex',
    techName: 'AI Agents',
    category: 'agents',
    icon: 'Code2',
    description: 'AI-driven code generation, algorithmic logic synthesis, automated test scaffolding, and code refactoring.'
  },

  // LLM Evaluation
  {
    name: 'Golden Datasets',
    techName: 'LLM Evaluation',
    category: 'evaluation',
    icon: 'Database',
    description: 'Curating comprehensive ground-truth test datasets to benchmark model behavior and prompt efficacy.'
  },
  {
    name: 'LLM-as-a-Judge',
    techName: 'LLM Evaluation',
    category: 'evaluation',
    icon: 'Scale',
    description: 'Deploying high-capability evaluator models to systematically rate outputs on accuracy and style.'
  },
  {
    name: 'Error Analysis',
    techName: 'LLM Evaluation',
    category: 'evaluation',
    icon: 'AlertCircle',
    description: 'Diagnosing model failure modes, hallucinations, edge-case regressions, and prompt drifts.'
  },
  {
    name: 'RAGAS',
    techName: 'LLM Evaluation',
    category: 'evaluation',
    icon: 'Gauge',
    description: 'Evaluating retrieval and generation pipelines using standardized metrics like faithfulness and relevancy.'
  },
  {
    name: 'Regression Testing',
    techName: 'LLM Evaluation',
    category: 'evaluation',
    icon: 'CheckCircle2',
    description: 'Automated CI/CD test suites to verify that prompt and model updates preserve existing quality.'
  },
  {
    name: 'Context Precision / Recall',
    techName: 'LLM Evaluation',
    category: 'evaluation',
    icon: 'Target',
    description: 'Measuring whether the retrieval step surfaces all relevant documents without noisy distractors.'
  },
  {
    name: 'Faithfulness & Answer Relevancy',
    techName: 'LLM Evaluation',
    category: 'evaluation',
    icon: 'ShieldCheck',
    description: 'Validating that generated answers are grounded strictly in the context and answer user queries.'
  },

  // LLM Engineering
  {
    name: 'Tokenization & Context Windows',
    techName: 'LLM Engineering',
    category: 'engineering',
    icon: 'Layers',
    description: 'Managing token counts, context window limits, and chunk boundaries across various models.'
  },
  {
    name: 'Streaming & Async APIs',
    techName: 'LLM Engineering',
    category: 'engineering',
    icon: 'Zap',
    description: 'Implementing token-by-token streaming responses with asynchronous Python and Node.js concurrency.'
  },
  {
    name: 'Cost Optimization',
    techName: 'LLM Engineering',
    category: 'engineering',
    icon: 'Coins',
    description: 'Minimizing API expenses via prompt compression, smart routing, and selective model usage.'
  },
  {
    name: 'Prompt Caching',
    techName: 'LLM Engineering',
    category: 'engineering',
    icon: 'HardDrive',
    description: 'Utilizing prompt prefix caching in Anthropic and Gemini to cut latency and API token billing.'
  },
  {
    name: 'Rate-Limit Handling',
    techName: 'LLM Engineering',
    category: 'engineering',
    icon: 'Clock',
    description: 'Building exponential backoff, jitter, and request retry queues for robust production reliability.'
  },
  {
    name: 'Model Routing',
    techName: 'LLM Engineering',
    category: 'engineering',
    icon: 'Route',
    description: 'Dynamically routing user requests to small, fast models or heavy reasoning models based on complexity.'
  },

  // AI Application Development
  {
    name: 'Python',
    techName: 'AI Application Development',
    category: 'appdev',
    icon: 'Terminal',
    description: 'Core programming language for building AI pipelines, agent frameworks, and backend data processing.'
  },
  {
    name: 'FastAPI',
    techName: 'AI Application Development',
    category: 'appdev',
    icon: 'Zap',
    description: 'Modern, high-performance asynchronous web framework for building production AI REST APIs.'
  },
  {
    name: 'REST APIs & SSE',
    techName: 'AI Application Development',
    category: 'appdev',
    icon: 'Radio',
    description: 'Architecting RESTful endpoints and Server-Sent Events (SSE) for real-time live token streaming.'
  },
  {
    name: 'Observability',
    techName: 'AI Application Development',
    category: 'appdev',
    icon: 'Eye',
    description: 'End-to-end tracing, latency tracking, cost analytics, and user session monitoring for LLM calls.'
  },
  {
    name: 'MERN Stack',
    techName: 'AI Application Development',
    category: 'appdev',
    icon: 'Laptop',
    description: 'Building modern responsive full-stack applications with MongoDB, Express, React, and Node.js.'
  },

  // AI Security
  {
    name: 'Prompt Injection Defense',
    techName: 'AI Security',
    category: 'security',
    icon: 'ShieldAlert',
    description: 'Guarding LLMs against direct prompt injection and malicious jailbreak attempts.'
  },
  {
    name: 'Indirect Prompt Injection',
    techName: 'AI Security',
    category: 'security',
    icon: 'AlertTriangle',
    description: 'Protecting agents when parsing untrusted external web pages, emails, or user-uploaded files.'
  },
  {
    name: 'Guardrails',
    techName: 'AI Security',
    category: 'security',
    icon: 'Shield',
    description: 'Enforcing strict safety boundaries, topic restrictions, and policy compliance on model outputs.'
  },
  {
    name: 'Sensitive Information Protection',
    techName: 'AI Security',
    category: 'security',
    icon: 'Lock',
    description: 'Preventing unintentional leakage of credentials, proprietary code, or private system data.'
  },
];

export const projects: Project[] = [
  {
    id: 'media-streamer',
    title: 'Multimodal AI Discovery & Intelligence Platform',
    category: 'AI Systems',
    description: 'An AI-powered media intelligence platform integrating LLM content summarization, semantic search, torrent discovery, and debounced query management.',
    liveUrl: 'https://torrent-gamma.vercel.app',
    githubUrl: 'https://github.com/veerverma828/torrent-gamma',
    tags: ['LLM Summarization', 'Vector Search', 'React', 'Node.js', 'Express', 'TMDb API'],
    keyHighlights: [
      'AI-driven content recommendations & episode intelligence',
      'Debounced semantic query pipeline optimizing API calls',
      'Torrent aggregation & automated metadata extraction',
      'Real-time streaming source resolution',
      'Smart IMDb & rating analytics integration',
      'High-performance responsive UI'
    ],
    imagePlaceholder: 'movie-discovery'
  },
  {
    id: 'doc-booking',
    title: 'Clinical AI Assistant & Doctor Appointment System',
    category: 'AI Systems',
    description: 'Healthcare platform with AI-guided patient symptom triage, dynamic doctor scheduling, and automated clinical log summaries.',
    liveUrl: 'https://myproject-sljk.onrender.com',
    githubUrl: 'https://github.com/veerverma828/doctor-appointment',
    tags: ['MERN Stack', 'AI Symptom Triage', 'MongoDB', 'Node.js', 'Express', 'React'],
    keyHighlights: [
      'AI patient symptom triage & intake assistant',
      'Dynamic doctor dashboard for logs & status tracking',
      'Automated patient appointment scheduling & reminders',
      'Custom practitioner profile management',
      'Real-time slot availability toggles'
    ],
    imagePlaceholder: 'doctor-booking'
  },
  {
    id: 'resume-maker',
    title: 'AI Resume & Career Intelligence Engine',
    category: 'AI Systems',
    description: 'An intelligent visual resume architect with AI optimization recommendations, instant ATS formatting checks, and live PDF exports.',
    liveUrl: 'https://veerverma828.github.io/Resume-Maker/',
    githubUrl: 'https://github.com/veerverma828/Resume-Maker',
    tags: ['React', 'AI Optimization', 'Tailwind CSS', 'ATS Scoring', 'PDF Export'],
    keyHighlights: [
      'Interactive form input with live side-by-side render preview',
      'AI text enhancement & ATS readability scoring',
      'Pre-formatted standard professional templates',
      'Instant vector-perfect PDF generation & export',
      'Mobile-friendly editable workspace'
    ],
    imagePlaceholder: 'resume-builder'
  },
  {
    id: 'nova-share',
    title: 'Nova AI Neural File Intelligence & Sharing Platform',
    category: 'Utility',
    description: 'A peer-to-peer file transfer system featuring automated AI file content classification, instant document summaries, and secure links.',
    liveUrl: 'https://veerverma828.github.io/novashare/',
    githubUrl: 'https://github.com/veerverma828/novashare',
    tags: ['JavaScript', 'AI Auto-Tagging', 'P2P Sharing', 'Web API', 'Responsive UI'],
    keyHighlights: [
      'Instant P2P file transfer with zero size restrictions',
      'AI auto-tagging and neural document classification',
      'Encrypted link generation & room QR code sharing',
      'Lightweight high-performance client interface',
      'Responsive design across mobile and desktop devices'
    ],
    imagePlaceholder: 'nova-share'
  }
];

export const educationHistory: Education[] = [
  {
    degree: 'B.Tech CSE - Data Science & AI',
    institution: 'MIET, Meerut',
    duration: '2021 – 2025',
    grade: 'CGPA: 7.72',
    achievements: [
      'Specialized in Data Structures, Machine Learning, Natural Language Processing, Neural Networks, and Database Systems.',
      'Designed and deployed agentic systems and full-stack web applications during tech symposiums.'
    ]
  },
  {
    degree: 'Higher Secondary (12th)',
    institution: 'KL International School',
    duration: '2020 – 2021',
    grade: 'Percentage: 80.17%',
    achievements: ['Distinction in Computer Science, Mathematics, and Physics.', 'Science exhibition lead.']
  },
  {
    degree: 'Secondary School (10th)',
    institution: 'KL International School',
    duration: '2018 – 2019',
    grade: 'Percentage: 76%',
    achievements: ['Excelled in Science, Mathematics and Digital Literacy.']
  }
];

export const achievements: Achievement[] = [
  {
    title: '5-Day AI Agents: Intensive Vibe Coding Course',
    organization: 'Google × Kaggle',
    year: '2026',
    description: 'A hands-on Google intensive focused on Vibe Coding—creating smart AI assistants simply by describing goals in plain English. Learned to build AI helpers that use digital tools, remember context, work safely, and run reliably in production.',
    icon: 'Bot',
    issueDate: 'July 30, 2026',
    certificateImage: '/certificate.png',
    verificationUrl: 'https://www.kaggle.com/learn/certification/veerverma828/ai-agents',
    skills: [
      'Agent Basics',
      'AI Coding',
      'Prompting',
      'Architecture',
      'Context & Memory',
      'Integration',
      'Agent Skills'
    ],
    keyPoints: [
      'Vibe Coding: Built complete software by guiding AI in everyday conversational English.',
      'Smart Digital Helpers: Created AI agents that take actions, use tools, and handle multi-step tasks.',
      'Memory & Tool Calling: Taught agents how to connect to web tools and remember past user interactions.',
      'Safety & Testing: Put safety guardrails and automated tests in place so AI acts accurately and responsibly.',
      'Real-World Ready: Launched and monitored production AI apps using Python and Google AI Studio.'
    ]
  }
];

export const timelineEvents: TimelineEvent[] = [
  {
    year: '2021',
    title: 'B.Tech CSE(DS) Launch',
    subtitle: 'MIET, Meerut',
    description: 'Began B.Tech degree focusing on Data Science & AI foundations. Mastered C++, Data Structures, Algorithms, Linear Algebra, and SQL databases.',
    icon: 'BookOpen',
    type: 'academic'
  },
  {
    year: '2022',
    title: 'Full Stack & Web Architecture',
    subtitle: 'Client & Server Engineering',
    description: 'Built foundational web development expertise: JavaScript, React, HTML5/CSS3, Node.js, and responsive design systems.',
    icon: 'Layout',
    type: 'skill'
  },
  {
    year: '2023',
    title: 'Backend Systems & API Engineering',
    subtitle: 'Node, Express & MongoDB',
    description: 'Engineered robust backends with Express, JWT authentication, MongoDB schema validation pipelines, and RESTful API endpoints.',
    icon: 'Layers',
    type: 'skill'
  },
  {
    year: '2024',
    title: 'AWS Gen AI & IBM AI Credentials',
    subtitle: 'Generative AI Milestones',
    description: 'Earned AWS Gen AI Ideathon credentials and IBM AI certifications. Built full-stack AI-assisted systems and data platforms.',
    icon: 'Award',
    type: 'milestone'
  },
  {
    year: '2025',
    title: 'Graduation & AI Engineering Career',
    subtitle: 'AI Engineer Milestone',
    description: 'Graduated B.Tech CSE(DS) with 7.72 CGPA. Transitioned core specialization to AI Engineering—building multi-agent systems, RAG pipelines, and LLM integrations.',
    icon: 'CheckCircle',
    type: 'milestone'
  }
];

export const whyWorkWithMe = [
  {
    title: 'Autonomous AI Agents',
    description: 'I design multi-agent workflows and autonomous tool-calling agents that solve multi-step reasoning problems.',
    icon: 'Brain',
  },
  {
    title: 'RAG & Vector Search',
    description: 'I build accurate Retrieval-Augmented Generation systems using vector embeddings and contextual knowledge stores.',
    icon: 'Sparkles',
  },
  {
    title: 'LLM Orchestration',
    description: 'I seamlessly integrate Gemini, Claude, and OpenAI models with function calling and structured outputs.',
    icon: 'Cpu',
  },
  {
    title: 'Full-Stack AI-Native Apps',
    description: 'I connect powerful AI backends (Node/FastAPI) with fast, responsive React user interfaces.',
    icon: 'Workflow',
  },
  {
    title: 'Clean & Modular Code',
    description: 'I write structured, well-documented TypeScript and Python code built for maintainability and speed.',
    icon: 'FileCode',
  },
  {
    title: 'System Optimization',
    description: 'I optimize AI request latency, debounced searches, and API rate limits for seamless user experiences.',
    icon: 'CheckCircle2',
  },
];

