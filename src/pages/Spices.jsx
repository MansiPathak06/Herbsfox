import React, { useState, useMemo,useEffect } from "react";
import { useNavigate } from "react-router-dom"; // <-- Add this
import Footer from "./Footer";
import "./shop.css";

const Spices = () => {
  const navigate = useNavigate(); // <-- Hook for navigation
  const totalImages = 32;
  const imagesPerPage = 12;
  const totalPages = Math.ceil(totalImages / imagesPerPage);

  const images = [
    {
      id: 1,
      src: "/images/badiyaan-2.webp",
      caption: "Badiyaan",
      caption2: "Rs.268.00-Rs.804.00",
      link: "/products/badiyaan",
    },
    {
      id: 2,
      src: "/images/choti-peepal-2.webp",
      caption: "choti peepal",
      caption2: "Rs.283.00-Rs.927.00",
      link: "/products/chotipeepal",
    },
    {
      id: 3,
      src: "/images/dalchini-2.webp",
      caption: "dalchini",
      caption2: "Rs.259.00-Rs.724.00",
      link: "/products/dalchini",
    },
    {
      id: 4,
      src: "/images/jaiphal-2.webp",
      caption: "jaiphal",
      caption2: "Rs.332.00-Rs.1,349.00",
      link: "/products/jaiphal",
    },
    {
      id: 5,
      src: "/images/javitri-2.webp",
      caption: "javitri",
      caption2: "Rs.470.00.00-Rs.2,502.00",
      link: "/products/javitri",
    },
  ].map((item) => {
    const cleanCaption = item.caption2.replace(/\./g, "").replace(/,/g, "");
    const match = cleanCaption.match(/Rs(\d+)/);
    const priceMin = match ? parseFloat(match[1]) : 0;
    return { ...item, priceMin };
  });

  const [page, setPage] = useState(1);
  const [sortOption, setSortOption] = useState("default");

  const sortedImages = useMemo(() => {
    const arr = [...images];
    if (sortOption === "price-low-high") {
      arr.sort((a, b) => a.priceMin - b.priceMin);
    } else if (sortOption === "price-high-low") {
      arr.sort((a, b) => b.priceMin - a.priceMin);
    }
    return arr;
  }, [images, sortOption]);

  useEffect(() => {
    console.log("Sort option changed:", sortOption);
  }, [sortOption]);

  useEffect(() => {
    console.log("Sorted Images (first 3):", sortedImages.slice(0, 3));
  }, [sortedImages]);

  const start = (page - 1) * imagesPerPage;
  const visibleImages = sortedImages.slice(start, start + imagesPerPage); // ✅ sahi

  const handleRedirect = (link) => {
    navigate(link);
  };

  return (
    <div className="gallery">
      <h1 className="shop-heading">Spices</h1>

      <div className="sort-wrapper">
        <select
          value={sortOption}
          onChange={(e) => {
            setSortOption(e.target.value);
            setPage(1);
          }}
        >
          <option value="default">Default sorting</option>
          <option value="price-low-high">Price: low to high</option>
          <option value="price-high-low">Price: high to low</option>
        </select>
      </div>

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

      <div className="pagination">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={page === i + 1 ? "active" : ""}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Spices;
