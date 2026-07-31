import PageMeta, { pageTitle } from '../components/PageMeta'
import PageShell from '../components/PageShell'
import Vibe from '../components/Vibe'

export default function RoomPage() {
  return (
    <>
      <PageMeta
        title={pageTitle('The Room')}
        description="Step inside Red Eye Cafe: white subway tile, vintage bulbs, bookshelves and local art on Walnut Street, Montclair. Atmosphere rated 4.7 out of 5."
        path="/room"
      />
      <PageShell>
        <Vibe standalone />
      </PageShell>
    </>
  )
}
