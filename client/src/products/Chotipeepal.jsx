import React, { useState } from "react";

import "./Products.css";
import Footer from "../pages/Footer";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ProductData from "../data/ProductData";
import { useEffect } from "react";

const Chotipeepal = () => {
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
    "100gm": 283,
    "200gm": 409,
    "400gm": 594,
    "800gm": 927,
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
            src="/images/choti-peepal-2.webp"
            className="image-h"
            alt="chotipeepal"
          />
          <div className="sub-images">
            <img
              src="/images/choti-peepal-1.webp"
              className="image-1"
              alt="chotipeepal"
              onClick={() => openFullscreen("/images/choti-peepal-1.webp")}

            />
            <img
              src="/images/Blue-Simple-Hair-Conditioner-Product-Preview-Instagram-Post-2.webp"
              className="image-2"
              alt="chotipeepal"
              onClick={() => openFullscreen("/images/Blue-Simple-Hair-Conditioner-Product-Preview-Instagram-Post-2.webp")}
            />
            <img
              src="/images/choti-peepal-3.webp"
              className="image-3"
              alt="chotipeepal"
              onClick={() => openFullscreen("/images/choti-peepal-3.webp")}

            />
          </div>
        </div>

        <div className="rightside-container">
          <h2 className="product-heading">Choti peepal</h2>
          <h2 className="cost">₹283.00 – ₹927.00</h2>
          <p className="mini-para">
            Herbsfox Short Pepper – Pipli -Pipal Chhoti – Pippali – Piper
            Retrofractum – Choti Peepal
          </p>
          <ul>
            <li className="mini-para">Introduction to Choti Peepal:</li>
          </ul>
          <p className="paragraph">
            Choti peepal, scientifically known as Ficus religiosa, is a revered
            tree prominently found in South Asia. It holds significant cultural,
            historical, and religious value and is deeply intertwined with
            various traditions and practices. Known for its unique appearance
            and a multitude of health benefits, choti peepal has captured the
            attention of historians, spiritualists, and alternative medicine
            practitioners alike. In this comprehensive article, we will explore
            the rich history, remarkable health benefits, diverse usage,
            potential side effects, and draw a conclusion on the Choti peepal
            tree.
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
                    id: "Chotipeepal",
                    name: "Choti Peepal",
                    price: price,
                    quantity,
                    weight: selectedWeight,
                    image: "/images/choti-peepal-2.webp",
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
            <p>SKU: 32</p>
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
                    <h4>History of Choti Peepal: </h4>
                    1. Boosts Immunity: Choti peepal leaves possess impressive
                    antioxidant properties that help strengthen the immune
                    system and protect against harmful pathogens.
                    <br />
                    2. Anti-inflammatory Properties: The active compounds in
                    choti peepal, such as flavonoids and tannins, exhibit potent
                    anti-inflammatory effects, reducing inflammation and
                    providing relief from conditions like arthritis.
                    <br />
                    3. Digestive Health: Choti peepal leaves are known to aid
                    digestion by stimulating the secretion of digestive enzymes,
                    promoting better nutrient absorption, and alleviating
                    digestive issues like constipation and indigestion.
                    <br />
                    4. Respiratory Health: Steam inhalation with choti peepal
                    leaves can help clear respiratory passages, reduce
                    congestion, and provide relief from common respiratory
                    ailments like colds, coughs, and asthma.
                    <br />
                    5. Oral Health: Choti peepal bark possesses antimicrobial
                    properties that may help prevent oral infections, promote
                    gum health, and reduce dental plaque.
                  </li>
                  <li>
                    <h4>Usage of Choti Peepal:</h4>
                    1. Traditional Medicine: Choti peepal has been used
                    extensively in Ayurveda, Siddha, and traditional Chinese
                    medicine for various health conditions, including skin
                    diseases, diabetes, high blood pressure, arthritis, and
                    liver disorders.
                    <br />
                    2. Ritualistic and Spiritual Significance: Choti peepal is
                    considered sacred and continues to be worshipped in many
                    religious and cultural practices. It is used in sacred
                    rituals, temple decorations, and as offerings to deities.
                    <br />
                    3. Medicinal Preparations: Choti peepal leaves, roots, and
                    bark are utilized to prepare herbal concoctions, infused
                    oils, powders, and decoctions that are used internally or
                    externally to treat ailments based on traditional medicinal
                    knowledge.
                    <br />
                    4. Herbal Cosmetics: The extracts of choti peepal are often
                    used in the preparation of herbal cosmetics, including face
                    packs, oils, and hair care products due to their therapeutic
                    properties.
                  </li>
                  <li>
                    <h4>Potential Side Effects of Choti Peepal:</h4>
                    While choti peepal offers numerous health benefits, it is
                    essential to be aware of potential side effects and exercise
                    caution:
                    <br />
                    1. Interactions with Medications: Choti peepal may interact
                    with certain medications, such as anticoagulants and blood
                    pressure medications. It is advisable to consult a
                    healthcare professional before incorporating choti peepal
                    into your routine
                    <br />
                    2. Allergic Reactions: Some individuals may experience
                    allergic reactions to the leaves, bark, or latex sap of the
                    choti peepal tree. It is necessary to perform a skin patch
                    test or consult an allergist if you have a known allergy to
                    plants.
                    <br />
                    3. Pregnancy and Lactation: Pregnant and breastfeeding women
                    should exercise caution and consult their healthcare
                    provider before using choti peepal products or remedies.
                    <br />
                  </li>
                  <li>
                    <h4>Conclusion:</h4>
                    Choti peepal, with its rich history, remarkable health
                    benefits, and diverse usage, continues to be a cherished
                    tree in South Asia. From its spiritual significance to its
                    medicinal properties, this sacred tree has garnered
                    attention for its various applications. However, it is
                    crucial to exercise caution and seek professional advice
                    before incorporating choti peepal into your health routine.
                    The enduring legacy of choti peepal stands as a testament to
                    its unique qualities and its role as a symbol of reverence
                    and healing.
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

export default Chotipeepal;
