import React, { useState } from "react";

import "./Products.css";
import Footer from "../pages/Footer";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ProductData from "../data/ProductData";
import { useEffect } from "react";

const Nagkesar = () => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    setRelatedProducts(getRelatedProducts());
  }, []);
  const getRelatedProducts = () => {
    const productsExceptCurrent = ProductData.filter(
      (product) => product.caption.toLowerCase() !== "majuhara"
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
    "100gm": 339,
    "200gm": 547,
    "400gm": 830,
    "800gm": 1411,
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
            src="/images/nagkesar-2.webp"
            className="image-h"
            alt="nagkesar"
          />
          <div className="sub-images">
            <img
              src="/images/nagkesar-3.webp"
              className="image-1"
              alt="nagkesar"
              onClick={() => openFullscreen("/images/nagkesar-3.webp")}
            />
            <img
              src="/images/nagkesar-4.webp"
              className="image-2"
              alt="nagkesar"
              onClick={() => openFullscreen("/images/nagkesar-4.webp")}
            />
            <img
              src="/images/nagkesar.webp"
              className="image-3"
              alt="nagkesar"
              onClick={() => openFullscreen("/images/nagkesar.webp")}
            />
          </div>
        </div>

        <div className="rightside-container">
          <h2 className="product-heading">Nag kesar</h2>
          <h2 className="cost">339.00 – ₹1,411.00</h2>
          <p className="mini-para">
            Herbsfox Nagkesar – Mesua Ferrea – Cobra Saffron – Nag Kesar –
            Nagkeshar – Nag Keshar – Ochrocarpus Longifolius
          </p>
          <ul>
            <li className="mini-para">Introduction to Nagkesar:</li>
          </ul>
          <p className="paragraph">
            Mesua ferrea Linn, also known as Nagkesar in Hindi, and Ceylon
            ironwood in English is a tree with high ornamental value.
            <br />
            Mesua ferrea or nagkesar is a medium to a large-sized evergreen tree
            with a short trunk widely distributed in Kerala, Assam, Tamil NÄdu,
            Western, and the Eastern Ghats in India. The flowers and leaves of
            Nagkesar are used for a variety of conditions.
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
                    id: "Nagkesar",
                    name: "Nagkesar",
                    price: price,
                    quantity,
                    weight: selectedWeight,
                    image: "/images/nagkesar-2.webp",
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
            <p>SKU: 19</p>
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
                    <h4>Nagkesar health Benefits:</h4>
                    <ol>
                      <li>
                        Indigestion
                        <br />
                        Nagkesar helps to manage indigestion. According to
                        Ayurveda, indigestion means the state of an incomplete
                        process of digestion. The main reason for indigestion is
                        aggravated Kapha that causes Agnimandya (weak digestive
                        fire). Taking Nagkesar helps to improve Agni (digestive
                        fire) and digests the food easily. This is due to its
                        Deepan (appetizer) and Pachan (digestive) properties
                        respectively.
                      </li>
                      <li>
                        Fever
                        <br />
                        Nagkesar might help reduce fever and its symptoms.
                        According to Ayurveda, there are different types of
                        fever, depending on the dosha involved. Usually, a fever
                        indicates an excess accumulation of Ama due to low
                        digestive fire. Taking Nagkesar boiled water helps to
                        reduce Ama due to its Deepan (appetizer) and Pachan
                        (digestive) properties.
                      </li>
                      <li>
                        Bleeding piles
                        <br />
                        Piles are known as Arsh in Ayurveda, which is caused by
                        an unhealthy diet and a sedentary lifestyle. This leads
                        to the impairment of all the three doshas, mainly Vata.
                        An aggravated Vata causes a low digestive fire, leading
                        to constipation. This causes swelling in the veins in
                        the rectum area leading to piles mass. Sometimes
                        bleeding can also occur in this condition. Nagkesar
                        promotes digestive fire because of its Ushna (hot)
                        potency. This corrects constipation and controls
                        bleeding. This is due to its Kashaya (astringent)
                        nature.
                      </li>
                      <li>
                        Asthma
                        <br />
                        Nagkesar helps to control the symptoms of asthma and
                        gives relief in case of breathlessness. According to
                        Ayurveda, the main doshas involved in asthma are Vata
                        and Kapha. The vitiated ‘Vata’ combines with deranged
                        ‘Kapha dosha’ in the lungs, causing obstruction in the
                        respiratory passage. This results in difficulty in
                        breathing. Nagkesar helps in balancing Kapha and remove
                        excess mucus from the lungs. This gives relief from the
                        symptoms of asthma.
                        <br />
                      </li>
                    </ol>
                    Tips:
                    <li>Take 1/4-1/2 teaspoon of Nagkesar powder.</li>
                    <li>Mix it with honey or lukewarm water.</li>
                    <li>
                      Swallow it once or twice a day after taking light food to
                      manage the symptoms of asthma.
                    </li>
                    <strong>
                      P.S. – All the details mentioned above is the result of
                      extensive research, however one should consult a doctor
                      first before taking any dosage.
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

export default Nagkesar;
