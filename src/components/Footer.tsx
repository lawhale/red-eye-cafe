import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="noise relative overflow-hidden border-t border-cream/10 bg-ink py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-1/2 h-64 w-[46rem] -translate-x-1/2 rounded-full bg-brick/10 blur-[120px]"
      />
      <div className="wrap relative">
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="font-display text-[13vw] leading-[0.8] tracking-[0.04em] text-cream/[0.07] sm:text-[7rem]">
            RED EYE
          </p>
          <p className="-mt-4 font-serif text-lg italic text-cream/50 sm:-mt-8">
            Food, Coffee, Comfort.
          </p>
        </div>

        <nav
          aria-label="Footer"
          className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[0.72rem] uppercase tracking-[0.16em]"
        >
          {[
            { label: 'Menu', to: '/menu' },
            { label: 'The Room', to: '/room' },
            { label: 'Reviews', to: '/reviews' },
            { label: 'Visit', to: '/visit' },
          ].map((l) => (
            <Link key={l.to} to={l.to} className="text-cream/45 transition hover:text-brass">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="mt-8 flex flex-col items-center justify-between gap-6 border-t border-cream/10 pt-8 sm:flex-row">
          <div className="text-center text-[0.78rem] leading-relaxed text-cream/40 sm:text-left">
            <p className="text-cream/65">Red Eye Cafe · 94 Walnut St, Montclair NJ 07042</p>
            <p className="mt-0.5">Open 8am–3pm daily · (973) 509-3663</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5 text-[0.72rem] uppercase tracking-[0.16em]">
            {[
              { label: 'Instagram', href: 'https://www.instagram.com/redeyecafe/' },
              { label: 'Facebook', href: 'https://www.facebook.com/RedEyeCafe' },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer noopener"
                className="text-cream/45 transition hover:text-brass"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>

        <p className="mt-8 text-center text-[0.68rem] leading-relaxed text-cream/25">
          An independent redesign concept. Menu, prices and hours were accurate as of 30 July 2026.
          Call the cafe to confirm before you go.
        </p>
      </div>
    </footer>
  )
}
