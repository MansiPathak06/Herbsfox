import React, { useState } from "react";

import "./Products.css";
import Footer from "../pages/Footer";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ProductData from "../data/ProductData";
import { useEffect } from "react";

const Sennaleave = () => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    setRelatedProducts(getRelatedProducts());
  }, []);
  const getRelatedProducts = () => {
    const productsExceptCurrent = ProductData.filter(
      (product) => product.caption.toLowerCase() !== "sennaleave"
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
    "100gm": 225,
    "200gm": 288,
    "400gm": 339,
    "800gm": 444,
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
            src="/images/sena-leaves-2.webp"
            className="image-h"
            alt="sennaleave"
          />
          <div className="sub-images">
            <img src="/images/27-1.webp" className="image-1" alt="sennaleave" />
            <img
              src="/images/sena-leaves-4.webp"
              className="image-2"
              alt="sennaleave"
            />
            <img src="/images/27.webp" className="image-3" alt="sennaleave" />
          </div>
        </div>

        <div className="rightside-container">
          <h2 className="product-heading">Senna Leave</h2>
          <h2 className="cost">₹225.00 – ₹444.00</h2>
          <p className="mini-para">
            Herbsfox Senna Leaf – Cassia angustifolia – Senna Patta – Sanay
            Leaves – <br />
            Sonamukhi Leaves – Sona Patta
          </p>
          <ul>
            <li className="mini-para">Introduction to Senna leaves:</li>
          </ul>
          <p className="paragraph">
            Sena leaves, also known by its botanical name Cassia angustifolia,
            are leafy herbs widely recognized for their potent medicinal
            properties. This versatile plant has been used for centuries across
            various cultures to alleviate various health concerns. With its rich
            history, numerous health benefits, and a few potential side effects,
            Sena leaves continue to captivate the interest of herbal medicine
            enthusiasts around the world.
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
                    id: "Shital Chini",
                    name: "Shital chini",
                    price: price,
                    quantity,
                    weight: selectedWeight,
                    image: "/images/Shital chini.webp",
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
            <p>SKU: 23</p>
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
                    <h4>History of Senna Leaves:</h4>
                    The usage of Sena leaves can be traced back to ancient
                    Egypt, where it was valued as a natural remedy for various
                    health conditions. Egyptians often used Sena leaves in
                    herbal preparations to support digestive health, ease
                    constipation, and promote natural detoxification. Over time,
                    knowledge of Sena leaves spread across different regions,
                    including India, where traditional Ayurvedic and Unani
                    medical systems have employed this herb extensively.
                  </li>
                  <li>
                    <h4>Benefits of Sena Leaves:</h4>
                    <ol>
                      <li>
                        Promotes Digestive Health:
                        <br />
                        Sena leaves have long been appreciated for their
                        efficacy in treating digestive discomforts. A natural
                        laxative, Sena leaves contain active compounds called
                        anthraquinones, which stimulate bowel movement and help
                        alleviate constipation. It assists in relieving
                        intestinal cramps, bloating, and may prevent
                        gastrointestinal disorders.
                      </li>
                      <li>
                        Supports Colon Cleansing:
                        <br />
                        Sena leaves are commonly used as an ingredient in
                        detoxification regimens. The natural laxative effect
                        aids in colon cleansing, removing accumulated waste,
                        toxins, and harmful substances. Regular use may improve
                        digestion, reduce flatulence, and provide relief from
                        occasional indigestion.
                      </li>
                      <li>
                        Assists Weight Loss:
                        <br />
                        Some studies suggest that Sena leaves may support weight
                        loss efforts when used in moderation. Its natural
                        laxative properties can aid in the elimination of waste,
                        reduce fluid retention, and help detoxify the body,
                        potentially leading to temporary weight loss.
                      </li>
                      <li>
                        Alleviates Skin Conditions:
                        <br />
                        Sena leaves have been traditionally used to treat
                        various skin conditions. The herb’s anti-inflammatory
                        and antimicrobial properties may help in reducing acne,
                        rashes, and itchy skin. It can be used topically as a
                        paste or incorporated into skincare products.
                      </li>
                    </ol>
                  </li>
                  <li>
                    <h4>Side Effects of Sena Leaves:</h4>
                    <ol>
                      <li>
                        Overuse can lead to diarrhea:
                        <br />
                        Consuming excessive amounts of Sena leaves or using
                        strong preparations can cause diarrhea, which may lead
                        to electrolyte imbalance and dehydration. It is
                        important to follow recommended dosage and consult a
                        healthcare professional when necessary.
                      </li>
                      <li>
                        Interference with nutrient absorption:
                        <br />
                        The laxative effect of Sena leaves can interfere with
                        the absorption of certain nutrients. Prolonged use or
                        excessive doses may lead to reduced levels of potassium,
                        calcium, and other essential minerals in the body.
                      </li>
                      <li>
                        Not recommended for specific groups:
                        <br />
                        Pregnant or breastfeeding women, individuals with
                        certain medical conditions such as gastrointestinal
                        disorders, appendicitis, and ulcerative colitis, should
                        avoid using Sena leaves due to potential complications.
                      </li>
                    </ol>
                  </li>

                  <li>
                    <h4>Conclusion:</h4>
                    Sena leaves undoubtedly hold a special place in herbal
                    medicine for their diverse medicinal properties and
                    historical significance. With its ability to alleviate
                    digestive discomforts, support colon cleansing, aid weight
                    loss efforts, and help with various skin conditions, Sena
                    leaves remain a valuable herb in alternative natural
                    therapies.{" "}
                    <strong>
                      However, it is essential to use Sena leaves responsibly,
                      following recommended dosages and seeking professional
                      advice when necessary to avoid potential side effects.
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

export default Sennaleave;
