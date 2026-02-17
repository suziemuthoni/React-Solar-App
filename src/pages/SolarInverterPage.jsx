import { Link } from 'react-router-dom'
import './SolarInverterPage.css'

function SolarInverterPage() {
  const products = [
    {
      name: 'PowerPlay Pro',
      description: 'Affordable and portable solar energy, anytime, anywhere',
      image: '/images/Powerplay-pro-panel-portrait-1-min-1-min-min-scaled-1.webp',
      shopUrl: '/product/powerplay-pro'
    },
    {
      name: 'PowerHub',
      description: 'Complete AC solar power for your home or business',
      image: '/images/PowerHub-3300-Panel-scaled-1-800x457.webp',
      shopUrl: '/product/powerhub'
    }
  ]

  const features = [
    {
      icon: '⚡',
      title: 'Reliable Power Backup',
      description: 'Keep your home powered during outages'
    },
    {
      icon: '🔋',
      title: 'Long-Lasting Battery',
      description: 'Robust energy storage for 24/7 power'
    },
    {
      icon: '💳',
      title: 'Pay Your Way',
      description: 'Flexible payment options available'
    },
    {
      icon: '💰',
      title: 'Eliminate Generator Costs and Save on Your Energy Bills',
      description: 'Reliable alternative to expensive generators'
    }
  ]

  return (
    <div className="solar-inverter-page">
      {/* Hero Section */}
      <section className="inverter-hero">
        <div className="hero-image-bg">
          <img 
            src="/images/PowerHub-3300-Panel-scaled-1-800x457.webp" 
            alt="Solar Inverter System"
          />
        </div>
        <div className="hero-overlay">
          <div className="container">
            <h1>Solar Inverter Systems</h1>
            <p className="hero-subtitle">
              Power your home or business with a complete AC solar and energy storage system
            </p>
          </div>
        </div>
      </section>

      {/* What is Section */}
      <section className="what-is-section">
        <div className="container">
          <h2>What is a Solar Inverter System?</h2>
          <div className="what-is-content">
            <p>
              Power your home or business' lights and standard electrical appliances with a 
              solar power and energy storage system. The system takes AC electricity from the 
              grid or the system's solar panels and stores it in a robust battery to keep you 
              powered around the clock.
            </p>
            <p>
              solarKing solar inverters offer a reliable and safe alternative to generators 
              while helping you save on fuel costs and electricity bills.
            </p>
            <button className="btn btn-large">Browse our range</button>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="inverter-products-section">
        <div className="container">
          <h2>Our Range of Solar Inverter Systems</h2>
          <div className="inverter-products-grid">
            {products.map((product, index) => (
              <div key={index} className="inverter-product-card">
                <div className="inverter-product-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="inverter-product-info">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <Link 
                    to={product.shopUrl} 
                    className="btn"
                  >
                    Get Quote
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="inverter-features-section">
        <div className="container">
          <div className="inverter-features-grid">
            {features.map((feature, index) => (
              <div key={index} className="inverter-feature-item">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default SolarInverterPage
