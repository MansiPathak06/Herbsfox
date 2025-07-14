// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Footer from "./Footer";
// import "./shop.css";

// const Shop = () => {
//   const totalImages = 43;
//   const navigate = useNavigate(); // <-- Hook for navigation
//   const imagesPerPage = 12;
//   const totalPages = Math.ceil(totalImages / imagesPerPage);

//   const images = [
//     {
//       id: 1,
//       src: "/images/ashok-chaal-2.webp",
//       caption: "Ashok Chaal",
//       caption2: "Rs.202.00-Rs.255.00",
//       link: "/products/Ashokchaal",
//     },
//     {
//       id: 2,
//       src: "/images/ashwagandha-2.webp",
//       caption: "Ashwagandha",
//       caption2: "Rs.264.00-Rs.767.00",
//       link: "/products/Ashwagandha",
//     },
//     {
//       id: 3,
//       src: "/images/badiyaan-2.webp",
//       caption: "Badiyaan",
//       caption2: "Rs.268.00-Rs.804.00",
//       link: "/products/badiyaan",
//     },
//     {
//       id: 4,
//       src: "/images/choti-peepal-2.webp",
//       caption: "choti peepal",
//       caption2: "Rs.283.00-Rs.927.00",
//       link: "/products/chotipeepal",
//     },
//     {
//       id: 5,
//       src: "/images/dalchini-2.webp",
//       caption: "dalchini",
//       caption2: "Rs.259.00-Rs.724.00",
//       link: "/products/dalchini",
//     },
//     {
//       id: 6,
//       src: "/images/36-1.webp",
//       caption: "Inderjau Meetha",
//       caption2: "Rs.215.00-Rs.355.00",
//       link: "/products/Inderjaumeetha",
//     },
//     {
//       id: 7,
//       src: "/images/jaiphal-2.webp",
//       caption: "jaiphal",
//       caption2: "Rs.332.00-Rs.1,349.00",
//       link: "/products/jaiphal",
//     },
//     {
//       id: 8,
//       src: "/images/jatamansi-2.webp",
//       caption: "Jatmasi",
//       caption2: "Rs.322.00-Rs.1,349.00",
//       link: "/products/Jatmasi",
//     },
//     {
//       id: 9,
//       src: "/images/javitri-2.webp",
//       caption: "javitri",
//       caption2: "Rs.470.00.00-Rs.2,502.00",
//       link: "/products/javitri",
//     },
//     {
//       id: 10,
//       src: "/images/kahu-jeera-2.webp",
//       caption: "Kahu Jeera",
//       caption2: "Rs.234.00.00-Rs.691.00",
//       link: "/products/Kahujeera",
//     },
//     {
//       id: 11,
//       src: "/images/kala-til-2.webp",
//       caption: "Kala Til",
//       caption2: "Rs.210.00-Rs.444.00",
//       link: "/products/kalatil",
//     },
//     {
//       id: 12,
//       src: "/images/kutki-2.webp",
//       caption: "kutki",
//       caption2: "Rs.392.00-Rs.1850.00",
//       link: "/products/Kutki",
//     },
//     {
//       id: 13,
//       src: "/images/poopy-seeds-2.webp",
//       caption: "Poppy Seeds",
//       caption2: "Rs.365.00-Rs.1,850.00",
//       link: "/products/Poppyseeds",
//     },
//     {
//       id: 14,
//       src: "/images/safed-musli-2.webp",
//       caption: "safed musli",
//       caption2: "Rs.594.00-Rs.3,355.00",
//       link: "/products/Safedmusli",
//     },
//     {
//       id: 15,
//       src: "/images/Shital chini.webp",
//       caption: "shital chini",
//       caption2: "Rs.362.00-Rs.1508.00",
//       link: "/products/Shitalchini",
//     },
//     {
//       id: 16,
//       src: "/images/2-1.webp",
//       caption: "Akarkara",
//       caption2: "Rs.1,062.00-Rs.6,490.00",
//       link: "/products/Akarkara2",
//     },
//     {
//       id: 17,
//       src: "/images/alsi-2.webp",
//       caption: "Flax Seed",
//       caption2: "Rs.198.00-Rs.349.00",
//       link: "/products/Flaxseed",
//     },
//     {
//       id: 18,
//       src: "/images/amla-dry-2.webp",
//       caption: "Awla-amla dry",
//       caption2: "Rs.213.00-Rs.338.00",
//       link: "/products/Awlamladry",
//     },
//     {
//       id: 19,
//       src: "/images/anantmool-4.webp",
//       caption: "Anantmool",
//       caption2: "Rs.232.00-Rs.485.00",
//       link: "/products/Anantmool",
//     },
//     {
//       id: 20,
//       src: "/images/babchi-2.webp",
//       caption: "babchi",
//       caption2: "Rs.215.00-Rs.355.00",
//       link: "/products/Babchi",
//     },
//     {
//       id: 21,
//       src: "/images/baibhadang-2.webp",
//       caption: "baibadang",
//       caption2: "Rs.265.00-Rs.751.00",
//       link: "/products/Baibadang",
//     },
//     {
//       id: 22,
//       src: "/images/chadila-2.webp",
//       caption: "chadila",
//       caption2: "Rs.219.00-Rs.385.00",
//       link: "/products/Chadila",
//     },
//     {
//       id: 23,
//       src: "/images/chia-seeds-2.webp",
//       caption: "Chia Seeds",
//       caption2: "Rs.210.00-Rs.444.00",
//       link: "/products/Chiaseeds",
//     },
//     {
//       id: 24,
//       src: "/images/daru-haldi-2.webp",
//       caption: "Daru Haldi",
//       caption2: "Rs.204.00-Rs.272.00",
//       link: "/products/Daruhaldi",
//     },
//     {
//       id: 25,
//       src: "/images/dhoop-lakdi-2.webp",
//       caption: "dhoop lakdi",
//       caption2: "Rs.228.00-Rs.614.00",
//       link: "/products/dhooplakdi",
//     },
//     {
//       id: 26,
//       src: "/images/inderjaw-kadwa-2.webp",
//       caption: "Inderjaw Kadwa",
//       caption2: "Rs.230.00-Rs.473.00",
//       link: "/products/Inderjawkadwa",
//     },
//     {
//       id: 27,
//       src: "/images/inderyan-phal-2.webp",
//       caption: "Inderyan Phal",
//       caption2: "Rs.206.00-Rs.284.00",
//       link: "/products/Inderyanphal",
//     },
//     {
//       id: 28,
//       src: "/images/15.webp",
//       caption: "isabgol bhusi",
//       caption2: "Rs.332.00-Rs.1,349.00",
//       link: "/products/Isabgolbhusi",
//     },
//     {
//       id: 29,
//       src: "/images/16.webp",
//       caption: "Kaali Jiri",
//       caption2: "Rs.271.00-Rs.828.00",
//       link: "/products/Kaalijiri",
//     },
//     {
//       id: 30,
//       src: "/images/kali-musli-2.webp",
//       caption: "Kali Musli",
//       caption2: "Rs.271.00-Rs.828.00",
//       link: "/products/Kalimusli",
//     },
//     {
//       id: 31,
//       src: "/images/kondru-sukha-2.webp",
//       caption: "Kondru Sukha",
//       caption2: "Rs.286.00-Rs.951.00",
//       link: "/products/Kondrusukha",
//     },
//     {
//       id: 32,
//       src: "/images/kulanjan-2.webp",
//       caption: "Kulanjan",
//       caption2: "Rs.215.00-Rs.354.00",
//       link: "/products/Kulanjan",
//     },
//     {
//       id: 33,
//       src: "/images/manjaith-2.webp",
//       caption: "majith",
//       caption2: "Rs.219.00-Rs.391.00",
//       link: "/products/Majith",
//     },
//     {
//       id: 34,
//       src: "/images/maju-hara-2.webp",
//       caption: "maju hara",
//       caption2: "Rs.264.00-Rs.767.00",
//       link: "/products/Majuhara",
//     },
//     {
//       id: 35,
//       src: "/images/nagkesar-2.webp",
//       caption: "Nagkesar",
//       caption2: "Rs.339.00-Rs.1,411.00",
//       link: "/products/Nagkesar",
//     },
//     {
//       id: 36,
//       src: "/images/niranjan-phal-2.webp",
//       caption: "niranjan phal",
//       caption2: "Rs.584.00-Rs.2,979.00",
//       link: "/products/Niranjanphal",
//     },
//     {
//       id: 37,
//       src: "/images/ratanjot-2.webp",
//       caption: "ratanjot",
//       caption2: "Rs.253.00-Rs.680.00",
//       link: "/products/Ratanjot",
//     },
//     {
//       id: 38,
//       src: "/images/rumi-mastagi.webp",
//       caption: "rumi mastagi",
//       caption2: "Rs.4,278.00-Rs.31,570.00",
//       link: "/products/Rumimastagi2",
//     },
//     {
//       id: 39,
//       src: "/images/sena-leaves-2.webp",
//       caption: "senna leave",
//       caption2: "Rs.225.00-Rs.444.00",
//       link: "/products/Sennaleave",
//     },
//     {
//       id: 40,
//       src: "/images/shilajeet-2.webp",
//       caption: "shilajeet",
//       caption2: "Rs.1,565.00-Rs.10,252.00",
//       link: "/products/Shilajeet",
//     },
//     {
//       id: 41,
//       src: "/images/sugar-badam-2.webp",
//       caption: "sugar badam",
//       caption2: "Rs.234.00-Rs.522.00",
//       link: "/products/Sugarbadam",
//     },
//     {
//       id: 42,
//       src: "/images/suranjan-kadvi-2.webp",
//       caption: "suranjan kadvi",
//       caption2: "Rs.429.00-Rs.2,164.00",
//       link: "/products/Suranjankadvi",
//     },
//     {
//       id: 43,
//       src: "/images/til-safed-2.webp",
//       caption: "Til Safed",
//       caption2: "Rs.213.00.00-Rs.468.00",
//       link: "/products/Tilsafed",
//     },
//   ];
//   const [page, setPage] = useState(1);

//   const start = (page - 1) * imagesPerPage;
//   const visibleImages = images.slice(start, start + imagesPerPage);

//   const handleRedirect = (link) => {
//     navigate(link);
//   };

//   return (
//     <div className="gallery">
//       <h1 className="shop-heading">Shop</h1>
//       <div className="image-row">
//         {visibleImages.map((img) => (
//           <div
//             key={img.id}
//             className="image-container"
//             onClick={() => handleRedirect(img.link)}
//           >
//             <img src={img.src} className="herbs" alt={`Image ${img.id}`} />
//             <div className="overlay">
//               <button
//                 className="select-button"
//                 onClick={(e) => {
//                   e.stopPropagation(); // prevent image click
//                   handleRedirect(img.link);
//                 }}
//               >
//                 Select Options
//               </button>
//             </div>

//             {img.caption && <p className="caption">{img.caption}</p>}
//             {img.caption && <p className="caption2">{img.caption2}</p>}
//           </div>
//         ))}
//       </div>

//       <div className="pagination">
//         {[...Array(totalPages)].map((_, i) => (
//           <button
//             key={i}
//             className={page === i + 1 ? "active" : ""}
//             onClick={() => setPage(i + 1)}
//           >
//             {i + 1}
//           </button>
//         ))}
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Shop;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";


