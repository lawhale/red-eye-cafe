import PageMeta, { pageTitle } from '../components/PageMeta'
import PageShell from '../components/PageShell'
import Reviews from '../components/Reviews'

export default function ReviewsPage() {
  return (
    <>
      <PageMeta
        title={pageTitle('Reviews')}
        description="Red Eye Cafe reviews: 4.5 stars on Google (672 reviews), 4.2 on Yelp (749 reviews), #6 of 235 restaurants in Montclair on Tripadvisor. Real quotes, linked to source."
        path="/reviews"
      />
      <PageShell>
        <Reviews standalone />
      </PageShell>
    </>
  )
}
