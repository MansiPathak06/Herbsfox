import React, { useState } from "react";

import "./Products.css";
import Footer from "../pages/Footer";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ProductData from "../data/ProductData";
import { useEffect } from "react";

const Kaalijiri = () => {
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
    "100gm": 226,
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
            src="/images/16.webp"
            className="image-h"
            alt="Kaalijiri"
          />
          <div className="sub-images">
          <img
            src="/images/15-1.webp"
            className="image-1"
            alt="Kaalijir"
            onClick={() => openFullscreen("/images/15-1.webp")}
          />
          <img
            src="/images/kali-jhiri-4.webp"
            className="image-2"
            alt="Kaalijir"
             onClick={() => openFullscreen("/images/kali-jhiri-4.webp")}
          />
          <img
            src="/images/15-2.webp"
            className="image-3"
            alt="Kaalijir"
             onClick={() => openFullscreen("/images/15-2.webp")}
          />
          </div>

        </div>

        <div className="rightside-container">
          <h2 className="product-heading">Kali Jiri</h2>
          <h2 className="cost">₹226.00 – ₹444.00</h2>
          <p className="mini-para">
          Herbsfox Kali Jiri – Kaali Jeeri – Kalijiri – Kali Jhiri – Kaalijeeri – Centratherum Anthelminticum
          </p>
          <ul>
            <li className="mini-para">Introduction to Kaal jiri:</li>
          </ul>
          <p className="paragraph">
          Kali Jeeri (also spelled as Kalijiri & Kaali Jeeri) is the seed of the plant Centratherum Anthelminticum. It is popular in combination with Ajwain and Methi for reducing weight and improving digestive health. It is used for the treatment of skin diseases in which helps to reduce itching and skin irritation. It is believed to be the blood purifier (correctly detoxifier) because it removes the toxins from the blood and increases their elimination. Kali Jeeri is an excellent Ayurvedic medicine for roundworm, tapeworm, and threadworm, which can also be present in the gut. It also increases appetite, but its bitter taste may provoke nausea in some bitter taste-sensitive people.


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
                              id: "Kaalijiri",
                              name: "Kaaalijiri",
                              price: price,
                              quantity,
                              weight: selectedWeight,
                              image: "/images/16.webp",
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
            <p>SKU: 14</p>
            <p>CATEGORY: HERBS</p>
            <p>[social_share-list]</p>
          </div>
          <br/>
          <div className="description-wrapper">
            <button onClick={handleToggle}>DESCRIPTION</button>
            {showDescription && (
              <p className="description-text">
                <ul>
                  <li><h4>Benifits of Kaaljiri</h4>

                  1. Helps In Weight Loss:<br/>
                  Kalijiri (Centratherum Anthelminticum) along with Methi and Ajwain can help in weight loss<br/>
                  2. Manage Indigestion & Helps in Constipation, Bloating, Belching and Intestinal gas:
                  Kalijiri improves Agni (digestive fire) and allows meals to be digested more readily. It helps in normalizing bowel movement and thereby helping in a lot of ailments. It improves immunity and is also effective against worm infestation.<br/>
                  3. Control Diabetes:<br/>
                  Helps controlling Blood Sugar. It is effective in the treatment of Diabetes. Improves strength & IMMUNITY – Used to treat respiratory disorders. Helps in maintaining blood pressure and it provides protection to the Heart<br/>
                  
                  <strong>P.S. – It is recommended to consult a doctor first before taking any dosage of Kali Jeeri.</strong>
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

export default Kaalijiri;
