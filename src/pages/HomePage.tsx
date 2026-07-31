import PageMeta from '../components/PageMeta'
import Hero from '../components/Hero'
import Raves from '../components/Raves'
import Press from '../components/Press'

export default function HomePage() {
  return (
    <>
      <PageMeta
        title="Red Eye Cafe | Food, Coffee, Comfort. | 94 Walnut St, Montclair NJ"
        description="Slinging great food and drinks since 2012. Breakfast and lunch 8am–3pm daily at 94 Walnut St, Montclair NJ. 4.5 stars across 672 Google reviews."
        path="/"
      />
      <Hero />
      <Press />
      <Raves />
    </>
  )
}
