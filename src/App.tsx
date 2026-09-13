import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import Layout from './portfolio/Layout'
import HomePage from './portfolio/HomePage'
import ContactPage from './portfolio/ContactPage'
import NotFound from './portfolio/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      {/* Vercel Web Analytics. `/react`, not `/next` — this is a Vite SPA, so
          the Next entry point would pull in next/navigation and fail to build.
          It renders nothing; it injects the edge script, which patches history
          itself, so both routes are counted. Off outside production. */}
      <Analytics />
    </BrowserRouter>
  )
}
