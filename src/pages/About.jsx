import React from "react";
import './about.css';
import Footer from "./Footer";

const About = () => {
  return (
    <main className="about-container">
      <h1 className="about-heading">About</h1>

      <section className="about-section">
        <p className="intro">
          <strong className="strong-text">
            From Seed to Sip – Cultivating Your Wellness with the Power of
            Nature
          </strong>
          <br />
          Welcome to Herbsfox India where the earth’s bounty meets modern
          wellbeing. We’re not just an online shop; we’re a passionate community
          dedicated to unlocking the incredible power of nature, one leaf, root,
          and bloom at a time.
        </p>

        <article>
          <h2 className="Our-story">Our Story:</h2>
          <p>
            It all began with a simple belief: that nature holds the key to a
            healthier, happier life. We started small, tending to our own herb
            gardens and discovering the magic of using these natural treasures
            to soothe, nourish, and invigorate. Soon, our passion blossomed, and
            we knew we had to share this gift with the world.
          </p>
        </article>

        <article>
          <h2 className="what-we-do">What We Do:</h2>
          <p>
            We source the finest organic herbs, spices, seeds, and other
            products from sustainable farms and growers who share our commitment
            to quality and respect for the environment. We meticulously
            hand-craft our products, ensuring every batch is bursting with
            potency. We offer a curated selection of culinary herbs and more to
            empower you to embrace the full potential of plant-based wellness.
          </p>
        </article>

        <article>
          <h2 className="our-values">Our Values:</h2>

          <h3>Quality</h3>
          <p>
            We only accept the best. Our products are meticulously sourced,
            sustainably grown, and processed with care to preserve their natural
            potency.
          </p>

          <h3>Community</h3>
          <p>
            We believe in sharing knowledge and fostering a connection with
            nature. We offer resources, education, and recipes to help you
            integrate herbs and spices into your daily life.
          </p>

          <h3>Sustainability</h3>
          <p>
            We do our part to protect the planet by partnering with
            eco-conscious farms, using compostable packaging, and minimizing our
            environmental footprint.
          </p>

          <h3>Wellness</h3>
          <p>
            We are passionate about helping you thrive. Our products are
            designed to support your physical, mental, and emotional wellbeing —
            naturally.
          </p>
        </article>

        <article>
          <h2 className="founders-vision">Founders’ Vision:</h2>
          <p>
            Our founders in India noticed a surge in demand for herbal products
            — but also a rise in adulteration. Their idea: go raw and provide
            authentic, high-quality herbs. With years of industry experience,
            they’ve curated a trusted selection of raw herbs and spices.
          </p>
          <p>
            Their vision is rooted in Ayurveda: the human body consists of five
            elements — agni (fire), vayu (wind), dharti (earth), jal (water),
            and aakash (space). What we consume should reflect this natural
            harmony.
          </p>
        </article>
      </section>

      <Footer />
    </main>
  );
};

export default About;
