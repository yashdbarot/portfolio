export default function Marquee({ items }) {
  const row = [...items, ...items]
  return (
    <div className="relative overflow-hidden border-y border-slate-400/10 bg-panel/60 py-4">
      <div className="flex w-max animate-marquee gap-0">
        {row.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-6 px-6 font-mono text-sm tracking-widest text-slate-500 uppercase"
          >
            {item}
            <span className="text-neon/50">✦</span>
          </span>
        ))}
      </div>
      {/* edge fade */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-void to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-void to-transparent" />
    </div>
  )
}
