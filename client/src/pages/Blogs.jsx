import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import './blogs.css';


const Blogs = () => {
  const navigate = useNavigate();

  const handleReadMore1 = () => {
    navigate("/Rawherbs");
  };
  const handleReadMore2 = () => {
    navigate("/Rumimastagi");
  };
  const handleReadMore3 = () => {
    navigate("/Scienceofflavour");
  };
  const handleReadMore4 = () => {
    navigate("/Doshas");
  };
  const handleReadMore5 = () => {
    navigate("/Akarkara");
  };
  const handleReadMore6 = () => {
    navigate("/Seedtospice");
  };
  return (
    <div className="container">
      <h1 className="blogs-heading">Blogs</h1>
      <div className="blogs-container">
        {/* Card 1 */}
        <section className="blog-card">
          <h2 className="date">19 Mar <span className="green">Raw Herbs</span></h2>
          <p className="content">Posted at 09:00h in HerbsFox by Herbsfox</p>
          <p>
            📖 Introduction to Raw Herbs Raw herbs, commonly known as jadibooti
            in Hindi, have been used in traditional medicine for centuries…
          </p>
          <button className="read-more" onClick={handleReadMore1}>
            Read More
          </button>
        </section>

        {/* Card 2 */}
        <section className="blog-card">
          <h2 className="date">12 Mar <span className="green" >Rumi Mastagi</span></h2>
          <p className="content">Posted at 09:00h in HerbsFox by Herbsfox</p>
          <p>
            Originating from ancient Persia and commonly known as Rumi Mastagi,
            Pistachio Lenticus is a unique resin with a remarkable history...
          </p>
          <button className="read-more" onClick={handleReadMore2}>
            Read More
          </button>
        </section>

        {/* Card 3 */}
        <section className="blog-card">
          <h2 className="date">05 Mar <span className="green" >The Science of Flavour</span></h2>
          <p className="content">Posted at 09:00h in HerbsFox by Herbsfox</p>
          <p>
            In the world of gastronomy, flavors play a vital role in creating
            culinary masterpieces that tantalize our taste buds. While many
            factors contribute to the taste of a dish, raw herbs, spices, and
            seeds...
          </p>
          <button className="read-more" onClick={handleReadMore3}>
            Read More
          </button>
        </section>

        {/* Card 4 */}
        <section className="blog-card">
          <h2 className="date">25 Feb <span className="green" >Doshas & Raw Herbs</span></h2>
          <p className="content">Posted at 10:00h in HerbsFox by Herbsfox</p>
          <p>
            Welcome to our exploration of the timeless wisdom of Charak Samhita,
            where ancient Ayurvedic principles meet the healing potential of raw
            herbs. In this blog, we’ll delve into the fascinating world of
            doshas...
          </p>
          <button className="read-more" onClick={handleReadMore4}>
            Read More
          </button>
        </section>
        {/* Card 5 */}
        <section className="blog-card">
          <h2 className="date">18 Feb <span className="green" >Akarkara</span></h2>
          <p className="content">Posted at 10:00h in HerbsFox by Herbsfox</p>
          <p>
            In the world of natural healing, ancient remedies often hold
            profound wisdom. Akarkara, also known as Anacyclus Pyrethrum, is one
            such herb that has been revered for centuries in traditional
            medicine systems...
          </p>
          <button className="read-more" onClick={handleReadMore5}>
            Read More
          </button>
        </section>
        {/* Card 6*/}
        <section className="blog-card">
          <h2 className="date">11 Feb <span className="green" >From Seed to Spice</span></h2>
          <p className="content">Posted at 10:00h in HerbsFox by Herbsfox</p>
          <p>
            Have you ever stopped to wonder how those vibrant spices in your
            pantry, with their aromatic flavors and exotic hues, made their way
            into your kitchen? The journey from raw ingredients to the...
          </p>
          <button className="read-more" onClick={handleReadMore6}>
            Read More
          </button>
        </section>
        <br />
      </div>
      <Footer/>
      
    </div>
  );
};

export default Blogs;
