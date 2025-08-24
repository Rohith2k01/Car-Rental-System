import React from 'react'
import './Footer.css'
import '@fortawesome/fontawesome-free/css/all.min.css';


function Footer() {
  return (
    <div>
  <footer className="footer">
    <div className="footer-container">
      <div className="footer-section">
        <h3>Car Rental</h3>
        <p>Your trusted partner for affordable and reliable car rentals. Explore with ease, drive with comfort.</p>
      </div>

      <div className="footer-section">
        <h4>Company</h4>
        <ul>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Careers</a></li>
          <li><a href="#">Privacy Policy</a></li>
        </ul>
      </div>

      <div className="footer-section">
        <h4>Support</h4>
        <ul>
          <li><a href="#">Help Center</a></li>
          <li><a href="#">Contact Us</a></li>
          <li><a href="#">Booking Guide</a></li>
        </ul>
      </div>

      <div className="footer-section">
        <h4>Follow Us</h4>
        <div className="social-icons">
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
        </div>
      </div>
    </div>

    <div className="footer-bottom">
      <p>© 2025 Car Rental. All rights reserved.</p>
    </div>
  </footer>
</div>

  )
}

export default Footer