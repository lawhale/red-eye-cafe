# Red Eye Cafe — website

An independent redesign concept for [Red Eye Cafe](https://www.redeyenj.com/), 94 Walnut St,
Montclair NJ. The existing site is a single page of links to menu PDFs; this rebuilds it as a
photography-led site that carries the cafe's actual atmosphere, with every factual claim sourced.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build to dist/
npm run preview  # serve the production build
```

Requires Node 18+.

## Stack

React 18, TypeScript, Vite 6, Tailwind CSS 3, Framer Motion.

## How it's put together

```
research/          Raw research output — the source of truth for all content
  menu.json        128 items / 10 categories, from Red Eye's printed menu PDF
  reputation.json  Ratings, verbatim review quotes, vibe evidence, press
  photos.json      Photo manifest with credit + provenance for every image
src/data.ts        Types the research files and curates what appears where
src/components/    One component per page section
public/images/     53 photographs, resized to max 1600px
```

Content lives in `research/*.json` (copied into `src/data/` at build time), not in JSX. To correct a
price or swap a quote, edit the JSON.

## Content decisions worth knowing

**Prices are in-store prices**, taken from Red Eye's own printed menu PDF dated 12.05.25. Items that
appear only on delivery apps were converted back to base price by removing the platform markup,
which was verified at exactly 10% across dozens of overlapping items. Those are marked
`"source": "grubhub-derived"` in `menu.json`.

**Ratings are 4.5/672 on Google and 4.2/749 on Yelp.** The Google count is 672, not the ~675 that
circulates; it was read from the live Google Business Profile via a local-SEO audit tool and
corroborated by RestaurantGuru.

**Dish "mention" counts are honest tallies**, not statistics. Each is the number of distinct
published reviews and articles that brought the dish up, counted across roughly 55 review texts read
on 30 July 2026. `basis` in `reputation.json` records exactly what was counted for each. No average
star rating is attached to any individual dish, because most reachable reviews carried no numeric
rating — inventing one would have been fabrication.

**Yelp, Google, Tripadvisor and DoorDash all block automated access.** Their content was reached
through licensed syndication and aggregator mirrors, which truncate some Yelp quotes mid-sentence.
Every affected platform is flagged `"blocked": true` in `reputation.json`.

**Criticism is included on purpose.** Weekend wait times are the dominant complaint and are stated
plainly in the reviews section rather than omitted.

**Two claims were deliberately left out.** The Montclair Dispatch says Red Eye was "named one of the
best cafes in New Jersey" and a "Critics Choice for brunch," but cites no awarding body and neither
could be verified.

## Photography

53 photographs, credited individually in the gallery lightbox: Red Eye's own gallery (14, the
professional shots), customer photos from Restaurantji, Tripadvisor and Yelp, and one editorial
photo from My Local Nooks. Four menu items — chilaquiles, avocado toast, the waffle sandwich and the
breakfast burger — have no public photograph and are shown without one rather than with a stock
substitute.

## Sources

All 40+ sources are listed in the site's own expandable Sources section, and in the `sources` arrays
of `research/menu.json` and `research/reputation.json`.
