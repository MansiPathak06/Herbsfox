import React, { useState } from "react";

import "./Products.css";
import Footer from "../pages/Footer";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ProductData from "../data/ProductData";
import { useEffect } from "react";

const Rumimastagi2 = () => {
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
    "100gm": 4278,
    "200gm": 8702,
    "400gm": 16531,
    "800gm": 31570,
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
            src="/images/rumi-mastagi.webp"
            className="image-h"
            alt="rumi-mastagi"
          />
          <div className="sub-images">
            <img
              src="/images/rumi-mastagi-1.webp"
              className="image-1"
              alt="rumi-mastagi"
            />
            <img
              src="/images/rumi-mastagi-4.webp"
              className="image-2"
              alt="rumi-mastagi"
            />
            <img
              src="/images/rumi-mastagi-3.webp"
              className="image-3"
              alt="rumi-mastagi"
            />
          </div>
        </div>

        <div className="rightside-container">
          <h2 className="product-heading">Rumi Mastagi</h2>
          <h2 className="cost">₹4,278.00 – ₹31,570.00</h2>
          <p className="mini-para">
            Herbsfox Rumi Mastagi – Mastangi – Pistachio Lenticus – Mastic Gum
          </p>
          <ul>
            <li className="mini-para">Introduction to Rumi Mastagi:</li>
          </ul>
          <p className="paragraph">
            Rumi Mastangi, also known as mastic gum, is a natural resin that has
            been used for centuries for its distinct flavour, medicinal
            properties, and versatile applications. This article will delve into
            the rich history of Rumi Mastangi, explore its potential benefits,
            and discuss any possible side effects.
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
                    id: "RumiMastagi",
                    name: "Rumi Mastagi",
                    price: price,
                    quantity,
                    weight: selectedWeight,
                    image: "/images/rumi-mastagi.webp",
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
            <p>SKU: 22</p>
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
                    <h4>History of Rumi Mastangi (Mastic Gum):</h4>
                    Rumi Mastangi has a long and storied history, dating back to
                    ancient times. It is extracted from the resinous sap of the
                    Pistacia lentiscus tree, which is native to the
                    Mediterranean region. Ancient Greek scholars such as
                    Hippocrates and Dioscorides praised mastic gum for its
                    various medicinal properties. Over the centuries, it has
                    been used in traditional medicine, culinary arts, dental
                    care, and skincare, earning its reputation as a versatile
                    remedy.
                  </li>
                  <li>
                    <h4>Benefits of Rumi Mastangi (Mastic Gum):</h4>
                    <ol>
                      <li>
                        Digestive Health:
                        <br />
                        Rumi Mastangi has been traditionally used to treat
                        gastrointestinal issues such as indigestion, stomach
                        ulcers, and gastrointestinal infections. Its natural
                        antibacterial and anti-inflammatory properties may help
                        alleviate symptoms and promote a healthy digestive
                        system.
                      </li>
                      <li>
                        Oral Health:
                        <br />
                        Mastic gum’s antimicrobial properties make it a valuable
                        ingredient in oral hygiene products. It has been found
                        to inhibit the growth of harmful bacteria in the mouth,
                        preventing dental plaque buildup, gum disease, and bad
                        breath. Chewing mastic gum has also been suggested to
                        promote jaw muscle exercise and relieve stress on the
                        temporomandibular joint (TMJ).
                      </li>
                      <li>
                        Anti-inflammatory Properties:
                        <br />
                        Research suggests that mastic gum exhibits
                        anti-inflammatory effects, which may help reduce
                        inflammation in the body. This could potentially benefit
                        individuals with inflammatory conditions, such as
                        arthritis and inflammatory bowel disease (IBD).
                      </li>
                      <li>
                        Antioxidant Benefits:
                        <br />
                        Rumi Mastangi contains potent antioxidants, which
                        protect the body against harmful free radicals and
                        oxidative stress. These antioxidants may help prevent
                        cellular damage, support a healthy immune system, and
                        promote overall well-being.
                      </li>
                      <li>
                        Skincare:
                        <br />
                        Mastic gum has been popularly used in skincare products
                        due to its antimicrobial and anti-inflammatory
                        properties. It may help soothe irritated skin, reduce
                        acne breakouts, and promote a healthy complexion.
                      </li>
                    </ol>
                  </li>
                  <li>
                    <h4>Side Effects of Rumi Mastangi (Mastic Gum):</h4>
                    Overall, mastic gum is considered safe for most individuals
                    when consumed in moderate amounts. However, some individuals
                    may experience mild side effects, such as stomach
                    discomfort, nausea, or diarrhea. Allergic reactions are rare
                    but not unheard of, so it’s important to exercise caution if
                    you have a known allergy to Pistacia lentiscus or related
                    plants
                    <br />
                    <strong>
                      P.S. – It is advisable to consult with a healthcare
                      professional before incorporating mastic gum into your
                      routine, especially if you have any pre-existing medical
                      conditions or are taking medications.
                    </strong>
                  </li>
                  <li>
                    <h4>Conclusion:</h4>
                    Rumi Mastangi, also known as mastic gum, possesses a rich
                    history and a range of potential benefits. From its
                    usefulness in promoting digestive health and oral hygiene,
                    to its anti-inflammatory properties and skincare benefits,
                    mastic gum has gained recognition for its versatility. While
                    the side effects are generally minimal, it is always wise to
                    consult with a healthcare professional before using any new
                    supplement or natural remedy
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

export default Rumimastagi2;
