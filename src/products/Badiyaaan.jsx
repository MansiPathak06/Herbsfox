import React, { useState } from "react";
import "./Products.css";
import Footer from "../pages/Footer";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ProductData from "../data/ProductData";
import { useEffect } from "react";

const Badiyaaan = () => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    setRelatedProducts(getRelatedProducts());
  }, []);
  const getRelatedProducts = () => {
    const productsExceptCurrent = ProductData.filter(
      (product) => product.caption.toLowerCase() !== "babchi"
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
    "100gm": 268,
    "200gm": 377,
    "400gm": 530,
    "800gm": 804,
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
            src="/images/badiyaan-2.webp"
            className="image-h"
            alt="Badiyaan"
          />
          <div className="sub-images">
            <img
              src="/images/badiyaan-1.webp"
              className="image-1"
              alt="badiyaan"
              onClick={() => openFullscreen("/images/badiyaan-1.webp")}
            />
            <img
              src="/images/Blue-Simple-Hair-Conditioner-Product-Preview-Instagram-Post-2.webp"
              className="image-2"
              alt="badiyaan"
              onClick={() => openFullscreen("/images/Blue-Simple-Hair-Conditioner-Product-Preview-Instagram-Post-2.webp")}

            />
            <img
              src="/images/badiyaan-3.webp"
              className="image-3"
              alt="badiyaan"
              onClick={() => openFullscreen("/images/badiyaan-3.webp")}

              

            />
          </div>
        </div>

        <div className="rightside-container">
          <h2 className="product-heading">Badiyaan</h2>
          <h2 className="cost">₹268.00 – ₹804.00</h2>
          <p className="mini-para">
            Herbsfox Star Anise (Chakri Phool) – Badiyan – Badian Khatai –
            Illicium Verum
          </p>
          <ul>
            <li className="mini-para">Introduction to Badiyan:</li>
          </ul>
          <p className="paragraph">
            Baadiyan, also known as star anise, is a well-known aromatic herb
            native to Southeast Asia. Renowned for its unique flavor and potent
            medicinal properties, baadiyan has been used for centuries as a
            culinary spice and as a key ingredient in traditional medicine
            across various cultures. This article delves into the history,
            health benefits, usage, potential side effects, and conclusion on
            the versatile baadiyan.
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
                    id: "Badiyaan",
                    name: "Badiyaan",
                    price: price,
                    quantity,
                    weight: selectedWeight,
                    image: "/images/badiyaan-2.webp",
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
            <p>SKU: 31</p>
            <p>CATEGORY: SPICES</p>
            <p>[social_share-list]</p>
          </div>
          <br />
          <div className="description-wrapper">
            <button onClick={handleToggle}>DESCRIPTION</button>
            {showDescription && (
              <p className="description-text">
                <ul>
                  <li>
                    <h4>History Of Baadiyan:</h4>
                    The history of baadiyan dates back thousands of years.
                    Originating in China and Vietnam, this herb has been an
                    essential part of Chinese herbal medicine for its numerous
                    therapeutic benefits. Ancient Chinese texts mention the use
                    of baadiyan in treating various ailments, ranging from
                    digestion issues to respiratory problems. It later spread to
                    other regions like India, Southeast Asia, and the Middle
                    East, where it acquired diverse cultural significance.
                  </li>
                  <li>
                    <h4>Health Benefits of Baadiyan:</h4>
                    1. Digestive Health: Baadiyan contains compounds such as
                    anethole, which aids digestion, reduces bloating, and
                    alleviates gastrointestinal disorders like indigestion and
                    flatulence.
                    <br />
                    2. Respiratory Relief: The essential oil extracted from
                    baadiyan possesses expectorant properties, making it
                    effective in treating symptoms of cough, bronchitis, and
                    asthma by promoting mucus removal and soothing the airways.
                    <br />
                    3.Immunity Boost: Baadiyan is rich in antioxidants,
                    essential vitamins, and minerals that enhance the immune
                    system, providing defense against infections, flu, and other
                    diseases.
                    <br />
                    4.Antimicrobial Properties: The bioactive compounds in
                    baadiyan exhibit strong antimicrobial properties, making it
                    an effective natural remedy for fighting bacteria and fungi,
                    aiding in the prevention and treatment of various
                    infections.
                    <br />
                    5.Menstrual Pain Relief: Baadiyan has been traditionally
                    used to ease menstrual cramps and regulate menstrual cycles
                    due to its antispasmodic properties, helping women find
                    relief from pain and discomfort.
                    <br />
                    6.Skin Health: The antibacterial and antifungal properties
                    of baadiyan make it a valuable ingredient in skincare
                    products. It helps combat acne, reduce inflammation, and
                    promote a healthy complexion.
                    <br />
                  </li>
                  <li>
                    <h4>Usage of Baadiyan:</h4>
                    1. Culinary Uses: Baadiyan is widely used as a spice to
                    flavor various dishes, especially in Asian cuisine. It adds
                    a unique, licorice-like flavor to soups, stews, curries, and
                    desserts. Additionally, it is one of the key ingredients in
                    Chinese five-spice powder.
                    <br />
                    2. Medicinal Applications: Baadiyan is a popular ingredient
                    in herbal teas, tinctures, and decoctions, consumed to reap
                    the therapeutic benefits it offers. It is also utilized in
                    aromatherapy, as its essential oil has a warming and
                    soothing effect.
                    <br />
                    3.Home Remedies: Ground baadiyan is often used in home
                    remedies for indigestion, cough, or as an expectorant. It
                    can be steeped in hot water to make a tea or infused into
                    oils and applied externally for various topical
                    applications.
                    <br />
                  </li>
                  <li>
                    <h4>Potential Side Effects of Baadiyan:</h4>
                    Although baadiyan is generally safe when consumed in
                    moderate amounts, some individuals may experience allergic
                    reactions or specific side effects. These can include
                    dermatitis, nausea, vomiting, or respiratory distress. It is
                    advisable to seek medical advice before consuming baadiyan
                    if you have any pre-existing medical conditions or are
                    pregnant or breastfeeding.
                  </li>
                  <li>
                    <h4>Conclusion:</h4>
                    Baadiyan, the aromatic herb known for its star-shaped pods,
                    holds a rich history and a myriad of health benefits. With
                    its strong digestive, respiratory, and immune-boosting
                    properties, baadiyan has rightfully earned its place in
                    traditional medicine. While it is an essential culinary
                    spice, it is important to use baadiyan in moderation and be
                    aware of any potential allergies or side effects. Embracing
                    this remarkable herb can lead to a healthier lifestyle,
                    improved well-being, and a zestful culinary experience.
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

export default Badiyaaan;
