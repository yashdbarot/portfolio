import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect } from 'react'
import About from './components/About'
import Contact from './components/Contact'
import Experience from './components/Experience'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Navbar from './components/Navbar'
import Projects from './components/Projects'
import Skills from './components/Skills'
import { marqueeTools } from './data/resume'
import { ThemeProvider } from './context/theme'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // hero intro sequence
      gsap.from('.hero-line', {
        opacity: 0,
        y: 36,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        delay: 0.15,
      })

      // generic scroll reveals
      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 44,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        })
      })

      // experience timeline draws down as you scroll
      gsap.to('.timeline-fill', {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '#experience',
          start: 'top 60%',
          end: 'bottom 70%',
          scrub: 0.6,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-void font-display text-slate-200 antialiased">
        <Navbar />
        <main>
          <Hero />
          <Marquee items={marqueeTools} />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
