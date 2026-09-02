import { profile } from '../data/resume'
import SectionHeading from './SectionHeading'

const profileJson = [
  ['  "name"', `: "${profile.name}"`],
  ['  "role"', `: "${profile.role}"`],
  ['  "base"', `: "${profile.location}"`],
  ['  "education"', `: "B.Tech — Computer Engineering"`],
  ['  "stack"', `: ["Python", "SQL", "Power BI", "Excel"]`],
  ['  "currently"', `: "turning data into decisions"`],
]

export default function About() {
  return (
    <section id="about" className="grid-bg relative mx-auto max-w-6xl scroll-mt-24 px-6 py-28">
      <SectionHeading
        index="01"
        kicker="ABOUT"
        title="Signal from noise."
        description="A data analyst who cares about the story behind the spreadsheet."
      />

      <div className="grid items-start gap-10 md:grid-cols-2">
        <div className="reveal space-y-5 text-lg leading-relaxed text-slate-400">
          <p>{profile.summary}</p>
          <p>
            Whether it's a{' '}
            <span className="text-neon">Power BI dashboard</span> leadership checks daily or a{' '}
            <span className="text-pulse">Python workflow</span> that quietly kills 3 hours of manual
            reporting — I build the thing, then make it run itself.
          </p>
        </div>

        {/* profile.json — terminal-flavored card */}
        <div className="reveal glass card-lift overflow-hidden rounded-xl">
          <div className="flex items-center gap-2 border-b border-slate-400/10 px-5 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amberish/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-mint/70" />
            <span className="ml-3 font-mono text-xs text-slate-500">~/yash/profile.json</span>
          </div>
          <pre className="overflow-x-auto p-6 font-mono text-sm leading-7">
            <code>
              <span className="text-slate-500">{'{'}</span>
              {'\n'}
              {profileJson.map(([key, value], i) => (
                <span key={i}>
                  <span className="text-neon">{key}</span>
                  <span className="text-slate-300">{value}</span>
                  {i < profileJson.length - 1 && <span className="text-slate-500">,</span>}
                  {'\n'}
                </span>
              ))}
              <span className="text-slate-500">{'}'}</span>
            </code>
          </pre>
        </div>
      </div>
    </section>
  )
}
