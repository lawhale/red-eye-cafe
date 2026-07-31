import { Outlet } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'

export default function Layout() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <>
      <ScrollToTop />
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-brick"
        aria-hidden
      />
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
