import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import "./shop.css";

const Herbs = () => {
  const totalImages = 32;
  const navigate = useNavigate(); // <-- Hook for navigation
  const [fetchedImages, setFetchedImages] = useState([]);
  useEffect(() => {
  const fetchHerbs = async () => {
    try {
      const res = await fetch("https://herbsfox-1.onrender.com/products?category=herbs");
      const data = await res.json();

      const transformed = data.products.map((p) => {
        const priceMin = parseInt(p.price_range.replace(/[^\d]/g, ""), 10);
        return {
          id: p.id,
          src: p.main_image,
          caption: p.name,
          caption2: p.price_range,
          link: `/products/${p.name.replace(/\s+/g, "")}`,
          priceMin: priceMin || 0,
        };
      });

      setFetchedImages(transformed);
    } catch (err) {
      console.error("Failed to fetch herbs:", err);
    }
  };

  fetchHerbs();
}, []);

  const images = [
    {
      id: 1,
      src: "/images/ashok-chaal-2.webp",
      caption: "Ashok Chaal",
      caption2: "Rs.202.00-Rs.255.00",
      link: "/products/Ashokchaal",
    },
    {
      id: 2,
      src: "/images/ashwagandha-2.webp",
      caption: "Ashwagandha",
      caption2: "Rs.264.00-Rs.767.00",
      link: "/products/Ashwagandha",
    },
    {
      id: 3,
      src: "/images/36-1.webp",
      caption: "Inderjau Meetha",
      caption2: "Rs.215.00-Rs.355.00",
      link: "/products/Inderjaumeetha",
    },
    {
      id: 4,
      src: "/images/jatamansi-2.webp",
      caption: "Jatmasi",
      caption2: "Rs.322.00-Rs.1,349.00",
      link: "/products/Jatmasi",
    },
    {
      id: 5,
      src: "/images/kahu-jeera-2.webp",
      caption: "Kahu Jeera",
      caption2: "Rs.234.00-Rs.691.00",
      link: "/products/Kahujeera",
    },
    {
      id: 6,
      src: "/images/kutki-2.webp",
      caption: "kutki",
      caption2: "Rs.392.00-Rs.1850.00",
      link: "/products/Kutki",
    },
    {
      id: 7,
      src: "/images/safed-musli-2.webp",
      caption: "safed musli",
      caption2: "Rs.594.00-Rs.3,355.00",
      link: "/products/Safedmusli",
    },
    {
      id: 8,
      src: "/images/Shital chini.webp",
      caption: "shital chini",
      caption2: "Rs.362.00-Rs.1508.00",
      link: "/products/Shitalchini",
    },
    {
      id: 9,
      src: "/images/2-1.webp",
      caption: "Akarkara",
      caption2: "Rs.1,062.00-Rs.6,490.00",
      link: "/products/Akarkara2",
    },
    {
      id: 10,
      src: "/images/amla-dry-2.webp",
      caption: "Awla-amla dry",
      caption2: "Rs.213.00-Rs.338.00",
      link: "/products/Awlamladry",
    },
    {
      id: 11,
      src: "/images/anantmool-4.webp",
      caption: "Anantmool",
      caption2: "Rs.232.00-Rs.485.00",
      link: "/products/Anantmool",
    },
    {
      id: 12,
      src: "/images/babchi-2.webp",
      caption: "babchi",
      caption2: "Rs.215.00-Rs.355.00",
      link: "/products/Babchi",
    },
    {
      id: 13,
      src: "/images/baibhadang-2.webp",
      caption: "baibadang",
      caption2: "Rs.265.00-Rs.751.00",
      link: "/products/Baibadang",
    },
    {
      id: 14,
      src: "/images/chadila-2.webp",
      caption: "chadila",
      caption2: "Rs.219.00-Rs.385.00",
      link: "/products/Chadila",
    },
    {
      id: 15,
      src: "/images/daru-haldi-2.webp",
      caption: "Daru Haldi",
      caption2: "Rs.204.00-Rs.272.00",
      link: "/products/Daruhaldi",
    },
    {
      id: 16,
      src: "/images/inderjaw-kadwa-2.webp",
      caption: "Inderjaw Kadwa",
      caption2: "Rs.230.00-Rs.473.00",
      link: "/products/Inderjawkadwa",
    },
    {
      id: 17,
      src: "/images/inderyan-phal-2.webp",
      caption: "Inderyan Phal",
      caption2: "Rs.206.00-Rs.284.00",
      link: "/products/Inderyanphal",
    },
    {
      id: 18,
      src: "/images/15.webp",
      caption: "isabgol bhusi",
      caption2: "Rs.332.00-Rs.1,349.00",
      link: "/products/Isabgolbhusi",
    },
    {
      id: 19,
      src: "/images/16.webp",
      caption: "Kaali Jiri",
      caption2: "Rs.271.00-Rs.828.00",
      link: "/products/Kaalijiri",
    },
    {
      id: 20,
      src: "/images/kali-musli-2.webp",
      caption: "Kali Musli",
      caption2: "Rs.271.00-Rs.828.00",
      link: "/products/Kalimusli",
    },
    {
      id: 21,
      src: "/images/kondru-sukha-2.webp",
      caption: "Kondru Sukha",
      caption2: "Rs.286.00-Rs.951.00",
      link: "/products/Kondrusukha",
    },
    {
      id: 22,
      src: "/images/kulanjan-2.webp",
      caption: "Kulanjan",
      caption2: "Rs.215.00-Rs.354.00",
      link: "/products/Kulanjan",
    },
    {
      id: 23,
      src: "/images/manjaith-2.webp",
      caption: "majith",
      caption2: "Rs.219.00-Rs.391.00",
      link: "/products/Majith",
    },
    {
      id: 24,
      src: "/images/maju-hara-2.webp",
      caption: "maju hara",
      caption2: "Rs.264.00-Rs.767.00",
      link: "/products/Majuhara",
    },
    {
      id: 25,
      src: "/images/nagkesar-2.webp",
      caption: "Nagkesar",
      caption2: "Rs.339.00-Rs.1411.00",
      link: "/products/Nagkesar",
    },
    {
      id: 26,
      src: "/images/niranjan-phal-2.webp",
      caption: "niranjan phal",
      caption2: "Rs.584.00-Rs.2979.00",
      link: "/products/Niranjanphal",
    },
    {
      id: 27,
      src: "/images/ratanjot-2.webp",
      caption: "ratanjot",
      caption2: "Rs.253.00-Rs.680.00",
      link: "/products/Ratanjot",
    },
    {
      id: 28,
      src: "/images/rumi-mastagi.webp",
      caption: "rumi mastagi",
      caption2: "Rs.4,278.00-Rs.31,570.00",
      link: "/products/Rumimastagi2",
    },
    {
      id: 29,
      src: "/images/sena-leaves-2.webp",
      caption: "senna leave",
      caption2: "Rs.225.00-Rs.444.00",
      link: "/products/Sennaleave",
    },
    {
      id: 30,
      src: "/images/shilajeet-2.webp",
      caption: "shilajeet",
      caption2: "Rs.1,565.00-Rs.10,252.00",
      link: "/products/Shilajeet",
    },
    {
      id: 31,
      src: "/images/sugar-badam-2.webp",
      caption: "sugar badam",
      caption2: "Rs.234.00-Rs.522.00",
      link: "/products/Sugarbadam",
    },
    {
      id: 32,
      src: "/images/suranjan-kadvi-2.webp",
      caption: "suranjan kadvi",
      caption2: "Rs.429.00-Rs.2,164.00",
      link: "/products/Suranjankadvi",
    },
  ].map((item) => {
  const cleanCaption = item.caption2.replace(/\./g, "").replace(/,/g, "");
  const match = cleanCaption.match(/Rs(\d+)/);
  const priceMin = match ? parseFloat(match[1]) : 0;
  return { ...item, priceMin };
});

const combinedImages = [...images, ...fetchedImages];

  const [page, setPage] = useState(1);
  const [sortOption, setSortOption] = useState("default");

  const sortedImages = useMemo(() => {
    const arr = [...combinedImages];
    if (sortOption === "price-low-high") {
      arr.sort((a, b) => a.priceMin - b.priceMin);
    } else if (sortOption === "price-high-low") {
      arr.sort((a, b) => b.priceMin - a.priceMin);
    }
    return arr;
  }, [combinedImages, sortOption]);

  useEffect(() => {
    console.log("Sort option changed:", sortOption);
  }, [sortOption]);

  useEffect(() => {
    console.log("Sorted Images (first 3):", sortedImages.slice(0, 3));
  }, [sortedImages]);

  const imagesPerPage = 12;
  const totalPages = Math.ceil(sortedImages.length / imagesPerPage);
  const start = (page - 1) * imagesPerPage;
  const visibleImages = sortedImages.slice(start, start + imagesPerPage); // ✅ sahi

  const handleRedirect = (link) => {
    navigate(link);
  };

  return (
    <div className="gallery">
      <h1 className="shop-heading">Herbs</h1>
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
            <img src={img.src} className="herbs" alt={`Image ${img.id}`} />
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

export default Herbs;
