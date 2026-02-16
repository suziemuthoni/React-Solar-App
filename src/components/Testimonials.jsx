import './Testimonials.css'

function Testimonials() {
  const testimonials = [
    {
      quote: 'My solar product got delivered in good time and the installation was done at no extra cost. Thank you for the good services.',
      author: 'Apiche M.'
    },
    {
      quote: 'Solar Panda doesn\'t just sell you the products and then leave you to figure out stuff. They call to ensure the installation was done properly by their agent and also send you daily reminders on how to use the product. I love that very much.',
      author: 'Edah K.'
    },
    {
      quote: 'We paid off our TV package quite fast, and now we own our TV and lights and have mobile charging with no more payments. This was a good decision for us.',
      author: 'Obadiah M.'
    }
  ]

  return (
    <section id="testimonials" className="section testimonials-section">
      <div className="container">
        <h2>What Our Customers Say</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial">
              <blockquote>
                <p>"{testimonial.quote}"</p>
                <cite>- {testimonial.author}</cite>
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
