import { motion } from 'framer-motion'
import { photo, press } from '../data'
import { Reveal, SectionHeading } from './ui'

const FEATURED = [
  'The New York Times',
  'New Jersey Monthly',
  'Baristanet / Montclair Local',
  'Montclair Girl',
]

export default function Press() {
  const items = FEATURED.map((p) => press.find((x) => x.publication === p)).filter(
    (x): x is (typeof press)[number] => Boolean(x),
  )

  return (
    <section id="story" className="noise relative py-20 md:py-28">
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <Reveal>
            <div className="relative">
              <img
                src={photo('storefront').localPath}
                alt="The Red Eye Cafe storefront on Walnut Street, Montclair, with its black RED EYE awning"
                loading="lazy"
                className="w-full rounded-2xl border border-cream/10 object-cover shadow-2xl shadow-black/40"
              />
              <div className="absolute -bottom-5 -right-4 rounded-xl border border-cream/12 bg-soot/95 px-5 py-3.5 shadow-xl backdrop-blur">
                <p className="font-display text-2xl leading-none text-brick">2012</p>
                <p className="mt-1 text-[0.66rem] uppercase tracking-[0.18em] text-cream/45">
                  Opened May 26
                </p>
              </div>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="The story"
              title={
                <>
                  A block from
                  <br />
                  <span className="text-brick">the train.</span>
                </>
              }
            />
            <Reveal delay={0.12}>
              <div className="mt-6 space-y-4 text-[0.98rem] leading-relaxed text-cream/65">
                <p>
                  Anthony Brinton spent fifteen years running the floor and the espresso bar at Cafe
                  Eclectic before opening Red Eye with his twin brother Matthew in May 2012. Thirty-four
                  seats in 1,800 square feet, at the quiet end of Walnut Street. The location was
                  deliberate. “This is a sleepy little area, but people want to get out of the center
                  of town,” he told the New York Times that June. “They enjoy the quiet.”
                </p>
                <p>
                  The name is the drink: a red eye is drip coffee with a shot of espresso pulled
                  into it, and it's Brinton's own order. Fourteen years later the cafe has become the
                  anchor of the Walnut Street food scene it helped start, which is what the
                  chalkboard out front means by <em>often imitated, never duplicated</em>.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* --------------------------------- press -------------------------------- */}
        <div className="mt-16">
          <Reveal>
            <p className="eyebrow mb-6">In the press</p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {items.map((p, i) => (
              <motion.a
                key={p.url}
                href={p.url}
                target="_blank"
                rel="noreferrer noopener"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: (i % 2) * 0.08 }}
                className="card group flex flex-col p-6 transition-colors hover:border-brass/30 sm:p-7"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-display text-lg leading-tight tracking-wide text-brass">
                    {p.publication}
                  </span>
                  <span className="shrink-0 text-[0.66rem] text-cream/30">
                    {(p.date ?? '').slice(0, 4)}
                  </span>
                </div>
                <p className="mt-4 flex-1 font-serif text-[1.05rem] leading-snug text-cream/80">
                  “{p.pullQuote.replace(/^"|"$/g, '')}”
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[0.66rem] uppercase tracking-[0.16em] text-cream/35 transition group-hover:text-cream/70">
                  Read it
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M7 17L17 7m0 0H8m9 0v9"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
