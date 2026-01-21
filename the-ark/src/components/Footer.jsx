import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>The Ark</h3>
          <p>Making a difference in our community</p>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>
            <FontAwesomeIcon icon={faEnvelope} /> info@theark.com
          </p>
          <p>
            <FontAwesomeIcon icon={faPhone} /> +1 (555) 123-4567
          </p>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#" aria-label="Facebook">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="#" aria-label="Twitter">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="#" aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 The Ark. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
