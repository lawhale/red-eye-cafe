import { cafe, photo } from '../data'
import { Reveal, SectionHeading } from './ui'

const ORDER_LINKS = [
  {
    name: 'Grubhub',
    url: 'https://www.grubhub.com/restaurant/red-eye-cafe-94-walnut-st-montclair/2309255',
  },
  { name: 'DoorDash', url: 'https://www.doordash.com/store/red-eye-cafe-montclair-113952/' },
  { name: 'Uber Eats', url: 'https://www.ubereats.com/store/red-eye-cafe/6MA0C_w1V-6sBRdLqqzR1A' },
]

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const PARKING = [
  {
    name: 'Walnut Street Lot',
    address: '84 Walnut St, Montclair, NJ 07042',
    note: 'Surface lot at the train station, about a half block away',
    maps: 'https://maps.google.com/?q=84+Walnut+St+Montclair+NJ+07042',
  },
  {
    name: 'Midtown Parking Deck',
    address: '202 Glenridge Ave, Montclair, NJ 07042',
    note: 'Public garage, roughly a 6–8 minute walk',
    maps: 'https://maps.google.com/?q=202+Glenridge+Ave+Montclair+NJ+07042',
  },
  {
    name: 'Crescent Deck',
    address: '13 The Crescent, Montclair, NJ 07042',
    note: 'Public garage near Montclair Center, about a 10 minute walk',
    maps: 'https://maps.google.com/?q=13+The+Crescent+Montclair+NJ+07042',
  },
]

export default function Visit({ standalone = false }: { standalone?: boolean }) {
  const today = new Date().getDay()
  const todayName = DAYS[(today + 6) % 7]

  return (
    <section
      id="visit"
      className={`noise relative bg-soot/40 py-20 md:py-28 ${standalone ? 'pt-28 md:pt-32' : ''}`}
    >
      <div className="wrap">
        <SectionHeading
          eyebrow="Come by"
          title={
            <>
              94 Walnut St,
              <br />
              <span className="text-brick">Montclair.</span>
            </>
          }
          lead="Less than a block from the Walnut Street station. Street spots fill up fast; public lots nearby are listed below with addresses you can drop into Maps."
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          {/* ------------------------------ details ------------------------------ */}
          <Reveal>
            <div className="card h-full p-7 md:p-9">
              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <p className="eyebrow">Hours</p>
                  <p className="mt-3 font-display text-4xl leading-none text-cream">8am – 3pm</p>
                  <p className="mt-1.5 text-[0.82rem] text-cream/45">Seven days a week</p>
                  <ul className="mt-5 space-y-1.5">
                    {DAYS.map((d) => (
                      <li
                        key={d}
                        className={`flex justify-between text-[0.82rem] ${
                          d === todayName ? 'text-cream' : 'text-cream/40'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {d === todayName && (
                            <span className="h-1.5 w-1.5 rounded-full bg-sage" aria-hidden />
                          )}
                          {d}
                        </span>
                        <span className="tabular-nums">8am – 3pm</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-7">
                  <div>
                    <p className="eyebrow">Address</p>
                    <a
                      href="https://maps.google.com/?q=Red+Eye+Cafe+94+Walnut+St+Montclair+NJ+07042"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="mt-3 block text-[0.95rem] leading-relaxed text-cream/80 transition hover:text-brass"
                    >
                      94 Walnut Street
                      <br />
                      Montclair, NJ 07042
                      <span className="mt-1 block text-[0.72rem] uppercase tracking-[0.14em] text-brass/70">
                        Get directions ↗
                      </span>
                    </a>
                  </div>

                  <div>
                    <p className="eyebrow">Contact</p>
                    <a
                      href="tel:+19735093663"
                      className="mt-3 block text-[0.95rem] text-cream/80 transition hover:text-brass"
                    >
                      (973) 509-3663
                    </a>
                    <a
                      href={`mailto:${cafe.email}`}
                      className="mt-1 block break-all text-[0.86rem] text-cream/50 transition hover:text-brass"
                    >
                      {cafe.email}
                    </a>
                  </div>

                  <div>
                    <p className="eyebrow">Good to know</p>
                    <ul className="mt-3 space-y-1.5 text-[0.84rem] text-cream/55">
                      <li>Outdoor seating out front and in the alley</li>
                      <li>Wheelchair accessible, all on one level</li>
                      <li>Free wi-fi</li>
                      <li>Vegetarian, vegan and GF options marked</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-cream/10 pt-6">
                <p className="eyebrow">Public parking nearby</p>
                <ul className="mt-4 space-y-4">
                  {PARKING.map((p) => (
                    <li key={p.name}>
                      <a
                        href={p.maps}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="group block rounded-xl border border-cream/10 bg-ink/30 px-4 py-3.5 transition hover:border-brass/35"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-500 text-[0.92rem] text-cream group-hover:text-brass">
                              {p.name}
                            </p>
                            <p className="mt-0.5 text-[0.84rem] text-cream/70">{p.address}</p>
                            <p className="mt-1 text-[0.74rem] text-cream/40">{p.note}</p>
                          </div>
                          <span className="shrink-0 pt-0.5 text-[0.66rem] uppercase tracking-[0.14em] text-brass/70">
                            Directions ↗
                          </span>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-[0.72rem] text-cream/30">
                  Pay with ParkMobile in most Montclair lots. Rates and hours vary.
                </p>
              </div>

              <div className="mt-8 border-t border-cream/10 pt-6">
                <p className="eyebrow">Order for delivery</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {ORDER_LINKS.map((o) => (
                    <a
                      key={o.name}
                      href={o.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="rounded-full border border-cream/15 px-4 py-2 text-[0.74rem] font-500 uppercase tracking-[0.14em] text-cream/65 transition hover:border-brass/45 hover:text-cream"
                    >
                      {o.name}
                    </a>
                  ))}
                </div>
                <p className="mt-3 text-[0.72rem] text-cream/30">
                  Delivery menus run about 10% above in-store prices.
                </p>
              </div>
            </div>
          </Reveal>

          {/* -------------------------------- map ------------------------------- */}
          <Reveal delay={0.1}>
            <div className="card h-full overflow-hidden">
              <a
                href="https://maps.google.com/?q=Red+Eye+Cafe+94+Walnut+St+Montclair+NJ+07042"
                target="_blank"
                rel="noreferrer noopener"
                className="group relative block h-64 overflow-hidden lg:h-1/2"
              >
                <img
                  src={photo('patio-string-lights').localPath}
                  alt="String lights over the patio seating at Red Eye Cafe"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10" />
                <span className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/65 px-4 py-2 text-[0.72rem] font-500 uppercase tracking-[0.16em] text-white backdrop-blur">
                  Open in Maps ↗
                </span>
              </a>
              <div className="relative h-64 overflow-hidden lg:h-1/2">
                <img
                  src={photo('interior-bar').localPath}
                  alt="Inside Red Eye Cafe, the wood bar and subway-tiled wall"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/65" />
                <blockquote className="absolute inset-x-0 bottom-0 p-6">
                  <p className="font-serif text-lg italic leading-snug text-white/90">
                    “It's small inside so you may have to wait but it's well worth it.”
                  </p>
                  <footer className="mt-2 text-[0.68rem] uppercase tracking-[0.14em] text-white/55">
                    Lindsey R. · Yelp
                  </footer>
                </blockquote>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
