import './Locations.css'

function Locations() {
  const locations = [
    {
      flag: 'https://solarpanda.com/wp-content/uploads/2025/12/kenya_flag-48x36.png',
      name: 'Kenya',
      links: [
        { text: 'Find out more', url: 'https://solarpanda.com/kenya/products/' }
      ]
    },
    {
      flag: 'https://solarpanda.com/wp-content/uploads/2025/12/senegal_flag-48x36.png',
      name: 'Senegal',
      links: [
        { text: 'Find out more', url: 'https://solarpanda.com/senegal/products/' },
        { text: 'En savoir plus', url: 'https://solarpanda.com/fr/senegal/produits/' }
      ]
    },
    {
      flag: 'https://solarpanda.com/wp-content/uploads/2025/12/zambia-flag-48x36.png',
      name: 'Zambia',
      links: [
        { text: 'Find out more', url: 'https://solarpanda.com/zambia/products/' },
        { text: 'Welcome Vitalite customers', url: 'https://solarpanda.com/zambia/products/' }
      ]
    },
    {
      flag: 'https://solarpanda.com/wp-content/uploads/2025/12/benin_flag-48x36.png',
      name: 'Benin',
      comingSoon: true
    }
  ]

  return (
    <section id="locations" className="section locations-section">
      <div className="container">
        <h2>Our Locations in Africa</h2>
        <div className="locations-grid">
          {locations.map((location, index) => (
            <div key={index} className="location">
              <img src={location.flag} alt={`${location.name} Flag`} />
              <h3>{location.name}</h3>
              {location.comingSoon ? (
                <p>coming soon</p>
              ) : (
                location.links.map((link, linkIndex) => (
                  <button key={linkIndex} className="btn" disabled>{link.text}</button>
                ))
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Locations
