import { useState, useEffect } from 'react'
import './HowItWorksCarousel.css'

function HowItWorksCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      icon: 'https://solarpanda.com/wp-content/uploads/2025/05/how1.png',
      fallback: '💰',
      title: 'Small Deposit',
      description: 'Customer makes a small deposit and takes their purchase home'
    },
    {
      icon: 'https://solarpanda.com/wp-content/uploads/2025/05/how2.png',
      fallback: '🔧',
      title: 'Installation',
      description: 'Our team installs your solar system at no extra cost'
    },
    {
      icon: 'https://solarpanda.com/wp-content/uploads/2025/05/how3.png',
      fallback: '✅',
      title: 'Activation',
      description: 'Your system is activated and ready to use immediately'
    },
    {
      icon: 'https://solarpanda.com/wp-content/uploads/2025/05/how4.png',
      fallback: '📱',
      title: 'Easy Payments',
      description: 'Customer uses mobile money to pay by the day (or multiple days at a time)'
    },
    {
      icon: 'https://solarpanda.com/wp-content/uploads/2025/05/how5.png',
      fallback: '📊',
      title: 'Real-Time Monitoring',
      description: 'Track your usage and payments through our mobile platform'
    },
    {
      icon: 'https://solarpanda.com/wp-content/uploads/2025/05/how6.png',
      fallback: '📅',
      title: 'Flexible Schedule',
      description: 'Pay at your own pace with daily, weekly, or monthly options'
    },
    {
      icon: 'https://solarpanda.com/wp-content/uploads/2025/05/how7.png',
      fallback: '🏆',
      title: 'Complete Ownership',
      description: 'After final payment, the system is yours to keep forever'
    },
    {
      icon: 'https://solarpanda.com/wp-content/uploads/2025/05/how8.png',
      fallback: '⚡',
      title: 'Free Electricity',
      description: 'Enjoy free clean energy for years after you own your system'
    },
    {
      icon: 'https://solarpanda.com/wp-content/uploads/2025/05/how9.png',
      fallback: '⬆️',
      title: 'Upgrade Options',
      description: 'Fast payers unlock exclusive discounts on system upgrades'
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="how-it-works" className="section how-it-works-carousel">
      <div className="container">
        <h2>How It Works</h2>
        
        <div className="carousel-container">
          <button className="carousel-arrow carousel-arrow-left" onClick={prevSlide} aria-label="Previous slide">
            ‹
          </button>

          <div className="carousel-content">
            <div className="slide-icon">
              <img 
                src={slides[currentSlide].icon} 
                alt={slides[currentSlide].title}
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextElementSibling.style.display = 'block'
                }}
              />
              <span className="icon-fallback" style={{ display: 'none' }}>
                {slides[currentSlide].fallback}
              </span>
            </div>
            <h3>{slides[currentSlide].title}</h3>
            <p>{slides[currentSlide].description}</p>
          </div>

          <button className="carousel-arrow carousel-arrow-right" onClick={nextSlide} aria-label="Next slide">
            ›
          </button>
        </div>

        <div className="carousel-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorksCarousel
