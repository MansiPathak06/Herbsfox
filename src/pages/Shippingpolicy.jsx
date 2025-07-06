import React from "react";
import Footer from "./Footer";
import './footer.css';

const Shippingpolicy = () => {
  return (
    <div>
      <div className="policy-container">
        <h2 className="policyheading">
          <strong>SHIPPING POLICY</strong>
        </h2>
        <p>
          This Shipping Policy applies to all purchases made on the Herbsfox
          website (www.herbsfox.com). By placing an order, you agree to the
          terms outlined below.
        </p>
        <h4 className="subheading">SHIPPING CHARGES</h4>
        <p>
          We offer competitive shipping rates based on order weight and
          destination:
        </p>
        <ul>
          <li>Free shipping is available for orders up to 10 kgs.</li>
          <li>
            Orders exceeding 10 kgs may incur additional charges based on the
            shipping location.
          </li>
          <li>Expedited shipping options are available at checkout.</li>
        </ul>
        <h4 className="subheading">SHIPPING TIMEFRAME</h4>
        <p>
          Orders are typically processed within 1-2 business days. Estimated
          delivery times:
        </p>
        <ul>
          <li>Standard delivery: 5-7 business days (depending on location).</li>
          <li>Expedited delivery: 2-4 business days.</li>
        </ul>
        <h4 className="subheading">ORDER PROCESSING AND TRACKING</h4>
        <p>
          Once your order is shipped, you will receive an email with tracking
          details. You can track your order on our website.
        </p>
        <h4 className="subheading">INTERNATIONAL SHIPPING</h4>
        <p>
          We currently do not offer international shipping. Stay tuned for
          updates.
        </p>
        <h4 className="subheading">DELAYED OR LOST SHIPMENTS</h4>
        <p>
          In rare cases, shipping delays may occur due to unforeseen
          circumstances. If your order is delayed beyond the expected timeframe,
          contact our support team at support@herbsfox.com.
        </p>
        <h4 className="subheading">DAMAGED OR MISSING ITEMS</h4>
        <p>
          If your package arrives damaged or has missing items, please notify us
          within 48 hours of delivery.
        </p>
        <h4 className="subheading">RETURNS AND REFUNDS</h4>
        <p>
          For information regarding returns and refunds, please refer to our
          Return and Refund Policy.
        </p>
        <h4 className="subheading">CONTACT US</h4>
        <p>
          If you have any shipping-related questions, reach out to us at
          support@herbsfox.com.
        </p>
        
      </div>
      <Footer />
    </div>
  );
};

export default Shippingpolicy;
