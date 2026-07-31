import PageMeta, { pageTitle } from '../components/PageMeta'
import PageShell from '../components/PageShell'
import Menu from '../components/Menu'

export default function MenuPage() {
  return (
    <>
      <PageMeta
        title={pageTitle('Menu')}
        description="Full breakfast and lunch menu: 128 items including omelettes, pancakes, sandwiches, coffee and the New Orleans Sludge. In-store prices from Red Eye Cafe, Montclair NJ."
        path="/menu"
      />
      <PageShell>
        <Menu standalone />
      </PageShell>
    </>
  )
}
