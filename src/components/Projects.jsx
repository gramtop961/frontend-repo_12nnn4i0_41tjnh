import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Music, Github } from 'lucide-react';

function NeonCard({ title, subtitle, chips = [], accent = 'cyan' }) {
  const accentMap = {
    cyan: 'from-cyan-500/20 to-cyan-500/0 border-cyan-400/40 shadow-cyan-500/20',
    orange: 'from-orange-500/20 to-orange-500/0 border-orange-400/40 shadow-orange-500/20',
    purple: 'from-fuchsia-500/20 to-fuchsia-500/0 border-fuchsia-400/40 shadow-fuchsia-500/20',
  };
  const cls = accentMap[accent] || accentMap.cyan;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4 }}
      className={`group relative overflow-hidden rounded-xl border bg-zinc-900/50 p-4 backdrop-blur-md ${cls} shadow-[0_0_30px_var(--tw-shadow-color)]`}
    >
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${cls.split(' ')[0]}`} />
      <div className="relative">
        <h4 className="text-lg font-semibold text-white">{title}</h4>
        <p className="mt-1 text-sm text-zinc-400">{subtitle}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {chips.map((c) => (
            <span key={c} className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-zinc-200">
              {c}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [tab, setTab] = useState('security');

  return (
    <section id="projects" className="w-full bg-[#0a0a0b] py-20 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-3xl font-bold sm:text-4xl">Projects</h2>
          <div className="inline-flex overflow-hidden rounded-lg border border-white/10">
            <button onClick={() => setTab('security')} className={`flex items-center gap-2 px-3 py-2 text-sm transition ${tab==='security' ? 'bg-cyan-500/20 text-cyan-200' : 'text-zinc-300 hover:bg-white/5'}`}>
              <Shield size={16}/> Security
            </button>
            <button onClick={() => setTab('music')} className={`flex items-center gap-2 px-3 py-2 text-sm transition ${tab==='music' ? 'bg-orange-500/20 text-orange-200' : 'text-zinc-300 hover:bg-white/5'}`}>
              <Music size={16}/> Music
            </button>
            <button onClick={() => setTab('oss')} className={`flex items-center gap-2 px-3 py-2 text-sm transition ${tab==='oss' ? 'bg-fuchsia-500/20 text-fuchsia-200' : 'text-zinc-300 hover:bg-white/5'}`}>
              <Github size={16}/> Open Source
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tab === 'security' && (
            <>
              <NeonCard title="Threat Lab" subtitle="Adversary emulation and blue-team detections with Sigma/Splunk." chips={['Sigma', 'MITRE ATT&CK', 'Hunt']} accent="cyan" />
              <NeonCard title="Crypto Locks" subtitle="End-to-end encryption toolkit with key rotation utilities." chips={['NaCl', 'ECDH', 'Noise']} accent="cyan" />
              <NeonCard title="Circuit Mandala" subtitle="Visual analyzer for network flows with Indian motifs." chips={['eBPF', 'Flows', 'D3.js']} accent="cyan" />
            </>
          )}
          {tab === 'music' && (
            <>
              <NeonCard title="Sitarwave" subtitle="Retro synth meets classical raag textures." chips={['Analog FX', 'Sidechain', 'Raga Yaman']} accent="orange" />
              <NeonCard title="Tabla Grid" subtitle="Programmable tala sequencer with polyrhythms." chips={['WebAudio', 'Step Seq', '7/8']} accent="orange" />
              <NeonCard title="Peacock Glitch" subtitle="Generative visuals synced to audio peaks." chips={['Canvas', 'FFT', 'Shaders']} accent="orange" />
            </>
          )}
          {tab === 'oss' && (
            <>
              <NeonCard title="GuardCLI" subtitle="Swiss-army CLI for audits and hardening." chips={['Python', 'Typer', 'YAML']} accent="purple" />
              <NeonCard title="Riyaz.js" subtitle="Practice companions for ragas with shruti detune." chips={['React', 'DSP', 'Tuner']} accent="purple" />
              <NeonCard title="Prism Theme" subtitle="Neon cyberpunk theme for code editors." chips={['VSCode', 'Design', 'JSON']} accent="purple" />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
