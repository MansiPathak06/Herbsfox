import React, { useState } from "react";

import "./Products.css";
import Footer from "../pages/Footer";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ProductData from "../data/ProductData";
import { useEffect } from "react";

const Jaiphal = () => {
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
            src="/images/jaiphal-2.webp"
            className="image-h"
            alt="jaiphal"
          />
          <div className="sub-images">
          <img
            src="/images/jaiphal-1.webp"
            className="image-1"
            alt="jaiphal"
            onClick={() => openFullscreen("/images/jaiphal-1.webp")}
          />
          <img
            src="/images/Blue-Simple-Hair-Conditioner-Product-Preview-Instagram-Post-2.webp"
            className="image-2"
            alt="jaiphal"
               onClick={() => openFullscreen("/images/Blue-Simple-Hair-Conditioner-Product-Preview-Instagram-Post-2.webp")}
          />
          <img
            src="/images/jaiphal-3.webp"
            className="image-3"
            alt="jaiphal"
               onClick={() => openFullscreen("/images/jaiphal-3.webp")}
          />
          </div>

        </div>

        <div className="rightside-container">
          <h2 className="product-heading">Jaiphal</h2>
          <h2 className="cost">₹332.00 – ₹1,349.00</h2>
          <p className="mini-para">
          Herbsfox Jaiphal (Asli) – Nutmeg – Jatiphal – Jayaphal – Jayfal – Jayphal – Jaifal – Myristica Fragrans
          </p>
          <ul>
            <li className="mini-para">Introduction to Jaiphal:</li>
          </ul>
          <p className="paragraph">
          Jaiphal, also known as nutmeg, is a popular spice known for its unique flavor and numerous health benefits. It has been used for centuries in traditional medicine and culinary practices. This article will delve into the history, medicinal properties, usage, and potential side effects of this remarkable spice.
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
                              id: "Jaiphal",
                              name: "Jaiphal",
                              price: price,
                              quantity,
                              weight: selectedWeight,
                              image: "/images/jaiphal-2.webp",
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
            <p>SKU: 35</p>
            <p>CATEGORY: SPICES</p>
            <p>[social_share-list]</p>
          </div>
          <br/>
          <div className="description-wrapper">
            <button onClick={handleToggle}>DESCRIPTION</button>
            {showDescription && (
              <p className="description-text">
                <ul>
                  <li><h4>Introduction to Jaiphal:</h4>
                  Jaiphal, scientifically known as Myristica fragrans, is an evergreen tree native to the Moluccas (also known as the Spice Islands) in Indonesia. It belongs to the Myristicaceae family and is primarily cultivated for its seeds, which are the source of both nutmeg and mace.<br/>
                  The tree can grow up to 20 meters tall and bears fruit, which resembles a small pear. Inside the fruit is a hard, oval-shaped seed surrounded by a lacy, red-colored aril known as mace. The seed is commonly referred to as nutmeg and has a brownish color with a characteristic aromatic smell and warm, slightly sweet taste.
                  </li>
                  <li><h4>History of Jaiphal:</h4>
                  The history of Jaiphal dates back thousands of years. It was primarily cultivated in the Moluccas, a region known for its abundant spice trade. The spice quickly gained popularity among traders, and its demand gradually spread throughout the world. Eventually, nutmeg became highly prized and was regarded as a valuable commodity during the medieval period.<br/>
                  The Arabs were one of the first to introduce nutmeg to the Mediterranean region. Later, it reached Europe, where it became a symbol of wealth and status. Nutmeg was considered an exotic and luxurious spice, commonly used in traditional medicine and culinary applications.
                  </li>
                  <li><h4>Health Benefits of Jaiphal:</h4>
                  1. Digestive Aid: Jaiphal has been used as a traditional remedy for digestive issues like bloating, constipation, and indigestion. It contains essential oils that help stimulate the secretion of digestive enzymes, promoting better nutrient absorption and easing digestion.<br/>
                  2. Pain Relief: The essential oil present in Jaiphal, called myristicin, possesses analgesic properties that can help alleviate various types of pain, including headaches, joint pain, and muscle aches. Massaging nutmeg oil onto the affected area can provide quick relief.<br/>
                  3.Enhances Brain Function: Nutmeg is known to enhance brain function and memory. It contains compounds that can help improve cognitive function and reduce the risk of neurodegenerative diseases like Alzheimer’s and dementia.<br/>
                  4. Detoxification: Jaiphal is often used in detoxifying the body and cleansing the liver. It aids the elimination of toxins from the body, purifies the blood, and stimulates the elimination of waste products, promoting overall health.<br/>
                  5. Respiratory Health: Nutmeg has expectorant properties that provide relief from respiratory issues like cough, cold, and asthma. It helps to clear congestion in the respiratory tract, making breathing easier.<br/>
                  6. Improves Sleep: The sedative properties of Jaiphal make it an effective natural remedy for insomnia and sleep disorders. Consuming nutmeg before bedtime can help induce sleep and improve sleep quality.<br/></li>
                  <li><h4>Usage of Jaiphal:</h4>
                  Jaiphal is widely used in both culinary and medicinal practices across various cultures. In culinary applications, it is used as a spice to enhance the flavor of both sweet and savory dishes. It is commonly used in baking, confectionery, and beverages. Nutmeg can be ground or grated and can be added to a range of dishes, including curries, stews, soups, desserts, and beverages like eggnog or mulled wine.<br/>
                  In traditional medicine, Jaiphal is utilized in various forms:<br/>
                  1. Powder: Ground nutmeg is used in medicinal preparations like capsules, teas, and poultices.<br/>
                  2. Essential Oil: Nutmeg essential oil is extracted from the seeds and used in aromatherapy, massage oils, and topical applications.<br/>
                  3. Paste: A paste made from ground nutmeg and water can be used topically to relieve pain or applied as a natural face mask to improve skin health.<br/>
                  </li>
                  <li><h4>Side Effects of Jaiphal:</h4>
                  While Jaiphal offers numerous health benefits, it is essential to consume it in moderation. Excessive consumption can lead to potential side effects:<br/>
                  1. Hallucinations: Consuming an excessive amount of nutmeg can cause hallucinations and induce a sense of euphoria. However, these effects can be unsettling and may even lead to panic attacks or feelings of extreme discomfort.<br/>
                  2. Nausea and Vomiting: Consuming large quantities of Jaiphal can lead to digestive issues like nausea and vomiting. It is best to adhere to the recommended dosage and use the spice sparingly in culinary endeavors.<br/>
                  </li>
                  <li><h4>Conclusion :</h4>
                  Jaiphal, or nutmeg, is a versatile spice with a rich history and incredible health benefits. From aiding digestion to improving brain function, this aromatic spice offers various medicinal properties. However, it is crucial to consume Jaiphal in moderation and avoid excessive use to prevent potential side effects. Incorporating nutmeg into your diet and incorporating it into your self-care routines can lead to improved overall health and wellness.
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

export default Jaiphal;
