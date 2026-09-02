import { experience } from '../data/resume'
import SectionHeading from './SectionHeading'

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-28">
      <SectionHeading
        index="03"
        kicker="EXPERIENCE"
        title="Where I've shipped."
        description="Three years across textiles, services and finance ops — always close to the data, always building."
      />

      <div className="relative ml-3 border-l border-slate-400/15 md:ml-6">
        {/* glowing timeline fill — GSAP draws this in App.jsx */}
        <div
          className="timeline-fill absolute -left-px top-0 h-full w-px origin-top bg-gradient-to-b from-neon via-pulse to-neon shadow-[0_0_12px_0_var(--color-neon)]"
          style={{ transform: 'scaleY(0)' }}
        />

        {experience.map((job) => (
          <article key={job.company} className="reveal relative pb-14 pl-8 last:pb-0 md:pl-12">
            {/* node */}
            <span className="absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-neon bg-void shadow-[0_0_12px_0_var(--color-neon)]" />

            <div className="glass card-lift rounded-xl p-6 md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-2xl font-semibold text-slate-100">
                    {job.role}
                  </h3>
                  <p className="mt-0.5 font-mono text-sm text-neon/90">
                    @ {job.company} <span className="text-slate-600">· {job.location}</span>
                  </p>
                </div>
                <span className="rounded-md border border-slate-400/15 bg-panel px-3 py-1.5 font-mono text-xs text-slate-400">
                  {job.period}
                </span>
              </div>

              <ul className="mt-5 space-y-2.5">
                {job.bullets.map((b, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-slate-400">
                    <span className="mt-1.5 shrink-0 font-mono text-xs text-neon">▸</span>
                    {b}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-2">
                {job.tags.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
