import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { dimensionScores, galleryIds, photo } from '../data'
import { Reveal, SectionHeading } from './ui'

/* Vibe claims, each tied to the source that supports it. */
const NOTES = [
  {
    k: 'Built by hand',
    v: 'Salvaged chairs and tables made from old countertops, sanded and stained by owner Anthony Brinton himself. The chandelier came out of the 1920s Newark train station.',
    src: 'Baristanet / Montclair Local',
    url: 'https://montclairlocal.news/2012/06/welcome-to-the-red-eye-cafe/',
  },
  {
    k: 'Made for lingering',
    v: 'Bookshelves ring the room with Brinton’s own collection, from Rushdie to Lethem. Outlets everywhere so laptops don’t fight over them. There’s a chess board.',
    src: 'Baristanet / Montclair Local',
    url: 'https://montclairlocal.news/2012/06/welcome-to-the-red-eye-cafe/',
  },
  {
    k: 'Reads as Brooklyn, not suburbs',
    v: 'White subway tile, blackboard walls, vintage bulbs and the cafe name set in mosaic. Reviewers reach for subway metaphors without being prompted.',
    src: 'The Montclarion',
    url: 'https://themontclarion.org/feature/red-eye-cafe/',
  },
  {
    k: 'Small, and it matters',
    v: '34 seats in 1,800 square feet when it opened. Expect a wait between 10am and noon on weekends. Regulars treat it as the cost of admission.',
    src: 'The New York Times',
    url: 'https://www.nytimes.com/2012/06/10/nyregion/the-red-eye-cafe-and-le-salbuen-offer-travelers-a-respite.html',
  },
]

