import React, { useState } from "react";

import "./Products.css";
import Footer from "../pages/Footer";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ProductData from "../data/ProductData";
import { useEffect } from "react";

const Suranjankadvi = () => {
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
    "100gm": 429,
    "200gm": 746,
    "400gm": 1239,
    "800gm": 2164,
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
            src="/images/suranjan-kadvi-2.webp"
            className="image-h"
            alt="suranjankadvi"
          />
          <div className="sub-images">
            <img
              src="/images/suranjan-kadvi.webp"
              className="image-1"
              alt="suranjankadvi"
            />
            <img
              src="/images/suranjan-kadvi-4.webp"
              className="image-2"
              alt="suranjankadvi"
            />
            <img
              src="/images/suranjan-kadvi-3.webp"
              className="image-3"
              alt="suranjankadvi"
            />
          </div>
        </div>

        <div className="rightside-container">
          <h2 className="product-heading">Suranjan Kadvi</h2>
          <h2 className="cost">₹429.00 – ₹2,164.00</h2>
          <p className="mini-para">
            Herbsfox Suranjan kadwi – Suranjan (Bitter) (Roots) – Suranjaan
            (Kadwi) (Jadd) –<br />
            Suranjan Talkh – Colchicum Luteum
          </p>
          <p>
            Suranjan Bitter, also known as colchicum luteum, is a plant with a
            rich history and a wide range of health benefits. This plant has
            been used for centuries in traditional medicine for its therapeutic
            properties.
          </p>
          <ul>
            <li className="mini-para">Introduction to Suranjan Bitter:</li>
          </ul>
          <p className="paragraph">
            Suranjan Bitter is a perennial herbaceous plant that belongs to the
            Colchicaceae family. It is native to regions in Europe and Western
            Asia. The plant is characterized by its bright yellow flowers and
            contains various bioactive compounds that contribute to its
            medicinal properties.
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
                    id: "Suranjankadvi",
                    name: "Suranjan Kadvi",
                    price: price,
                    quantity,
                    weight: selectedWeight,
                    image: "/images/suranjan-kadvi-2.webp",
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
            <p>SKU: 26</p>
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
                    <h4>History of Suranjan Kadwi:</h4>
                    The historical use of Suranjan Bitter dates back centuries,
                    with references to its medicinal properties found in ancient
                    texts. In traditional medicine systems such as Ayurveda and
                    Unani, Suranjan Bitter has been used to alleviate various
                    health conditions, including inflammatory disorders and
                    joint pain. Over time, its efficacy and safety profiles have
                    been a subject of interest for researchers and practitioners
                    alike.
                  </li>
                  <li>
                    <h4>Health Benefits of Suranjan Kadwi:</h4>
                    <p>
                      Suranjan Bitter is believed to offer a range of health
                      benefits, thanks to its active compounds. Some potential
                      benefits include:
                    </p>
                    <ol>
                      <li>
                        Anti-inflammatory Properties: Suranjan Bitter contains
                        compounds that may help reduce inflammation in the body,
                        making it beneficial for conditions like arthritis and
                        gout.
                      </li>
                      <li>
                        Pain Relief: The plant is also used for its analgesic
                        properties, which can help alleviate pain associated
                        with conditions like rheumatism and joint disorders.
                      </li>
                      <li>
                        Digestive Health Support: Suranjan Bitter is believed to
                        aid digestion and promote gastrointestinal health due to
                        its potential effects on digestive enzymes.
                      </li>
                      <li>
                        Antioxidant Effects: The plant may possess antioxidant
                        properties, helping to combat oxidative stress and
                        protect cells from damage.
                      </li>
                    </ol>
                  </li>
                  <li>
                    <h4>Usage of Suranjan Kadwi:</h4>
                    Suranjan Bitter can be used in various forms, including as
                    an herbal supplement, tea, or topical application.{" "}
                    <strong>
                      It is essential to follow recommended dosages and consult
                      a healthcare provider before using it, especially if you
                      have existing health conditions or are pregnant or
                      breastfeeding.
                    </strong>
                  </li>
                  <li>
                    <h4>Side Effects of Suranjan Kadwi:</h4>
                    While Suranjan Bitter offers several health benefits, it is
                    essential to be aware of potential side effects and
                    precautions. Some individuals may experience adverse
                    reactions, including gastrointestinal upset, allergic
                    reactions, or interactions with certain medications. It is
                    crucial to use Suranjan Bitter under the guidance of a
                    healthcare professional to minimize the risk of side effects
                    and ensure its safe and effective usage.
                    <br />
                    In <strong>conclusion</strong>, Suranjan Bitter, or
                    colchicum luteum, is a medicinal plant with a long history
                    of traditional use for various health concerns.
                    Understanding its introduction, historical significance,
                    health benefits, usage guidelines, and potential side
                    effects can help individuals make informed decisions about
                    incorporating this natural remedy into their wellness
                    routine.
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

export default Suranjankadvi;
