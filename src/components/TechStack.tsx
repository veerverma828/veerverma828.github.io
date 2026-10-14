import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Mail, Wrench } from 'lucide-react';

const ICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons';
// AI tool logos (devicon has none of these). Version is pinned.
const AI_ICON_BASE = 'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.95.1/icons';

// Only technologies that already appear in the portfolio's skills and projects.
const logos = [
  { name: 'React', icon: 'react/react-original.svg' },
  { name: 'FastAPI', icon: 'fastapi/fastapi-original.svg' },
  { name: 'Python', icon: 'python/python-original.svg' },
  { name: 'JavaScript', icon: 'javascript/javascript-original.svg' },
  { name: 'Tailwind CSS', icon: 'tailwindcss/tailwindcss-original.svg' },
  { name: 'MCP', icon: `${AI_ICON_BASE}/mcp.svg`, invert: true },
  { name: 'Claude', icon: `${AI_ICON_BASE}/claude-color.svg` },
  { name: 'Codex', icon: `${AI_ICON_BASE}/codex-color.svg` },
  { name: 'Antigravity', icon: `${AI_ICON_BASE}/antigravity-color.svg` },
  { name: 'Git', icon: 'git/git-original.svg' },
];


function Logo({ name, icon, invert }: { name: string; icon: string; invert?: boolean }) {
  const [failed, setFailed] = useState(false);
  return (
    <li className="flex flex-col items-center justify-center gap-3 p-5 bg-zinc-900/40 border border-white/10 hover:border-emerald-500/40 hover:-translate-y-1 transition-all duration-300">
      {!failed && (
        <img
          src={icon.startsWith('http') ? icon : `${ICON_BASE}/${icon}`}
          alt=""
          width={40}
          height={40}
          loading="lazy"
          onError={() => setFailed(true)}
          className={`w-10 h-10 ${invert ? 'invert' : ''}`}
        />
      )}
      <span className="text-xs font-mono font-semibold text-zinc-200">{name}</span>
    </li>
  );
}

export default function TechStack() {
  return (
    <section id="tech-stack" className="py-24 bg-[#050505] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-emerald-500/10 border-l-2 border-emerald-500 text-emerald-400 px-3.5 py-1 rounded-none text-xs font-semibold tracking-wider uppercase font-mono mb-4"
          >
            <Wrench className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Tech stack</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter text-white leading-[1]"
          >
            Tools I <span className="text-emerald-500">build with</span>
          </motion.h2>
          <div className="w-16 h-[2px] bg-emerald-500 mx-auto mt-6" />
        </div>

        <motion.ul
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3"
        >
          {logos.map((l) => (
            <Logo key={l.name} {...l} />
          ))}
        </motion.ul>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/20 hover:border-emerald-500/60 text-white text-xs font-bold uppercase tracking-widest transition-colors"
          >
            See my work <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold uppercase tracking-widest transition-colors"
          >
            Hire me <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
