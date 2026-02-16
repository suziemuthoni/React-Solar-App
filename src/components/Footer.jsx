import './Footer.css'

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Company</h3>
            <ul>
              <li><span>News</span></li>
              <li><span>Careers</span></li>
              <li><span>Whistleblower</span></li>
              <li><span>Contact Us</span></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Legal</h3>
            <ul>
              <li><span>Cookie Policy</span></li>
              <li><span>Privacy Policy</span></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>Copyright © 2026 Solar Panda</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
