import React, { useState } from "react";

import "./Products.css";
import Footer from "../pages/Footer";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ProductData from "../data/ProductData";
import { useEffect } from "react";

const Shitalchini = () => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    setRelatedProducts(getRelatedProducts());
  }, []);
  const getRelatedProducts = () => {
    const productsExceptCurrent = ProductData.filter(
      (product) => product.caption.toLowerCase() !== "shitalchini"
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
    "100gm": 362,
    "200gm": 596,
    "400gm": 9255,
    "800gm":1508,
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
            src="/images/Shital chini.webp"
            className="image-h"
            alt="Shitalchini"
          />
          <div className="sub-images">
            <img
              src="/images/shital-chini-1.webp"
              className="image-1"
              alt="Shitalchini"
            />
            <img
              src="/images/Orange-Black-Modern-Photocentric-Skincare-Product-Instagram-Post-1.webp"
              className="image-2"
              alt="Shitalchini"
            />
            <img
              src="/images/45-1.webp"
              className="image-3"
              alt="Shitalchini"
            />
          </div>
        </div>

        <div className="rightside-container">
          <h2 className="product-heading">Shital Chini</h2>
          <h2 className="cost">₹362.00 – ₹1,508.00</h2>
          <p className="mini-para">
            Herbsfox Shital Chini – All Spice Berries – Kabab Chini – Tailed
            Pepper – Kawab Chini – Piper Cubeba
          </p>
          <ul>
            <li className="mini-para">Introduction to Shital Chini:</li>
          </ul>
          <p className="paragraph">
            Shital Chini, also known as Cinnamomum Tamala or Indian bay leaf, is
            an aromatic herb commonly used in Ayurvedic medicine for its cooling
            properties and health benefits. With a rich history that dates back
            thousands of years, this versatile herb has gained popularity not
            only in traditional medicine but also in the culinary world. In this
            article, we will explore the history, health benefits, usage, side
            effects, and conclusion of Shital Chini, shedding light on why it
            has been valued for centuries.
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
            <p>SKU: 43</p>
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
                    <h4>HHistory of Shital Chini:</h4>
                    Shital Chini has its roots in ancient Ayurvedic medicine,
                    which originated in India over 5,000 years ago. This
                    holistic system of medicine emphasizes the balance between
                    mind, body, and spirit, using herbs and natural remedies to
                    promote well-being. In Ayurveda, Shital Chini is revered for
                    its cooling and medicinal properties, making it an essential
                    ingredient in various traditional formulations.
                  </li>
                  <li>
                    <h4>Health Benefits of Shital Chini:</h4>
                    1. Cooling Properties: Shital Chini is highly regarded for
                    its cooling effect on the body, making it a popular choice
                    during hot summer months or to alleviate conditions like
                    heat stroke or fever. It helps to regulate body temperature
                    and provides relief from excessive heat.
                    <br />
                    2. Digestive Aid: This herb is known for its carminative
                    properties, which means it aids in digestion by preventing
                    gas formation and bloating. It also stimulates the
                    production of digestive enzymes, promoting a healthy
                    digestive system.
                    <br />
                    3. Respiratory Health: If you are suffering from respiratory
                    issues like asthma, bronchitis, or a common cold, Shital
                    Chini can provide relief. Its expectorant properties help to
                    loosen mucus, making it easier to expel from the body.
                    <br />
                    4. Anti-inflammatory Agent: Shital Chini possesses powerful
                    anti-inflammatory properties, which can help to alleviate
                    various conditions like arthritis, joint pain, and muscle
                    inflammation. Regular consumption can reduce swelling and
                    pain associated with inflammatory diseases.
                    <br />
                    5. Antimicrobial Properties: Shital Chini contains compounds
                    that have antimicrobial properties, helping to fight against
                    bacteria, viruses, and fungi. It can be used as a natural
                    remedy for various infections, including urinary tract
                    infections, skin infections, and respiratory infections.
                    <br />
                    6. Oral Health: With its antimicrobial properties, Shital
                    Chini helps combat oral bacteria responsible for gum
                    diseases, tooth decay, and bad breath. Using it as a mouth
                    rinse or adding it to toothpaste can promote good oral
                    hygiene.
                  </li>
                  <li>
                    <h4>Usage of Shital Chini:</h4>
                    1. Ayurvedic Formulations: Shital Chini is an essential
                    ingredient in various Ayurvedic formulations, including
                    herbal supplements, powders, and oils. It is often combined
                    with other herbs to create medicinal concoctions tailored to
                    specific health conditions.
                    <br />
                    2. Culinary Purposes: Shital Chini is widely used in Indian
                    cuisine to enhance the flavor and aroma of dishes. It is a
                    key ingredient in savory dishes like biryanis, curries, and
                    lentil soups.
                    <br />
                    3. Herbal Teas: You can enjoy the health benefits of Shital
                    Chini by preparing herbal teas. Simply boil one or two bay
                    leaves in water for a few minutes, strain, and consume. This
                    can be a refreshing and soothing beverage for a hot summer
                    day.
                  </li>
                  <li>
                    <h4>Side Effects of Shital Chini:</h4>
                    While Shital Chini is generally considered safe for
                    consumption, it is essential to exercise caution and consume
                    it in moderation. Excessive intake may cause certain side
                    effects, including:
                    <br />
                    1. Allergic Reactions: Some individuals may be allergic to
                    Shital Chini, resulting in rashes, itching, or difficulty
                    breathing. If you experience any allergic symptoms,
                    discontinue use and consult a healthcare professional.
                    <br />
                    2. Stomach Discomfort: In rare cases, Shital Chini may cause
                    stomach discomfort, nausea, or diarrhea, especially if
                    consumed in high quantities or by those with sensitive
                    stomachs. Adjusting the dosage or consulting a healthcare
                    professional is recommended.
                  </li>
                  <li>
                    <h4>Conclusion:</h4>
                    Shital Chini, with its rich history and remarkable health
                    benefits, has proved its worth as a versatile herb in
                    Ayurvedic medicine. From its cooling properties to its
                    diverse range of medicinal attributes, this herb has become
                    an integral part of many Ayurvedic formulations and
                    traditional recipes. As always, it is advisable to consult a
                    healthcare professional before incorporating Shital Chini
                    into your healthcare routine to ensure its suitability for
                    your individual needs. By exploring the wonders of this
                    herb, we can further appreciate the ancient wisdom of
                    Ayurveda and its holistic approach to health and well-being.
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

export default Shitalchini;
