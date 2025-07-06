import React from "react";
import Footer from "./Footer";
import './footer.css';

const Paymentpolicy = () => {
  return (
    <div>
      <div className="policy-container">
        <h2 className="policyheading">
          <strong>HERBSFOX PAYMENT POLICY</strong>
        </h2>
        <p>
          Thank you for shopping with us at Herbsfox.com. We want to make your
          shopping experience as convenient and secure as possible. Please read
          the following payment policy carefully:
        </p>
        <h4 className="subheading">ACCEPTED PAYMENT METHODS</h4>
        <ul>
          <li>Credit or Debit Card</li>
          <li>PayPal</li>
          <li>Bank Transfer</li>
          <li>Cash on Delivery</li>
        </ul>
        <h4 className="subheading">CREDIT OR DEBIT CARD: </h4>
        <p>
          We accept major credit and debit cards, including Visa, Mastercard,
          American Express, and Discover. All payments are securely processed
          and encrypted for your protection.
        </p>
        <h4 className="subheading">PAYPAL:</h4>
        <p>
          You can pay for your purchases using PayPal, a widely trusted and
          secure online payment system. During checkout, you will be redirected
          to the PayPal website to complete your payment.
        </p>
        <h4 className="subheading">BANK TRANSFER:</h4>
        <p>
          If you prefer to pay through bank transfer, select this option at
          checkout. You will receive an email with our bank account details and
          instructions to complete the transfer. Once we receive the funds, your
          order will be processed and shipped.
        </p>
        <h4 className="subheading">CASH ON DELIVERY:</h4>
        <p>
          Cash on Delivery (COD) is available for certain regions and products.
        </p>
        <ul>
          <li>50 Rs. charge for orders up to 2000 Rs.</li>
          <li>
            For orders above 2000 Rs., a 2.5% charge applies on the total
            payment.
          </li>
        </ul>
        <h4 className="subheading">PAYMENT SECURITY: </h4>
        <p>
          We take your security seriously and use industry-standard encryption
          technology to protect your personal and financial information. All
          online transactions are conducted through secure, encrypted
          connections.
        </p>
        <h4 className="subheading">ORDER CONFIRMATION</h4>
        <p>
          Once your payment is successfully processed, you will receive an order
          confirmation email with the purchase details. Please review this
          confirmation and contact us immediately if you notice any
          discrepancies.
        </p>
        <h4 className="subheading">REFUNDs AND RETURNS: </h4>
        <p>
          For information regarding refunds and returns, please refer to our
          Refund Policy.
        </p>
        <h4 className="subheading">CURRENCY: </h4>
        <p>
          All product prices and transactions are in the currency specified on
          our website. Currency conversion rates may apply based on your
          location and payment method.
        </p>
        <h4 className="subheading">ADDITIONAL TERMS</h4>
        <ul>
          <li>
            We reserve the right to change our payment methods, payment gateway
            providers, and payment policy at any time without prior notice.
          </li>
          <li>
            By making a purchase on our website, you agree to comply with our
            payment policy.
          </li>
        </ul>
        <p>
          If you have any questions or concerns regarding our payment policy,
          please contact our customer support team.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Paymentpolicy;
