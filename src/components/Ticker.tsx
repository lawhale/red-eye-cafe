const PHRASES = [
  'New Orleans Sludge',
  'Buttermilk pancakes',
  'The Highlander',
  'Candied bacon',
  'Green eggs & ham',
  'Huevos rancheros',
  'Breakfast burger',
  'Kobrick + Intelligentsia coffee',
  'Scotch egg banh mi',
  'Hand-dipped french toast',
]

export default function Ticker() {
  const run = [...PHRASES, ...PHRASES]
  return (
    <div className="relative border-y border-cream/10 bg-soot/60 py-3.5">
      <div className="mask-fade-x flex overflow-hidden">
        <div className="animate-marquee flex shrink-0 items-center gap-8 pr-8">
          {run.map((p, i) => (
            <span key={i} className="flex shrink-0 items-center gap-8">
              <span className="whitespace-nowrap font-serif text-[0.95rem] italic text-cream/45">
                {p}
              </span>
              <span aria-hidden className="h-1 w-1 shrink-0 rounded-full bg-brick/70" />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
