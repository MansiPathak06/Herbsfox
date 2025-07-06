import React, { useState } from "react";

import "./Products.css";
import Footer from "../pages/Footer";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ProductData from "../data/ProductData";
import { useEffect } from "react";

const Kahujeera = () => {
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
    "100gm": 234,
    "200gm": 348,
    "400gm": 454,
    "800gm": 691,
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
            src="/images/kahu-jeera-2.webp"
            className="image-h"
            alt="Kahujeera"
          />
          <div className="sub-images">
          <img
            src="/images/kahu-jeera-1.webp"
            className="image-1"
            alt="Kahujeera"
             onClick={() => openFullscreen("/images/kahu-jeera-1.webp")}
          />
          <img
            src="/images/Blue-Simple-Hair-Conditioner-Product-Preview-Instagram-Post-2.webp"
            className="image-2"
            alt="kahujeera"
             onClick={() => openFullscreen("/images/Blue-Simple-Hair-Conditioner-Product-Preview-Instagram-Post-2.webp")}
          />
          <img
            src="/images/kahu-jeera-3.webp"
            className="image-3"
            alt="kahujeera"
             onClick={() => openFullscreen("/images/kahu-jeera-3.webp")}
          />
          </div>

        </div>

        <div className="rightside-container">
          <h2 className="product-heading">Kahu Jeera</h2>
          <h2 className="cost">₹234.00 – ₹691.00</h2>
          <p className="mini-para">
          Herbsfox Kahu Jeera – Kahoo Jira – Kahu Beej – Lettuce Seeds – Lactuca Sativa
          </p>
          <ul>
            <li className="mini-para">Introduction to Kahu Jeera:</li>
          </ul>
          <p className="paragraph">
          Kahu Jeera, also known as Black Cumin or Nigella Sativa, is a popular spice that has been used for centuries in traditional medicine and culinary practices. This small, black-colored seed is native to the Mediterranean region and has gained popularity worldwide due to its various health benefits. Kahu Jeera is known for its unique flavor and taste, making it a versatile and highly sought-after spice in many cuisines. In this article, we will explore the history, health benefits, usage, and potential side effects of Kahu Jeera, providing a comprehensive overview of this remarkable spice.
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
                              id: "Kahujeera",
                              name: "Kahujeera",
                              price: price,
                              quantity,
                              weight: selectedWeight,
                              image: "/images/kahu-jeera-2.webp",
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
            <p>SKU: 38</p>
            <p>CATEGORY: HERBS</p>
            <p>[social_share-list]</p>
          </div>
          <br/>
          <div className="description-wrapper">
            <button onClick={handleToggle}>DESCRIPTION</button>
            {showDescription && (
              <p className="description-text">
                <ul>
                  <li><h4>History of Kahu Jeera:</h4>
                  Kahu Jeera has a rich history that dates back thousands of years. It has been used in traditional medicine systems such as Ayurveda and Unani for its therapeutic properties. The ancient Egyptians even buried Nigella Sativa seeds with their pharaohs, believing that it would provide them with protection in the afterlife. Additionally, Kahu Jeera has been mentioned in religious texts such as the Bible and the Quran, further highlighting its significance in various cultures throughout history.</li>
                  <li><h4>Health Benefits of Kahu Jeera:</h4>
                  1. Rich in Antioxidants: Kahu Jeera is packed with antioxidants that help protect the body against harmful free radicals, reducing the risk of chronic diseases such as heart disease and cancer.<br/>
                  2. Anti-inflammatory Properties: The active compounds present in Kahu Jeera, such as thymoquinone, have strong anti-inflammatory properties that can help alleviate symptoms of various inflammatory conditions, including arthritis and asthma.<br/>
                  3. Boosts Immunity: Regular consumption of Kahu Jeera can strengthen the immune system, thanks to its immune-enhancing properties. It may help fight off infections and reduce the severity of allergic reactions.<br/>
                  4. Supports Digestive Health: Kahu Jeera has been used traditionally to aid digestion and relieve digestive discomforts such as bloating, indigestion, and flatulence. It stimulates the production of digestive enzymes, facilitating the breakdown of food.<br/>
                  5. Promotes Respiratory Health: Kahu Jeera is known for its beneficial effects on the respiratory system. It can help reduce symptoms of respiratory conditions like cough, cold, and bronchitis due to its expectorant properties.<br/>
                  6. Improves Skin and Hair Health: The antimicrobial and anti-inflammatory properties of Kahu Jeera make it an excellent remedy for various skin conditions, including acne, eczema, and psoriasis. Additionally, it can promote hair growth and reduce hair loss when used topically or consumed orally.
                  </li>
                  <li><h4>Usage of Kahu Jeera:</h4>
                  Kahu Jeera can be used in various forms to enhance the flavor and nutritional value of dishes. Here are some common ways to incorporate this spice into your diet:<br/>
                  1. Culinary Uses: Kahu Jeera is often used as a spice in dishes, providing a warm, earthy flavor that complements a wide range of cuisines. It is commonly used in Middle Eastern, Indian, and North African cuisines. It can be added to curries, rice dishes, soups, and bread, among others.<br/>
                  2. Herbal Tea: Kahu Jeera can be used to make a delicious and aromatic herbal tea. Simply steep a teaspoon of the seeds in hot water for a few minutes, strain, and enjoy. This tea not only offers a soothing and refreshing experience but also provides various health benefits.<br/>
                  3. Oil Infusions: Kahu Jeera oil can be infused with carrier oils, such as coconut oil or olive oil, to create a potent oil with numerous health benefits. This infused oil can be used topically for skin and hair care or consumed orally for its medicinal properties.</li>
                  <li><h4>Side Effects of Kahu Jeera:</h4>
                  While Kahu Jeera is generally safe for consumption, there are a few potential side effects to be aware of:<br/>
                  1. Allergic Reactions: Some individuals may be allergic to Kahu Jeera, experiencing symptoms such as rash, itching, or difficulty breathing. It is important to discontinue use and seek medical attention if any allergic reactions occur.<br/>
                  2. Bleeding Disorders: Kahu Jeera may have blood-thinning properties. Thus, individuals with bleeding disorders or those taking anticoagulant medications should exercise caution and consult a healthcare professional before consuming large amounts of this spice.<br/>
                  3. Pregnancy and Lactation: Pregnant and lactating women should consult their healthcare providers before incorporating Kahu Jeera into their diets. While it has been traditionally used during these phases, it is essential to ensure its safe usage.

                  </li>
                  <li><h4>Conclusion:</h4>
                  Kahu Jeera, or Black Cumin, is a versatile spice that offers numerous health benefits. From its antioxidant and anti-inflammatory properties to its positive effects on digestion, respiratory health, and skin and hair care, Kahu Jeera has proven to be a valuable addition to any diet. However, it is crucial to exercise caution and seek professional advice, especially for individuals with specific health conditions or those taking medications. With its rich history and impressive range of health benefits, Kahu Jeera continues to make its mark in both the culinary and medicinal worlds, providing a unique and flavorful experience for all.
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
      <Footer/>
    </div>
  );
};

export default Kahujeera;
