// import React, { useState, useMemo, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; // <-- Add this
// import Footer from "./Footer";
// import "./shop.css";

// const Seeds = () => {
//   const totalImages = 32;
//   const navigate = useNavigate(); // <-- Hook for navigation
//   const imagesPerPage = 12;
//   const totalPages = Math.ceil(totalImages / imagesPerPage);

//   const images = [
//     {
//       id: 1,
//       src: "/images/kala-til-2.webp",
//       caption: "Kala Til",
//       caption2: "Rs.210.00-Rs.444.00",
//       link: "/products/kalatil",
//     },
//     {
//       id: 2,
//       src: "/images/poopy-seeds-2.webp",
//       caption: "Poppy Seeds",
//       caption2: "Rs.365.00-Rs.1,850.00",
//       link: "/products/Poppyseeds",
//     },
//     {
//       id: 3,
//       src: "/images/alsi-2.webp",
//       caption: "Flax Seed",
//       caption2: "Rs.198.00-Rs.349.00",
//       link: "/products/Flaxseed",
//     },
//     {
//       id: 4,
//       src: "/images/chia-seeds-2.webp",
//       caption: "Chia Seeds",
//       caption2: "Rs.210.00-Rs.444.00",
//       link: "/products/Chiaseeds",
//     },
//     {
//       id: 5,
//       src: "/images/til-safed-2.webp",
//       caption: "Til Safed",
//       caption2: "Rs.213.00-Rs.468.00",
//       link: "/products/Tilsafed",
//     },
//   ].map((item) => {
//     const cleanCaption = item.caption2.replace(/\./g, "").replace(/,/g, "");
//     const match = cleanCaption.match(/Rs(\d+)/);
//     const priceMin = match ? parseFloat(match[1]) : 0;
//     return { ...item, priceMin };
//   });

//   const [page, setPage] = useState(1);
//   const [sortOption, setSortOption] = useState("default");

//   const sortedImages = useMemo(() => {
//     const arr = [...images];
//     if (sortOption === "price-low-high") {
//       arr.sort((a, b) => a.priceMin - b.priceMin);
//     } else if (sortOption === "price-high-low") {
//       arr.sort((a, b) => b.priceMin - a.priceMin);
//     }
//     return arr;
//   }, [images, sortOption]);

//   useEffect(() => {
//     console.log("Sort option changed:", sortOption);
//   }, [sortOption]);

//   useEffect(() => {
//     console.log("Sorted Images (first 3):", sortedImages.slice(0, 3));
//   }, [sortedImages]);

//   const start = (page - 1) * imagesPerPage;
//   const visibleImages = sortedImages.slice(start, start + imagesPerPage); // ✅ sahi

//   const handleRedirect = (link) => {
//     navigate(link);
//   };

//   return (
//     <div className="gallery">
//       <h1 className="shop-heading">Seeds</h1>
//       <div className="sort-wrapper">
//         <select
//           value={sortOption}
//           onChange={(e) => {
//             setSortOption(e.target.value);
//             setPage(1);
//           }}
//         >
//           <option value="default">Default sorting</option>
//           <option value="price-low-high">Price: low to high</option>
//           <option value="price-high-low">Price: high to low</option>
//         </select>
//       </div>

//       <div className="image-row">
//         {visibleImages.map((img) => (
//           <div
//             key={img.id}
//             className="image-container"
//             onClick={() => handleRedirect(img.link)}
//           >
//             <img src={img.src} className="seeds" alt={`Image ${img.id}`} />
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

// export default Seeds;



import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from './Productcard';
import Footer from "./Footer";
import "./shop.css";

const Seeds = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`https://herbsfox-1.onrender.com/api/products?category=seeds`)
 // 🔁 Filter by category
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="gallery">
      <h1 className="shop-heading">Herbs</h1>
      <div className="image-row">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Seeds;
