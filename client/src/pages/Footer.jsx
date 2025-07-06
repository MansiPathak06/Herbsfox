import React from "react";
import './footer.css';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const handlePaymentPolicy = () => {
    navigate("/Paymentpolicy");
  };
  const handleCancellationPolicy = () => {
    navigate("/Cancellationpolicy");
  };
  const handleShippingpolicy = () => {
    navigate("/Shippingpolicy");
  };
  const handleReturnPolicy = () => {
    navigate("/Returnpolicy");
  };
  const handleTermsandConditions = () => {
    navigate("/Tandcconditions");
  };
  const handlePrivacyPolicy = () => {
    navigate("/Privacypolicy");
  };
  return (
    <div className="footer-container">
      <footer className="footer">
        <div className="footer-certificates">
          <img className="certificate1" src="/images/eco-friendly-green-leaf-label-sticker-free-vector-removebg-preview.png" alt="Certificate 1"></img>
          <img className="certificate2" src="/images/OIP-removebg-preview.png" alt="Certificate 2"></img>
          <img className="certificate3" src="/images/fssai-icon-logo-symbol-free-vector-removebg-preview.png" alt="Certificate 3"></img>
        </div>
        <div className="footer-links">
          <Link to="/Paymentpolicy" onClick={handlePaymentPolicy}>
            Payment Policy
          </Link>
          <span>|</span>
          <Link to="/Cancellationpolicy" onClick={handleCancellationPolicy}>
            Cancellation Policy
          </Link>
          <span>|</span>
          <Link to="/Shippingpolicy" onClick={handleShippingpolicy}>
            Shipping Policy
          </Link>
          <span>|</span>
          <Link to="/Returnpolicy" onClick={handleReturnPolicy}>
            Return or Exchange Policy
          </Link>
          <span>|</span>
          <Link to="/Tandcconditions" onClick={handleTermsandConditions}>
            Terms and Conditions
          </Link>
          <span>|</span>
          <Link to="/Privacypolicy" onClick={handlePrivacyPolicy}>
            Privacy Policy
          </Link>
        </div>
        <div className="social-icons">
          <a
            href="https://www.facebook.com/herbsfox"
            target="_blank"
            rel="noopener noreferrer"
            className="facebook"
          >
            <FontAwesomeIcon icon={faFacebookF} />
          </a>

          <a
            href="https://www.instagram.com/herbsfoxindia"
            target="_blank"
            rel="noopener noreferrer"
            className="instagram"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>

          <a
            href="https://www.linkedin.com/company/herbsfox-india-llp/%20%20%20"
            target="_blank"
            rel="noopener noreferrer"
            className="linkedin"
          >
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
          
          <a
            href="https://www.youtube.com/@herbsfox"
            target="_blank"
            rel="noopener noreferrer"
            className="youtube"
          >
            <FontAwesomeIcon icon={faYoutube} />
          </a>

          
        </div>
      </footer>
    </div>
  );
};

export default Footer;
