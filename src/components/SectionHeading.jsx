export default function SectionHeading({ index, kicker, title, description }) {
  return (
    <div className="reveal mb-14">
      <p className="font-mono text-sm text-neon/80 tracking-widest mb-3">
        {index} <span className="text-slate-600">//</span> {kicker}
      </p>
      <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-100 tracking-tight">
        {title}
      </h2>
      {description ? <p className="mt-4 max-w-2xl text-slate-400">{description}</p> : null}
    </div>
  )
}
