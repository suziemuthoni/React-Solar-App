import { useState } from 'react'
import PurchaseForm from '../components/PurchaseForm'
import './ProductDetailPage.css'

function PowerPlayProPage() {
  const [showPurchaseForm, setShowPurchaseForm] = useState(false)
  const benefits = [
    {
      icon: '⚡',
      title: '600 W inverter, providing power for essential appliances'
    },
    {
      icon: '🔋',
      title: '800 Wh LFP battery built to last a decade'
    },
    {
      icon: '🔌',
      title: 'USB-A and USB-C ports for charging phones, laptops, and other devices'
    },
    {
      icon: '💰',
      title: 'Cheaper and safer than running a generator'
    },
    {
      icon: '⚡',
      title: 'Rapid charging, capable of reaching full charge in as little as two hours'
    },
    {
      icon: '🔧',
      title: 'Plug-and-play design for maximum ease of use'
    }
  ]

  const powerCapabilities = [
    {
      title: '600 W AC Power Output',
      icon: '🔌'
    },
    {
      title: '24 V DC Power Output',
      icon: '⚡'
    },
    {
      title: '12 V DC Power Output for Sun King Products',
      icon: '🔋'
    },
    {
      title: '40 W USB-A and 65 W USB-C Power Output',
      icon: '📱'
    }
  ]

  return (
    <div className="product-detail-page">
      {/* Hero Section */}
      <section className="product-hero">
        <div className="hero-image-container">
          <img 
            src="/images/Powerplay-pro-panel-portrait-1-min-1-min-min-scaled-1.webp" 
            alt="PowerPlay Pro"
          />
        </div>
        <div className="hero-content-overlay">
          <div className="container">
            <div className="product-badge">Solar Inverter System</div>
            <h1>PowerPlay Pro</h1>
            <h2>Affordable Energy, Anytime, Anywhere</h2>
            <p className="hero-description">
              Power your essential home and business appliances via solar, grid electricity, 
              and battery storage – affordable and portable with a simple plug-and-play 
              installation. PowerPlay Pro powers everything from phones and televisions to 
              laptops, freezers, and light business equipment.
            </p>
            <p className="hero-subtext">
              Cheaper than running a generator, PowerPlay Pro is an affordable energy 
              solution for those living with unreliable grid connections or entirely off-grid.
            </p>
            <div className="hero-action">
              <button className="btn btn-large" onClick={() => setShowPurchaseForm(true)}>Proceed to Order</button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="container">
          <h2>The Benefits</h2>
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-card">
                <div className="benefit-icon">{benefit.icon}</div>
                <p>{benefit.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Can It Power Section */}
      <section className="power-capabilities-section">
        <div className="container">
          <h2>What Can PowerPlay Pro Power?</h2>
          <div className="power-grid">
            {powerCapabilities.map((item, index) => (
              <div key={index} className="power-card">
                <div className="power-icon">{item.icon}</div>
                <h3>{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="container">
          <h2>How it Works</h2>
          <div className="how-it-works-content">
            <p>
              PowerPlay Pro features a hybrid inverter, meaning it can draw power from both 
              the electrical grid and solar panels. It can charge appliances while 
              simultaneously charging its battery, which reduces your energy costs and provides 
              an uninterrupted power supply.
            </p>
            <div className="how-it-works-steps">
              <div className="step">
                <div className="step-number">1</div>
                <p>The solar panel captures the energy of sunlight hitting your roof.</p>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <p>The inverter turns this energy into AC electricity. The electricity is used to power appliances connected to the PowerPlay.</p>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <p>The battery stores both grid- and solar-generated energy to keep appliances running at night or when the electrical grid is unavailable.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications Section */}
      <section className="specifications-section">
        <div className="container">
          <h2>Key Specifications</h2>
          <div className="specs-grid">
            <div className="spec-category">
              <h3>Inverter</h3>
              <ul>
                <li>Pure-sine-wave 600 W power output</li>
                <li>Grid bypass feature and battery charge integrated</li>
                <li>Dimensions: 732 x 454 x 326 mm</li>
                <li>Gross Weight: 3.3 kg</li>
                <li>Two operation modes: Default mode switches inverter off after two hours of inactivity. UPS mode keeps inverter on indefinitely</li>
              </ul>
            </div>
            <div className="spec-category">
              <h3>Battery and Output Ports</h3>
              <ul>
                <li>22.4 V, 800 Wh lithium ferro-phosphate (LFP) battery</li>
                <li>4 x USB-A (40 W Max Total (5 V/2.1 A Max per USB-A))</li>
                <li>1 x USB-C (65 W Max)</li>
                <li>1 x TV communication port</li>
                <li>4 x 12 V DC port (120 W Max Total (12 V/5 A Max per port))</li>
                <li>1 x 24 V DC Port (30 A Max)</li>
                <li>Dimensions: 440 X 230 X 455 mm</li>
                <li>Gross Weight: 11.75 kg</li>
              </ul>
            </div>
            <div className="spec-category">
              <h3>Solar Panels</h3>
              <ul>
                <li>1 x 450 W monocrystalline roof-mountable solar panels</li>
                <li>Dimensions: 1908 x 1134 x 35 mm</li>
                <li>Gross Weight: 23.25 kg</li>
                <li>Cable: 12.2 m (expandable)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <h2>Get Your PowerPlay Pro</h2>
          <p className="contact-intro">Choose how you'd like to proceed</p>
          <div className="contact-info">
            <button className="btn btn-large" onClick={() => setShowPurchaseForm(true)}>Purchase Now</button>
            <a href="tel:+254800724878" className="btn btn-large">Call us +254 800 724 878</a>
            <a href="https://wa.me/254747933969" target="_blank" rel="noopener noreferrer" className="btn btn-large">WhatsApp us</a>
          </div>
        </div>
      </section>

      <PurchaseForm 
        productName="PowerPlay Pro"
        isOpen={showPurchaseForm}
        onClose={() => setShowPurchaseForm(false)}
      />
    </div>
  )
}

export default PowerPlayProPage
