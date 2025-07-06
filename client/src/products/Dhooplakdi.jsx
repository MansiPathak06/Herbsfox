import React, { useState } from "react";

import "./Products.css";
import Footer from "../pages/Footer";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ProductData from "../data/ProductData";
import { useEffect } from "react";

const Dhooplakdi = () => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    setRelatedProducts(getRelatedProducts());
  }, []);
  const getRelatedProducts = () => {
    const productsExceptCurrent = ProductData.filter(
      (product) => product.caption.toLowerCase() !== "chadila"
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
    "100gm": 228,
    "200gm": 328,
    "400gm": 415,
    "800gm": 614,
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
            src="/images/dhoop-lakdi-2.webp"
            className="image-h"
            alt="dhoop-lakdi"
          />
          <div className="sub-images">
            <img
              src="/images/dhoop-lakdi-3.webp"
              className="image-1"
              alt="dhoop-lakdi"
              onClick={() => openFullscreen("/images/dhoop-lakdi-3.webp")}
            />
            <img
              src="/images/dhoop-lakdi-4.webp"
              className="image-2"
              alt="dhoop-lakdi"
              onClick={() => openFullscreen("/images/dhoop-lakdi-4.webp")}

            />
            <img
              src="/images/dhoop-lakdi.webp"
              className="image-3"
              alt="dhoop-lakdi"
              onClick={() => openFullscreen("/images/dhoop-lakdi.webp")}
            />
          </div>
        </div>

        <div className="rightside-container">
          <h2 className="product-heading">Dh0op Lakdi</h2>
          <h2 className="cost">₹228.00 – ₹614.00</h2>
          <p className="mini-para">
            Herbsfox Dhoop Lakdi – Dhup Wood – Havan Wood – Canarium Strictum –
            Hawan Lakdi
          </p>
          <ul>
            <li className="mini-para">Introduction to Dhoop Lakdi:</li>
          </ul>
          <p className="paragraph">
            Dhoop Lakdi, also known as Dhoop Wood, is a type of incense wood
            that has been used for thousands of years in various cultures for
            its aromatic and therapeutic properties. Derived from the resinous
            heartwood of certain tree species, Dhoop Lakdi has gained popularity
            due to its unique fragrance and its association with spiritual and
            meditative practices.
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
                    id: "Dhooplakdi",
                    name: "Dhooplakdi",
                    price: price,
                    quantity,
                    weight: selectedWeight,
                    image: "/images/dhoop-lakdi-2.webp",
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
            <p>SKU: 10</p>
            <p>CATEGORY: Pooja Items</p>
            <p>[social_share-list]</p>
          </div>
          <br />
          <div className="description-wrapper">
            <button onClick={handleToggle}>DESCRIPTION</button>
            {showDescription && (
              <p className="description-text">
                <ul>
                  <li>
                    <h4>Benefits of Dhoop Lakdi:</h4>
                    1. Aromatic properties: Dhoop Lakdi emits a pleasant and
                    soothing fragrance when burnt. This aroma helps in creating
                    a calming and peaceful environment, making it ideal for
                    meditation, yoga, and other spiritual practices.
                    <br />
                    2. Purification: Burning Dhoop Lakdi is believed to have
                    purifying properties that cleanse the air and eliminate
                    negative energy. It is often used in religious ceremonies
                    and rituals to create a sacred and holy atmosphere.
                    <br />
                    3.Stress relief: The aroma of Dhoop Lakdi has a calming
                    effect on the mind and body, helping to reduce stress,
                    anxiety, and tension. Inhaling the fragrance is often
                    associated with relaxation and improved mental well-being.
                    <br />
                    4.Insect repellent: Dhoop Lakdi possesses natural
                    insect-repellent properties, making it an effective
                    alternative to chemical-based mosquito coils or sprays.
                    Burning Dhoop Lakdi can help keep mosquitoes and other
                    insects at bay.
                    <br />
                    5.Medicinal properties: Certain species of Dhoop Lakdi, such
                    as Agarwood, are believed to have therapeutic properties and
                    are used in traditional medicine for various ailments like
                    asthma, digestive disorders, and skin conditions.
                  </li>
                  <li>
                    <h4>History of Dhoop Lakdi:</h4>
                    The use of incense and aromatic woods, including Dhoop
                    Lakdi, dates back thousands of years to ancient
                    civilizations such as Egypt, China, and India. These
                    cultures recognized the spiritual, medicinal, and aromatic
                    properties of certain woods and utilized them in various
                    religious, cultural, and medicinal practices.
                  </li>
                  <li>
                    <h4>Usage of Dhoop Lakdi:</h4>
                    Dhoop Lakdi is primarily used by burning it as incense. It
                    can be found in various forms such as chips, cones, sticks,
                    or powder. To use, one needs to light the Dhoop Lakdi and
                    allow it to smolder, releasing the aromatic smoke. It can be
                    placed in a designated incense holder, or directly lit and
                    fanned depending on the form.
                  </li>
                  <li>
                    <h4>Side Effects of Dhoop Lakdi:</h4>
                    While Dhoop Lakdi is generally safe to use, some individuals
                    may be sensitive to the smoke or fragrance. Prolonged
                    exposure to the smoke may cause respiratory irritation in
                    sensitive individuals. It is advisable to burn Dhoop Lakdi
                    in a well-ventilated area and take necessary precautions if
                    any discomfort arises.
                  </li>
                  <li>
                    <h4>Conclusion:</h4>
                    Dhoop Lakdi, or Dhoop Wood, has been valued for centuries
                    for its aromatic, spiritual, and medicinal properties. From
                    creating a peaceful ambiance to purifying the air, Dhoop
                    Lakdi offers numerous benefits to those who use it.
                    Incorporating this natural incense wood into your daily
                    rituals can enhance relaxation, promote well-being, and
                    connect you with the ancient traditions of various cultures.
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

export default Dhooplakdi;
