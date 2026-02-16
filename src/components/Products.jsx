import { useState } from 'react'
import './Products.css'

function Products() {
  const [currentImage, setCurrentImage] = useState(0)

  const productImages = [
    'https://ke.sunking.com/wp-content/uploads/2025/09/Boom-scaled-1.png',
    'https://ke.sunking.com/wp-content/uploads/2025/09/Sunking-Boom-Daylight-display-scaled.jpg',
    'https://ke.sunking.com/wp-content/uploads/2025/09/Sun-King-Boom-phone-charging-scaled.jpg',
    'https://ke.sunking.com/wp-content/uploads/2025/09/Sunking-Boom-Radio-Music-scaled.jpg',
    'https://ke.sunking.com/wp-content/uploads/2024/03/Boom-Lifestyle-2-copy-1-scaled-1-e1762861411393.jpg'
  ]

  const benefits = [
    {
      icon: '⏱️',
      title: 'Up to 50 hours of runtime',
      description: 'Single charge provides extended use'
    },
    {
      icon: '💡',
      title: '250 lumens on Turbo mode',
      description: '25 times brighter than a kerosene lamp'
    },
    {
      icon: '📻',
      title: 'Bluetooth, FM radio, MP3 player',
      description: 'Faster mobile device charging'
    }
  ]

  const features = [
    {
      title: 'Versatile Audio Options',
      description: 'Bluetooth 5.4, FM radio (87.5-108 MHz), powerful 3W speaker, aux-in 3.5mm jack, MP3 playback via USB/SD card up to 128GB'
    },
    {
      title: 'Adjustable LED Lighting',
      description: 'White LED with three lighting modes, 250 lumens max brightness, digital LED charging and battery meter'
    },
    {
      title: 'Smart Battery Management',
      description: '14.7 Wh lithium iron-phosphate battery, 10-year lifespan with typical daily use (over 2,500 cycles)'
    }
  ]

  const specifications = {
    lighting: [
      'White LED with three lighting modes',
      '250 lumens brightness on max setting',
      '25 times brighter than a kerosene lamp'
    ],
    battery: [
      '14.7 Wh, lithium iron-phosphate (LFP)',
      'Up to 50 hours of runtime on low-power mode',
      'Digital LED charging and battery meter',
      '10-year battery lifespan with typical daily use (over 2,500 cycles)'
    ],
    solar: [
      '5.2 Wp monocrystalline solar panel (5.9 Vm)',
      '5-metre cable included'
    ],
    output: [
      '5V USB-A phone charging port',
      'Suitable for charging feature phones'
    ],
    features: [
      'Bluetooth 5.4 for audio connectivity',
      'FM radio with 87.5 MHz – 108 MHz frequency range',
      'Powerful 3W in-built speaker',
      'Aux-in 3.5mm earphone jack with adjustable volume',
      'Play MP3 files through USB or SD card/TF card slot up to 128GB'
    ],
    casing: [
      'Water-resistant, rugged, and durable polycarbonate plastic',
      'Multi-use metallic stand to hang, hold, and rotate the lantern'
    ]
  }

  return (
    <section id="products" className="section products-section">
      <div className="container">
        <h2>Our Products</h2>
        
        {/* Product Hero */}
        <div className="product-hero">
          <div className="product-gallery">
            <div className="main-image">
              <img src={productImages[currentImage]} alt="Boom Solar Lantern" />
            </div>
            <div className="thumbnail-gallery">
              {productImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Boom view ${index + 1}`}
                  className={index === currentImage ? 'active' : ''}
                  onClick={() => setCurrentImage(index)}
                />
              ))}
            </div>
          </div>

          <div className="product-info">
            <h1 className="product-title">Boom</h1>
            <p className="product-subtitle">Solar Lantern</p>
            <p className="product-description">
              The Boom solar lantern combines bright 250-lumen lighting, versatile audio, and 
              efficient phone charging in a compact, user-friendly design. Its detachable metal 
              stand makes it perfect for home lighting, desk work, travel, or small businesses.
            </p>
            <p className="product-improvement">
              With a 90% more powerful solar panel, 53% larger battery, and 56% brighter light 
              than the original Boom, the new and improved Boom offers superior performance 
              across the board. Enjoy Bluetooth connectivity, faster phone charging, and improved 
              audio quality.
            </p>
            <div className="product-pricing">
              <div className="price-tag">
                <span className="currency">Ksh.</span>
                <span className="amount">15</span>
                <span className="period">per day</span>
              </div>
              <p className="payment-details">420 daily payments, Ksh.500 down payment</p>
            </div>
            <div className="product-actions">
              <button className="btn btn-large">EasyBuy</button>
              <button className="btn btn-large btn-secondary">Buy Now</button>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="benefits-section">
          <h2>The Benefits</h2>
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-card">
                <div className="benefit-icon">{benefit.icon}</div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="features-section">
          <h2>Features</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Specifications Section */}
        <div className="specifications-section">
          <h2>Key Specifications</h2>
          <div className="specs-grid">
            <div className="spec-category">
              <h3>Lighting</h3>
              <ul>
                {specifications.lighting.map((spec, index) => (
                  <li key={index}>{spec}</li>
                ))}
              </ul>
            </div>
            <div className="spec-category">
              <h3>Battery</h3>
              <ul>
                {specifications.battery.map((spec, index) => (
                  <li key={index}>{spec}</li>
                ))}
              </ul>
            </div>
            <div className="spec-category">
              <h3>Solar Power</h3>
              <ul>
                {specifications.solar.map((spec, index) => (
                  <li key={index}>{spec}</li>
                ))}
              </ul>
            </div>
            <div className="spec-category">
              <h3>Output Ports</h3>
              <ul>
                {specifications.output.map((spec, index) => (
                  <li key={index}>{spec}</li>
                ))}
              </ul>
            </div>
            <div className="spec-category">
              <h3>Audio Features</h3>
              <ul>
                {specifications.features.map((spec, index) => (
                  <li key={index}>{spec}</li>
                ))}
              </ul>
            </div>
            <div className="spec-category">
              <h3>Casing and Stand</h3>
              <ul>
                {specifications.casing.map((spec, index) => (
                  <li key={index}>{spec}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Products