export default function Vibe({ standalone = false }: { standalone?: boolean }) {
  const [lightbox, setLightbox] = useState<number | null>(null)

  const close = useCallback(() => setLightbox(null), [])
  const step = useCallback(
    (d: number) =>
      setLightbox((i) => (i === null ? null : (i + d + galleryIds.length) % galleryIds.length)),
    [],
  )

  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightbox, close, step])

  return (
    <section
      id="room"
      className={`noise relative py-20 md:py-28 ${standalone ? 'pt-28 md:pt-32' : ''}`}
    >
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="The room"
              title={
                <>
                  Small, dim,
                  <br />
                  <span className="text-brick">full of character.</span>
                </>
              }
            />
            <Reveal delay={0.12}>
              <div className="mt-6 space-y-4 text-[0.98rem] leading-relaxed text-cream/65">
                <p>
                  Red Eye reads as a room that was built by hand rather than designed. White subway
                  tile at the entrance with the name set in mosaic, blackboard walls, bare vintage
                  bulbs hanging from a black-painted beam, and shelves of secondhand books running
                  the perimeter. New Jersey Monthly filed it under “intimate, industrial-chic cafe
                  with blackboard walls, old-fashioned wood counter, vintage lighting and a hip
                  vibe.”
                </p>
                <p>
                  People consistently reach for city metaphors. One Tripadvisor reviewer wrote that
                  the tiled walls “evoke more of a sense that you're about to board a 6-local train
                  to Bleecker Street, rather than be handed a mocha late.” A long-time Google
                  reviewer called it “a very relaxed, New York City punk vibe.” That is roughly the
                  intent: when the cafe opened in 2012, Brinton said he wanted a place “where you
                  can relax and not get the bum's rush or the hard sell.”
                </p>
              </div>
            </Reveal>

            {/* dimension scores — atmosphere outranks the food */}
            <Reveal delay={0.18}>
              <div className="mt-9 rounded-2xl border border-cream/10 bg-soot/50 p-6">
                <p className="eyebrow">Rated across 234 reviews</p>
                <div className="mt-5 space-y-4">
                  {dimensionScores.map((d, i) => (
                    <div key={d.label}>
                      <div className="mb-1.5 flex items-baseline justify-between">
                        <span className="text-[0.82rem] font-500 text-cream/80">{d.label}</span>
                        <span className="font-display text-lg text-brass">{d.score}</span>
                      </div>
                      <div className="h-[3px] w-full overflow-hidden rounded-full bg-cream/10">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(d.score / 5) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.1, delay: 0.15 + i * 0.12, ease: 'easeOut' }}
                          className={`h-full rounded-full ${
                            i === 0 ? 'bg-brick' : 'bg-brass/60'
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-[0.76rem] leading-relaxed text-cream/40">
                  Atmosphere is the single highest-rated thing about Red Eye, above the food. Which
                  is the whole point.{' '}
                  <a
                    href="https://www.restaurantji.com/nj/montclair/red-eye-cafe-/"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-brass/80 underline-offset-2 hover:text-ember hover:underline"
                  >
                    Restaurantji
                  </a>
                </p>
              </div>
            </Reveal>
          </div>

          {/* sourced vibe notes */}
          <div className="space-y-3 lg:pt-16">
            {NOTES.map((n, i) => (
              <Reveal key={n.k} delay={0.08 * i}>
                <div className="group rounded-xl border border-cream/10 bg-soot/40 p-5 transition-colors hover:border-brass/30">
                  <h3 className="font-display text-xl tracking-wide text-cream">{n.k}</h3>
                  <p className="mt-2 text-[0.86rem] leading-relaxed text-cream/55">{n.v}</p>
                  <a
                    href={n.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-3 inline-block text-[0.66rem] uppercase tracking-[0.16em] text-cream/35 transition hover:text-brass"
                  >
                    Source: {n.src} ↗
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ------------------------------- gallery ------------------------------- */}
        <div className="mt-16">
          <Reveal>
            <div className="mb-6 flex items-end justify-between gap-6">
              <h3 className="font-display text-2xl tracking-wide text-cream/80">
                {galleryIds.length} photographs
              </h3>
              <p className="text-[0.72rem] text-cream/35">Tap any image to enlarge</p>
            </div>
          </Reveal>

          <div className="columns-2 gap-3 sm:columns-3 lg:columns-4 [&>*]:mb-3">
            {galleryIds.map((id, i) => {
              const p = photo(id)
              return (
                <motion.button
                  key={id}
                  onClick={() => setLightbox(i)}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.55, delay: (i % 4) * 0.06 }}
                  className="group relative block w-full overflow-hidden rounded-lg border border-cream/10 focus:outline-none focus:ring-2 focus:ring-brass"
                >
                  <img
                    src={p.localPath}
                    alt={p.subject}
                    loading="lazy"
                    className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />
                  <span className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/25" />
                  <span className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-ink/95 to-transparent p-3 text-left text-[0.66rem] uppercase tracking-[0.14em] text-cream/80 transition-transform duration-400 group-hover:translate-y-0">
                    {p.subject}
                  </span>
                </motion.button>
              )
            })}
          </div>

          <Reveal>
            <p className="mt-6 text-[0.76rem] leading-relaxed text-cream/35">
              Photography from Red Eye Cafe's own gallery, plus customer photographs published on
              Restaurantji, Tripadvisor and Yelp, and an editorial photo from My Local Nooks. Each
              image credits its source in the lightbox.
            </p>
          </Reveal>
        </div>
      </div>

      {/* ------------------------------- lightbox ------------------------------- */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[60] grid place-items-center bg-ink/95 p-4 backdrop-blur-md sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-cream/20 text-cream/70 transition hover:border-cream/50 hover:text-cream"
            >
              ✕
            </button>

            {[-1, 1].map((d) => (
              <button
                key={d}
                onClick={(e) => {
                  e.stopPropagation()
                  step(d)
                }}
                aria-label={d < 0 ? 'Previous photo' : 'Next photo'}
                className={`absolute top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-cream/20 text-cream/70 transition hover:border-cream/50 hover:text-cream ${
                  d < 0 ? 'left-3 sm:left-6' : 'right-3 sm:right-6'
                }`}
              >
                {d < 0 ? '‹' : '›'}
              </button>
            ))}

            <motion.figure
              key={lightbox}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-full w-full max-w-4xl"
            >
              <img
                src={photo(galleryIds[lightbox]).localPath}
                alt={photo(galleryIds[lightbox]).subject}
                className="mx-auto max-h-[76vh] w-auto rounded-xl object-contain shadow-2xl"
              />
              <figcaption className="mx-auto mt-4 flex max-w-2xl flex-wrap items-center justify-between gap-3 text-[0.72rem]">
                <span className="uppercase tracking-[0.16em] text-cream/70">
                  {photo(galleryIds[lightbox]).subject}
                </span>
                <a
                  href={photo(galleryIds[lightbox]).sourcePage}
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={(e) => e.stopPropagation()}
                  className="text-cream/40 underline-offset-2 transition hover:text-brass hover:underline"
                >
                  {photo(galleryIds[lightbox]).credit} ↗
                </a>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
