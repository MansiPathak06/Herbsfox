import React from "react";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

const Home = () => {
  // const totalImages = 32;
  const imagesPerPage = 12;
  // const totalPages = Math.ceil(totalImages / imagesPerPage);

  const productimages = [
    {
      id: 1,
      src: "/images/ashok-chaal-2.webp",
      caption: "Ashok-chaal",
      caption2: "Rs.202.00-Rs.255.00",
      link: "/products/ashok-chaal",
    },
    {
      id: 2,
      src: "/images/choti peepal.webp",
      caption: "Choti-peepal",
      caption2: "Rs.283.00-Rs.927.00",
      link: "/products/chotipeepal",
    },
    {
      id: 3,
      src: "/images/ashwgandha.webp",
      caption: "Ashwagandha",
      caption2: "Rs.264.00-Rs.767.00",
      link: "/products/Ashwagandha",
    },
    {
      id: 4,
      src: "/images/badiyaan.webp",
      caption: "Badiyaan",
      caption2: "Rs.268.00-Rs.804.00",
      link: "/products/badiyaan",
    },
  ];

  const [page] = useState(1);
  const start = (page - 1) * imagesPerPage;
  const visibleImages = productimages.slice(start, start + imagesPerPage);

  const handleRedirect = (link) => {
    navigate(link);
  };

  const images = ["/images/2-desk.jpg", "/images/hfs1.jpg"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);

    return () => clearInterval(timer); // cleanup on unmount
  }, []);

  const navigate = useNavigate();

  const redirectherbs = () => {
    navigate("/Herbs");
  };
  const redirectspices = () => {
    navigate("/Spices");
  };
  const redirectseeds = () => {
    navigate("/Seeds");
  };
  const redirectpoojaitems = () => {
    navigate("/Poojaitems");
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <img
          className="hero-image"
          src={images[index]}
          alt="Main Banner"
          onClick={redirectherbs}
        />
      </header>

      <section className="image-grid">
        <div>
          <img
            src="/images/1-home-raw-herbs.webp"
            className="home"
            alt="Raw Herbs"
            onClick={redirectherbs}
          />
        </div>
        <div>
          <img
            src="/images/2-home-raw-raw-spice.webp"
            alt="Raw Spices"
            onClick={redirectspices}
          />
        </div>
        <div>
          <img src="/images/3-home-seeds.webp" alt="Seeds" onClick={redirectseeds} />
        </div>
        <div>
          <img
            src="/images/4-home-pooja-items.webp"
            alt="Pooja Items"
            onClick={redirectpoojaitems}
          />
        </div>
      </section>

      <section className="product-title">
        <h2>PRODUCTS</h2>
      </section>

      <div className="gallery">
        <div className="image-row">
          {visibleImages.map((img) => (
            <div
              key={img.id}
              className="image-container"
              onClick={() => handleRedirect(img.link)}
            >
              <img src={img.src} className="spices" alt={`Image ${img.id}`} />
              <div className="overlay">
                <button
                  className="select-button"
                  onClick={(e) => {
                    e.stopPropagation(); // prevent image click
                    handleRedirect(img.link);
                  }}
                >
                  Select Options
                </button>
              </div>
              {img.caption && <p className="caption">{img.caption}</p>}
              {img.caption && <p className="caption2">{img.caption2}</p>}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