import "./shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const imagesPerPage = 12;
  const navigate = useNavigate();

  useEffect(() => {
  axios.get(`${API_BASE_URL}/products`)



    .then(res => {
      // 🔍 Check if data is inside `products` or directly an array
       console.log("✅ PRODUCT DATA:", res.data); // 👈 ADD THIS
      const fetchedProducts = Array.isArray(res.data)
        ? res.data
        : res.data.products || [];
      setProducts(fetchedProducts);
    })
    .catch(err => console.error("Error fetching products:", err));
}, []);



  const totalPages = Math.ceil(products.length / imagesPerPage);
  const start = (page - 1) * imagesPerPage;
  const visibleImages = products.slice(start, start + imagesPerPage);

  return (
    <div className="gallery">
      <h1 className="shop-heading">Shop</h1>

      <div className="image-row">
        {Array.isArray(visibleImages) && visibleImages.length > 0 ? (
          visibleImages.map((product) => (
            <div
              key={product.id}
              className="image-container"
              onClick={() => handleRedirect(product.slug)}
            >
              <img
                src={product.main_image}
                className="herbs"
                alt={product.name}
              />
              <div className="overlay">
                <button className="select-button">Select Options</button>
              </div>
              <p className="caption">{product.name}</p>
              <p className="caption2">{product.price_range}</p>
            </div>
          ))
        ) : (
          <p style={{ padding: "2rem", textAlign: "center" }}>
            {products.length === 0 ? "Loading..." : "No products found."}
          </p>
        )}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
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

export default Shop;
