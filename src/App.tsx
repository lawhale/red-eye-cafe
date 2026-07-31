import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import HomePage from './pages/HomePage'
import MenuPage from './pages/MenuPage'
import RoomPage from './pages/RoomPage'
import ReviewsPage from './pages/ReviewsPage'
import VisitPage from './pages/VisitPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="menu" element={<MenuPage />} />
          <Route path="room" element={<RoomPage />} />
          <Route path="reviews" element={<ReviewsPage />} />
          <Route path="visit" element={<VisitPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
