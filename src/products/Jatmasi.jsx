import React, { useState } from "react";

import "./Products.css";
import Footer from "../pages/Footer";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ProductData from "../data/ProductData";
import { useEffect } from "react";

const Jatmasi = () => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    setRelatedProducts(getRelatedProducts());
  }, []);
  const getRelatedProducts = () => {
    const productsExceptCurrent = ProductData.filter(
      (product) => product.caption.toLowerCase() !== "inderyanphal"
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
    "100gm": 332,
    "200gm": 530,
    "400gm": 798,
    "800gm": 1349,
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
            src="/images/jatamansi-2.webp"
            className="image-h"
            alt="jatmasi"
          />
          <div className="sub-images">
            <img
              src="/images/jatamansi-3.webp"
              className="image-1"
              alt="jatmasi"
               onClick={() => openFullscreen("/images/jatamansi-3.webp")}
            />
            <img
              src="/images/Blue-Simple-Hair-Conditioner-Product-Preview-Instagram-Post-2.webp"
              className="image-2"
              alt="jatmasi"
               onClick={() => openFullscreen("/images/Blue-Simple-Hair-Conditioner-Product-Preview-Instagram-Post-2.webp")}
            />
            <img src="/images/45.webp" className="image-3" alt="jatmasi" 
             onClick={() => openFullscreen("/images/45.webp")}/>
          </div>
        </div>

        <div className="rightside-container">
          <h2 className="product-heading">Jatamasi</h2>
          <h2 className="cost">₹.332.00 – ₹1,349.00</h2>
          <p className="mini-para">
            Herbsfox Jatamansi (Root) – Spikenard – Balchad – Nardostachys
            Jatamansi
          </p>
          <ul>
            <li className="mini-para">Introduction to Jatamansi:</li>
          </ul>
          <p className="paragraph">
            Jatamansi, scientifically known as Nardostachys jatamansi, is a
            perennial herb native to the Himalayas, particularly found in India,
            Nepal, and Bhutan. It is a member of the Valerianaceae family and
            has been used in traditional medicine for centuries due to its
            numerous health benefits. The plant has a strong, earthy fragrance
            that has earned it the nickname “spikenard.” Jatamansi has been
            widely recognized for its calming and grounding properties, making
            it a popular herb for promoting relaxation and overall well-being.
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
                    id: "Jatmasi",
                    name: "Jatmasi",
                    price: price,
                    quantity,
                    weight: selectedWeight,
                    image: "/images/jatamansi-2.webp",
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
            <p>SKU: 36</p>
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
                    <h4>History of Jatamansi:</h4>
                    The history of Jatamansi dates back thousands of years, with
                    its use being documented in ancient Ayurvedic texts. In
                    Ayurveda, Jatamansi is highly valued for its medicinal
                    properties and is considered a “rasayana,” which means it is
                    believed to promote longevity and vitality. The herb has
                    been traditionally used to treat a wide range of ailments,
                    including insomnia, anxiety, stress, and digestive
                    disorders. Jatamansi was also used as an ingredient in
                    perfumes and cosmetics due to its distinct aroma.
                  </li>
                  <li>
                    <h4>Health Benefits of Jatamansi:</h4>
                    1. Stress and Anxiety Relief: One of the most well-known
                    benefits of Jatamansi is its ability to reduce stress and
                    anxiety. The herb contains compounds that have a calming
                    effect on the nervous system, promoting relaxation and
                    improving overall mood. Its soothing properties make it an
                    excellent natural remedy for anxiety disorders and
                    stress-related conditions.
                    <br />
                    2. Sleep Aid: Jatamansi has been used as a natural sleep aid
                    for centuries. It helps calm the mind and induces deep,
                    restful sleep. Regular consumption of Jatamansi tea or
                    capsules can improve sleep quality and tackle insomnia.
                    <br />
                    3. Cognitive Health: Jatamansi has neuroprotective
                    properties that may help improve cognitive function and
                    memory. It has been used in Ayurvedic medicine to support
                    mental clarity, enhance focus, and treat conditions such as
                    ADHD and Alzheimer’s disease.
                    <br />
                    4. Skin Health: Jatamansi is widely recognized for its skin
                    benefits. It is believed to have antioxidant and
                    anti-inflammatory properties that can help reduce skin
                    inflammation, soothe irritations, and promote healthy skin.
                    Jatamansi oil is often used in skincare products to
                    rejuvenate the skin, reduce signs of aging, and improve
                    complexion.
                    <br />
                    5. Digestive Aid: Jatamansi has long been used as a
                    digestive aid in traditional medicine. It can help stimulate
                    the digestive system, alleviate indigestion, reduce
                    bloating, and ease symptoms of irritable bowel syndrome
                    (IBS).
                  </li>
                  <li>
                    <h4>Usage of Jatamansi:</h4>
                    Jatamansi can be used in various forms, including dried
                    powder, capsules, extracts, essential oils, and teas. Here
                    are some common ways to incorporate Jatamansi into your
                    daily routine:
                    <br />
                    - Jatamansi Tea: Steep 1-2 teaspoons of dried Jatamansi root
                    powder in hot water for 10-15 minutes. Strain and enjoy this
                    soothing tea before bedtime for better sleep or during the
                    day to promote relaxation and stress relief.
                    <br />
                    – Jatamansi Oil: Jatamansi essential oil can be used
                    topically for skincare purposes. Dilute a few drops of the
                    oil in a carrier oil like coconut or almond oil and apply it
                    to the skin for its anti-aging and calming properties.
                    <br />– Jatamansi Capsules: Jatamansi supplements are
                    available in capsule form, making it convenient to
                    incorporate the herb into your daily routine. Follow the
                    recommended dosage provided by the manufacturer or consult a
                    healthcare professional for guidance.
                  </li>
                  <li>
                    <h4>Side Effects of Jatamansi:</h4>
                    Jatamansi is generally considered safe when taken in
                    recommended doses. However, some individuals may experience
                    mild side effects such as drowsiness, gastrointestinal
                    discomfort, or allergic reactions. It is advisable to start
                    with a small dosage and gradually increase it to minimize
                    any potential side effects. Pregnant and lactating women
                    should consult with a healthcare professional before using
                    Jatamansi.
                    <br />
                  </li>
                  <li>
                    <h4>Conclusion:</h4>
                    Jatamansi is a versatile herb known for its numerous health
                    benefits. From relieving stress and anxiety to promoting
                    good sleep and supporting skin health, this Himalayan herb
                    offers a natural and holistic approach to well-being. With
                    its rich history in Ayurvedic medicine and growing
                    popularity worldwide, Jatamansi is a valuable herb to
                    consider incorporating into your daily routine. However, it
                    is always recommended to seek advice from a healthcare
                    professional before starting any new herbal regimen to
                    ensure optimal results and safety.
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

export default Jatmasi;
