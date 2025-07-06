import React, { useState } from "react";
import Footer from "./Footer";
import "./contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          subject: "",
          phone: "",
          message: "",
        });
      } else {
        alert("Failed to send message: " + data.message);
      }
    } catch (error) {
      alert("An error occurred while sending message.");
      console.error("Contact form error:", error);
    }
  };

  return (
    <main>
      <h1 className="contact-heading">Contact Us</h1>
      <main className="contact-container">
        <div className="contact-wrapper">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="contact-form">
            <label className="label">
              Name:
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                placeholder="Enter your name"
                onChange={handleChange}
                required
              />
            </label>

            <label className="label">
              Email:
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                placeholder="Enter your email"
                onChange={handleChange}
                required
              />
            </label>

            <label className="label">
              Subject:
              <input
                id="subject"
                type="text"
                name="subject"
                value={formData.subject}
                placeholder="Enter subject"
                onChange={handleChange}
                required
              />
            </label>

            <label className="label">
              Phone:
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                maxLength="10"
                pattern="[0-9]{10}"
                placeholder="Enter your phone number"
                onChange={handleChange}
                required
              />
            </label>

            <label className="label">
              Message (optional):
              <textarea
                id="message"
                name="message"
                value={formData.message}
                placeholder="Enter your message"
                onChange={handleChange}
                rows="6"
              />
            </label>

            <button className="sendmsg-button" type="submit">
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="contact-info">
            <h2 className="getintouch"> Get In Touch</h2>
            <p>
              <strong>Address:</strong> 77 F/F, Fatehpuri, Gandhi Gali, Shiv
              Mandir, Chandni Chowk Area, New Delhi, Central Delhi, Delhi –
              110006
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              <a href="tel:+918447690451">+91 8447690451</a>
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:info@herbsfox.com">info@herbsfox.com</a>
            </p>
            <div className="contact-map" style={{ marginTop: "2rem" }}>
              <iframe
                title="Herbsfox Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.084363304002!2d77.22445087529412!3d28.6287277756657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b61a8db5%3A0x6b548bd42da5cc6f!2s77%20F%2FF%2C%20Gandhi%20Gali%2C%20Fatehpuri%2C%20Chandni%20Chowk%2C%20Delhi%2C%20110006!5e0!3m2!1sen!2sin!4v1713423852671!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </main>
  );
};

export default Contact;
