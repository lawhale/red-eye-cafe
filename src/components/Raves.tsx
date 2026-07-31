import { motion } from 'framer-motion'
import { featuredRaves, photo } from '../data'
import { Reveal, SectionHeading } from './ui'

export default function Raves() {
  const [hero, ...rest] = featuredRaves

  return (
    <section id="raves" className="noise relative py-20 md:py-28">
      <div className="wrap">
        <SectionHeading
          eyebrow="What people actually order"
          title={
            <>
              What they
              <br />
              <span className="text-brick">rave about.</span>
            </>
          }
          lead="The dishes people bring up again and again in reviews, with a few of their own words."
        />

        {/* ------------------------------ hero rave ------------------------------ */}
        {hero && (
          <Reveal delay={0.1}>
            <div className="card group mt-12 grid gap-0 md:grid-cols-[1.1fr_1fr]">
              <div className="relative h-56 overflow-hidden sm:h-72 md:h-[23rem]">
                <img
                  src={photo(hero.photoId ?? 'iced-coffee').localPath}
                  alt="Cold brew on tap at Red Eye Cafe"
                  loading="lazy"
                  className="h-full w-full object-cover object-center transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-soot via-soot/20 to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-soot/90" />
                <div className="absolute left-5 top-5 rounded-full border border-cream/20 bg-ink/70 px-3 py-1 backdrop-blur">
                  <span className="text-[0.62rem] font-500 uppercase tracking-[0.2em] text-cream/80">
                    Most mentioned
                  </span>
                </div>
              </div>

              <div className="flex flex-col justify-center p-7 md:p-9">
                <div className="flex items-center gap-3.5">
                  <span className="font-display text-[3.25rem] leading-none text-brick">
                    {hero.rave.mentions}
                  </span>
                  <span className="max-w-[8.5rem] text-[0.74rem] leading-snug text-cream/45">
                    reviews called out the coffee
                  </span>
                </div>
                <h3 className="mt-4 font-display text-3xl tracking-wide text-cream">
                  The coffee, and the Sludge
                </h3>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-cream/60">
                  The single most consistently praised thing at Red Eye, and the only one praised
                  even inside otherwise-negative reviews. The signature is the New Orleans Sludge, a
                  cold-brewed dark roast with cardamom. Beans are Kobrick and Intelligentsia.
                </p>
                <blockquote className="mt-5 border-l-2 border-brick/60 pl-4">
                  <p className="font-serif text-lg italic leading-snug text-cream/85">
                    “The coffee is exceptional — rich, smooth, and clearly brewed with care.”
                  </p>
                  <footer className="mt-2 text-[0.72rem] uppercase tracking-[0.14em] text-cream/40">
                    Mariya Okhten ·{' '}
                    <a
                      href="https://restaurantguru.com/Red-Eye-Cafe-Newark"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-brass/80 underline-offset-2 hover:text-ember hover:underline"
                    >
                      Google, 5★
                    </a>
                  </footer>
                </blockquote>
              </div>
            </div>
          </Reveal>
        )}

        {/* ------------------------------- rave grid ------------------------------ */}
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map(({ rave, photoId }, i) => (
            <motion.article
              key={rave.dish}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="card group flex flex-col"
            >
              {photoId ? (
                <div className="relative overflow-hidden">
                  <img
                    src={photo(photoId).localPath}
                    alt={rave.dish}
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-soot via-soot/10 to-transparent" />
                </div>
              ) : (
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-soot to-ink">
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="font-display text-7xl leading-none text-cream/[0.06]">
                      {rave.mentions}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-[1.35rem] leading-tight tracking-wide text-cream">
                    {rave.dish.replace(/\s*\(.*\)$/, '')}
                  </h3>
                  <span
                    className="mt-0.5 shrink-0 rounded-full border border-brick/40 bg-brick/10 px-2.5 py-0.5 text-[0.65rem] font-500 text-ember"
                    title={rave.basis}
                  >
                    ×{rave.mentions}
                  </span>
                </div>

                <blockquote className="mt-3 flex-1">
                  <p className="font-serif text-[0.98rem] italic leading-snug text-cream/70">
                    “{trim(rave.quote, 155)}”
                  </p>
                </blockquote>

                <a
                  href={rave.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-4 inline-flex items-center gap-1.5 text-[0.68rem] uppercase tracking-[0.16em] text-cream/40 transition hover:text-brass"
                >
                  {rave.source}
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M7 17L17 7m0 0H8m9 0v9"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  )
}

function trim(s: string, n: number) {
  if (s.length <= n) return s
  return s.slice(0, s.lastIndexOf(' ', n)).replace(/[,.;]$/, '') + '…'
}
