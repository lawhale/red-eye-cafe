import { useEffect, useMemo, useRef, useState } from 'react'
import { buildYourOwn, cafe, menu, menuTabIcons } from '../data'
import type { MenuCategory, MenuItem } from '../data'
import { Reveal, SectionHeading, Tag } from './ui'

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
      className={`noise relative isolate overflow-hidden bg-ink py-20 md:py-28 ${standalone ? 'pt-28 md:pt-32' : ''}`}
    >
      <div className="relative z-10 wrap">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow="Breakfast & lunch · 8am–3pm daily"
            title={
              <>
                The <span className="text-brick">menu</span>,
                <br />
                one thing at a time.
              </>
            }
          />
          <Reveal delay={0.1}>
            <label className="group relative block w-full sm:w-72">
              <span className="sr-only">Search the menu</span>
              <svg
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-cream/35"
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
                className="w-full rounded-full border border-cream/15 bg-parchment/80 py-3 pl-11 pr-10 text-sm text-cream placeholder:text-cream/30 focus:border-brass/50 focus:outline-none focus:ring-1 focus:ring-brass/30"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-cream/40 hover:text-cream"
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
                className="flex flex-col gap-0.5 rounded-2xl border border-cream/10 bg-soot/55 p-2"
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
                          ? 'bg-brick text-parchment'
                          : 'text-cream/55 hover:bg-parchment/60 hover:text-cream'
                      }`}
                    >
                      {on && (
                        <span className="absolute bottom-2 left-0 top-2 w-0.5 rounded-full bg-parchment" />
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
                            on ? 'text-parchment/65' : 'text-cream/30'
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
                  <p className="mb-6 text-sm text-cream/55">
                    <span className="font-display text-2xl text-cream">{resultCount}</span>{' '}
                    {resultCount === 1 ? 'item matches' : 'items match'} “{query.trim()}”
                  </p>
                  {resultCount === 0 ? (
                    <div className="card p-10 text-center">
                      <p className="font-serif text-xl italic text-cream/60">
                        Nothing on the menu by that name.
                      </p>
                      <p className="mt-2 text-sm text-cream/40">
                        Try “egg”, “chai”, “avocado” or “bacon”.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-9">
                      {results.map((c) => (
                        <div key={c.id}>
                          <h3 className="eyebrow mb-3">
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
          <p className="mt-10 max-w-3xl text-[0.78rem] leading-relaxed text-cream/45">
            <strong className="font-500 text-cream/65">About these prices:</strong> figures are
            in-store prices taken from Red Eye's own printed menu (dated 12.05.25) published on{' '}
            <a
              href={cafe.website}
              target="_blank"
              rel="noreferrer noopener"
              className="text-brass underline-offset-2 hover:text-brick hover:underline"
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
    <div className="card p-6 md:p-8">
      <header className="border-b border-cream/10 pb-5">
        <h3 className="font-display text-3xl leading-none tracking-wide text-cream md:text-4xl">
          {category.name}
        </h3>
        {category.blurb && (
          <p className="mt-3 max-w-prose text-[0.86rem] leading-relaxed text-cream/60">
            {category.blurb}
          </p>
        )}
      </header>

      <div className="pt-6">
        <ItemList items={category.items} />

        {category.note && (
          <p className="mt-6 border-t border-cream/10 pt-4 text-[0.72rem] italic leading-relaxed text-cream/45">
            {category.note}
          </p>
        )}

        {showByo && (
          <div className="mt-7 rounded-xl border border-brass/25 bg-brass/[0.08] p-5">
            <h4 className="font-display text-lg tracking-wide text-brass">Build your own</h4>
            <p className="mt-1 text-[0.78rem] text-cream/50">
              Choices listed on the printed menu for the custom omelet and custom egg sandwich.
            </p>
            <dl className="mt-4 grid gap-3 sm:grid-cols-2">
              {(['bread', 'cheese', 'meats', 'veggies'] as const).map((k) => (
                <div key={k}>
                  <dt className="text-[0.62rem] uppercase tracking-[0.2em] text-cream/45">{k}</dt>
                  <dd className="mt-1 text-[0.84rem] leading-relaxed text-cream/75">
                    {byo[k].join(' · ')}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 border-t border-brass/20 pt-3 text-[0.75rem] text-cream/55">
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
          className="group border-b border-cream/10 py-3 last:border-0"
        >
          <div className="flex items-baseline gap-3">
            <h4 className="font-500 text-[0.95rem] leading-snug text-cream">
              <Mark text={item.name} needle={highlight} />
            </h4>
            <span
              aria-hidden
              className="min-w-4 flex-1 translate-y-[-3px] border-b border-dotted border-cream/20"
            />
            {item.price && (
              <span className="shrink-0 font-500 text-[0.95rem] tabular-nums text-brass">
                {formatPrice(item.price)}
              </span>
            )}
          </div>

          {item.desc && (
            <p className="mt-1 max-w-prose text-[0.82rem] leading-relaxed text-cream/55">
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
      <mark className="bg-brass/25 text-cream">
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
