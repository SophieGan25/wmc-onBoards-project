import { Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  return (
    <div id="navbar">
      <img src="logo.png" alt="logo" id="logo" />
      <nav>
        <Link to="/">Home</Link>
        <Link to="/store">Store</Link>
        <Link to="/experiences">Experiences</Link>
        <Link to="/aboutus">About Us</Link>
      </nav>
    </div>
  )
}
