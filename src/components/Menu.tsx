import { useEffect, useMemo, useRef, useState } from 'react'
import { buildYourOwn, cafe, menu, menuTabIcons, photo } from '../data'
import type { MenuCategory, MenuItem } from '../data'
import { Reveal, SectionHeading, Tag } from './ui'

/** Per-category atmosphere: photo, gradient tint, and ambient glow color. */
const CATEGORY_BG: Record<
  string,
  { photo: string; tint: string; glow: string; glowPos: string }
> = {
  'breakfast-sandwiches': {
    photo: 'breakfast-sandwich',
    tint: 'from-[#2a1810]/95 via-[#1a120c]/90 to-[#140e0a]',
    glow: 'bg-amber-700/30',
    glowPos: '-left-32 top-0 h-[28rem] w-[28rem]',
  },
  'breakfast-plates': {
    photo: 'breakfast-eggs-hash',
    tint: 'from-[#2c1a12]/95 via-[#1a120c]/90 to-[#140e0a]',
    glow: 'bg-orange-600/25',
    glowPos: 'right-0 top-20 h-[32rem] w-[32rem]',
  },
  'pancakes-waffles': {
    photo: 'pancakes-banana',
    tint: 'from-[#2a1c10]/92 via-[#1a120c]/88 to-[#140e0a]',
    glow: 'bg-[#c9a05a]/30',
    glowPos: '-left-20 top-1/3 h-[26rem] w-[26rem]',
  },
  'soup-stuff': {
    photo: 'grilled-cheese-soup',
    tint: 'from-[#221814]/95 via-[#1a120c]/92 to-[#140e0a]',
    glow: 'bg-stone-500/20',
    glowPos: 'left-1/4 bottom-0 h-[24rem] w-[24rem]',
  },
  salads: {
    photo: 'lunch-spread',
    tint: 'from-[#162018]/95 via-[#1a120c]/90 to-[#140e0a]',
    glow: 'bg-emerald-700/25',
    glowPos: '-right-24 top-10 h-[28rem] w-[28rem]',
  },
  sides: {
    photo: 'pastry',
    tint: 'from-[#261418]/92 via-[#1a120c]/90 to-[#140e0a]',
    glow: 'bg-rose-700/20',
    glowPos: 'left-0 bottom-10 h-[22rem] w-[22rem]',
  },
  'lunch-sandwiches-plates': {
    photo: 'sandwich-fries',
    tint: 'from-[#1e1a18]/95 via-[#1a120c]/90 to-[#140e0a]',
    glow: 'bg-zinc-500/15',
    glowPos: 'right-10 top-0 h-[30rem] w-[30rem]',
  },
  'coffee-and-beverages': {
    photo: 'iced-coffee',
    tint: 'from-[#1c1410]/95 via-[#1a120c]/92 to-[#140e0a]',
    glow: 'bg-amber-900/30',
    glowPos: '-left-16 top-1/4 h-[30rem] w-[30rem]',
  },
  'espresso-bar': {
    photo: 'espresso-machine',
    tint: 'from-[#161210]/95 via-[#1a120c]/94 to-[#140e0a]',
    glow: 'bg-[#c9a05a]/20',
    glowPos: 'right-0 top-1/3 h-[34rem] w-[34rem]',
  },
  specials: {
    photo: 'curry-coconut-rice',
    tint: 'from-[#2a1412]/95 via-[#1a120c]/90 to-[#140e0a]',
    glow: 'bg-[#c45c3a]/25',
    glowPos: 'left-1/3 -top-10 h-[28rem] w-[28rem]',
  },
}

const SEARCH_BG = {
  tint: 'from-[#1a120c] via-[#140e0a]/95 to-[#1a120c]',
  glow: 'bg-[#e8dcc8]/5',
  glowPos: 'left-1/2 top-1/2 h-[20rem] w-[20rem] -translate-x-1/2 -translate-y-1/2',
}

type Byo = {
  bread: string[]
  cheese: string[]
  meats: string[]
  veggies: string[]
  upcharges: Record<string, string>
}

export default function Menu({ standalone = false }: { standalone?: boolean }) {
  const [activeId, setActiveId] = useState(menu[0].id)
  const [query, setQuery] = useState('')
  const panelRef = useRef<HTMLDivElement>(null)
  const skipScrollRef = useRef(true)

  const searching = query.trim().length > 1
  const needle = query.trim().toLowerCase()

  const results = useMemo(() => {
    if (!searching) return []
    return menu
      .map((c) => ({
        ...c,
        items: c.items.filter(
          (i) =>
            i.name.toLowerCase().includes(needle) ||
            (i.desc ?? '').toLowerCase().includes(needle),
        ),
      }))
      .filter((c) => c.items.length > 0)
  }, [needle, searching])

  const resultCount = results.reduce((n, c) => n + c.items.length, 0)
  const bg = searching ? null : CATEGORY_BG[activeId]
  const active = menu.find((c) => c.id === activeId)!

  function selectCategory(id: string) {
    setActiveId(id)
    setQuery('')
  }

  useEffect(() => {
    if (skipScrollRef.current) {
      skipScrollRef.current = false
      return
    }
    if (searching) return
    panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [activeId, searching])

  return (
    <section
      id="menu"
      className={`noise relative isolate overflow-hidden bg-[#140e0a] py-20 md:py-28 ${standalone ? 'pt-28 md:pt-32' : ''}`}
    >
      {/* ------------------------- category background ------------------------- */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0">
          {bg && (
            <img
              src={photo(bg.photo).localPath}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-[0.18]"
            />
          )}
          <div
            className={`absolute inset-0 bg-gradient-to-b ${
              bg ? bg.tint : SEARCH_BG.tint
            }`}
          />
        </div>
        <div
          className={`absolute rounded-full blur-[130px] ${
            bg ? `${bg.glow} ${bg.glowPos}` : `${SEARCH_BG.glow} ${SEARCH_BG.glowPos}`
          }`}
        />
      </div>

      <div className="relative z-10 wrap">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow="Breakfast & lunch · 8am–3pm daily"
            title={
              <>
                The <span className="text-[#e07a4a]">menu</span>,
                <br />
                one thing at a time.
              </>
            }
          />
          <Reveal delay={0.1}>
            <label className="group relative block w-full sm:w-72">
              <span className="sr-only">Search the menu</span>
              <svg
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#e8dcc8]/35"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search 128 items…"
                className="w-full rounded-full border border-[#e8dcc8]/15 bg-[#1a120c]/80 py-3 pl-11 pr-10 text-sm text-[#f3ebe0] placeholder:text-[#e8dcc8]/30 focus:border-[#c9a05a]/50 focus:outline-none focus:ring-1 focus:ring-[#c9a05a]/30"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#e8dcc8]/40 hover:text-[#f3ebe0]"
                >
                  ×
                </button>
              )}
            </label>
          </Reveal>
        </div>

        {/* ------------------------- sidebar + panel ------------------------- */}
        <Reveal delay={0.14}>
          <div className="mt-10 grid grid-cols-[minmax(0,9rem)_1fr] gap-4 sm:grid-cols-[minmax(0,10.5rem)_1fr] sm:gap-6 lg:grid-cols-[minmax(0,13rem)_1fr] lg:gap-10">
            <nav
              aria-label="Menu categories"
              className="sticky top-24 self-start md:top-28"
            >
              <div
                role="tablist"
                aria-orientation="vertical"
                className="flex flex-col gap-0.5 rounded-2xl border border-[#e8dcc8]/12 bg-[#1f1610]/85 p-2 backdrop-blur-sm"
                onKeyDown={(e) => {
                  if (searching) return
                  const idx = menu.findIndex((c) => c.id === activeId)
                  if (e.key === 'ArrowDown' && idx < menu.length - 1) {
                    e.preventDefault()
                    selectCategory(menu[idx + 1].id)
                  }
                  if (e.key === 'ArrowUp' && idx > 0) {
                    e.preventDefault()
                    selectCategory(menu[idx - 1].id)
                  }
                }}
              >
                {menu.map((c) => {
                  const on = c.id === activeId && !searching
                  return (
                    <button
                      key={c.id}
                      role="tab"
                      aria-selected={on}
                      disabled={searching}
                      onClick={() => selectCategory(c.id)}
                      className={`group relative flex w-full items-start gap-2 rounded-lg px-2.5 py-2.5 text-left disabled:opacity-40 ${
                        on
                          ? 'bg-[#e07a4a]/18 text-[#f3ebe0]'
                          : 'text-[#e8dcc8]/50 hover:bg-[#e8dcc8]/[0.05] hover:text-[#f3ebe0]/90'
                      }`}
                    >
                      {on && (
                        <span className="absolute bottom-2 left-0 top-2 w-0.5 rounded-full bg-[#e07a4a]" />
                      )}
                      <svg
                        className="mt-0.5 shrink-0 opacity-70"
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden
                      >
                        <path
                          d={menuTabIcons[c.id]}
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[0.68rem] font-500 uppercase leading-snug tracking-[0.1em]">
                          {c.name}
                        </span>
                        <span
                          className={`mt-0.5 block text-[0.62rem] ${
                            on ? 'text-[#e8dcc8]/50' : 'text-[#e8dcc8]/25'
                          }`}
                        >
                          {c.items.length} items
                        </span>
                      </span>
                    </button>
                  )
                })}
              </div>
            </nav>

            <div ref={panelRef} className="min-w-0 scroll-mt-24">
              {searching ? (
                <div>
                  <p className="mb-6 text-sm text-[#e8dcc8]/50">
                    <span className="font-display text-2xl text-[#f3ebe0]">{resultCount}</span>{' '}
                    {resultCount === 1 ? 'item matches' : 'items match'} “{query.trim()}”
                  </p>
                  {resultCount === 0 ? (
                    <div className="rounded-2xl border border-[#e8dcc8]/12 bg-[#1f1610]/85 p-10 text-center backdrop-blur-sm">
                      <p className="font-serif text-xl italic text-[#e8dcc8]/60">
                        Nothing on the menu by that name.
                      </p>
                      <p className="mt-2 text-sm text-[#e8dcc8]/40">
                        Try “egg”, “chai”, “avocado” or “bacon”.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-9">
                      {results.map((c) => (
                        <div key={c.id}>
                          <h3 className="mb-3 font-sans text-[0.68rem] font-500 uppercase tracking-[0.36em] text-[#c9a05a]">
                            {c.name}
                          </h3>
                          <ItemList items={c.items} highlight={needle} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <CategoryPanel category={active} />
              )}
            </div>
          </div>
        </Reveal>

        <Reveal>
          <p className="mt-10 max-w-3xl text-[0.78rem] leading-relaxed text-[#e8dcc8]/35">
            <strong className="font-500 text-[#e8dcc8]/55">About these prices:</strong> figures are
            in-store prices taken from Red Eye's own printed menu (dated 12.05.25) published on{' '}
            <a
              href={cafe.website}
              target="_blank"
              rel="noreferrer noopener"
              className="text-[#c9a05a]/85 underline-offset-2 hover:text-[#e07a4a] hover:underline"
            >
              redeyenj.com
            </a>
            . A handful of items appear only on the delivery apps; those were converted back to the
            in-store price by removing the platform markup, which we verified at exactly 10%.
            Ordering through Grubhub, DoorDash or Uber Eats will therefore cost about 10% more than
            what you see here. Coffee prices are for the 12 oz size. Menus change; call the cafe to
            confirm.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* ------------------------------- sub-components ---------------------------- */

function CategoryPanel({ category }: { category: MenuCategory }) {
  const showByo =
    category.id === 'breakfast-plates' || category.id === 'breakfast-sandwiches'
  const byo = buildYourOwn as unknown as Byo

  return (
    <div className="rounded-2xl border border-[#e8dcc8]/12 bg-[#1f1610]/85 p-6 backdrop-blur-sm md:p-8">
      <header className="border-b border-[#e8dcc8]/10 pb-5">
        <h3 className="font-display text-3xl leading-none tracking-wide text-[#f3ebe0] md:text-4xl">
          {category.name}
        </h3>
        {category.blurb && (
          <p className="mt-3 max-w-prose text-[0.86rem] leading-relaxed text-[#e8dcc8]/55">
            {category.blurb}
          </p>
        )}
      </header>

      <div className="pt-6">
        <ItemList items={category.items} />

        {category.note && (
          <p className="mt-6 border-t border-[#e8dcc8]/10 pt-4 text-[0.72rem] italic leading-relaxed text-[#e8dcc8]/35">
            {category.note}
          </p>
        )}

        {showByo && (
          <div className="mt-7 rounded-xl border border-[#c9a05a]/25 bg-[#c9a05a]/[0.06] p-5">
            <h4 className="font-display text-lg tracking-wide text-[#c9a05a]">Build your own</h4>
            <p className="mt-1 text-[0.78rem] text-[#e8dcc8]/45">
              Choices listed on the printed menu for the custom omelet and custom egg sandwich.
            </p>
            <dl className="mt-4 grid gap-3 sm:grid-cols-2">
              {(['bread', 'cheese', 'meats', 'veggies'] as const).map((k) => (
                <div key={k}>
                  <dt className="text-[0.62rem] uppercase tracking-[0.2em] text-[#e8dcc8]/40">{k}</dt>
                  <dd className="mt-1 text-[0.84rem] leading-relaxed text-[#e8dcc8]/70">
                    {byo[k].join(' · ')}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 border-t border-[#c9a05a]/15 pt-3 text-[0.75rem] text-[#e8dcc8]/50">
              Each additional filling +$1 · Egg whites +$2 · Shiitake or avocado +$2
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function ItemList({ items, highlight }: { items: MenuItem[]; highlight?: string }) {
  return (
    <ul className="grid gap-x-10 gap-y-1 lg:grid-cols-2">
      {items.map((item, i) => (
        <li
          key={`${item.name}-${i}`}
          className="group border-b border-[#e8dcc8]/[0.08] py-3 last:border-0"
        >
          <div className="flex items-baseline gap-3">
            <h4 className="font-500 text-[0.95rem] leading-snug text-[#f3ebe0]/95">
              <Mark text={item.name} needle={highlight} />
            </h4>
            <span
              aria-hidden
              className="min-w-4 flex-1 translate-y-[-3px] border-b border-dotted border-[#e8dcc8]/15"
            />
            {item.price && (
              <span className="shrink-0 font-500 text-[0.95rem] tabular-nums text-[#c9a05a]">
                {formatPrice(item.price)}
              </span>
            )}
          </div>

          {item.desc && (
            <p className="mt-1 max-w-prose text-[0.82rem] leading-relaxed text-[#e8dcc8]/45">
              <Mark text={item.desc} needle={highlight} />
            </p>
          )}

          {item.tags && item.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {item.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}

function Mark({ text, needle }: { text: string; needle?: string }) {
  if (!needle) return <>{text}</>
  const idx = text.toLowerCase().indexOf(needle)
  if (idx === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-[#c9a05a]/30 text-[#f3ebe0]">
        {text.slice(idx, idx + needle.length)}
      </mark>
      {text.slice(idx + needle.length)}
    </>
  )
}

function formatPrice(p: string) {
  const n = Number(p)
  if (Number.isNaN(n)) return p
  return `$${n.toFixed(2).replace(/\.00$/, '')}`
}
