import './WhySolarHome.css'

function WhySolarHome() {
  const benefits = [
    {
      image: 'https://solarpanda.com/wp-content/uploads/bb-plugin/cache/PG922851-V5-1-3-kids-homework-600x293-landscape-8e1e1c8c43d76143e4ca5a604d812b02-gbqoz7xv42nl.jpg',
      title: 'Savings and Ownership',
      description: 'Get safe and reliable electricity for less than the cost of kerosene or the grid. Use the money you save for education, food, transportation, health care, and your business. Pay fast for additional savings.'
    },
    {
      image: 'https://solarpanda.com/wp-content/uploads/bb-plugin/cache/PG922817-V5-radio-mom-and-baby-600x480-landscape-ad45fe151e26c7c796f962fecea664ab-qx4rz0ohbwyi.jpg',
      title: 'Education and Information',
      description: 'Get bright clean lights for school work. TV and radio bring the world to you.'
    },
    {
      image: 'https://solarpanda.com/wp-content/uploads/bb-plugin/cache/PG923585-V7-5Gb-Massai-family-600x465-landscape-6af3ce35ee67f8ca0dc0a5c2b0f5397e-tkqil0za6by9.jpg',
      title: 'Health and Safety',
      description: 'Eliminate kerosene toxins and fire hazards from your home and the environment. Improve security at home, farm and business with outside lights.'
    }
  ]

  return (
    <section id="why-solar-home" className="section">
      <div className="container">
        <h2>Why Solar Home?</h2>
        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit">
              <img src={benefit.image} alt={benefit.title} />
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhySolarHome
