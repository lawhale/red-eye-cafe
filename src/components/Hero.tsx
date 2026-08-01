import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { heroRatings, photo } from '../data'
import { Stars } from './ui'
import Ticker from './Ticker'

export default function Hero() {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const imgY = useTransform(scrollY, [0, 700], [0, reduce ? 0 : 50])

  return (
    <section id="top" className="noise relative isolate overflow-hidden pt-24 md:pt-28">
      <div className="wrap grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        {/* ------------------------------ copy ------------------------------ */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-[0.68rem] font-500 uppercase tracking-[0.28em] text-brass"
          >
            Open daily · 8am – 3pm
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[3.25rem] leading-[0.92] tracking-[0.06em] text-cream sm:text-6xl md:text-7xl"
          >
            RED EYE
            <br />
            <span className="text-brick">CAFE</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.65 }}
            className="mt-3 font-display text-lg tracking-[0.18em] text-cream/50 sm:text-xl"
          >
            94 WALNUT ST · MONTCLAIR NJ
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-5 max-w-md text-[0.94rem] leading-relaxed text-cream/65"
          >
            Slinging great food and drinks on Walnut Street since 2012. Often imitated, never
            duplicated.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.65 }}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <Link
              to="/menu"
              className="group inline-flex items-center gap-2.5 rounded-full bg-brick px-7 py-3.5 text-[0.8rem] font-500 uppercase tracking-[0.18em] text-parchment shadow-xl shadow-brick/20 transition hover:bg-ember"
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

        {/* ------------------------------ photo ------------------------------ */}
        <motion.div
          style={{ y: imgY }}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none"
        >
          <div className="relative overflow-hidden rounded-[1.25rem] border border-cream/10 shadow-2xl shadow-cream/10">
            <img
              src={photo('eyechart-hero').localPath}
              alt="The Red Eye Cafe eye-chart card beside an iced drink, in front of the cafe's tiled RED EYE CAFE sign"
              className="aspect-[4/3] w-full object-cover"
              width={720}
              height={540}
              {...{ fetchpriority: 'high' }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.75 }}
            className="absolute -bottom-7 -left-3 w-[15.5rem] rounded-2xl border border-cream/12 bg-soot/95 p-4 shadow-2xl shadow-cream/10 backdrop-blur-xl sm:-left-6"
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
          </motion.div>
        </motion.div>
      </div>

      {/* ------------------------------- rating rail ------------------------------ */}
      <div className="wrap relative mt-16 md:mt-20">
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
              transition={{ delay: 0.8 + i * 0.08, duration: 0.6 }}
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
              <p className="text-[0.7rem] text-cream/35">{r.count?.toLocaleString()} reviews</p>
            </motion.a>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.04, duration: 0.6 }}
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
      <div className="mt-4 md:mt-5">
        <Ticker />
      </div>
    </section>
  )
}
