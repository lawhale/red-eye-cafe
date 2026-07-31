import { useEffect } from 'react'
import PageMeta, { pageTitle } from '../components/PageMeta'
import PageShell from '../components/PageShell'
import Visit from '../components/Visit'
import { cafe } from '../data'

const LOCAL_BUSINESS = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'Red Eye Cafe',
  image: `${typeof window !== 'undefined' ? window.location.origin : ''}/images/storefront.jpg`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '94 Walnut Street',
    addressLocality: 'Montclair',
    addressRegion: 'NJ',
    postalCode: '07042',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 40.8156,
    longitude: -74.2189,
  },
  url: 'https://www.redeyenj.com/',
  telephone: '+1-973-509-3663',
  email: cafe.email,
  servesCuisine: ['Breakfast', 'Brunch', 'American', 'Cafe'],
  priceRange: '$$',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '08:00',
    closes: '15:00',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.5',
    reviewCount: '672',
    bestRating: '5',
  },
}

export default function VisitPage() {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = 'local-business-schema'
    script.textContent = JSON.stringify(LOCAL_BUSINESS)
    document.head.appendChild(script)
    return () => {
      document.getElementById('local-business-schema')?.remove()
    }
  }, [])

  return (
    <>
      <PageMeta
        title={pageTitle('Visit')}
        description="Visit Red Eye Cafe at 94 Walnut St, Montclair NJ 07042. Open 8am–3pm daily. Less than a block from Walnut Street station. Call (973) 509-3663."
        path="/visit"
      />
      <PageShell>
        <Visit standalone />
      </PageShell>
    </>
  )
}
