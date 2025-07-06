import React, { useState } from "react";

import "./Products.css";
import Footer from "../pages/Footer";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ProductData from "../data/ProductData";
import { useEffect } from "react";

const Majith = () => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    setRelatedProducts(getRelatedProducts());
  }, []);
  const getRelatedProducts = () => {
    const productsExceptCurrent = ProductData.filter(
      (product) => product.caption.toLowerCase() !== "kaalijiri"
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
    "100gm": 219,
    "200gm": 273,
    "400gm": 311,
    "800gm": 391,
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
            src="/images/manjaith-2.webp"
            className="image-h"
            alt=""
            
          />
          <div className="sub-images">
            <img src="/images/19-1.webp" className="image-1" alt="" onClick={() => openFullscreen("/images/19-1.webp")}
             />
            <img
              src="/images/Orange-Black-Modern-Photocentric-Skincare-Product-Instagram-Post-1.webp"
              className="image-2"
              alt=""
               onClick={() => openFullscreen("/images/Orange-Black-Modern-Photocentric-Skincare-Product-Instagram-Post-1.webp")}
            />
            <img src="/images/19.webp" className="image-3" alt=""  onClick={() => openFullscreen("/images/19.webp")}/>
          </div>
        </div>

        <div className="rightside-container">
          <h2 className="product-heading">Majith</h2>
          <h2 className="cost">₹219.00 – ₹391.00</h2>
          <p className="mini-para">
            Herbsfox Majith Root – Majith Asli – Manjistha Root – Manjith –
            Majeeth – Madder – Rubia cordifolia – Indian Madder
          </p>
          <ul>
            <li className="mini-para">Introduction to Majith:</li>
          </ul>
          <p className="paragraph">
            Indian Madder, also known as Majith or Manjistha, has a long history
            of use in Ayurvedic medicine and traditional healing practices in
            India. The plant’s origin can be traced back to the Indian
            subcontinent, where it has been cultivated and utilized for its
            medicinal properties for centuries. Indian Madder holds a
            significant place in Ayurveda, the ancient Indian system of medicine
            that dates back over 5,000 years.
            <br />
            In Ayurvedic texts, Indian Madder is often described as a “varnya”
            herb, meaning it is believed to enhance the complexion and overall
            health of the skin. It has been traditionally used for purifying the
            blood, promoting detoxification, and supporting various aspects of
            health, particularly skin-related conditions.
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
                    id: "Majith",
                    name: "Majith",
                    price: price,
                    quantity,
                    weight: selectedWeight,
                    image: "/images/manjaith-2.webp",
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
            <p>SKU: 18</p>
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
                    <h4>Benefits of Majith:</h4>
                    <ol>
                      <li>Anti-inflammatory Properties:</li>
                      <p>
                        Indian Madder contains compounds that exhibit anti-in
                        flammatory properties, which can be beneficial for
                        conditions like arthritis and inflammatory skin
                        conditions.
                      </p>
                      <li>Antioxidant Activity:</li>
                      <p>
                        The plant is rich in antioxidants that help in
                        neutralizing harmful free radicals in the body,
                        potentially reducing oxidative stress.
                      </p>
                      <li>Skin Health:</li>
                      <p>
                        Majith is often used in Ayurvedic skincare formulations
                        due to its believed ability to purify the blood and
                        improve skin health.
                      </p>
                      <li>Detoxification:</li>
                      <p>
                        It is considered to be a blood purifier and is used in
                        traditional medicine systems for detoxifying the body.
                      </p>
                      <li>Diuretic Effects:</li>
                      <p>
                        Indian Madder is believed to have diuretic properties,
                        aiding in the detoxification process by promoting urine
                        flow.
                      </p>
                    </ol>
                  </li>
                  <li>
                    <h4>Side Effects of Majith:</h4>
                    <ol>
                      <li>Allergic Reactions:</li>
                      <p>
                        Some individuals may be allergic to Indian Madder,
                        leading to symptoms like skin rashes or itching upon
                        contact or ingestion.
                      </p>
                      <li>Digestive Issues:</li>
                      <p>
                        In some cases, the consumption of Majith can cause
                        digestive discomfort such as nausea, vomiting, or
                        diarrhea.
                      </p>
                      <li>Pregnancy and Breastfeeding:</li>
                      <p>
                        Pregnant and breastfeeding women are advised to consult
                        a healthcare provider before using Indian Madder as its
                        safety during these conditions is not well established.
                      </p>
                      <li>Drug Interactions:</li>
                      <p>
                        Indian Madder may interact with certain medications, so
                        individuals on medication should seek medical advice
                        before using it regularly.
                      </p>
                    </ol>
                    <strong>
                      P.S. – It is advisable to consult a doctor first before
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

export default Majith;
