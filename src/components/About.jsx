import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Music, Code2 } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="relative w-full bg-[#0a0a0b] py-20 text-white">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-fuchsia-500/5 to-transparent" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="order-2 md:order-1"
          >
            <h2 className="text-3xl font-bold sm:text-4xl">About</h2>
            <p className="mt-4 text-zinc-300">
              I blend defensive security engineering with music production and Indian retro-modern design. My work explores the poetry of systems: encrypted, expressive, and elegant.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-md border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-200 inline-flex items-center gap-2"><Shield size={16}/>Blue Team</span>
              <span className="rounded-md border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-sm text-orange-200 inline-flex items-center gap-2"><Music size={16}/>Indian Electronica</span>
              <span className="rounded-md border border-purple-400/30 bg-purple-400/10 px-3 py-1 text-sm text-purple-200 inline-flex items-center gap-2"><Code2 size={16}/>Open Source</span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="order-1 md:order-2"
          >
            <div className="relative mx-auto h-56 w-56 overflow-hidden rounded-full border border-amber-500/30 bg-gradient-to-tr from-zinc-900 via-zinc-800 to-zinc-900 shadow-[0_0_120px_rgba(251,191,36,0.12)]">
              <div className="absolute inset-0 bg-[conic-gradient(from_180deg,rgba(34,197,94,0.0),rgba(34,197,94,0.15),rgba(236,72,153,0.15),rgba(234,88,12,0.15),rgba(34,197,94,0.0))]" />
              <div className="absolute inset-0 grid place-items-center">
                <span className="font-mono text-sm text-amber-200">Your Portrait</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
