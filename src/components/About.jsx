import { motion } from 'framer-motion';
import { Shield, Award, Sparkles } from 'lucide-react';

const badges = [
  { icon: Shield, label: 'Security+' },
  { icon: Award, label: 'Bug Bounty' },
  { icon: Sparkles, label: 'Live Performer' },
];

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-16">
      <div className="absolute inset-0 -z-0 bg-[radial-gradient(ellipse_at_top_right,rgba(34,197,94,0.08),transparent_40%),radial-gradient(ellipse_at_bottom_left,rgba(251,146,60,0.08),transparent_40%)]" />

      <div className="relative grid grid-cols-1 items-center gap-10 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="order-2 md:order-1"
        >
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            About
            <span className="ml-2 bg-gradient-to-r from-teal-300 via-orange-300 to-purple-300 bg-clip-text text-transparent">
              Me
            </span>
          </h2>
          <p className="mt-4 text-white/80">
            I explore the edges where cybersecurity engineering meets sonic artistry. My work blends modern security practices with the warmth of analog sound and the soul of Indian heritage — from circuit board mandalas to tabla-inspired rhythms.
          </p>
          <p className="mt-3 text-white/70">
            Whether I’m securing infrastructure or composing synthwave ragas, I aim to create experiences that feel futuristic, spiritual, and secure.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {badges.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-4 py-2 text-sm text-white/80 shadow-[0_0_16px_rgba(255,255,255,0.05)] backdrop-blur transition hover:border-amber-300/40 hover:text-amber-100"
              >
                <Icon className="h-4 w-4 text-amber-300/80" /> {label}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="order-1 md:order-2"
        >
          <div className="relative mx-auto aspect-square max-w-md overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-black/60 to-black/40 p-1 backdrop-blur">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_20%,rgba(45,212,191,0.12),transparent_40%),radial-gradient(circle_at_70%_80%,rgba(192,132,252,0.12),transparent_40%)]" />
            <div className="relative flex h-full items-center justify-center">
              <div className="h-44 w-44 rounded-full border-2 border-amber-300/30 bg-gradient-to-tr from-amber-500/10 via-teal-500/10 to-purple-500/10 shadow-[0_0_40px_rgba(251,191,36,0.15)]" />
              <div className="absolute -left-2 -top-2 h-24 w-24 rotate-12 rounded-md border border-teal-300/30" />
              <div className="absolute -right-4 bottom-8 h-28 w-28 -rotate-6 rounded-md border border-purple-300/30" />
            </div>
            <div className="absolute bottom-3 left-3 rounded-md border border-white/10 bg-black/60 px-3 py-1 text-xs text-white/70 backdrop-blur">
              Neon avatar placeholder — swap with your portrait when ready
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
