import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Music, GitBranch } from 'lucide-react';

const TABS = [
  { key: 'security', label: 'Cybersecurity', icon: Shield, accent: 'teal' },
  { key: 'music', label: 'Music', icon: Music, accent: 'orange' },
  { key: 'oss', label: 'Open Source', icon: GitBranch, accent: 'purple' },
];

const cards = {
  security: [
    {
      title: 'Threat Hunting Dashboard',
      desc: 'Interactive SIEM visualizations with anomaly detection and MITRE ATT&CK mapping.',
    },
    {
      title: 'Web App Pentest',
      desc: 'OWASP-focused assessment with auth hardening and CI/CD guardrails.',
    },
    {
      title: 'Blue Team Toolkit',
      desc: 'Automations for log triage, YARA scanning, and incident timelines.',
    },
  ],
  music: [
    {
      title: 'Synthwave Rāga EP',
      desc: 'Four-track blend of retro synths and Hindustani motifs with tabla-inspired grooves.',
    },
    {
      title: 'Live Coding Set',
      desc: 'SuperCollider + MIDI controllers for generative rhythms and ambient textures.',
    },
    {
      title: 'Sitar Strings Visualizer',
      desc: 'WebGL canvas that turns notes into neon waveforms and circuit mandalas.',
    },
  ],
  oss: [
    { title: 'SecureHeaders', desc: 'Tiny lib to set strong HTTP headers for popular frameworks.' },
    { title: 'Raga.js', desc: 'Note scales and patterns for building Indian-influenced melodies in JS.' },
    { title: 'PacketCanvas', desc: 'Visualize PCAPs as animated flows with color-coded protocols.' },
  ],
};

function NeonCard({ title, desc }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-xl border border-white/10 bg-black/50 p-5 text-white shadow-[0_0_24px_rgba(255,255,255,0.05)] backdrop-blur"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{
        backgroundImage:
          'repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0, rgba(255,255,255,0.05) 2px, transparent 2px, transparent 6px)'
      }} />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-white/70">{desc}</p>
      <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="mt-3 text-xs text-white/50">Hover for a subtle glitch</div>
      {/* Glitch accents */}
      <div className="pointer-events-none absolute -right-3 top-3 h-8 w-8 rotate-6 rounded-sm border border-teal-300/30" />
      <div className="pointer-events-none absolute -left-3 bottom-4 h-10 w-10 -rotate-6 rounded-sm border border-purple-300/30" />
    </motion.div>
  );
}

export default function Projects() {
  const [active, setActive] = useState('security');
  const ActiveIcon = useMemo(() => TABS.find((t) => t.key === active)?.icon ?? Shield, [active]);

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white md:text-4xl">Projects</h2>
          <p className="mt-2 text-white/70">A curated selection across security, sound, and open source.</p>
        </div>
        <ActiveIcon className="hidden h-8 w-8 text-amber-300/70 md:block" />
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {TABS.map(({ key, label, icon: Icon, accent }) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
              active === key
                ? 'border-amber-400/50 bg-black/60 text-amber-200 shadow-[0_0_20px_rgba(251,191,36,0.12)]'
                : 'border-white/10 bg-black/40 text-white/70 hover:text-white'
            }`}
          >
            <Icon className={`h-4 w-4 ${
              accent === 'teal' ? 'text-teal-300/80' : accent === 'orange' ? 'text-orange-300/80' : 'text-purple-300/80'
            }`} />
            {label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 gap-5 md:grid-cols-3"
        >
          {cards[active].map((c) => (
            <NeonCard key={c.title} title={c.title} desc={c.desc} />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
