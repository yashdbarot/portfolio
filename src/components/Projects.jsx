import { ArrowUpRight } from 'lucide-react'
import { profile, projects } from '../data/resume'
import SectionHeading from './SectionHeading'

export default function Projects() {
  return (
    <section id="work" className="grid-bg mx-auto max-w-6xl scroll-mt-24 px-6 py-28">
      <SectionHeading
        index="04"
        kicker="SELECTED WORK"
        title="Featured builds."
        description="Real problems, real datasets — shipped inside real businesses."
      />

      <div className="grid gap-6 md:grid-cols-3">
        {projects.map((p) => (
          <a
            key={p.index}
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="reveal glass card-lift group flex flex-col rounded-xl p-7"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm text-neon/70">{p.index}</span>
              <ArrowUpRight className="h-5 w-5 text-slate-600 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neon" />
            </div>

            <h3 className="mt-6 font-display text-2xl font-semibold text-slate-100">
              {p.title}
            </h3>
            <p className="mt-1 font-mono text-xs tracking-wider text-pulse/90">@ {p.org}</p>

            <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-400">{p.description}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>

      <p className="reveal mt-10 text-center font-mono text-sm text-slate-500">
        more on{' '}
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="text-neon underline-offset-4 hover:underline"
        >
          github.com/yashdbarot →
        </a>
      </p>
    </section>
  )
}
