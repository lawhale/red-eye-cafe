import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

const LINKS = [
  { to: '/menu', label: 'Menu' },
  { to: '/room', label: 'The Room' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/visit', label: 'Visit' },
]

function linkClass(isActive: boolean) {
  return `relative rounded-full px-3.5 py-2 text-[0.78rem] font-500 uppercase tracking-[0.16em] transition-colors duration-300 ${
    isActive ? 'text-cream' : 'text-cream/55 hover:text-cream'
  }`
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'border-b border-cream/10 bg-ink/85 py-3 backdrop-blur-xl'
            : 'border-b border-transparent py-5'
        }`}
      >
        <nav className="wrap flex items-center justify-between gap-6" aria-label="Main">
          <NavLink to="/" className="group flex items-center gap-2.5" aria-label="Red Eye Cafe home">
            <span className="grid h-8 w-8 place-items-center rounded-[6px] bg-brick font-display text-[15px] leading-none text-parchment shadow-lg shadow-brick/20 transition-transform duration-300 group-hover:scale-105">
              R
            </span>
            <span className="font-display text-xl leading-none tracking-[0.14em] text-cream">
              RED EYE
            </span>
          </NavLink>

          <div className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} className={({ isActive }) => linkClass(isActive)}>
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full bg-cream/[0.07]"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
            <a
              href="tel:+19735093663"
              className="ml-3 rounded-full bg-brick px-5 py-2.5 text-[0.78rem] font-500 uppercase tracking-[0.16em] text-parchment shadow-lg shadow-brick/20 transition hover:bg-ember"
            >
              (973) 509‑3663
            </a>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="relative z-50 grid h-10 w-10 place-items-center rounded-full border border-cream/15 md:hidden"
          >
            <span className="sr-only">Menu</span>
            <div className="flex flex-col gap-[5px]">
              <motion.span
                animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="block h-[1.5px] w-4 bg-cream"
              />
              <motion.span
                animate={open ? { opacity: 0 } : { opacity: 1 }}
                className="block h-[1.5px] w-4 bg-cream"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="block h-[1.5px] w-4 bg-cream"
              />
            </div>
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-ink/97 backdrop-blur-xl md:hidden"
          >
            <div className="flex h-full flex-col justify-center gap-1 px-8">
              <NavLink
                to="/"
                onClick={() => setOpen(false)}
                className="border-b border-cream/10 py-5 font-display text-4xl tracking-wide text-cream"
              >
                Home
              </NavLink>
              {LINKS.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `border-b border-cream/10 py-5 font-display text-4xl tracking-wide ${
                      isActive ? 'text-brick' : 'text-cream'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <a
                href="tel:+19735093663"
                className="mt-8 rounded-full bg-brick py-4 text-center font-500 uppercase tracking-[0.2em] text-parchment"
              >
                Call (973) 509‑3663
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
