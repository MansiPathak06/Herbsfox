import React, { useState } from "react";

import "./Products.css";
import Footer from "../pages/Footer";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ProductData from "../data/ProductData";
import { useEffect } from "react";

const Majuhara = () => {
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
    "100gm": 264,
    "200gm": 368,
    "400gm": 511,
    "800gm": 767,
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
            src="/images/maju-hara-2.webp"
            className="image-h"
            alt="Majuhara"
          />
          <div className="sub-images">
            <img
              src="/images/maju-hara-3.webp"
              className="image-1"
              alt="Majuhara"
              onClick={() => openFullscreen("/images/maju-hara-3.webp")}
            />
            <img
              src="/images/maju-hara-4.webp"
              className="image-2"
              alt="Majuhara"
              onClick={() => openFullscreen("/images/maju-hara-4.webp")}
            />
            <img
              src="/images/maju-hara.webp"
              className="image-3"
              alt="Majuhara"
              onClick={() => openFullscreen("/images/maju-hara.webp")}
            />
          </div>
        </div>

        <div className="rightside-container">
          <h2 className="product-heading">maju hara</h2>
          <h2 className="cost">₹264.00 – ₹767.00</h2>
          <p className="mini-para">
            Herbsfox Maju Hara – Majuphal – Oak Gall – Gallnuts – Manjakani –
            May Phal- Mayphal –<br />
            Mazu Fruit- Oak Tree Fruit – Mayaphala – Nutgall – Nutgalls – Maifal
            – Jaft Baloot – Quercus Infectoria
          </p>
          <ul>
            <li className="mini-para">Introduction to Majuphal:</li>
          </ul>
          <p className="paragraph">
            Majuphal, also known as Oak Gall, is a fascinating natural substance
            that has been used for centuries in various cultures for its
            medicinal properties. It is formed when certain species of oak trees
            are infected by aphids, leading to the formation of small round
            balls on the tree branches. These balls are then harvested and dried
            to create Majuphal, which is widely used in traditional medicine
            practices. This article explores the history, health benefits, uses,
            and potential side effects of Majuphal.
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
                    id: "Majuhara",
                    name: "Majuhara",
                    price: price,
                    quantity,
                    weight: selectedWeight,
                    image: "/images/maju-hara-2.webp",
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
            <p>SKU: 17</p>
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
                    <h4>History of Majuphal:</h4>
                    The use of Majuphal dates back thousands of years and can be
                    traced to different ancient civilizations. In Persian
                    medicine, it was considered a powerful astringent and was
                    used to treat diarrhea, dysentery, and bleeding disorders.
                    In Ayurveda, the traditional medicine system of India,
                    Majuphal was valued for its ability to treat mouth ulcers,
                    sore gums, and dental issues. Furthermore, it was used
                    topically to alleviate skin conditions such as wounds,
                    burns, and insect bites.
                  </li>
                  <li>
                    <h4>Health Benefits of Majuphal:</h4>
                    <ol>
                      <li>
                        Anti-inflammatory properties: Majuphal contains tannins
                        and polyphenols that possess strong anti-inflammatory
                        properties, making it effective in reducing inflammation
                        and relieving pain associated with conditions like
                        arthritis and gout.
                      </li>
                      <li>
                        Antioxidant effects: The high presence of antioxidants
                        in Majuphal helps protect cells from harmful free
                        radicals, potentially reducing the risk of chronic
                        diseases such as cancer and cardiovascular disorders.
                      </li>
                      <li>
                        Anti-microbial properties: Studies have shown that
                        Majuphal exhibits antimicrobial capabilities against
                        various bacteria, fungi, and viruses. It can be used to
                        combat infections and support a healthy immune system.
                      </li>
                      <li>
                        Oral health benefits: Majuphal’s astringent properties
                        make it a beneficial ingredient in oral hygiene
                        products. It can help alleviate gum inflammation, reduce
                        bleeding, and treat mouth ulcers.
                      </li>
                    </ol>
                  </li>
                  <li>
                    <h4>Usages of Majuphal:</h4>
                    <ol>
                      <li>
                        Skin care: Due to its astringent and antibacterial
                        properties, Majuphal is used in various skincare
                        products like ointments, creams, and lotions. It helps
                        reduce acne, soothe irritated skin, and promote wound
                        healing.
                      </li>
                      <li>
                        Digestive Health: Majuphal is commonly used to alleviate
                        digestive issues such as diarrhea, dysentery, and
                        gastric ulcers. It helps reduce inflammation in the
                        stomach and intestines, promoting better digestion.
                      </li>
                      <li>
                        Dental care: Majuphal’s astringent and antiseptic
                        qualities make it an effective natural remedy for oral
                        health. It is used as a mouthwash or tooth powder to
                        treat gum diseases, mouth ulcers, and bad breath.
                      </li>
                    </ol>
                  </li>
                  <li>
                    <h4>Side Effects of Majuphal:</h4>
                    While Majuphal is generally considered safe when used in
                    appropriate amounts, it may cause some side effects in
                    certain cases. Excessive use of Majuphal can lead to
                    constipation, as it is highly astringent. Additionally, some
                    individuals may experience skin irritation if applied
                    topically without proper dilution or sensitivity testing.
                  </li>
                  <li>
                    <h4>Conclusion:</h4>
                    Majuphal, or Oak Gall, is a natural substance with a long
                    history of use in traditional medicine systems. Its numerous
                    health benefits, including anti-inflammatory, antimicrobial,
                    and antioxidant properties, make it a valuable ingredient in
                    various treatments. However,
                    <strong>
                      it is important to use Majuphal in moderation and consult
                      with a healthcare professional before incorporating it
                      into your healthcare routine to ensure its safe and
                      effective usage.
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

export default Majuhara;
