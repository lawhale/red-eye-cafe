import { motion } from 'framer-motion'
import { featuredQuotes, ratings } from '../data'
import { Reveal, SectionHeading, Stars } from './ui'

const PLATFORM_TINT: Record<string, string> = {
  Google: 'text-brass',
  Yelp: 'text-ember',
  TripAdvisor: 'text-sage',
  Grubhub: 'text-cream/60',
  MenuPix: 'text-cream/60',
}

export default function Reviews({ standalone = false }: { standalone?: boolean }) {
  const shown = ratings.filter((r) =>
    ['Google', 'Yelp', 'TripAdvisor', 'DoorDash', 'Restaurantji'].includes(r.platform),
  )

  return (
    <section
      id="reviews"
      className={`noise relative bg-soot/40 py-20 md:py-28 ${standalone ? 'pt-28 md:pt-32' : ''}`}
    >
      <div className="wrap">
        <SectionHeading
          eyebrow="4.5 stars · 672 Google reviews · 749 on Yelp"
          title={
            <>
              Fourteen years of
              <br />
              <span className="text-brick">people saying so.</span>
            </>
          }
          lead="Real, verbatim reviews. We've linked every one to where it was published."
          align="center"
        />

        {/* ------------------------------ score strip ----------------------------- */}
        <Reveal delay={0.1}>
          <div className="mt-12 grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {shown.map((r) => (
              <a
                key={r.platform}
                href={r.url}
                target="_blank"
                rel="noreferrer noopener"
                className="group rounded-xl border border-cream/10 bg-ink/40 p-5 text-center transition hover:border-brass/30"
              >
                <p className="text-[0.64rem] font-500 uppercase tracking-[0.2em] text-cream/45">
                  {r.platform}
                </p>
                <p className="mt-2 font-display text-4xl leading-none text-cream transition group-hover:text-ember">
                  {r.score.toFixed(1)}
                </p>
                <div className="mt-2 flex justify-center">
                  <Stars score={r.score} size={11} />
                </div>
                <p className="mt-2 text-[0.68rem] text-cream/35">
                  {r.platform === 'DoorDash'
                    ? '3k+ ratings'
                    : `${r.count?.toLocaleString()} reviews`}
                </p>
              </a>
            ))}
          </div>
        </Reveal>

        {/* ------------------------------ quote wall ------------------------------ */}
        <div className="mt-12 columns-1 gap-4 md:columns-2 lg:columns-3 [&>*]:mb-4">
          {featuredQuotes.map((q, i) => (
            <motion.figure
              key={`${q.author}-${i}`}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.07 }}
              className="card break-inside-avoid p-6"
            >
              <div className="flex items-center justify-between gap-3">
                {q.stars ? (
                  <Stars score={q.stars} size={13} />
                ) : (
                  <span className="text-[0.62rem] uppercase tracking-[0.18em] text-cream/25">
                    Review
                  </span>
                )}
                <span
                  className={`text-[0.62rem] font-500 uppercase tracking-[0.18em] ${
                    PLATFORM_TINT[q.platform.split(' ')[0]] ?? 'text-cream/50'
                  }`}
                >
                  {q.platform.split(' ')[0]}
                </span>
              </div>

              <blockquote className="mt-4">
                <p className="font-serif text-[1.05rem] leading-snug text-cream/85">“{q.text}”</p>
              </blockquote>

              <figcaption className="mt-4 flex items-center justify-between gap-3 border-t border-cream/10 pt-3">
                <span className="text-[0.75rem] text-cream/50">{q.author}</span>
                <a
                  href={q.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-[0.66rem] uppercase tracking-[0.14em] text-cream/30 transition hover:text-brass"
                >
                  Source ↗
                </a>
              </figcaption>
            </motion.figure>
          ))}
        </div>

      </div>
    </section>
  )
}
