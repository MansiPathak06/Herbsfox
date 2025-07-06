import React, { useState } from "react";
import "./Products.css";
import Footer from "../pages/Footer";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ProductData from "../data/ProductData";
import { useEffect } from "react";

const Anantmool = () => {
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
    "100gm": 232,
    "200gm": 299,
    "400gm": 360,
    "800gm": 485,
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
            src="/images/anantmool-4.webp"
            className="image-h"
            alt="Anantmool"
          />
          <div className="sub-images">
            <img
              src="/images/anantmool-2.webp"
              className="image-1"
              alt="Anantmool"
              onClick={() => openFullscreen("/images/anantmool-2.webp")}
            />
            <img
              src="/images/Blue-Simple-Hair-Conditioner-Product-Preview-Instagram-Post-2.webp"
              className="image-2"
              alt="Anantmool"
              onClick={() =>
                openFullscreen(
                  "/images/Blue-Simple-Hair-Conditioner-Product-Preview-Instagram-Post-2.webp"
                )
              }
            />
            <img
              src="/images/anantmool-madrasi-1.webp"
              className="image-3"
              alt="Anantmool"
              onClick={() => openFullscreen("/images/anantmool-madrasi-1.webp")}
            />
          </div>
        </div>

        <div className="rightside-container">
          <h2 className="product-heading">Anantmool</h2>
          <h2 className="cost">₹232.00 – ₹485.00</h2>
          <p className="mini-para">
            Herbsfox Anantmul – Anantmool Madrasi (Root) – Anantmool (Safed) –
            Hemidesmus
            <br />
            Indicus – Sarsaparilla – Sariva – Nannari – Anantamula
          </p>
          <ul>
            <li className="mini-para">Introduction to ANANTMOOL</li>
          </ul>
          <p className="paragraph">
            Anantmool, scientifically known as Hemidesmus indicus, is a
            perennial herb native to India. It is commonly called Indian
            Sarsaparilla due to its resemblance to the more well-known
            Sarsaparilla plant. Anantmool has been utilized in Ayurvedic
            medicine for centuries, primarily for its potent medicinal
            properties. This article explores the intriguing history, health
            benefits, various usages, potential side effects, and a concluding
            summary of this remarkable herb.
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
                    id: "Anantmool",
                    name: "Anantmool",
                    price: price,
                    quantity,
                    weight: selectedWeight,
                    image: "/images/anantmool-4.webp",
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
            <p>SKU: 004</p>
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
                    <h4>History of Anantmool:</h4>
                    Anantmool has a rich historical background and has been an
                    integral part of Ayurvedic medicine since ancient times. It
                    is mentioned in several Ayurvedic texts, such as Charaka
                    Samhita and Sushruta Samhita, where it is referred to as an
                    important herb for its numerous therapeutic uses.
                    Traditional healers have utilized Anantmool for treating
                    various ailments, including skin disorders, respiratory
                    issues, gastrointestinal disorders, and more.
                  </li>
                  <li>
                    <h4>Health Benefits of Anantmool:</h4>
                    1. Blood Purification: Anantmool possesses potent blood
                    purification properties which help remove toxins and
                    impurities from the bloodstream. Regular consumption of
                    Anantmool can promote healthier skin, improve overall
                    health, and prevent various skin disorders.
                    <br />
                    2. Anti-inflammatory Properties: Anantmool exhibits strong
                    anti-inflammatory effects, making it beneficial for managing
                    inflammatory conditions such as arthritis, gout, and
                    rheumatism. It helps reduce swelling, pain, and discomfort
                    associated with these conditions.
                    <br />
                    3. Digestive Aid: Anantmool has been traditionally used as a
                    digestive aid. It helps promote digestion, stimulates
                    appetite, relieves indigestion, and alleviates
                    gastrointestinal problems like acidity, bloating, and
                    constipation.
                    <br />
                    4. Respiratory Health: It is known to possess expectorant
                    properties, making it effective in providing relief from
                    respiratory issues such as cough, cold, asthma, and
                    bronchitis. Anantmool helps soothe the airways, reduce
                    inflammation, and promotes effective breathing.
                    <br />
                    5. Detoxification: Its detoxifying properties aid in
                    flushing out toxins from the body, enhancing liver function,
                    and promoting overall detoxification. Anantmool aids in
                    maintaining optimal liver health, thus promoting general
                    well-being.
                    <br />
                  </li>
                  <li>
                    <h4>Usages of Anantmool:</h4>
                    1. Herbal Supplements: Anantmool is widely used in the
                    manufacturing of herbal supplements in various forms like
                    capsules, powders, and extracts. These supplements are
                    consumed to harness the therapeutic potential of Anantmool.
                    <br />
                    2. Skin Care: Anantmool is a common ingredient in many
                    skincare products due to its ability to purify the blood and
                    promote healthier skin. It is used in the treatment of acne,
                    eczema, psoriasis, and other skin conditions.
                    <br />
                    3. Respiratory Medicines: The expectorant properties of
                    Anantmool make it a valuable ingredient in various
                    respiratory medicines, syrups, and cough drops. It provides
                    relief from respiratory ailments and boosts lung health.
                  </li>
                  <li>
                    <h4>Side Effects of Anantmool:</h4>
                    While Anantmool is generally considered safe for
                    consumption, some individuals may experience mild side
                    effects such as stomach upset, nausea, or allergic
                    reactions. It is advisable to consult a healthcare
                    professional before including Anantmool in your diet or
                    taking it in concentrated forms for medicinal purposes.
                    <br />
                  </li>
                  <li>
                    <h4>Conclusion:</h4>
                    Anantmool, or Indian Sarsaparilla, is a remarkable herb
                    known for its blood purification, anti-inflammatory,
                    digestive, respiratory, and detoxification properties. With
                    its rich historical background and widespread usage in
                    Ayurvedic medicine, Anantmool continues to be a significant
                    part of traditional healing practices in India. However,
                    <strong>
                      it is crucial to exercise caution and seek professional
                      guidance for optimal usage to reap its potential benefits
                      while minimizing any negative side effects.
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

export default Anantmool;
