import menuJson from './data/menu.json'
import reputationJson from './data/reputation.json'
import photosJson from './data/photos.json'

/* ---------------------------------- types --------------------------------- */

export type MenuItem = {
  name: string
  desc?: string
  price: string | null
  tags?: string[]
  source?: string
}

export type MenuCategory = {
  id: string
  name: string
  blurb?: string
  note?: string
  items: MenuItem[]
}

export type Rave = {
  dish: string
  mentions: number
  quote: string
  source: string
  url: string
  basis: string
  supportingQuotes?: string[]
}

export type Quote = {
  text: string
  author: string
  platform: string
  stars?: number | null
  date?: string
  url: string
  note?: string
}

export type Rating = {
  platform: string
  score: number
  count: number | null
  url: string
  note?: string
}

export type Photo = {
  id: string
  localPath: string
  remoteUrl: string
  subject: string
  credit: string
  sourcePage: string
}

/* ---------------------------------- data ---------------------------------- */

export const menu = menuJson.categories as MenuCategory[]
export const cafe = menuJson.meta
export const menuSources = menuJson.sources as { label: string; url: string }[]
export const buildYourOwn = menuJson.buildYourOwn as Record<string, unknown>

export const ratings = reputationJson.ratings as Rating[]
export const raves = reputationJson.raves as Rave[]
export const quotes = reputationJson.quotes as Quote[]
export const vibe = reputationJson.vibe
export const press = reputationJson.press as {
  title: string
  publication: string
  url: string
  date?: string
  pullQuote: string
  note?: string
}[]
export const reputationSources = reputationJson.sources as { label: string; url: string }[]

const photos = photosJson.real as Photo[]
const photoById = new Map(photos.map((p) => [p.id, p]))

export function photo(id: string): Photo {
  const found = photoById.get(id)
  if (!found) throw new Error(`Unknown photo id: ${id}`)
  return found
}

export const photosBySubject = (...subjects: string[]) =>
  photos.filter((p) => subjects.some((s) => p.subject.startsWith(s)))

/* ------------------------------- curation --------------------------------- */

/** The headline stats shown in the hero. Only platforms we could verify. */
export const heroRatings = ['Google', 'Yelp', 'TripAdvisor'].map(
  (p) => ratings.find((r) => r.platform === p)!,
)

/** Restaurantji publishes dimension sub-scores — the most interesting stat we found. */
export const dimensionScores = [
  { label: 'Atmosphere', score: 4.7 },
  { label: 'Food', score: 4.6 },
  { label: 'Service', score: 4.4 },
]

/**
 * Raves, in the order we want to feature them, each paired with a real photo.
 * `photoId` is null where nobody has publicly photographed the dish.
 */
export const featuredRaves: { rave: Rave; photoId: string | null }[] = [
  ['Coffee', 'iced-coffee'],
  ['Omelettes', 'omelet'],
  ['Buttermilk Pancakes', 'pancakes'],
  ['Highlander', 'breakfast-sandwich'],
  ['Green Eggs', 'breakfast-eggs-hash'],
  ['Candied Bacon', null],
  ['Breakfast Burger', null],
  ['Huevos Rancheros', 'huevos-rancheros'],
  ['Baked Goods', 'pastry'],
  ['Red Eye Sub', 'lunch-spread'],
]
  .map(([key, photoId]) => {
    const rave = raves.find((r) => r.dish.includes(key as string))
    return rave ? { rave, photoId: photoId as string | null } : null
  })
  .filter((x): x is { rave: Rave; photoId: string | null } => x !== null)

/** Gallery, sequenced for visual rhythm rather than by subject. */
export const galleryIds = [
  'interior-pendant-lights',
  'pancakes',
  'storefront',
  'eyechart-cup',
  'interior-octopus',
  'latte-art',
  'interior-bookshelf',
  'patio-string-lights',
  'smores',
  'espresso-pour',
  'interior-bar',
  'redeye-sign-tile',
  'french-toast',
  'interior-books',
  'brand-chalkboard',
  'patio-before-i-die-wall',
  'huevos-rancheros',
  'interior-dining',
  'smores-cupcake',
  'menu-board',
  'grilled-cheese-soup',
  'espresso-machine',
  'patio-waffle-cappuccino',
  'interior-counter',
]

/** Positive pull-quotes for the review wall, hand-picked for range of platform. */
export const featuredQuoteAuthors = [
  'Enrique',
  'Mariya Okhten',
  'Kristin W.',
  'Andrew G.',
  'Lindsey R.',
  'Deirdre Karcher',
  'Eric W.',
  'Jennifer S.',
]

export const featuredQuotes = [
  ...featuredQuoteAuthors
    .map((a) => quotes.find((q) => q.author === a))
    .filter((q): q is Quote => Boolean(q)),
  ...quotes.filter((q) => q.platform === 'TripAdvisor' && q.text.includes('subway-tiled')),
  ...quotes.filter((q) => q.platform === 'Grubhub'),
]

/** The honest counterweight — shown deliberately, not buried. */
export const criticalQuotes = quotes.filter((q) =>
  ['Julia', 'Alina M.'].includes(q.author),
)

/* ------------------------------- navigation -------------------------------- */

export const menuTabIcons: Record<string, string> = {
  'breakfast-sandwiches': 'M3 14h18M5 14a7 7 0 0114 0M4 18h16',
  'breakfast-plates': 'M12 4a8 8 0 100 16 8 8 0 000-16zm0 5a3 3 0 110 6 3 3 0 010-6z',
  'pancakes-waffles': 'M4 8h16M4 12h16M4 16h16',
  'soup-stuff': 'M4 10h16a8 8 0 01-8 8 8 8 0 01-8-8zM8 6V3M12 6V3M16 6V3',
  salads: 'M3 12h18a9 9 0 01-18 0zM8 12a4 4 0 018 0',
  sides: 'M6 4v16M12 4v16M18 4v16',
  'lunch-sandwiches-plates': 'M3 9l9-5 9 5-9 5-9-5zM3 15l9 5 9-5',
  'coffee-and-beverages': 'M5 8h11v7a4 4 0 01-4 4H9a4 4 0 01-4-4V8zM16 10h2a2 2 0 010 4h-2',
  'espresso-bar': 'M7 3v4M12 3v4M17 3v4M5 10h14v5a5 5 0 01-5 5h-4a5 5 0 01-5-5v-5z',
  specials: 'M12 3l2.6 5.6 6.4.8-4.7 4.3 1.3 6.3L12 17l-5.6 3 1.3-6.3L3 9.4l6.4-.8L12 3z',
}
