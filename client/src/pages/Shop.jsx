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
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/products`)

      .then((res) => {
        // 🔍 Check if data is inside `products` or directly an array
        console.log("✅ PRODUCT DATA:", res.data); // 👈 ADD THIS
        const fetchedProducts = Array.isArray(res.data)
          ? res.data
          : res.data.products || [];
        setProducts(fetchedProducts);
      })
      .catch((err) => console.error("Error fetching products:", err));
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
