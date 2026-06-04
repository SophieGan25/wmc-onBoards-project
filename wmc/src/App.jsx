import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Background from './Aurora/background'
import Home from './components/Home'
import Store from './components/Store'
import Experiences from './components/Experiences'
import AboutUs from './components/AboutUs'
import './App.css'

function ScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) return

    const element = document.getElementById(hash.slice(1))
    element?.scrollIntoView({ block: 'start' })
  }, [pathname, hash])

  return null
}

function App() {
  return (
    <>
      <Background />
      <Router>
        <ScrollToHash />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/aboutus" element={<AboutUs />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
