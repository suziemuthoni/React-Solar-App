import './WhySolarPanda.css'

function WhySolarPanda() {
  const features = [
    {
      title: 'Top Quality',
      description: 'We design and engineer our products to be the best in the market. We want them to work well and last for many years.'
    },
    {
      title: 'Loan-To-Own',
      description: 'Our affordable payment plans deliver savings now. Ownership delivers savings in the future.'
    },
    {
      title: 'Save More',
      description: 'Fast customer payments give families additional savings and unlock future upgrades.'
    },
    {
      title: 'Trusted Brand',
      description: 'Hundreds of thousands of families trust Solar Panda\'s products and service.'
    },
    {
      title: 'Best Service',
      description: 'Toll-free Customer Care is ready to help.'
    }
  ]

  return (
    <section id="why-solar-panda" className="section">
      <div className="container">
        <h2>Why Solar Panda?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="product-image">
          <img src="https://solarpanda.com/wp-content/uploads/2025/05/TV-Premium-2022-01-transparent-e1642878365840-600x372.png" alt="TV Premium 32" />
        </div>
      </div>
    </section>
  )
}

export default WhySolarPanda
