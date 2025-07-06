import React, { useState } from "react";

import "./Products.css";
import Footer from "../pages/Footer";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ProductData from "../data/ProductData";
import { useEffect } from "react";

const Kalimusli = () => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    setRelatedProducts(getRelatedProducts());
  }, []);
  const getRelatedProducts = () => {
    const productsExceptCurrent = ProductData.filter(
      (product) => product.caption.toLowerCase() !== "kaalijiri"
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
    "100gm": 271,
    "200gm": 384,
    "400gm": 543,
    "800gm": 828,
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
            src="/images/kali-musli-2.webp"
            className="image-h"
            alt="Kalimusli"
            
          />
          <div className="sub-images">
            <img
              src="/images/kali-musli-1.webp"
              className="image-1"
              alt="Kalimusli"
              onClick={() => openFullscreen("/images/kali-musli-1.webp")}
            />
            <img
              src="/images/Orange-Black-Modern-Photocentric-Skincare-Product-Instagram-Post-1.webp"
              className="image-2"
              alt="Kalimusli"
              onClick={() => openFullscreen("/images/Orange-Black-Modern-Photocentric-Skincare-Product-Instagram-Post-1.webp")}
            />
            <img src="/images/16-2.webp" className="image-3" alt="Kalimusli" 
            onClick={() => openFullscreen("/images/16-2.webp")}/>
          </div>
        </div>

        <div className="rightside-container">
          <h2 className="product-heading">Kali Musli</h2>
          <h2 className="cost">₹271.00 – ₹828.00</h2>
          <p className="mini-para">
            Herbsfox Kali Musli – Musli Black – Curculigo orchioides – Siyah
            Musli – Shyam Musli
          </p>
          <ul>
            <li className="mini-para">Introduction to Kali Musli:</li>
          </ul>
          <p className="paragraph">
            Kali Musli, scientifically known as Curculigo Orchioides, is an herb
            that has been used in traditional medicine for its various health
            benefits. It belongs to the Hypoxidaceae family and is native to
            India, Pakistan, and some Southeast Asian countries. Also known as
            Black Musli or Taalmuli, Kali Musli has gained popularity in recent
            years due to its potential therapeutic properties.
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
                    id: "Kali musli",
                    name: "Kali musli",
                    price: price,
                    quantity,
                    weight: selectedWeight,
                    image: "/images/kali-musli-2.webp",
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
            <p>SKU: 28</p>
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
                    <h4>History of Kali Musli:</h4>
                    Historically, Kali Musli has been used in Ayurveda and Unani
                    medicine systems for centuries. It has been regarded as an
                    aphrodisiac, adaptogen, and rejuvenating herb. The roots of
                    Kali Musli are the primary part used for medicinal purposes,
                    and they are often harvested for their active compounds.
                  </li>
                  <li>
                    <h4>Health Benefits of Kali Musli:</h4>
                    One of the most significant health benefits associated with
                    Kali Musli is its aphrodisiac effect. It is believed to
                    enhance libido, improve sexual performance, and treat
                    various sexual disorders, including erectile dysfunction and
                    premature ejaculation. The herb is considered to be a
                    natural alternative to synthetic drugs for enhancing sexual
                    health
                    <br />
                    Moreover, Kali Musli is known for its adaptogenic
                    properties, which means it helps the body adapt to different
                    stressors. It is believed to reduce physical and mental
                    fatigue, boost energy levels, and improve overall stamina
                    and endurance. This makes it a popular choice among athletes
                    and individuals who engage in physically demanding
                    activities.
                    <br />
                    Additionally, Kali Musli has been researched for its
                    potential antioxidant, anti-inflammatory, and
                    immune-modulating effects. Some studies suggest that it may
                    help reduce oxidative stress, support a healthy immune
                    system, and alleviate inflammation-related conditions such
                    as arthritis and allergies.
                    <br />
                  </li>
                  <li>
                    <h4>Usage of Kali Musli:</h4>
                    Regarding usage, Kali Musli can be consumed in various
                    forms, including capsules, powders, extracts, or as a
                    decoction with milk or water. The recommended dosage may
                    vary depending on the specific health condition and
                    individual needs. However, it is always advisable to consult
                    a healthcare professional or an Ayurvedic practitioner
                    before incorporating Kali Musli into your routine.
                  </li>
                  <li>
                    <h4>Side Effects Of kali musli:</h4>
                    While Kali Musli is generally considered safe for most
                    individuals when taken in moderate doses, there are some
                    potential side effects to be aware of. These may include
                    digestive discomfort, such as nausea or diarrhea, and
                    allergic reactions in sensitive individuals. It is crucial
                    to follow the recommended dosage and monitor any adverse
                    reactions that may occur.
                    <br />
                    In conclusion, Kali Musli (Curculigo Orchioides) is a
                    traditional herb with a long history of use in Ayurveda and
                    Unani medicine. It is renowned for its aphrodisiac,
                    adaptogenic, and immune-modulating properties. While it
                    offers potential health benefits,
                    <strong>
                      {" "}
                      it is essential to use it responsibly and consult a
                      healthcare professional before starting any herbal
                      supplementation.
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

export default Kalimusli;
