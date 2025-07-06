import React, { useState } from "react";

import "./Products.css";
import Footer from "../pages/Footer";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ProductData from "../data/ProductData";
import { useEffect } from "react";

const Shilajeet = () => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    setRelatedProducts(getRelatedProducts());
  }, []);
  const getRelatedProducts = () => {
    const productsExceptCurrent = ProductData.filter(
      (product) => product.caption.toLowerCase() !== "niranjanphal"
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
    "100gm": 1565,
    "200gm": 2946,
    "400gm": 5445,
    "800gm": 10252,
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
            src="/images/shilajeet-2.webp"
            className="image-h"
            alt="shilajeet"
          />
          <div className="sub-images">
            <img
              src="/images/shilajeet-3.webp"
              className="image-1"
              alt="shilajeet"
            />
            <img
              src="/images/shilajeet-4.webp"
              className="image-2"
              alt="shilajeet"
            />
            <img
              src="/images/shilajeet.webp"
              className="image-3"
              alt="shilajeet"
            />
          </div>
        </div>

        <div className="rightside-container">
          <h2 className="product-heading">Shilajeet</h2>
          <h2 className="cost">₹1,565.00 – ₹10,252.00</h2>
          <p className="mini-para">
            Herbsfox Himalayan Shilajit – Shilajeet (Semi Liquid) (Resin)-
            Shilajatu – Asphaltum | For
            <br />
            Better Performance, Power, Stamina and Strength | Builds Immunity
            (Fulvic Acid 72 Percent)
          </p>
          <ul>
            <li className="mini-para">Introduction to Shilajeet:</li>
          </ul>
          <p className="paragraph">
            Shilajit, also known as mineral pitch, is a natural substance found
            in the Himalayas and other mountain ranges around the world. It is a
            sticky, tar-like resin that oozes out of rocks due to high
            temperature shifts. Known for its numerous health benefits, Shilajit
            has been used in Ayurvedic medicine for centuries.
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
                    id: "Shilajeet",
                    name: "Shilajeet",
                    price: price,
                    quantity,
                    weight: selectedWeight,
                    image: "/images/shilajeet-2.webp",
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
            <p>SKU: 24</p>
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
                    <h4>History of Shilajit:</h4>
                    Shilajit has a rich history dating back to ancient times.
                    This potent substance was highly valued in Ayurveda, the
                    traditional healing system of India, where it was believed
                    to possess rejuvenating and anti-aging properties. It was
                    often referred to as the “destroyer of weakness” or the
                    “conqueror of mountains.”
                    <br />
                    The origins of Shilajit can be traced back to the ancient
                    Indian scriptures called the Vedas, which were written
                    between 1500 and 500 BCE. These texts mention Shilajit as a
                    potent substance with rejuvenating properties, prized for
                    its ability to support overall well-being and combat various
                    ailments.
                    <br />
                    According to the Vedic texts, Shilajit is believed to be the
                    result of the decomposition of ancient plants and other
                    organic matter trapped within the mountains over centuries.
                    When these organic materials underwent intense pressure,
                    temperature fluctuations, and microbial action, they
                    transformed into a black resin-like substance that oozes
                    from the rocks or cliffs in the Himalayas during the summer
                    months.
                  </li>
                  <li>
                    <h4>Benefits of Shilajit:</h4>
                    <ol>
                      <li>
                        Boosts Energy and Stamina:
                        <br />
                        Shilajit is known to enhance energy levels and improve
                        stamina, making it a popular supplement among athletes
                        and fitness enthusiasts..
                      </li>
                      <li>
                        Anti-Inflammatory Properties:
                        <br />
                        It contains fulvic acid, which has potent
                        anti-inflammatory effects that can help reduce
                        inflammation in the body.
                      </li>
                      <li>
                        Cognitive Enhancement:
                        <br />
                        Shilajit may support brain function and cognitive
                        health, potentially enhancing memory and focus.
                      </li>
                      <li>
                        Anti-aging Effects:
                        <br />
                        With its rich antioxidant content, Shilajit helps combat
                        oxidative stress and may slow down the aging process.
                      </li>
                      <li>
                        Supports Immune System: Shilajit has immune-boosting
                        properties that can help strengthen the body’s defense
                        mechanisms.
                      </li>
                    </ol>
                  </li>
                  <li>
                    <h4>Side Effects of Shilajit:</h4>
                    <p>
                      While generally considered safe for most people when
                      consumed in moderate amounts, Shilajit may cause side
                      effects in some individuals. These can include:
                    </p>
                    <ol>
                      <li>
                        Upset Stomach: Some people may experience digestive
                        issues such as stomach pain, nausea, or diarrhea.
                      </li>
                      <li>
                        Allergic Reactions: Allergic reactions to Shilajit are
                        rare but can occur in sensitive individuals, leading to
                        symptoms like rashes or itching
                      </li>
                      <li>
                        Heavy Metal Contamination: Due to its natural sourcing,
                        Shilajit may contain trace amounts of heavy metals,
                        although this risk is generally low.
                      </li>
                    </ol>
                  </li>
                  <p>
                    Incorporating Shilajit into your wellness routine can offer
                    a range of health benefits.{" "}
                    <strong>
                      However, it’s advised to consult with a healthcare
                      provider before starting any new supplement regimen,
                      especially if you have underlying health conditions or are
                      pregnant/nursing.
                    </strong>
                  </p>
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

export default Shilajeet;
