import { Link } from 'react-router-dom'
import logo from './img/logo_transparent.png'
import './Navbar.css'

export default function Navbar() {
  return (
    <header>
      <div id="navbar">
        <img src={logo} alt="logo" id="logo" />
        <nav id="navlinks">
          <Link to="/#home-header">Home</Link>
          <Link to="/store#store-header">Store</Link>
          <Link to="/experiences#experiences-header">Experiences</Link>
          <Link to="/aboutus#aboutus-header">About Us</Link>
        </nav>
      </div>
    </header>
  )
}
