import React from "react";
import Footer from "./Footer";
import './footer.css';

const Privacypolicy = () => {
  return (
    <div>
      <div className="policy-container">
        
        <h2 className="policyheading">
          <strong> HERBSFOX PRIVACY POLICY</strong>
        </h2>
        <p>
          At Herbsfox, we are committed to protecting your privacy and ensuring
          the security of your personal information. This Privacy Policy
          outlines how we collect, use, and safeguard your personal data when
          you use our website or engage in any transactions with us. By
          accessing or using our services, you consent to the practices
          described in this policy.
        </p>

        <h4 className="subheading"> Information We Collect:</h4>
        <ul>
          <li>
            Personal Information: When you create an account or place an order,
            we may collect your name, email address, shipping and billing
            addresses, phone number, and other necessary details.
          </li>
          <li>
            Payment Information: To facilitate secure transactions, we may
            collect payment details such as credit card information, PayPal
            account details, or other payment method information.
          </li>
          <li>
            Website Usage Information: We collect information about your visit,
            such as IP address, browser type, browsing behavior, and
            device-related information to enhance user experience.
          </li>
        </ul>
        <h4 className="subheading">Cookies: </h4>
        <p>
          We use cookies to personalize your browsing experience and understand
          how you use our website. You can modify your browser settings to
          disable cookies, though some features may not function properly.
        </p>

        <h4 className="subheading">How We Use Your Information:</h4>
        <ul>
          <li>
            To Process Orders: We use your information to process orders,
            deliver products, and provide customer support.
          </li>
          <li>
            Marketing and Communication: With your consent, we may send
            promotional emails, which you can unsubscribe from at any time.
          </li>
          <li>
            Service Improvement: We analyze customer behavior to improve our
            products and services.
          </li>
          <li>
            Legal Obligation: We may disclose your information to comply with
            laws and government requests.
          </li>
        </ul>
        <h4 className="subheading">Information Sharing:</h4>
        <p>
          We do not sell, trade, or rent your personal information to third
          parties. However, we may share it with trusted service providers who
          assist us in business operations under strict confidentiality
          agreements.
        </p>

        <h4 className="subheading">Data Security:</h4>
        <p>
          We implement security measures to protect your personal information
          from unauthorized access, misuse, or loss. However, no online
          transaction can be guaranteed 100% secure.
        </p>

        <h4 className="subheading">Third-Party Links:</h4>
        <p>
          Our website may contain links to external sites. We are not
          responsible for their privacy practices and encourage you to review
          their policies.
        </p>

        <h4 className="subheading">Updates to this Privacy Policy:</h4>
        <p>
          We reserve the right to modify this policy at any time. Significant
          changes will be notified via our website or other communication
          channels.
        </p>

        <h4 className="subheading">Contact Us:</h4>
        <p>
          If you have any questions about this policy or how we handle your
          data, please contact us.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Privacypolicy;
