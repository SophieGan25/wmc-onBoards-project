import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Background from './Aurora/background'
import Home from './components/Home'
import Store from './components/Store'
import Experiences from './components/Experiences'
import AboutUs from './components/AboutUs'
import './App.css'

function App() {
  return (
    <>
      <Background />
      <Router>
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
