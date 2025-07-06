import React from 'react';
import Footer from './Footer';
import './footer.css';

const Cancellationpolicy = () => {
  return (
    <div className='policy-container'>
      <h2 className='policyheading'><strong>HERBSFOX CANCELLATION POLICY</strong></h2>
      <p>At Herbsfox.com, we understand that sometimes things may not go as planned, and you may need to cancel your order. We strive to make the cancellation process as smooth and convenient as possible for our valued customers. Please read our cancellation policy carefully before making a purchase.</p>
      <h4 className='subheading'>1. Cancellation Eligibility:</h4>
      <ul>
        <li>Orders can only be cancelled before they have been shipped or processed.</li>
        <li>Customized or personalized items are not eligible for cancellation once the production process has begun.</li>
        <li>Digital goods or services that have been accessed or downloaded are not eligible for cancellation.</li>
        <li>Subscription-based products or services may have specific cancellation terms outlined in their respective terms and conditions.</li>
      </ul>
      <h4 className='subheading'>2. Cancellation Process:</h4>
      <ul>
        <li>To cancel an order, please contact our customer support team via email or phone within 24 hours of placing your order. Provide the necessary details such as your order number, email address, and reason for cancellation.</li>
        <li>Our customer support team will review your request and guide you through the cancellation process. Please note that cancellations are subject to approval and may vary depending on the nature and status of your order.</li>
      </ul>
      <h4 className='subheading'>3. Refunds for Cancelled Orders:</h4>
      <ul>
        <li>If your cancellation request is approved before the order has been processed or shipped, we will initiate a refund via the original payment method within 2-3 business days.</li>
        <li>In case of partial cancellation, the refund will be processed only for the cancelled items.</li>
        <li>If your order has already been processed or shipped, please refer to our Return and Refund Policy.</li>
      </ul>
      <h4 className='subheading'>4. Modifications to the Cancellation Policy:</h4>
      <ul>
        <li>We reserve the right to modify or update our cancellation policy at any time without prior notice. Changes will be effective immediately upon posting.</li>
      </ul>
      <p>By placing an order on Herbsfox.com, you acknowledge and agree to comply with our cancellation policy. If you have any further questions, please contact our customer support team.</p>
    <Footer/>

    </div>
  );
}

export default Cancellationpolicy;
