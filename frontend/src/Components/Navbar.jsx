import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
const Navbar = () => {
  return (
    <header className='Navbar'>
      <div className='Navbar-container'>
        <div className='Img-container'> 
          <img src="" alt="CIC open day logo" id='CIC-logo' />
        </div>
        <nav id='Links'>
          <ul className='nav-ul'>
            <li><Link to="/" className='nav-link'>Home</Link></li>
            <li><Link to="/map">Map</Link></li>
            <li><Link to="/login"><button className='button'>log in</button></Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Navbar