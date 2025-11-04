import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Music } from 'lucide-react';
import Spline from '@splinetool/react-spline';

const roles = ['Cybersecurity Engineer', 'Music Producer', 'Open Source Builder'];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [speed, setSpeed] = useState(80);
  const mounted = useRef(true);

  const current = useMemo(() => roles[index % roles.length], [index]);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    const tick = () => {
      if (!mounted.current) return;
      if (!deleting) {
        setDisplay(current.slice(0, display.length + 1));
        setSpeed(80);
        if (display.length + 1 === current.length) {
          setTimeout(() => setDeleting(true), 900);
        }
      } else {
        setDisplay(current.slice(0, display.length - 1));
        setSpeed(40);
        if (display.length === 0) {
          setDeleting(false);
          setIndex((i) => (i + 1) % roles.length);
        }
      }
    };

    const t = setTimeout(tick, speed);
    return () => clearTimeout(t);
  }, [display, deleting, speed, current]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative h-[90vh] w-full overflow-hidden bg-[#0a0a0b]">
      {/* 3D Spline background */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/7q1X9b7bG8JrC7mK/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Subtle gradient and grid overlay (non-interactive) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.15),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(249,115,22,0.12),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:40px_40px]" />

      <div className="relative mx-auto flex h-full max-w-6xl items-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl text-white"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-cyan-300">
            <Shield size={16} />
            <span className="text-xs">Security x Music x India</span>
          </div>

          <h1 className="text-4xl font-extrabold leading-tight sm:text-6xl">
            Cyberpunk Raga
            <span className="block bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-orange-300 bg-clip-text text-transparent">
              Ancient-futuristic craft
            </span>
          </h1>

          <p className="mt-4 text-lg text-zinc-300 sm:text-xl">
            <span className="text-zinc-400">I am a</span>
            <span className="ml-2 font-mono text-cyan-300">{display}</span>
            <span className="ml-1 text-cyan-500">▌</span>
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => scrollTo('projects')}
              className="group inline-flex items-center gap-2 rounded-md border border-cyan-500/40 bg-cyan-500/10 px-4 py-2 text-cyan-200 transition hover:bg-cyan-500/20"
            >
              Explore Portfolio
              <ArrowRight size={18} className="transition group-hover:translate-x-0.5" />
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="inline-flex items-center gap-2 rounded-md border border-orange-500/40 bg-orange-500/10 px-4 py-2 text-orange-200 transition hover:bg-orange-500/20"
            >
              <Music size={18} /> Listen
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
