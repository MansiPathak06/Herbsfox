import React, { useState } from "react";

import "./Products.css";
import Footer from "../pages/Footer";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ProductData from "../data/ProductData";
import { useEffect } from "react";

const Sugarbadam = () => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    setRelatedProducts(getRelatedProducts());
  }, []);
  const getRelatedProducts = () => {
    const productsExceptCurrent = ProductData.filter(
      (product) => product.caption.toLowerCase() !== "niranjanphal"
    );

    // Fisher-Yates Shuffle
    for (let i = productsExceptCurrent.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [productsExceptCurrent[i], productsExceptCurrent[j]] = [
        productsExceptCurrent[j],
        productsExceptCurrent[i],
      ];
    }

    return productsExceptCurrent.slice(0, 4); // Pick 4 random products
  };

  const navigate = useNavigate();

  const handleRedirect = (link) => {
    navigate(link);
  };

  const { addToCart } = useCart();

  const [showDescription, setShowDescription] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState("");
  const [price, setPrice] = useState(null);

  const weightPriceMap = {
    "100gm": 234 ,
    "200gm": 304,
    "400gm": 369,
    "800gm": 522,
  };

  const handleToggle = () => {
    setShowDescription((prev) => !prev);
  };

  const handleWeightChange = (e) => {
    const value = e.target.value;
    setSelectedWeight(value);
    setPrice(weightPriceMap[value]);
  };

  const increase = () => setQuantity((prev) => prev + 1);
  const decrease = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  return (
    <div className="main-container">
      <h1 className="shop-heading">Shop</h1>
      <div className="containers">
        <div className="leftside-container">
          <img
            src="/images/sugar-badam-2.webp"
            className="image-h"
            alt="sugarbadam"
          />
          <div className="sub-images">
            <img
              src="/images/sugar-badam-3.webp"
              className="image-1"
              alt="sugarbadam"
            />
            <img
              src="/images/sugar-badam-4.webp"
              className="image-2"
              alt="sugarbadam"
            />
            <img
              src="/images/sugar-badam.webp"
              className="image-3"
              alt="sugarbadam"
            />
          </div>
        </div>

        <div className="rightside-container">
          <h2 className="product-heading">Sugar Badam</h2>
          <h2 className="cost">₹234.00 – ₹522.00</h2>
          <p className="mini-para">
            Herbsfox Sugar Badam Kadwa – Diabetes Almond – Sky Fruit – Bitter
            Almond
          </p>
          <ul>
            <li className="mini-para">Introduction to Sugar Badam kadwa:</li>
          </ul>
          <p className="paragraph">
            Sugar Badam Kadwa, also known as Diabetes Almond and Sky Fruit, is a
            versatile nut renowned for its health-promoting properties and
            significant nutrient profile
          </p>

          <div className="weight-container">
            <h2 className="weight" htmlFor="weight">
              Weight
            </h2>
            <select
              id="weight"
              name="weight"
              value={selectedWeight}
              onChange={handleWeightChange}
            >
              <option value="">Choose an option</option>
              <option value="100gm">100 gm</option>
              <option value="200gm">200 gm</option>
              <option value="400gm">400 gm</option>
              <option value="800gm">800 gm</option>
            </select>
          </div>

          {price && (
            <div className="price-display">
              <p className="price-tag">Price: </p>
              <p>₹{price * quantity}</p>
            </div>
          )}

          <div className="quantity-container">
            <div className="quantity-controls">
              <button className="btn1" onClick={decrease}>
                −
              </button>
              <input
                className="qty-no"
                type="number"
                value={quantity}
                readOnly
              />
              <button className="btn2" onClick={increase}>
                +
              </button>
            </div>
            <div className="ATCbtn">
              <button
                className="add"
                onClick={() => {
                  if (!selectedWeight) {
                    toast.error("Please select a weight.");
                    return;
                  }
                  addToCart({
                    id: "Sugarbadam",
                    name: "Sugarbadam",
                    price: price,
                    quantity,
                    weight: selectedWeight,
                    image: "/images/sugar-badam-2.webp",
                  });
                  toast.success("Added to cart!");
                  navigate("/cart"); // 👈 Redirect after add
                }}
              >
                ADD TO CART
              </button>
            </div>
          </div>
          <div className="bottom-content">
            <p>SKU: 25</p>
            <p>CATEGORY: HERBS</p>
            <p>[social_share-list]</p>
          </div>
          <br />
          <div className="description-wrapper">
            <button onClick={handleToggle}>DESCRIPTION</button>
            {showDescription && (
              <p className="description-text">
                <ul>
                  <li>
                    <h4>History of Sugar Badam:</h4>
                    With roots in traditional medicine and cultural practices,
                    Sugar Badam Kadwa has been valued for centuries for its
                    diverse health benefits and therapeutic applications.
                    <br />
                    Almonds, in general, have a long history dating back
                    thousands of years. They are believed to have originated in
                    the Middle East, specifically in the region now known as
                    Iran and Afghanistan. As early as 3000 BCE, almonds were
                    cultivated and treasured for their nutritional value and
                    rich flavor.
                    <br />
                    The association between almonds and diabetes can be traced
                    back to ancient Indian Ayurvedic texts. In these ancient
                    texts, almonds were mentioned as an effective remedy for
                    managing blood sugar levels. Due to their low glycemic index
                    and high levels of healthy fats, protein, and fiber, almonds
                    were believed to be beneficial for individuals with
                    diabetes.
                  </li>
                  <li>
                    <h4>Benefits of Sugar Badam:</h4>
                    Sugar Badam Kadwa is a powerhouse of nutrients such as
                    antioxidants, healthy fats, and vitamins, offering
                    advantages like enhanced cardiovascular health, immune
                    system support, cognitive function improvement, and
                    potential assistance in managing blood sugar levels and
                    weight.
                  </li>
                  <li>
                    <h4>Potential Side Effects of Sugar Badam:</h4>
                    While generally considered safe, overconsumption of Sugar
                    Badam Kadwa can lead to digestive discomfort or allergic
                    reactions in sensitive individuals. Moderation in intake is
                    advised.
                  </li>
                  <li>
                    <h4>Usage of Sugar Badam:</h4>
                    Sugar Badam Kadwa can be integrated into daily routines by
                    consuming it raw, adding it to salads, incorporating it into
                    recipes, or using it as a topping in various dishes to
                    harness its nutritional benefits effectively.
                    <br />
                    <strong>
                      P.S. – It is advisable to consult a Doctor first before
                      taking any dosage.
                    </strong>
                  </li>
                </ul>
              </p>
            )}
          </div>
        </div>
      </div>
      <section className="relatedproduct-title">
        <h4>RELATED PRODUCTS</h4>
      </section>

      <div className="gallery">
        <div className="image-row">
          {relatedProducts.map((product) => (
            <div
              key={product.id}
              className="image-container"
              onClick={() => handleRedirect(product.link)}
            >
              <img
                src={product.src}
                className="spices"
                alt={product.caption}
                loading="lazy"
              />
              <div className="overlay">
                <button
                  className="select-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRedirect(product.link);
                  }}
                >
                  Select Options
                </button>
              </div>
              {product.caption && <p className="caption">{product.caption}</p>}
              {product.caption2 && (
                <p className="caption2">{product.caption2}</p>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Sugarbadam;
