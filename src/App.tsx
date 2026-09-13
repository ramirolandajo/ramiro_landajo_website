import { BrowserRouter, Route, Routes } from 'react-router-dom'
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
    </BrowserRouter>
  )
}
