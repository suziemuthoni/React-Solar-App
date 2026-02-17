import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.pageYOffset > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location])

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
          <button 
            className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
            <Link to="/">Home</Link>
            {isHomePage ? (
              <a href="#why-solar-king" onClick={(e) => scrollToSection(e, '#why-solar-king')}>About</a>
            ) : (
              <Link to="/#why-solar-king">About</Link>
            )}
            <Link to="/products">Products</Link>
            <Link to="/solar-inverter-systems">Solar Inverter Systems</Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
