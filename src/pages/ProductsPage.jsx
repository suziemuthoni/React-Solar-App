import { useState } from 'react'
import { Link } from 'react-router-dom'
import PurchaseForm from '../components/PurchaseForm'
import './ProductsPage.css'

function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const homeProducts = [
    {
      name: 'HomePlus',
      description: 'Ultra-affordable solar lighting and basic phone charging',
      image: '/images/HomePlus_Horizontal-20240704_2025-scaled-1-800x473.webp'
    },
    {
      name: 'HomePlus Pro',
      description: 'Comprehensive lighting and smartphone charging',
      image: '/images/SK-429-HomePlus-Pro_Vertical-20241026_2025-scaled-1-800x800.webp'
    },
    {
      name: 'HomePlus Max',
      description: 'Powerful solar lighting and laptop charging, with battery chargeable by solar or grid power',
      image: '/images/SK-525_526_HomePlus-Max_Non-GSM_For-Package_v0.0-1-800x643.png'
    },
    {
      name: 'HomePlus Max + 24″ HD TV',
      description: 'Powerful solar lighting and a solar powered 24" HD TV, with battery chargeable by solar or grid power',
      image: '/images/SK-525_526_HomePlus-Max_Non-GSM_For-Package-TV_v0.webp'
    },
    {
      name: 'HomePlus Max + 32″ HD TV',
      description: 'Powerful solar lighting and a solar powered 32" HD TV, with battery chargeable by solar or grid power',
      image: '/images/SK-525_526_HomePlus-Max_Non-GSM_For-Package-TV_v0 (1).webp'
    },
    {
      name: 'HomePlus Max + 43″ HD TV',
      description: 'Powerful solar lighting and a solar powered 43" HD TV, with battery chargeable by solar or grid power',
      image: '/images/SK-525_526_HomePlus-Max_Non-GSM_For-Package-TV_v0 (2).webp'
    }
  ]

  const inverterProducts = [
    {
      name: 'PowerPlay Pro',
      description: 'Affordable and portable solar energy, anytime, anywhere',
      image: '/images/Powerplay-pro-panel-portrait-1-min-1-min-min-scaled-1.webp',
      link: '/product/powerplay-pro'
    },
    {
      name: 'PowerHub',
      description: 'Complete AC solar power for your home or business',
      image: '/images/PowerHub-3300-Panel-scaled-1-800x457.webp',
      link: '/product/powerhub'
    }
  ]

  const features = [
    {
      icon: '💡',
      title: 'Safe, Bright, Modern Lighting',
      description: 'High-quality LED lights for every room'
    },
    {
      icon: '🔋',
      title: 'Robust Battery',
      description: 'Long-lasting power storage'
    },
    {
      icon: '🔆',
      title: 'Adjustable Brightness',
      description: 'Control light levels to suit your needs'
    },
    {
      icon: '✅',
      title: 'Industry-Leading Warranty',
      description: 'Peace of mind with comprehensive coverage'
    }
  ]

  return (
    <div className="products-page">
      {/* Hero Section */}
      <section className="products-hero">
        <div className="container">
          <h1>Solar Products</h1>
          <p className="hero-subtitle">
            Explore our complete range of solar home systems, appliances, and inverter systems 
            designed for every need and budget
          </p>
        </div>
      </section>

      {/* Home Systems Products Grid */}
      <section className="products-grid-section">
        <div className="container">
          <h2 className="category-title">Solar Home Systems and Appliances</h2>
          <div className="products-grid">
            {homeProducts.map((product, index) => (
              <div key={index} className="product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <button className="btn" onClick={() => setSelectedProduct(product.name)}>Get Quote</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solar Inverter Systems Products Grid */}
      <section className="products-grid-section inverter-section">
        <div className="container">
          <h2 className="category-title">Solar Inverter Systems</h2>
          <div className="products-grid minimal-grid">
            {inverterProducts.map((product, index) => (
              <div key={index} className="product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <Link to={product.link} className="btn">Get Quote</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is a Solar Home System */}
      <section className="info-section">
        <div className="container">
          <h2>What is a Solar Home System?</h2>
          <div className="info-content">
            <div className="info-text">
              <p>
                Cost-effective rooftop solar systems that power lights, mobile phones, and 
                DC-compatible products like televisions and fans.
              </p>
              <p>
                Designed for customers with no or unreliable electrical grid access and offering 
                basic electricity, these systems provide essential light and power to homes and businesses.
              </p>
            </div>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-item">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PurchaseForm 
        productName={selectedProduct}
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  )
}

export default ProductsPage
