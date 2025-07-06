import React, { useState } from "react";

import "./Products.css";
import Footer from "../pages/Footer";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ProductData from "../data/ProductData";
import { useEffect } from "react";

const Chiaseeds = () => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    setRelatedProducts(getRelatedProducts());
  }, []);
  const getRelatedProducts = () => {
    const productsExceptCurrent = ProductData.filter(
      (product) => product.caption.toLowerCase() !== "chadila"
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
    "100gm": 210,
    "200gm": 288,
    "400gm": 339,
    "800gm": 444,
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
            src="/images/chia-seeds-2.webp"
            className="image-h"
            alt="Chiaseeds"
          />
          <div className="sub-images">
          <img
            src="/images/chia-seeds-3.webp"
            className="image-1"
            alt="Chiaseeds"
             onClick={() => openFullscreen("/images/chia-seeds-2.webp")}
          />
          <img
            src="/images/chia-seeds-4.webp"
            className="image-2"
            alt="Chiaseeds"
            onClick={() => openFullscreen("/images/chia-seeds-4.webp")}

          />
          <img
            src="/images/chia-seeds.webp"
            className="image-3"
            alt="Chiaseeds"
            onClick={() => openFullscreen("/images/chia-seeds.webp")}

          />
          </div>

        </div>

        <div className="rightside-container">
          <h2 className="product-heading">Chia Seeds</h2>
          <h2 className="cost">₹210.00 – ₹444.00</h2>
          <p className="mini-para">
          Herbsfox Chia (Raw Seeds) – Chia Beej – Siya Seeds – Tokma Dana – Salvia Hispanica
          </p>
          <ul>
            <li className="mini-para">Introduction to Chia Seeds:</li>
          </ul>
          <p className="paragraph">
          Chia seeds, scientifically known as Salvia hispanica, are tiny black or white seeds that belong to the mint family. These seeds have gained popularity in recent years due to their numerous health benefits and versatility in various culinary applications. Chia seeds are known for their high nutritional value and are often considered a superfood due to their rich concentration of essential nutrients.
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
                              id: "Chiaseeds",
                              name: "Chiaseeds",
                              price: price,
                              quantity,
                              weight: selectedWeight,
                              image: "/images/chia-seeds-2.webp",
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
            <p>SKU: 8</p>
            <p>CATEGORY: SEEDS</p>
            <p>[social_share-list]</p>
          </div>
          <br/>
          <div className="description-wrapper">
            <button onClick={handleToggle}>DESCRIPTION</button>
            {showDescription && (
              <p className="description-text">
                <ul>
                  <li><h4>History of Chia Seeds:</h4>
                  Chia seeds have a long and rich history, dating back thousands of years. They were a staple food for the ancient Aztecs and Mayans, who highly valued their nutritional and medicinal properties. These civilizations recognized chia seeds as a source of sustainable energy, often providing strength and stamina for warriors during battles. In fact, “chia” itself comes from the ancient Mayan word for “strength.”</li>
                  <li><h4>Health Benefits of Chia Seeds:</h4>
                  Chia seeds are praised for their impressive nutrient profile, making them an excellent addition to a healthy diet. Some of the notable health benefits associated with chia seeds include:<br/>
                  1. High in Nutrients: Chia seeds are packed with essential vitamins, minerals, and antioxidants. They are an excellent source of fiber, protein, calcium, magnesium, and omega-3 fatty acids.<br/>
                  2.Weight Management: Due to their incredible ability to absorb water, chia seeds can help promote satiety and control cravings. They expand in the stomach, creating a feeling of fullness, which can aid in maintaining a healthy weight.<br/>
                  3.Improve Digestive Health: The high fiber content in chia seeds promotes regular bowel movements and helps prevent constipation. It also acts as a prebiotic, nourishing the beneficial bacteria in the gut.<br/>
                  4.Heart Health: Chia seeds are rich in omega-3 fatty acids, which have been linked to reducing inflammation, improving cholesterol levels, and supporting overall heart health.<br/>
                  5. Blood Sugar Control: The gel-like substance formed when chia seeds are soaked in liquid can slow down the digestion of carbohydrates, helping to regulate blood sugar levels.<br/>
                  </li>
                  <li><h4>Usage of Chia seeds:</h4>
                  The versatility of chia seeds allows them to be incorporated into various dishes. Here are some common ways to use chia seeds:<br/>
                  1.Chia Pudding: Mix chia seeds with liquid (such as coconut milk or yogurt) and let it sit overnight to create a delicious and nutritious chia pudding. Top it with your favourite fruits, nuts, or sweeteners for added flavour.<br/>
                  2.Smoothies: Add a tablespoon or two of chia seeds to your favourite smoothie for an extra dose of fiber, protein, and omega-3s.Smoothies: Add a tablespoon or two of chia seeds to your favourite smoothie for an extra dose of fiber, protein, and omega-3s.<br/>
                  3.Baking: Chia seeds can be used as an egg substitute in vegan baking recipes. Simply combine one tablespoon of chia seeds with three tablespoons of water and let it sit until a gel-like consistency forms.<br/>
                  4.Toppings: Sprinkle chia seeds on top of salads, yogurt, oatmeal, or cereal to enhance nutritional value and add a crunchy texture.<br/>
                  </li>
                  <li><h4>Side Effects of Chia Seeds:</h4>
                  While chia seeds are generally safe for consumption, some individuals may experience certain side effects, especially if consumed in large quantities or without sufficient hydration. The high fiber content may cause digestive issues, such as bloating, gas, or diarrhoea. People with a history of swallowing difficulties or those taking blood thinners may also need to be cautious when consuming chia seeds due to the potential risk of choking or interference with medications.<br/>
                  In conclusion, chia seeds have a long history of providing essential nutrients and health benefits. Incorporating chia seeds into a balanced diet can offer a significant nutritional boost and support overall well-being. However, <strong>it is always best to consult a healthcare professional before making any drastic changes to your diet or if you have any specific medical conditions.</strong>
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

export default Chiaseeds;
