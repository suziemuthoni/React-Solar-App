import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.pageYOffset > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (e, targetId) => {
    e.preventDefault()
    const element = document.querySelector(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const isHomePage = location.pathname === '/'

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <nav className="navbar">
        <div className="container">
          <div className="logo">
            <Link to="/">
              <img src="/images/WhatsApp Image 2026-02-16 at 16.09.18.jpeg" alt="Logo" />
            </Link>
          </div>
          <div className="nav-menu">
            <Link to="/">Home</Link>
            {isHomePage ? (
              <a href="#why-solar-panda" onClick={(e) => scrollToSection(e, '#why-solar-panda')}>About</a>
            ) : (
              <Link to="/#why-solar-panda">About</Link>
            )}
            <Link to="/products">Products</Link>
            <Link to="/solar-inverter-systems">Solar Inverter Systems</Link>
            {isHomePage ? (
              <a href="#contact" onClick={(e) => scrollToSection(e, 'footer')}>Contact</a>
            ) : (
              <Link to="/#contact">Contact</Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
