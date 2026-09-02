import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { profile, stats } from '../data/resume'
import { GithubIcon, LinkedinIcon } from './icons'
import { Button } from './ui/button'

// three.js is heavy — split it into its own chunk, paint content first
const Scene3D = lazy(() => import('./Scene3D'))

/** Lightweight typewriter — cycles through taglines. */
function useTypewriter(words, typeSpeed = 75, deleteSpeed = 40, pause = 1600) {
  const [text, setText] = useState('')
  const state = useRef({ word: 0, deleting: false })

  useEffect(() => {
    const tick = () => {
      const s = state.current
      const word = words[s.word]
      if (!s.deleting) {
        setText(word.slice(0, text.length + 1))
        if (text.length + 1 === word.length) {
          s.deleting = true
          return pause
        }
        return typeSpeed
      }
      setText(word.slice(0, text.length - 1))
      if (text.length === 0) {
        s.deleting = false
        s.word = (s.word + 1) % words.length
      }
      return deleteSpeed
    }

    let timer
    const loop = () => {
      const delay = tick()
      timer = setTimeout(loop, delay)
    }
    loop()
    return () => clearTimeout(timer)
  }, [text, words, typeSpeed, deleteSpeed, pause])

  return text
}

/** Animated counter — counts up once when scrolled into view. */
function Counter({ value, suffix = '' }) {
  const ref = useRef(null)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const start = performance.now()
        const duration = 1400
        const step = (now) => {
          const p = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          setDisplay(Math.round(eased * value))
          if (p < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [value])

  return (
    <span ref={ref} className="font-display text-4xl font-bold text-slate-100">
      {display}
      <span className="text-neon">{suffix}</span>
    </span>
  )
}

export default function Hero() {
  const typed = useTypewriter(profile.taglines)

  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden">
      {/* 3D universe */}
      <Suspense fallback={null}>
        <Scene3D />
      </Suspense>
      {/* readability vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--color-void)_88%)]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-28 pb-20">
        <p className="hero-line font-mono text-sm tracking-widest text-neon/90">
          <span className="text-slate-600">$</span> whoami --verbose
        </p>

        <h1 className="hero-line mt-4 font-display text-6xl font-bold tracking-tight md:text-8xl">
          <span className="text-gradient neon-glow">{profile.name}</span>
        </h1>

        <p className="hero-line mt-4 font-mono text-xl text-slate-300 md:text-2xl">
          <span className="text-pulse">&gt;</span> {typed}
          <span className="ml-1 inline-block h-6 w-[10px] translate-y-[4px] animate-blink bg-neon" />
        </p>

        <p className="hero-line mt-6 max-w-xl text-lg leading-relaxed text-slate-400">
          I turn raw operational data into decisions — pipelines, KPIs and dashboards that
          people actually use. Based in {profile.location}.
        </p>

        <div className="hero-line mt-9 flex flex-wrap items-center gap-4">
          <Button as="a" href="#work" size="lg" variant="neon">
            view.work() <ArrowDown className="h-4 w-4" />
          </Button>
          <Button as="a" href="#contact" size="lg" variant="outline">
            get_in_touch() <ArrowUpRight className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2 pl-1">
            <Button as="a" href={profile.github} target="_blank" rel="noreferrer" variant="ghost" size="icon" aria-label="GitHub">
              <GithubIcon className="h-5 w-5" />
            </Button>
            <Button as="a" href={profile.linkedin} target="_blank" rel="noreferrer" variant="ghost" size="icon" aria-label="LinkedIn">
              <LinkedinIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* stats */}
        <div className="hero-line mt-16 grid max-w-xl grid-cols-3 gap-6 border-t border-slate-400/10 pt-8">
          {stats.map((s) => (
            <div key={s.label}>
              <Counter value={s.value} suffix={s.suffix} />
              <p className="mt-1 font-mono text-xs tracking-wider text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* scroll hint */}
      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 font-mono text-xs tracking-widest text-slate-600">
        scroll ↓
      </div>
    </section>
  )
}
