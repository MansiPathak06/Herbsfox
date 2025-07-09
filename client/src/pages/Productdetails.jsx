import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Products.css";
import Footer from "./Footer";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

const Productdetails = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedWeight, setSelectedWeight] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/products/${slug}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error("❌ Error loading product:", err));
  }, [slug]);

  if (!product) return <div>Loading...</div>;

  const handleWeightChange = (e) => {
    const value = e.target.value;
    setSelectedWeight(value);
  };

  const handleAddToCart = () => {
    if (!selectedWeight) {
      toast.error("Please select a weight.");
      return;
    }

    const price = product.weight_price_map[selectedWeight];
    addToCart({
      id: product.id,
      name: product.name,
      price: price,
      quantity,
      weight: selectedWeight,
      image: product.main_image,
    });
    toast.success("Added to cart!");
    navigate("/cart");
  };

  const openFullscreen = (src) => setFullscreenImage(src);
  const closeFullscreen = () => setFullscreenImage(null);

  return (
    <div className="main-container">
      <h1 className="shop-heading">Shop</h1>
      <div className="containers">
        <div className="leftside-container">
          <img src={product.main_image} className="image-h" alt={product.name} />
          <div className="sub-images">
            {Array.isArray(product.sub_images)&&
            product.sub_images.map((img, index) => (
              <img
                key={index}
                src={img}
                className={`image-${index + 1}`}
                alt={`${product.name}-${index}`}
                onClick={() => openFullscreen(img)}
              />
            ))}
          </div>
        </div>

        <div className="rightside-container">
          <h2 className="product-heading">{product.name}</h2>
          <h2 className="cost">{product.price_range}</h2>
          <p className="mini-para">{product.technical_name}</p>
          <p className="paragraph">{product.about}</p>

          <div className="weight-container">
            <h2 className="weight">Weight</h2>
            <select value={selectedWeight} onChange={handleWeightChange}>
              <option value="">Choose an option</option>
              {Object.keys(product.weight_price_map).map((weight) => (
                <option key={weight} value={weight}>
                  {weight}
                </option>
              ))}
            </select>
          </div>

          {selectedWeight && (
            <div className="price-display">
              <p className="price-tag">Price:</p>
              <p>₹{product.weight_price_map[selectedWeight] * quantity}</p>
            </div>
          )}

          <div className="quantity-container">
            <div className="quantity-controls">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>−</button>
              <input className="qty-no" type="number" value={quantity} readOnly />
              <button onClick={() => setQuantity((q) => q + 1)}>+</button>
            </div>
            <div className="ATCbtn">
              <button className="add" onClick={handleAddToCart}>
                ADD TO CART
              </button>
            </div>
          </div>

          <div className="bottom-content">
            <p>SKU: {product.sku}</p>
            <p>CATEGORY: {product.category}</p>
          </div>

          <br />
          <div className="description-wrapper">
            <button>DESCRIPTION</button>
            <div className="description-text">
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      </div>

      {fullscreenImage && (
        <div className="fullscreen-overlay" onClick={closeFullscreen}>
          <img src={fullscreenImage} alt="Fullscreen view" className="fullscreen-image" />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Productdetails;
