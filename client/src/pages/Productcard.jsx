import React from "react";
import { useNavigate } from "react-router-dom";
import "./shop.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      className="image-container"
      onClick={() => navigate(`/products/${product.slug}`)}  // ✅ FIXED
    >
      <img src={product.main_image} className="herbs" alt={product.name} />
      <div className="overlay">
        <button
          className="select-button"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/products/${product.slug}`); // ✅ FIXED
          }}
        >
          Select Options
        </button>
      </div>
      <p className="caption">{product.name}</p>
      <p className="caption2">{product.price_range}</p>
    </div>
  );
};

export default ProductCard;
