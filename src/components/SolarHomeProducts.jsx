import { useState } from 'react'
import PurchaseForm from './PurchaseForm'
import './SolarHomeProducts.css'

function SolarHomeProducts() {
  const [showPurchaseForm, setShowPurchaseForm] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const products = [
    {
      id: 1,
      name: 'HomePlus',
      description: 'Ultra-affordable solar lighting and basic phone charging',
      image: '/images/HomePlus_Horizontal-20240704_2025-scaled-1-800x473.webp'
    },
    {
      id: 2,
      name: 'HomePlus Pro',
      description: 'Comprehensive lighting and smartphone charging',
      image: '/images/SK-429-HomePlus-Pro_Vertical-20241026_2025-scaled-1-800x800.webp'
    }
  ]

  const handleGetQuote = (productName) => {
    setSelectedProduct(productName)
    setShowPurchaseForm(true)
  }

  return (
    <>
      <section id="solar-home-products" className="section solar-home-products">
        <div className="container">
          <h2>Solar Home Systems and Appliances</h2>
          
          <div className="products-showcase">
            {products.map((product) => (
              <div key={product.id} className="showcase-card">
                <div className="product-image-container">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <button 
                    className="btn btn-quote"
                    onClick={() => handleGetQuote(product.name)}
                  >
                    Get Quote
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PurchaseForm 
        productName={selectedProduct || 'Product'}
        isOpen={showPurchaseForm}
        onClose={() => setShowPurchaseForm(false)}
      />
    </>
  )
}

export default SolarHomeProducts
