import React, { useState } from "react";
import "./Products.css";
import Footer from "../pages/Footer";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ProductData from "../data/ProductData";
import { useEffect } from "react";

const Akarkara2 = () => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    setRelatedProducts(getRelatedProducts());
  }, []);
  const getRelatedProducts = () => {
    const productsExceptCurrent = ProductData.filter(
      (product) => product.caption.toLowerCase() !== "ashok chaal"
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
    "100gm": 1062,
    "200gm": 1930,
    "400gm": 3489,
    "800gm": 6490,
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
          <img src="/images/2-1.webp" className="image-h" alt="Akarkara2" />
          <div className="sub-images">
            <img
              src="/images/2-2.webp"
              className="image-1"
              alt="Akarkara2"
              onClick={() => openFullscreen("/images/2-2.webp")}
            />
            <img
              src="/images/Blue-Simple-Hair-Conditioner-Product-Preview-Instagram-Post-2.webp"
              className="image-2"
              alt="Akarkara2"
              onClick={() =>
                openFullscreen(
                  "/images/Blue-Simple-Hair-Conditioner-Product-Preview-Instagram-Post-2.webp"
                )
              }
            />
            <img
              src="/images/2.webp"
              className="image-3"
              alt="Akarkara2"
              onClick={() => openFullscreen("/images/2.webp")}
            />
          </div>
        </div>

        <div className="rightside-container">
          <h2 className="product-heading">Akarkara</h2>
          <h2 className="cost">₹1,062.00 – ₹6,490.00</h2>
          <p className="mini-para">
            Herbsfox Akarkara (Roots) – Anacyclus Pyrethrum – Pellitory Roots –
            Pellety Roots
          </p>
          <ul>
            <li className="mini-para">Introduction to Akarkara</li>
          </ul>
          <p className="paragraph">
            Akarkara, also known as Anacyclus Pyrethrum, is a perennial herb
            native to South Asia, particularly found in the higher altitudes of
            the Himalayan region. This plant is famous for its medicinal
            properties and has been used in traditional medicine for centuries.
            The root of Akarkara is the most utilized part due to its various
            health benefits.
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
                    id: "Akarkara2",
                    name: "Akarkara2",
                    price: price,
                    quantity,
                    weight: selectedWeight,
                    image: "/images/2-1.webp",
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
            <p>SKU: 001</p>
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
                    <h4>History of Akarkara:</h4>
                    The historical usage of Akarkara dates back thousands of
                    years. It has been mentioned in ancient Indian texts like
                    Charaka Samhita and Sushruta Samhita, where it is referred
                    to as an effective herbal remedy for various ailments.
                    Akarkara has been traditionally used to treat toothache, gum
                    problems, erectile dysfunction, and as a general stimulant.
                    Its historical significance and effectiveness have made it
                    an essential component of Ayurvedic and Unani systems of
                    medicine.
                  </li>
                  <li>
                    <h4>Health Benefits of Akarkara:</h4>
                    <ol>
                      <li>
                        Dental Health: Akarkara is widely used in oral care due
                        to its antibacterial and anti-inflammatory properties.
                        It helps in relieving toothache, treating gum
                        infections, and fighting bad breath.
                      </li>
                      <li>
                        Aphrodisiac: Akarkara is known for its aphrodisiac
                        properties. It stimulates the production of
                        testosterone, which can improve libido, enhance sexual
                        performance, and treat erectile dysfunction.
                      </li>
                      <li>
                        Digestive Health: The use of Akarkara can improve
                        digestion by increasing the secretion of digestive
                        enzymes. It also helps in relieving stomach pain and
                        reducing flatulence.
                      </li>
                      <li>
                        Respiratory Problems: Akarkara is beneficial in treating
                        respiratory ailments like cough, cold, and asthma. Its
                        expectorant properties help in removing mucus from the
                        air passages and provide relief from congestion.
                      </li>
                      <li>
                        Nervous System: The herb has a stimulating effect on the
                        nervous system, which can improve memory, concentration,
                        and cognitive functions. It also helps in reducing
                        stress and anxiety.
                      </li>
                    </ol>
                  </li>
                  <li>
                    <h4>Usage of Akarkara:</h4>
                    Akarkara can be used in various forms, including powder,
                    oil, and decoction. It can be used as a tooth powder or
                    toothpaste for oral health. The powder can be consumed with
                    honey or milk to treat erectile dysfunction. Akarkara oil is
                    used for massaging the scalp to improve hair growth. It can
                    also be added to herbal teas or decoctions to benefit from
                    its medicinal properties.
                  </li>
                  <li>
                    <h4>Side Effects of Akarkara:</h4>
                    While Akarkara is generally safe for most people, excessive
                    consumption can lead to certain side effects. Some
                    individuals may experience stomach irritation, heartburn, or
                    allergic reactions. Pregnant women and those with underlying
                    health conditions should consult a healthcare professional
                    before using Akarkara.
                  </li>
                  <li>
                    <h4>Conclusion:</h4>
                    Akarkara, with its long history of traditional use, offers a
                    range of health benefits. From dental care to aphrodisiac
                    properties, this herb has found its place in multiple
                    therapeutic applications. However,{" "}
                    <strong>
                      it is essential to use it in moderation and seek
                      professional advice to avoid any potential side effects.
                    </strong>{" "}
                    With its numerous potential health benefits, Akarkara
                    remains an important herb in traditional medicine systems
                    and continues to provide holistic remedies for various
                    ailments.
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
export default Akarkara2;
