import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTheme } from '../context/theme'

const links = [
  { id: 'about', index: '01', label: 'about' },
  { id: 'skills', index: '02', label: 'skills' },
  { id: 'experience', index: '03', label: 'experience' },
  { id: 'work', index: '04', label: 'work' },
  { id: 'contact', index: '05', label: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass border-b border-slate-400/10' : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="font-mono text-sm text-slate-200 hover:text-neon transition-colors">
          <span className="text-neon">yash</span>@barot<span className="text-pulse">:~$</span>
          <span className="ml-1 inline-block h-4 w-2 translate-y-[3px] bg-neon/80 animate-blink" />
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className="group font-mono text-xs tracking-wider text-slate-400 transition-colors hover:text-neon"
              >
                <span className="text-neon/60">{l.index}.</span> {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={`mailto:yashbarot499@gmail.com`}
              className="rounded-md border border-neon/40 px-4 py-2 font-mono text-xs text-neon transition-all hover:bg-neon/10 hover:shadow-[0_0_20px_-6px_var(--color-neon)]"
            >
              hire me
            </a>
          </li>
        </ul>

        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="ml-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-slate-400/15 text-slate-400 transition-all duration-300 hover:border-neon/50 hover:text-neon"
        >
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </nav>
    </header>
  )
}
