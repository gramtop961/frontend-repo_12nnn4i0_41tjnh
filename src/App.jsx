import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <a href="#" className="inline-flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-teal-400 shadow-[0_0_20px_rgba(45,212,191,0.7)]" />
            <span className="bg-gradient-to-r from-teal-300 via-orange-300 to-purple-300 bg-clip-text text-sm font-bold tracking-wide text-transparent">
              Cyber × Music × India
            </span>
          </a>
          <nav className="hidden gap-5 text-sm text-white/70 sm:flex">
            <a href="#about" className="hover:text-white">About</a>
            <a href="#projects" className="hover:text-white">Projects</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </nav>
        </div>
      </header>

      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>

      <footer className="border-t border-white/10 bg-black/60">
        <div className="mx-auto max-w-6xl px-6 py-8 text-center text-sm text-white/60">
          <div className="mb-2 text-amber-200/80">Crafted in India | Secured by Passion</div>
          <div>
            <span className="font-mono text-xs text-white/50">Type</span>{' '}
            <kbd className="rounded-sm border border-white/20 bg-black/50 px-1.5 py-0.5 text-xs">namaste</kbd>{' '}
            <span className="font-mono text-xs text-white/50">in the console for a greeting</span>
          </div>
        </div>
      </footer>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function(){
              const msg = '\\n\\nनमस्ते — Knowledge is Supreme Power (ज्ञानं परमं बलं)\\n\\n';
              console.log('%c' + msg, 'color:#a3e635;font-weight:bold');
            })();
          `,
        }}
      />
    </div>
  );
}
