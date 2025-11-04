import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Spotify, Terminal, Send } from 'lucide-react';

function useSynth() {
  const ctxRef = useRef(null);
  const oscRef = useRef(null);
  const [active, setActive] = useState(false);

  const start = async () => {
    if (!ctxRef.current) ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    const ctx = ctxRef.current;
    if (!oscRef.current) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(432, ctx.currentTime);
      gain.gain.value = 0.0001;
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      oscRef.current = { osc, gain };
    }
    // fade in
    const g = oscRef.current.gain;
    g.cancelScheduledValues(ctx.currentTime);
    g.linearRampToValueAtTime(0.02, ctx.currentTime + 0.4);
    setActive(true);
  };

  const stop = () => {
    const ctx = ctxRef.current;
    if (!ctx || !oscRef.current) return;
    const g = oscRef.current.gain;
    g.cancelScheduledValues(ctx.currentTime);
    g.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.3);
    setActive(false);
  };

  useEffect(() => () => {
    if (oscRef.current) {
      oscRef.current.osc.stop();
      oscRef.current.osc.disconnect();
    }
    if (ctxRef.current) ctxRef.current.close();
  }, []);

  return { active, start, stop };
}

export default function Contact() {
  const { active, start, stop } = useSynth();

  const onSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get('name');
    const email = form.get('email');
    const message = form.get('message');
    const body = encodeURIComponent(`Hi, this is ${name} (${email}).%0D%0A%0D%0A${message}`);
    window.location.href = `mailto:you@example.com?subject=Portfolio%20Contact&body=${body}`;
  };

  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-6 py-16">
      <div className="absolute inset-0 -z-0 bg-[radial-gradient(ellipse_at_center,rgba(255,215,128,0.06),transparent_50%)]" />

      <div className="mb-8 flex items-center gap-2">
        <Terminal className="h-6 w-6 text-teal-300" />
        <h2 className="text-3xl font-bold text-white md:text-4xl">Contact</h2>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-white/10 bg-black/50 p-6 text-white shadow-[0_0_24px_rgba(255,255,255,0.06)] backdrop-blur"
        >
          <div className="mb-4 font-mono text-sm text-emerald-300/90">$ echo "namaste"</div>
          <label className="mb-3 block">
            <span className="mb-1 block text-sm text-white/70">Name</span>
            <input
              name="name"
              required
              className="w-full rounded-md border border-white/10 bg-black/60 px-3 py-2 outline-none ring-amber-400/40 focus:border-amber-300/50 focus:ring"
              placeholder="Your name"
            />
          </label>
          <label className="mb-3 block">
            <span className="mb-1 block text-sm text-white/70">Email</span>
            <input
              type="email"
              name="email"
              required
              className="w-full rounded-md border border-white/10 bg-black/60 px-3 py-2 outline-none ring-teal-400/40 focus:border-teal-300/50 focus:ring"
              placeholder="you@domain.com"
            />
          </label>
          <label className="mb-4 block">
            <span className="mb-1 block text-sm text-white/70">Message</span>
            <textarea
              name="message"
              rows={4}
              required
              className="w-full resize-none rounded-md border border-white/10 bg-black/60 px-3 py-2 outline-none ring-purple-400/40 focus:border-purple-300/50 focus:ring"
              placeholder="Tell me about your idea…"
            />
          </label>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-md border border-amber-400/40 bg-black/60 px-4 py-2 text-amber-100 transition hover:border-amber-300 hover:text-amber-50"
          >
            <Send className="h-4 w-4" /> Send
          </button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-between gap-6"
        >
          <div className="rounded-2xl border border-white/10 bg-black/50 p-6 text-white backdrop-blur">
            <h3 className="text-xl font-semibold">Social</h3>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <a href="https://github.com/" target="_blank" className="group flex items-center gap-2 rounded-md border border-white/10 bg-black/60 px-3 py-2 text-white/80 transition hover:border-white/30 hover:text-white">
                <Github className="h-4 w-4 text-white/70" /> GitHub
              </a>
              <a href="https://www.linkedin.com/" target="_blank" className="group flex items-center gap-2 rounded-md border border-white/10 bg-black/60 px-3 py-2 text-white/80 transition hover:border-white/30 hover:text-white">
                <Linkedin className="h-4 w-4 text-white/70" /> LinkedIn
              </a>
              <a href="mailto:you@example.com" className="group flex items-center gap-2 rounded-md border border-white/10 bg-black/60 px-3 py-2 text-white/80 transition hover:border-white/30 hover:text-white">
                <Mail className="h-4 w-4 text-white/70" /> Email
              </a>
              <a href="https://open.spotify.com/" target="_blank" className="group flex items-center gap-2 rounded-md border border-white/10 bg-black/60 px-3 py-2 text-white/80 transition hover:border-white/30 hover:text-white">
                <Spotify className="h-4 w-4 text-white/70" /> Spotify
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/50 p-6 text-white backdrop-blur">
            <h3 className="text-xl font-semibold">Ambient</h3>
            <p className="mt-1 text-sm text-white/70">Subtle 432Hz drone for a meditative cyber vibe.</p>
            <div className="mt-4 inline-flex items-center gap-3">
              <button
                onClick={active ? stop : start}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  active
                    ? 'border-teal-400/50 bg-black/60 text-teal-100 hover:border-teal-300'
                    : 'border-white/10 bg-black/60 text-white/80 hover:border-white/30 hover:text-white'
                }`}
              >
                {active ? 'Pause' : 'Play'} Ambient
              </button>
              <span className="text-xs text-white/50">Best experienced with headphones</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
