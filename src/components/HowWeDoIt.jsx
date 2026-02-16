import './HowWeDoIt.css'

function HowWeDoIt() {
  const steps = [
    {
      number: 1,
      title: 'Loan-to-Own',
      description: 'Pay a small deposit for one of our solar products. Purchase from a friendly sales agent or a nearby shop.'
    },
    {
      number: 2,
      title: 'Easy Setup',
      description: 'Get free professional installation for all TV packages. Our Customer Success agent will help with all installations.'
    },
    {
      number: 3,
      title: 'Free Delivery',
      description: 'We deliver your solar product directly to your home at no extra cost. Quick and reliable delivery to get you started.'
    },
    {
      number: 4,
      title: 'Own It',
      description: 'Complete your affordable payments and the product is yours. Enjoy years of savings with your own solar system.'
    }
  ]

  return (
    <section className="how-we-do-it-section">
      <div className="container">
        <h2>How We Do It</h2>
        
        <div className="timeline-container">
          <div className="timeline-line"></div>
          
          <div className="steps-grid">
            {steps.map((step, index) => (
              <div key={index} className="step-card">
                <div className="step-number-circle">{step.number}</div>
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowWeDoIt
