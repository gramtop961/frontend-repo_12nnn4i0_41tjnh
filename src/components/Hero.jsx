import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import { Music, Shield, ArrowRight } from 'lucide-react';

const roles = [
  'Cybersecurity Enthusiast',
  'Musician & Composer',
  'Indian Retro-Modern Creator',
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [blink, setBlink] = useState(true);
  const [reverse, setReverse] = useState(false);
  const intervalRef = useRef(null);

  // Typewriter effect
  useEffect(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, 60);
    return () => clearInterval(intervalRef.current);
  }, [index, reverse]);

  useEffect(() => {
    if (!reverse && subIndex === roles[index].length + 4) {
      setReverse(true);
      return;
    }
    if (reverse && subIndex === 0) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % roles.length);
      return;
    }
  }, [subIndex, reverse, index]);

  useEffect(() => {
    const blinkInterval = setInterval(() => setBlink((v) => !v), 500);
    return () => clearInterval(blinkInterval);
  }, []);

  const gradientMask = useMemo(
    () => (
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/80" />
    ),
    []
  );

  return (
    <section className="relative h-[90vh] w-full overflow-hidden rounded-b-3xl border-b border-white/10">
      {/* Spline background */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/7m4PRZ7kg6K1jPfF/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {gradientMask}

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-start justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-black/40 px-3 py-1 text-xs text-teal-300 backdrop-blur-md"
        >
          <Shield className="h-4 w-4 text-teal-300" />
          <span>Cyber × Music × India</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-6xl"
        >
          Securing the Digital World.
          <br />
          <span className="bg-gradient-to-r from-teal-300 via-orange-400 to-purple-400 bg-clip-text text-transparent">
            Composing its Rhythm.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-4 max-w-2xl text-base text-white/80 sm:text-lg"
        >
          A retro-modern fusion of cybersecurity precision and musical soul —
          inspired by the colors, craft, and rhythm of India.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.8 }}
          className="mt-6 flex flex-wrap items-center gap-3"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full border border-teal-400/40 bg-black/50 px-5 py-2 text-teal-200 shadow-[0_0_20px_rgba(45,212,191,0.15)] transition hover:border-teal-300 hover:text-teal-100"
          >
            Explore Portfolio
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </a>
          <a
            href="#music"
            className="inline-flex items-center gap-2 rounded-full border border-orange-400/40 bg-black/50 px-5 py-2 text-orange-200 shadow-[0_0_20px_rgba(251,146,60,0.12)] transition hover:border-orange-300 hover:text-orange-100"
          >
            <Music className="h-4 w-4" /> Listen
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-purple-400/40 bg-black/50 px-5 py-2 text-purple-200 shadow-[0_0_20px_rgba(192,132,252,0.12)] transition hover:border-purple-300 hover:text-purple-100"
          >
            Get in Touch
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="mt-8 rounded-lg border border-white/10 bg-black/40 px-4 py-2 text-sm text-white/80 backdrop-blur-md"
        >
          <span className="text-white/60">I am </span>
          <span className="text-teal-300">
            {roles[index].substring(0, Math.min(subIndex, roles[index].length))}
          </span>
          <span className={`${blink ? 'opacity-100' : 'opacity-0'} ml-1`}>▌</span>
        </motion.div>
      </div>

      {/* Indian fusion subtle glow */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-orange-500/10 via-amber-400/5 to-transparent blur-2xl" />
    </section>
  );
}
