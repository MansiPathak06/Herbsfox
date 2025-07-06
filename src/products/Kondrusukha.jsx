import React, { useState } from "react";

import "./Products.css";
import Footer from "../pages/Footer";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ProductData from "../data/ProductData";
import { useEffect } from "react";

const Kondrusukha = () => {
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
    "100gm": 286,
    "200gm": 416,
    "400gm": 606,
    "800gm": 951,
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
            src="/images/kondru-sukha-2.webp"
            className="image-h"
            alt="Kondrusukha"
          />
          <div className="sub-images">
            <img
              src="/images/kondru-sukha-3.webp"
              className="image-1"
              alt="Kondrusukha"
              onClick={() => openFullscreen("/images/kondru-sukha-3.webp")}
            />
            <img
              src="/images/kondru-sukha-4.webp"
              className="image-2"
              alt="Kondrusukha"
              onClick={() => openFullscreen("/images/kondru-sukha-4.webp")}
            />
            <img src="/images/kondru-sukha.webp" alt="Kondrusukha" onClick={() => openFullscreen("/images/kondru-sukha.webp")} />
          </div>
        </div>

        <div className="rightside-container">
          <h2 className="product-heading">Kondrusukha</h2>
          <h2 className="cost">₹286.00 – ₹951.00</h2>
          <p className="mini-para">
            Herbsfox Gond Kondru – Salai Gum – Gond Kundru – Issas – Shallaki
            Gum – Gum Olibanum – Mora – Boswellia serrata
          </p>
          <ul>
            <li className="mini-para">Introduction to kondrusukha:</li>
          </ul>
          <p className="paragraph">
            Gond Kondru, also known as Shallaki Gum, is a medicinal herb that
            has been used for centuries in traditional Ayurvedic medicine. It is
            derived from the resin of the Boswellia serrata tree, which is
            native to India. Gond Kondru has gained popularity for its numerous
            health benefits and is commonly used to support joint health and
            reduce inflammation.
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
                    id: "Kondrusukha",
                    name: "Kondrusukha",
                    price: price,
                    quantity,
                    weight: selectedWeight,
                    image: "/images/kondru-sukha-2.webp",
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
            <p>SKU: 15</p>
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
                    <h4>History Of kondrusukha:</h4>
                    Gond Kondru, or Shallaki Gum, has a long history of use in
                    Ayurvedic medicine. Ayurveda is an ancient Indian system of
                    medicine that originated more than 5,000 years ago. It
                    incorporates the use of natural herbs, minerals, and other
                    remedies to treat various ailments and promote overall
                    well-being.
                    <br />
                    The use of Gond Kondru can be traced back to ancient texts
                    of Ayurveda, such as the Charaka Samhita and the Sushruta
                    Samhita. These texts describe the therapeutic properties of
                    Shallaki Gum and its usefulness in treating joint-related
                    disorders, respiratory conditions, and digestive problems.
                    <br />
                    n traditional Ayurvedic medicine, Gond Kondru is classified
                    as a “Guggulu.” Guggulus are a group of resinous substances
                    derived from different trees, including Boswellia serrata,
                    which is the source of Shallaki Gum. Guggulus are highly
                    valued for their medicinal properties and have been used for
                    centuries to support overall health.
                    <br />
                  </li>
                  <li>
                    <h4>Health Benefits of Kondru:</h4>
                    1. Joint Health: Gond Kondru is widely recognized for its
                    positive effects on joint health. It contains active
                    compounds that help reduce inflammation and soothe joint
                    pain, making it beneficial for individuals suffering from
                    arthritis, rheumatism, or other joint-related issues.
                    <br />
                    2. Anti-inflammatory properties: The resin extracted from
                    Gond Kondru contains potent anti-inflammatory properties. It
                    inhibits the production of inflammatory molecules, such as
                    leukotrienes, that contribute to chronic inflammation.
                    Regular consumption can help reduce inflammation throughout
                    the body.
                    <br />
                    3.Digestive Health: Gond Kondru has been used traditionally
                    to improve digestion and treat gastrointestinal disorders.
                    It aids in proper digestion, reduces bloating, and relieves
                    stomach discomfort. Its anti-inflammatory properties can
                    also alleviate symptoms of conditions like irritable bowel
                    syndrome (IBS) and Crohn’s disease.
                    <br />
                    4.Respiratory Health: Due to its expectorant properties,
                    Gond Kondru is effective in easing respiratory conditions
                    like asthma and bronchitis. It helps to clear the airways,
                    suppress coughing, and reduce inflammation, promoting better
                    respiratory health.
                    <br />
                    5. Wound Healing: When used topically, Gond Kondru has been
                    found to accelerate the healing process for wounds, cuts,
                    and bruises. It possesses antimicrobial properties that
                    prevent infections and aids in tissue regeneration.
                    <br />
                  </li>
                  <li>
                    <h4>Usage of Kondru:</h4>
                    Gond Kondru is available in various forms, including powder,
                    tablets, capsules, and oil. Here are some common ways it is
                    used: 1. Oral Consumption: Gond Kondru can be consumed
                    orally in the form of capsules or tablets. The recommended
                    dosage is usually around 300-500 mg, twice a day, or as
                    directed by a healthcare professional.
                    <br />
                    2. Topical Application: For treating wounds and joint pain,
                    Gond Kondru oil or paste can be applied directly to the
                    affected areas. Massage gently until absorbed for maximum
                    benefits.
                    <br />
                  </li>
                  <li>
                    <h4>Side Effects of Kondru:</h4>
                    Gond Kondru is generally safe for consumption and topical
                    use. However, some individuals may experience mild side
                    effects such as nausea, stomach upset, or skin irritation.
                    It is advisable to consult with a healthcare professional
                    before using Shallaki Gum, especially if you have any
                    underlying medical conditions or are taking other
                    medications.
                  </li>
                  <li>
                    <h4>Conclusion:</h4>
                    Gond Kondru, or Shallaki Gum, is a beneficial medicinal herb
                    that has been used in traditional medicine for its numerous
                    health benefits. From supporting joint health to reducing
                    inflammation and promoting digestive well-being, it offers a
                    natural and holistic approach to various health issues.
                    Despite its positive effects, individuals should always
                    consult a healthcare professional before incorporating Gond
                    Kondru into their healthcare routine to ensure safe and
                    effective usage.
                  </li>
                </ul>
              </p>
            )}
          </div>
        </div>
      </div>

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

export default Kondrusukha;
