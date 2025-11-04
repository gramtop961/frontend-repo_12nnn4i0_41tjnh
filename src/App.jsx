import React, { useEffect } from 'react';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Projects from './components/Projects.jsx';
import Contact from './components/Contact.jsx';

export default function App() {
  useEffect(() => {
    // Console easter-egg greeting
    // eslint-disable-next-line no-console
    console.log('%cnamaste()', 'color:#67e8f9;font-weight:bold', '\nWelcome to the console!');
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <a href="#home" className="bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-orange-300 bg-clip-text text-lg font-semibold text-transparent">
            Cyber Raga
          </a>
          <nav className="flex items-center gap-4 text-sm text-zinc-300">
            <a href="#about" className="hover:text-cyan-300">About</a>
            <a href="#projects" className="hover:text-cyan-300">Projects</a>
            <a href="#contact" className="hover:text-cyan-300">Contact</a>
          </nav>
        </div>
      </header>

      {/* Sections */}
      <main id="home">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-zinc-950/80 py-8 text-center text-sm text-zinc-400">
        <p>
          Built with love for security, sound, and culture. © {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
