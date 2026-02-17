import { useState } from 'react'
import PurchaseForm from './PurchaseForm'
import './Hero.css'

function Hero() {
  const [showPurchaseForm, setShowPurchaseForm] = useState(false)

  const handleGetQuote = () => {
    setShowPurchaseForm(true)
  }

  return (
    <>
      <section id="home" className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Low-Cost Home Solar</h1>
              <h2>Transforming Lives</h2>
              <button className="btn btn-quote" onClick={handleGetQuote}>Get A Quote</button>
            </div>
            <div className="hero-image">
              <img 
                src="/images/solar-products.png" 
                alt="Solar Panda Products - TV, Lights, Fan, Fridge, and Solar Panel" 
                onError={(e) => {
                  e.target.src = 'https://solarpanda.com/wp-content/uploads/2025/11/Senegal-Product-Shots-TVM-600x456.png'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <PurchaseForm 
        productName="Solar Home System"
        isOpen={showPurchaseForm}
        onClose={() => setShowPurchaseForm(false)}
      />
    </>
  )
}

export default Hero
