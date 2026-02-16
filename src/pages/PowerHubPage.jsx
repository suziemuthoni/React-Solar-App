import { useState } from 'react'
import PurchaseForm from '../components/PurchaseForm'
import './ProductDetailPage.css'

function PowerHubPage() {
  const [showPurchaseForm, setShowPurchaseForm] = useState(false)
  const benefits = [
    {
      icon: '⚡',
      title: 'Up to 30 kW of inverter power'
    },
    {
      icon: '🔋',
      title: '10-year battery life'
    },
    {
      icon: '🛡️',
      title: 'Comprehensive protection against power outages'
    },
    {
      icon: '💰',
      title: 'Reduce the impact of rising energy prices'
    },
    {
      icon: '📈',
      title: 'Easily expandable post-purchase'
    },
    {
      icon: '🔧',
      title: 'Professional installation and after-sales support included'
    }
  ]

  const configurations = [
    {
      name: 'PowerHub Core',
      specs: [
        { label: 'Inverter power', value: '2 kW AC output' },
        { label: 'Battery storage', value: '2.5 kWh Lithium-ion LFP battery' },
        { label: 'Solar power', value: '1.8 kWp – 2.7 kWp' }
      ],
      canPower: [
        '1 x Heavy-load appliance (Water pump under 1 horsepower)',
        '2 x Medium-load appliances',
        '3 x Light-load appliances',
        '8 x Very-light-load appliances'
      ],
      pricing: {
        plan: 'Was Ksh. 17,000, Now Ksh. 13,750 per month',
        planDetails: '18 monthly payments, Was Ksh.22,500, Now Ksh.21,000 down payment',
        upfront: 'Was Ksh. 227,000, Now Ksh. 208,000'
      }
    },
    {
      name: 'PowerHub Plus',
      specs: [
        { label: 'Inverter power', value: '3.3 kW AC output' },
        { label: 'Battery storage', value: '5 kWh Lithium-ion LFP battery' },
        { label: 'Solar power', value: '1.8 kWp – 3.6 kWp' }
      ],
      canPower: [
        '2 x Heavy-load appliances (Water pump under 1 horsepower)',
        '4 x Medium-load appliances',
        '6 x Light-load appliances',
        '16 x Very-light-load appliances'
      ],
      pricing: {
        plan: 'Was Ksh.22,500, Now Ksh. 17,750 per month',
        planDetails: '18 monthly payments, Was Ksh.30,500, Now Ksh.27,000 down payment',
        upfront: 'Was Ksh. 305,000, Now Ksh. 268,000'
      }
    }
  ]

  return (
    <div className="product-detail-page">
      {/* Hero Section */}
      <section className="product-hero">
        <div className="hero-image-container">
          <img 
            src="/images/PowerHub-3300-Panel-scaled-1-800x457.webp" 
            alt="PowerHub"
          />
        </div>
        <div className="hero-content-overlay">
          <div className="container">
            <div className="product-badge">Solar Inverter System</div>
            <h1>PowerHub</h1>
            <h2>Power your lights and standard electrical appliances</h2>
            <p className="hero-description">
              Power your lights and standard electrical appliances with Sun King's PowerHub 
              solar inverter and energy storage systems for modern homes and businesses. 
              Customised to your needs and fully-integrated into your electricity distribution 
              system to keep you powered at night, during outages, and when you want to go off-grid.
            </p>
            <div className="hero-action">
              <button className="btn btn-large" onClick={() => setShowPurchaseForm(true)}>Proceed to Order</button>
            </div>
          </div>
        </div>
      </section>

      {/* Build Your System Section */}
      <section className="build-section">
        <div className="container">
          <h2>Build Your Ideal Solar Inverter System</h2>
          <p className="build-description">
            From lights, refrigerators, and televisions to computers, food processing equipment, 
            and light machinery, our solar inverter systems can be adapted to power the number 
            and types of appliances you need.
          </p>
          <p className="build-description">
            Select one of our standard PowerHub configurations or speak to our expert advisors 
            to design a custom system – the choice is yours.
          </p>
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

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="container">
          <h2>How it Works</h2>
          <div className="how-it-works-content">
            <p>
              PowerHub systems draw power from both the electrical grid and their solar panels. 
              The hybrid inverter powers appliances directly while simultaneously charging a 
              battery, which reduces your home's energy costs and provides an uninterrupted 
              power supply.
            </p>
            <p>These systems have three main components: solar panels, an inverter, and a battery.</p>
            <div className="how-it-works-steps">
              <div className="step">
                <div className="step-number">1</div>
                <p>The solar panels capture the energy of sunlight hitting your roof.</p>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <p>The inverter turns this energy into electricity and connects it to the circuits that your home uses to power lights and appliances.</p>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <p>The battery stores electricity to keep your home running at night or when the electrical grid goes down.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Configurations Section */}
      <section className="configurations-section">
        <div className="container">
          <h2>Which PowerHub System is Right for You?</h2>
          <p className="config-intro">
            Here you can see the specifications of our two standard PowerHub configurations: 
            Core and Plus. We offer custom packages for people whose needs aren't met by our 
            standard bundles, and each system can be easily expanded post-purchase.
          </p>
          <div className="configurations-grid">
            {configurations.map((config, index) => (
              <div key={index} className="config-card">
                <h3>{config.name}</h3>
                <div className="config-specs">
                  {config.specs.map((spec, specIndex) => (
                    <div key={specIndex} className="spec-item">
                      <strong>{spec.label}:</strong>
                      <p>{spec.value}</p>
                    </div>
                  ))}
                </div>
                <div className="can-power">
                  <h4>What can it Power?</h4>
                  <ul>
                    {config.canPower.map((item, powerIndex) => (
                      <li key={powerIndex}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="pricing">
                  <h4>Pricing</h4>
                  <div className="price-option">
                    <strong>Payment plan:</strong>
                    <p>{config.pricing.plan}</p>
                    <p className="price-details">{config.pricing.planDetails}</p>
                  </div>
                  <div className="price-option">
                    <strong>Buy upfront:</strong>
                    <p>{config.pricing.upfront}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="contact-note">
            Contact us to make a purchase or discuss your options. All PowerHub sales include 
            a system sizing process to ensure the system is right for your power needs.
          </p>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="specifications-section">
        <div className="container">
          <h2>Technical Specifications</h2>
          <div className="specs-grid">
            <div className="spec-category">
              <h3>Inverter Specifications</h3>
              <ul>
                <li><strong>Max AC Output:</strong> Core: 2 kW, Plus: 3.3 kW</li>
                <li><strong>Rated Output Voltage (Vac):</strong> 230 Vac, ±5%</li>
                <li><strong>Output Voltage Waveform:</strong> Pure sine wave</li>
                <li><strong>Maximum Efficiency:</strong> ≥92%</li>
                <li><strong>Rated Input Voltage:</strong> 220/230 Vac</li>
                <li><strong>Frequency:</strong> 50 Hz/60 Hz (auto-detection)</li>
                <li><strong>Maximum Charge Current:</strong> 0-80 A, adjustable</li>
                <li><strong>Rated Battery Input Voltage:</strong> 24 V (minimum starting voltage 22 V)</li>
              </ul>
            </div>
            <div className="spec-category">
              <h3>Battery Specifications</h3>
              <ul>
                <li><strong>Battery Storage:</strong> Core: 2.5 kWh, Plus: 5 kWh</li>
                <li>Lithium-ion phosphate (LFP) battery</li>
                <li>10-year battery lifespan with typical daily use (over 2,500 cycles)</li>
                <li><strong>Output Voltage Range:</strong> 21.6 V – 27.2 V</li>
                <li><strong>LCD Display System Displays:</strong> Connection, usage, and battery consumption</li>
              </ul>
            </div>
            <div className="spec-category">
              <h3>Solar Panel Specifications</h3>
              <ul>
                <li><strong>Maximum Power:</strong> Core: 1.8 kWp (4 x 450 Wp solar panels), Plus: 2.7 kWp (6 x 450 Wp solar panels)</li>
                <li><strong>Technology:</strong> Monocrystalline</li>
                <li><strong>Open-Circuit Voltage (Voc):</strong> 49.35 V</li>
                <li><strong>Short-Circuit Current (Isc):</strong> 11.61 A</li>
                <li><strong>Maximum Power Voltage (Vmp):</strong> 41.56 V</li>
                <li><strong>Maximum Power Current (Imp):</strong> 10.83 A</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <h2>Get Your PowerHub System</h2>
          <p className="contact-intro">Choose how you'd like to proceed</p>
          <div className="contact-info">
            <button className="btn btn-large" onClick={() => setShowPurchaseForm(true)}>Purchase Now</button>
            <a href="tel:+254800724878" className="btn btn-large">Call us +254 800 724 878</a>
            <a href="https://wa.me/254747933969" target="_blank" rel="noopener noreferrer" className="btn btn-large">WhatsApp us</a>
          </div>
        </div>
      </section>

      <PurchaseForm 
        productName="PowerHub"
        isOpen={showPurchaseForm}
        onClose={() => setShowPurchaseForm(false)}
      />
    </div>
  )
}

export default PowerHubPage
