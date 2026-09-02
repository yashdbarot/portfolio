import { BarChart3, Code2, Database, Layers, TrendingUp, Users } from 'lucide-react'
import { skillGroups } from '../data/resume'
import SectionHeading from './SectionHeading'

const iconMap = { Code2, TrendingUp, BarChart3, Layers, Database, Users }

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-28">
      <SectionHeading
        index="02"
        kicker="SKILLS"
        title="The toolbox."
        description="Query it, clean it, model it, ship it — end to end."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, gi) => {
          const Icon = iconMap[group.icon] ?? Code2
          return (
            <div
              key={group.title}
              className="reveal glass card-lift rounded-xl p-6"
              style={{ transitionDelay: `${gi * 40}ms` }}
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-md border border-neon/25 bg-neon/5">
                    <Icon className="h-4.5 w-4.5 text-neon" />
                  </span>
                  <h3 className="font-display text-lg font-semibold text-slate-100">
                    {group.title}
                  </h3>
                </span>
                <span className="font-mono text-xs text-slate-600">
                  {String(gi + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
