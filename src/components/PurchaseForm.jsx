import { useState } from 'react'
import './PurchaseForm.css'

function PurchaseForm({ productName, isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    location: '',
    paymentMethod: 'loan-to-own'
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Create WhatsApp message
    const message = `Hello, I am interested in purchasing ${productName}.

Customer Details:
- Name: ${formData.name}
- Country: ${formData.country}
- Location: ${formData.location}
- Preferred Payment: ${formData.paymentMethod === 'loan-to-own' ? 'Loan to Own' : 'Pay Upfront'}

Please note: A processing fee is required for an agent to be assigned and to progress with the application process.`

    // Encode message for WhatsApp
    const encodedMessage = encodeURIComponent(message)
    
    // Redirect to WhatsApp Business
    window.open(`https://wa.me/254747933969?text=${encodedMessage}`, '_blank')
    
    // Close form
    onClose()
    
    // Reset form
    setFormData({
      name: '',
      country: '',
      location: '',
      paymentMethod: 'loan-to-own'
    })
  }

  if (!isOpen) return null

  return (
    <div className="form-overlay" onClick={onClose}>
      <div className="form-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        
        <div className="form-header">
          <h2>Purchase {productName}</h2>
          <p className="form-subtitle">Fill in your details to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="purchase-form">
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="country">Country *</label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            >
              <option value="">Select a country</option>
              <option value="Kenya">Kenya</option>
              <option value="Uganda">Uganda</option>
              <option value="Tanzania">Tanzania</option>
              <option value="Rwanda">Rwanda</option>
              <option value="Zambia">Zambia</option>
              <option value="Senegal">Senegal</option>
              <option value="Benin">Benin</option>
              <option value="Nigeria">Nigeria</option>
              <option value="Ghana">Ghana</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="location">Location/City *</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="Enter your city or region"
            />
          </div>

          <div className="form-group">
            <label htmlFor="paymentMethod">Preferred Payment Method *</label>
            <div className="payment-options">
              <label className="payment-radio">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="loan-to-own"
                  checked={formData.paymentMethod === 'loan-to-own'}
                  onChange={handleChange}
                />
                <span>Loan to Own</span>
                <small>Affordable monthly payments</small>
              </label>
              <label className="payment-radio">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="pay-upfront"
                  checked={formData.paymentMethod === 'pay-upfront'}
                  onChange={handleChange}
                />
                <span>Pay Upfront</span>
                <small>Full payment now</small>
              </label>
            </div>
          </div>

          {formData.paymentMethod === 'loan-to-own' && (
            <div className="processing-fee-notice">
              <p className="notice-icon">⚠️</p>
              <p className="notice-text">
                A processing fee is required for an agent to be assigned and to progress with 
                the application process. Our team will contact you via WhatsApp to discuss details.
              </p>
            </div>
          )}

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Continue to WhatsApp
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PurchaseForm
