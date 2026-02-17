import './Hero.css'

function Hero() {
  const handleGetQuote = () => {
    const message = `Hi, I'm interested in getting a quote for your solar home systems.`
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/254747933969?text=${encodedMessage}`, '_blank')
  }

  return (
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
  )
}

export default Hero
