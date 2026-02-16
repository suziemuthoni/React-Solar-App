import './Hero.css'

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Low-Cost Home Solar</h1>
            <h2>Transforming Lives</h2>
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
