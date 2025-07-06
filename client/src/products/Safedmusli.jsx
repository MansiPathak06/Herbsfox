import React, { useState } from "react";

import "./Products.css";
import Footer from "../pages/Footer";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ProductData from "../data/ProductData";
import { useEffect } from "react";

const Safedmusli = () => {
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
    "100gm": 594,
    "200gm": 1084,
    "400gm": 1056,
    "800gm": 3355,
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
            src="/images/safed-musli-2.webp"
            className="image-h"
            alt="safedmusli"
          />
          <div className="sub-images">
            <img
              src="/images/safed-musli-1.webp"
              className="image-1"
              alt="safedmusli"
            />
            <img
              src="/images/Orange-Black-Modern-Photocentric-Skincare-Product-Instagram-Post-1.webp"
              className="image-2"
              alt="safedmusli"
            />
            <img
              src="/images/safed-musli-3.webp"
              className="image-3"
              alt="safedmusli"
            />
          </div>
        </div>

        <div className="rightside-container">
          <h2 className="product-heading">Safed Musli</h2>
          <h2 className="cost">₹594.00 – ₹3,355.00</h2>
          <p className="mini-para">
            Herbsfox Safed Musli – White Musli – Shwet Muslie – Chlorophytum
            Borivilianum
          </p>
          <ul>
            <li className="mini-para">Introduction to Safed Musli:</li>
          </ul>
          <p className="paragraph">
            Safed Musli, also known by its scientific name Chlorophytum
            borivilianum, is a perennial herb that is widely acclaimed for its
            medicinal properties. This herb is native to India and has been an
            integral part of traditional Ayurvedic medicine for centuries. Safed
            Musli is highly regarded for its aphrodisiac, adaptogenic, and
            immunostimulant properties. It contains valuable bioactive compounds
            that offer numerous health benefits when consumed in the correct
            dosage. In this article, we will explore the history, health
            benefits, usage, side effects, and conclusion regarding Safed Musli.
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
                    id: "Safed Musli",
                    name: "Safed Musli",
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
            <p>SKU: 42</p>
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
                    <h4>History of Safed Musli:</h4>
                    Safed Musli has a rich historical background that dates back
                    thousands of years. It has a prominent place in Ayurvedic
                    medicine, where it has been used to treat various ailments,
                    especially those pertaining to sexual health. The herb was
                    traditionally used as a rejuvenating tonic and as a remedy
                    for male sexual disorders, such as erectile dysfunction and
                    premature ejaculation. Over the years, it has gained
                    popularity beyond the borders of India and has become an
                    important herb in the field of natural medicine worldwide.
                  </li>
                  <li>
                    <h4>Health Benefits of Safed Musli:</h4>
                    1. Aphrodisiac Properties: Safed Musli is widely acclaimed
                    for its aphrodisiac properties, making it a sought-after
                    remedy for sexual disorders. It helps enhance libido,
                    improves fertility, and increases sperm count and motility
                    in men. For women, it promotes a healthy reproductive system
                    and may even alleviate symptoms of menopause.
                    <br />
                    2. Immune System Booster: Safed Musli contains significant
                    immunostimulant properties that help strengthen the immune
                    system. Regular consumption of this herb may increase the
                    production of antibodies and enhance immune response, thus
                    protecting the body against various infections and diseases.
                    <br />
                    3. Adaptogenic Effects: Safed Musli is classified as an
                    adaptogen, which means it helps the body adapt to physical
                    and mental stress. It aids in reducing oxidative stress and
                    fatigue, promoting overall well-being and vitality. This
                    adaptogenic property also makes it an effective herb for
                    managing anxiety and reducing the risk of stress-related
                    disorders.
                    <br />
                    4. Antioxidant Activity: The herb exhibits powerful
                    antioxidant properties due to the presence of bioactive
                    compounds such as saponins, alkaloids, and flavonoids. These
                    antioxidants combat free radicals, neutralize oxidative
                    stress, and prevent cell damage. Regular consumption of
                    Safed Musli may help prevent chronic diseases like
                    cardiovascular diseases, cancer, and neurodegenerative
                    disorders.
                    <br />
                    5. Anti-inflammatory Effects: Safed Musli has
                    anti-inflammatory properties that help reduce inflammation
                    and mitigate inflammatory conditions like arthritis and
                    other joint-related problems. Regular consumption or topical
                    application of Safed Musli may alleviate pain, swelling, and
                    joint stiffness associated with inflammation.
                    <br />
                  </li>
                  <li>
                    <h4>Usage of Safed Musli:</h4>
                    Safed Musli can be used in various ways to harness its
                    health benefits. It is available in different forms such as
                    powder, capsules, tablets, and even as a raw herb. Here are
                    some common methods of consuming it: 1. Safed Musli Powder:
                    The powdered form of Safed Musli can be mixed with warm
                    milk, water, or any other beverage of your choice. It is
                    recommended to consume 1-2 teaspoons of Safed Musli powder
                    per day to experience its health benefits.
                    <br />
                    2.Safed Musli Capsules/Tablets: There are commercially
                    available Safed Musli capsules or tablets that provide a
                    standardized dosage. Always follow the recommended dosage
                    mentioned on the packaging or consult a healthcare
                    professional for guidance.
                    <br />
                    3. Safed Musli Extracts: Liquid extracts or tinctures of
                    Safed Musli are also available in the market. These extracts
                    can be added to water or any other suitable liquid and
                    consumed as directed.
                  </li>
                  <li>
                    <h4>Side Effects of Safed Musli:</h4>
                    Safed Musli is generally safe to consume when taken within
                    the recommended dosage. However, excess consumption or
                    improper usage may lead to certain side effects such as:
                    <br />
                    1. Upset Stomach: Some individuals may experience stomach
                    discomfort, bloating, or diarrhea due to the herb’s laxative
                    effect. It is important to start with a low dosage and
                    gradually increase it to allow the body to adjust.
                    <br />
                    2. Allergic Reactions: In rare cases, people may develop
                    allergic reactions to Safed Musli. If you experience
                    symptoms like itching, rash, or difficulty breathing,
                    discontinue use immediately and seek medical attention.
                    <br />
                    3. Interactions with Medications: Safed Musli may interact
                    with certain medications like antidiabetic drugs,
                    anticoagulants, and antihypertensives. Consult a healthcare
                    professional before incorporating Safed Musli into your
                    routine if you are taking any medications.
                    <br />
                  </li>
                  <li>
                    <h4>Conclusion:</h4>
                    Safed Musli is a versatile herb that offers a range of
                    health benefits. From its aphrodisiac properties to its
                    immune-boosting and adaptogenic effects, it has gained
                    widespread recognition in the world of natural medicine.
                    When used in the correct dosage, Safed Musli is generally
                    safe with minimal side effects. However, it is always
                    advisable to consult a healthcare professional before
                    starting any new supplement or herb, especially if you have
                    any underlying medical conditions or are on medications.
                    Incorporating Safed Musli into a well-balanced, healthy
                    lifestyle can potentially enhance overall well-being and
                    contribute to a healthier life.
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

export default Safedmusli;
