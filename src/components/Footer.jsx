export default function Footer() {
  return (
    <footer className="border-t border-slate-400/10 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 font-mono text-xs text-slate-600 md:flex-row">
        <span>
          <span className="text-neon">©</span> 2026 Yash Barot — Surat, IN
        </span>
        <span>
          built with <span className="text-neon">react</span> ·{' '}
          <span className="text-pulse">three.js</span> · <span className="text-mint">gsap</span>
        </span>
        <a href="#top" className="transition-colors hover:text-neon">
          cd ~/top ↑
        </a>
      </div>
    </footer>
  )
}
