import React, { useState } from "react";

import "./Products.css";
import Footer from "../pages/Footer";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ProductData from "../data/ProductData";
import { useEffect } from "react";

const Inderyanphal = () => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    setRelatedProducts(getRelatedProducts());
  }, []);
  const getRelatedProducts = () => {
    const productsExceptCurrent = ProductData.filter(
      (product) => product.caption.toLowerCase() !== "inderyanphal"
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
  const [fullscreenImage, setFullscreenImage] = useState(null);
        
          const openFullscreen = (src) => {
            setFullscreenImage(src);
          };
        
          const closeFullscreen = () => {
            setFullscreenImage(null);
          };

  const weightPriceMap = {
    "100gm": 206,
    "200gm": 245,
    "400gm": 256,
    "800gm": 284,
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
            src="/images/inderyan-phal-2.webp"
            className="image-h"
            alt="Inderyanphal"
          />
          <div className="sub-images">
            <img
              src="/images/inderyan-phal-3.webp"
              className="image-1"
              alt="Inderyanphal"
              onClick={() => openFullscreen("/images/inderyan-phal-3.webp")}
            />
            <img
              src="/images/Blue-Simple-Hair-Conditioner-Product-Preview-Instagram-Post-2.webp"
              className="image-2"
              alt="Inderyanpha"
              onClick={() => openFullscreen("/images/inderyan-phal-3.webp")}
            />
            <img
              src="/images/inderyan-phal.webp"
              className="image-3"
              alt="Inderyanphal"
              onClick={() => openFullscreen("/images/inderyan-phal.webp")}
            />
          </div>
        </div>
        <div className="rightside-container">
          <h2 className="product-heading">Inderyan phal</h2>
          <h2 className="cost">₹206.00 – ₹284.00</h2>
          <p className="mini-para">
            Herbsfox Indrayan Phal – Indrain Fal – Tumba – Indrayun – Bitter
            Apple – Citrullus colocynthis
          </p>
          <ul>
            <li className="mini-para">Introduction to Inderyan Phal:</li>
          </ul>
          <p className="paragraph">
            Indrayan Phal, also known as Citrullus Colocynthis is a great herbal
            plant with many useful properties. All parts of the plant have some
            role in varieties of disorders and ailments. In ayurveda, Indrayan
            Phal is being used since ancient times to countless diseases. It is
            particularly useful in constipation, blood sugar level, cholesterol,
            skin disorders and pathological disorders. Further, it can be used
            in combination products good for liver and gallbladder ailments.
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
                              id: "Inderyanphal",
                              name: "Inderyanphal",
                              price: price,
                              quantity,
                              weight: selectedWeight,
                              image: "/images/inderyan-phal-2.webp",
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
            <p>SKU: 12</p>
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
                    <h4>Benifits of Inderyanphal</h4>
                    1. Indrayan phal is hot in nature and potent purgative.
                    <br />
                    2. It is useful to treat common cold, cough, asthma
                    bronchitis etc.
                    <br />
                    3. Indrayan Phal may be effective for gastrointestinal
                    disorder like Indigestion, constipation, dysentery, colic
                    pain etc. as well as may kill intestinal worms.
                    <br />
                    4. It may treat menstruation disorders like menopause,
                    difficult menses, leukorrhea, scanty menses, amenorrhea etc.
                    <br />
                    5. It may be effective on UTI (Urinary Tract Infections).
                    <br />
                    6. Indrayan Phal is effective on baldness – may stimulate
                    hair growth if applied on scalp.
                    <br />
                    7. It may treat jaundice and piles.
                    <br />
                    8. It acts as a blood purifier and hence good for skin
                    diseases like acne, boils etc.
                    <br />
                    9. Lowers blood sugar level.
                    <br />
                    <strong>
                      P.S. – Before taking any dosage, one should consult a
                      doctor first.
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

export default Inderyanphal;
