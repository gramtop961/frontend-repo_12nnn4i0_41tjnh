import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Waves } from 'lucide-react';

export default function Contact() {
  const [playing, setPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const oscRef = useRef(null);
  const gainRef = useRef(null);

  useEffect(() => {
    return () => {
      if (oscRef.current) oscRef.current.stop();
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  const toggleAudio = async () => {
    if (!audioCtxRef.current) {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = 432; // ambient 432Hz tone
      gain.gain.value = 0.03; // subtle
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      audioCtxRef.current = ctx;
      oscRef.current = osc;
      gainRef.current = gain;
      setPlaying(true);
    } else {
      if (playing) {
        gainRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.4);
        setTimeout(() => {
          oscRef.current.stop();
          audioCtxRef.current.close();
          audioCtxRef.current = null;
          oscRef.current = null;
          gainRef.current = null;
          setPlaying(false);
        }, 420);
      } else {
        // recreate after stop
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = 432;
        gain.gain.value = 0.03;
        osc.connect(gain).connect(ctx.destination);
        osc.start();
        audioCtxRef.current = ctx;
        oscRef.current = osc;
        gainRef.current = gain;
        setPlaying(true);
      }
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get('name');
    const email = data.get('email');
    const message = data.get('message');
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name} <${email}>`);
    window.location.href = `mailto:you@example.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="w-full bg-[#0a0a0b] py-20 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold sm:text-4xl">Contact</h2>
          <button
            onClick={toggleAudio}
            className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition ${playing ? 'border-emerald-400/40 bg-emerald-400/10 text-emerald-200' : 'border-zinc-600/40 bg-zinc-800/60 text-zinc-200 hover:bg-zinc-800'}`}
            aria-pressed={playing}
          >
            <Waves size={16} /> {playing ? 'Pause Ambient' : 'Play Ambient'}
          </button>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="rounded-xl border border-white/10 bg-zinc-900/60 p-5 backdrop-blur"
          >
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm text-zinc-300">Name</label>
                <input name="name" required className="w-full rounded-md border border-white/10 bg-zinc-950/70 px-3 py-2 text-zinc-100 outline-none ring-0 placeholder:text-zinc-500 focus:border-cyan-400/50" placeholder="Your name" />
              </div>
              <div>
                <label className="mb-1 block text-sm text-zinc-300">Email</label>
                <input name="email" type="email" required className="w-full rounded-md border border-white/10 bg-zinc-950/70 px-3 py-2 text-zinc-100 outline-none focus:border-cyan-400/50" placeholder="you@domain.com" />
              </div>
              <div>
                <label className="mb-1 block text-sm text-zinc-300">Message</label>
                <textarea name="message" rows="5" required className="w-full rounded-md border border-white/10 bg-zinc-950/70 px-3 py-2 text-zinc-100 outline-none focus:border-cyan-400/50" placeholder="Say hello" />
              </div>
              <button type="submit" className="inline-flex items-center gap-2 rounded-md border border-fuchsia-400/40 bg-fuchsia-400/10 px-4 py-2 text-fuchsia-200 hover:bg-fuchsia-400/20">
                <Send size={16} /> Send
              </button>
            </div>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="rounded-xl border border-white/10 bg-gradient-to-br from-cyan-500/10 via-fuchsia-500/10 to-orange-500/10 p-5"
          >
            <h3 className="text-xl font-semibold">Social</h3>
            <p className="mt-2 text-zinc-300">Connect with me across the web.</p>
            <ul className="mt-4 space-y-2 text-zinc-200">
              <li>
                <a className="hover:text-cyan-300" href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
              </li>
              <li>
                <a className="hover:text-cyan-300" href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn</a>
              </li>
              <li>
                <a className="hover:text-cyan-300" href="https://x.com/" target="_blank" rel="noreferrer">Twitter</a>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
