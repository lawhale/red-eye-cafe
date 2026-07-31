import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

/** Fades + lifts children into view once, on scroll. */
export function Reveal({
  children,
  delay = 0,
  y = 22,
  className = '',
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'left',
}: {
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
  align?: 'left' | 'center'
}) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-3xl'}>
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="mt-3 font-display text-4xl leading-[0.95] tracking-wide text-cream sm:text-5xl md:text-6xl">
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.12}>
          <p className="mt-5 text-balance text-[0.98rem] leading-relaxed text-cream/60">{lead}</p>
        </Reveal>
      )}
    </div>
  )
}

/** Inline superscript citation that links to the source. */
export function Cite({ n, href, label }: { n: number; href: string; label?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      title={label}
      className="ml-0.5 align-super text-[0.6em] font-500 text-brass/80 no-underline transition hover:text-ember"
    >
      [{n}]
    </a>
  )
}

export function Stars({ score, size = 14 }: { score: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${score} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, score - i))
        return (
          <svg key={i} width={size} height={size} viewBox="0 0 20 20" aria-hidden="true">
            <defs>
              <linearGradient id={`s${i}-${score}`}>
                <stop offset={`${fill * 100}%`} stopColor="#d94b32" />
                <stop offset={`${fill * 100}%`} stopColor="rgba(246,239,228,0.18)" />
              </linearGradient>
            </defs>
            <path
              fill={`url(#s${i}-${score})`}
              d="M10 1.6l2.5 5.2 5.7.8-4.1 4 1 5.7L10 14.6 4.9 17.3l1-5.7-4.1-4 5.7-.8z"
            />
          </svg>
        )
      })}
    </div>
  )
}

export function Tag({ children }: { children: ReactNode }) {
  const label = String(children)
  const tone =
    label === 'Popular'
      ? 'border-ember/40 bg-ember/10 text-ember'
      : label === 'Vegan'
        ? 'border-sage/40 bg-sage/10 text-sage'
        : label === 'Vegetarian'
          ? 'border-sage/30 bg-sage/5 text-sage/90'
          : 'border-brass/30 bg-brass/5 text-brass/90'
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border px-2 py-[1px] text-[0.6rem] font-500 uppercase tracking-[0.14em] ${tone}`}
    >
      {label}
    </span>
  )
}
