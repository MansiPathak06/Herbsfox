import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Products.css";
import Footer from "./Footer";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

const Productdetails = () => {
  const [showDescription, setShowDescription] = useState(false);

  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedWeight, setSelectedWeight] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const { addToCart } = useCart();

  const navigate = useNavigate();

  useEffect(() => {
    const url = `${import.meta.env.VITE_API_BASE_URL}/products/${slug}`;
    console.log("👉 Fetching from:", url);

    axios
      .get(url)
      .then((res) => {
        console.log("Fetched product ➤", res.data);

        const productData = res.data;

        if (typeof productData.weight_price_map === "string") {
          try {
            productData.weight_price_map = JSON.parse(
              productData.weight_price_map
            );
          } catch (e) {
            console.warn("Invalid weight_price_map JSON:", e);
            productData.weight_price_map = {};
          }
        }

        setProduct(productData);
      })
      .catch((err) => console.error("❌ Error loading product:", err));
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

  const subImages = [
    product.sub_image1,
    product.sub_image2,
    product.sub_image3,
  ].filter(Boolean);

  return (
    <div className="main-container">
      <h1 className="shop-heading">Shop</h1>
      <div className="containers">
        <div className="leftside-container">
          <img
            src={`https://herbsfox.onrender.com/images/${product.main_image}`}
            className="image-h"
            alt={product.name}
          />

          <div className="sub-images">
            {[product.sub_image1, product.sub_image2, product.sub_image3]
              .filter(Boolean) // remove undefined/null/empty
              .map((img, index) => (
                <img
                  key={index}
                  src={`https://herbsfox.onrender.com/images/${img}`}
                  className={`image-${index + 1}`}
                  alt={`${product.name}-${index}`}
                  onClick={() =>
                    openFullscreen(
                      `https://herbsfox.onrender.com/images/${img}`
                    )
                  }
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
              {product.weight_price_map &&
              typeof product.weight_price_map === "object" &&
              Object.keys(product.weight_price_map).length > 0 ? (
                Object.keys(product.weight_price_map).map((weight) => (
                  <option key={weight} value={weight}>
                    {weight}
                  </option>
                ))
              ) : (
                <option disabled>Not available</option>
              )}
            </select>
          </div>

          {selectedWeight && product.weight_price_map[selectedWeight] && (
            <div className="price-display">
              <p className="price-tag">Price:</p>
              <p>₹{product.weight_price_map[selectedWeight] * quantity}</p>
            </div>
          )}

          <div className="quantity-container">
            <div className="quantity-controls">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                −
              </button>
              <input
                className="qty-no"
                type="number"
                value={quantity}
                readOnly
              />
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
            <button onClick={() => setShowDescription((prev) => !prev)}>
              DESCRIPTION
            </button>
            {showDescription && (
              <div
                className="description-text"
                dangerouslySetInnerHTML={{ __html: product.description }}
              ></div>
            )}
          </div>
        </div>
      </div>

      {fullscreenImage && (
        <div className="fullscreen-overlay" onClick={closeFullscreen}>
          <img
            src={fullscreenImage}
            alt="Fullscreen view"
            className="fullscreen-image"
          />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Productdetails;
