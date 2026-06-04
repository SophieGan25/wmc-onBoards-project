import { Link } from 'react-router-dom'
import logo from './img/logo_transparent.png'
import './Navbar.css'

export default function Navbar() {
  return (
    <header>
      <div id="navbar">
        <img src={logo} alt="logo" id="logo" />
        <nav id="navlinks">
          <Link to="/">Home</Link>
          <Link to="/store">Store</Link>
          <Link to="/experiences">Experiences</Link>
          <Link to="/aboutus">About Us</Link>
        </nav>
      </div>
    </header>
  )
}
