import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { heroRatings, photo } from '../data'
import { Stars } from './ui'

/* The real eye-chart sign in the cafe reads RED / EYE / CAFE / 94 WALNUT ST /
   MONTCLAIR NJ / FOOD COFFEE COMFORT, each line smaller than the last. */
const CHART = [
  { text: 'RED', size: 'text-[19vw] md:text-[10.5rem]', gap: '', accent: true },
  { text: 'EYE', size: 'text-[15vw] md:text-[8.25rem]', gap: 'mt-1' },
  { text: 'CAFE', size: 'text-[9vw] md:text-[5rem]', gap: 'mt-2' },
  { text: '94 WALNUT ST', size: 'text-[4.4vw] md:text-[1.85rem]', gap: 'mt-4' },
  { text: 'MONTCLAIR NJ', size: 'text-[3vw] md:text-[1.2rem]', gap: 'mt-3.5' },
  { text: 'FOOD · COFFEE · COMFORT', size: 'text-[2.1vw] md:text-[0.8rem]', gap: 'mt-3.5' },
]

export default function Hero() {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const imgY = useTransform(scrollY, [0, 700], [0, reduce ? 0 : 90])

  return (
    <section id="top" className="noise relative isolate overflow-hidden pb-14 pt-28 md:pb-20 md:pt-32">
      {/* warm glow behind the type */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-10 -z-10 h-[34rem] w-[34rem] rounded-full bg-brick/20 blur-[130px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 -z-10 h-[26rem] w-[26rem] rounded-full bg-brass/10 blur-[120px]"
      />

      <div className="wrap grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* ------------------------------ eye chart ------------------------------ */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-cream/15 bg-cream/[0.04] px-4 py-1.5 backdrop-blur"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-sage" />
            </span>
            <span className="text-[0.68rem] font-500 uppercase tracking-[0.24em] text-cream/70">
              Open daily 8am – 3pm
            </span>
          </motion.div>

          <div className="border-y-2 border-cream/15 py-6 pl-1 pr-4 md:py-8">
            {CHART.map((line, i) => (
              <motion.div
                key={line.text}
                initial={{ opacity: 0, y: 26, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.85, delay: 0.12 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                className={`flex items-baseline gap-4 ${line.gap}`}
              >
                <span
                  aria-hidden
                  className="hidden w-5 shrink-0 select-none font-sans text-[0.6rem] tracking-widest text-cream/20 sm:block"
                >
                  {i + 1}
                </span>
                <span
                  className={`font-display leading-[0.86] tracking-[0.06em] ${line.size} ${
                    line.accent ? 'text-brick' : 'text-cream'
                  }`}
                >
                  {line.text}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.8 }}
            className="mt-7 max-w-md text-balance text-[0.98rem] leading-relaxed text-cream/65"
          >
            Slinging great food and drinks on Walnut Street since 2012. Often imitated, never
            duplicated. Quality stuff at a good price, without all the fluff.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.7 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link
              to="/menu"
              className="group inline-flex items-center gap-2.5 rounded-full bg-brick px-7 py-3.5 text-[0.8rem] font-500 uppercase tracking-[0.18em] text-cream shadow-xl shadow-brick/25 transition hover:bg-ember"
            >
              See the menu
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M5 12h14m0 0l-6-6m6 6l-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </svg>
            </Link>
            <Link
              to="/room"
              className="rounded-full border border-cream/20 px-7 py-3.5 text-[0.8rem] font-500 uppercase tracking-[0.18em] text-cream/80 transition hover:border-cream/45 hover:text-cream"
            >
              See the room
            </Link>
          </motion.div>
        </div>

        {/* -------------------------------- photo -------------------------------- */}
        <motion.div
          style={{ y: imgY }}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-[1.25rem] border border-cream/10 shadow-2xl shadow-black/50">
            <img
              src={photo('eyechart-hero').localPath}
              alt="The Red Eye Cafe eye-chart card beside an iced drink, in front of the cafe's tiled RED EYE CAFE sign"
              className="aspect-[4/3] w-full object-cover"
              width={1000}
              height={750}
              // React 18 forwards this only in lowercase form.
              {...{ fetchpriority: 'high' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-transparent" />
          </div>

          {/* floating credential card */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="absolute -bottom-9 -left-3 w-[16.5rem] rounded-2xl border border-cream/12 bg-soot/95 p-4 shadow-2xl shadow-black/50 backdrop-blur-xl sm:-left-7 sm:w-[17.5rem]"
          >
            <p className="text-[0.6rem] font-500 uppercase tracking-[0.22em] text-brass">
              Montclair
            </p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display text-5xl leading-none text-cream">4.5</span>
              <Stars score={4.5} size={14} />
            </div>
            <p className="mt-2 text-[0.85rem] font-500 leading-snug text-cream/70">
              <span className="text-cream">672</span> Google reviews
            </p>
            <p className="mt-1 text-[0.9rem] font-500 leading-snug text-cream/70">
              <span className="font-display text-2xl leading-none text-brass">#6</span>
              <span className="ml-1.5">of 235 in Montclair</span>
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* ------------------------------- rating rail ------------------------------ */}
      <div className="wrap mt-20 md:mt-16">
        <div className="rule" />
        <div className="grid grid-cols-2 gap-x-6 gap-y-7 py-7 sm:grid-cols-4">
          {heroRatings.map((r, i) => (
            <motion.a
              key={r.platform}
              href={r.url}
              target="_blank"
              rel="noreferrer noopener"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.08, duration: 0.6 }}
              className="group"
            >
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-3xl leading-none text-cream transition group-hover:text-ember">
                  {r.score.toFixed(1)}
                </span>
                <span className="text-[0.7rem] text-cream/35">/ 5</span>
              </div>
              <p className="mt-1.5 text-[0.7rem] font-500 uppercase tracking-[0.18em] text-cream/50">
                {r.platform}
              </p>
              <p className="text-[0.7rem] text-cream/35">
                {r.count?.toLocaleString()} reviews
              </p>
            </motion.a>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.24, duration: 0.6 }}
          >
            <div className="font-display text-3xl leading-none text-brass">#1</div>
            <p className="mt-1.5 text-[0.7rem] font-500 uppercase tracking-[0.18em] text-cream/50">
              Atly ranking
            </p>
            <p className="text-[0.7rem] text-cream/35">Breakfast &amp; eggs in Montclair</p>
          </motion.div>
        </div>
        <div className="rule" />
      </div>
    </section>
  )
}
