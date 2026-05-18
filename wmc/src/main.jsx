import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './components/index.css'
import App from './App.jsx'
import AboutUs from './components/AboutUs.jsx'
import Home from './components/Home.jsx'
import Store from './components/Store.jsx'
import Experiences from './components/Experiences.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

  
