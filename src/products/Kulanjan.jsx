import React, { useState } from "react";

import "./Products.css";
import Footer from "../pages/Footer";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ProductData from "../data/ProductData";
import { useEffect } from "react";

const Kulanjan = () => {
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
    "100gm": 215,
    "200gm": 264,
    "400gm": 293,
    "800gm": 354,
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
            src="/images/kulanjan-2.webp"
            className="image-h"
            alt="Kulanjan"
          />
          <div className="sub-images">
            <img
              src="/images/kulanjan.webp"
              className="image-1"
              alt="Kulanjan"
              onClick={() => openFullscreen("/images/kulanjan.webp")}
            />
            <img
              src="/images/kulanjan-4.webp"
              className="image-2"
              alt="Kulanjan"
              onClick={() => openFullscreen("/images/kulanjan-4.webp")}
            />
            <img src="/images/kulanjan-3.webp" alt="Kulanjan" 
            onClick={() => openFullscreen("/images/kulanjan-3.webp")}/>
          </div>
        </div>

        <div className="rightside-container">
          <h2 className="product-heading">Kulanjan</h2>
          <h2 className="cost">₹215.00 – ₹354.00</h2>
          <p className="mini-para">
            Herbsfox Kulanjan – Kulinjan – Paan Jadd – Siamese Ginger – Thai
            Ginger – Galangal – Alpinia Galanga Wild
          </p>
          <ul>
            <li className="mini-para">Introduction to Kulanjan:</li>
          </ul>
          <p className="paragraph">
            Kulanjan (Alpinia Galanga) – is commonly referred to as Greater
            Galangal in English. It appears to be a member of rhizome family. It
            is used in Thai cuisine. Tuberous root of kulanjan is used to treat
            digestive and respiratory ailments. In southern India, kulanjan is
            known as Rasna.
            <br />
            The name ‘galangal’ is said to be derived from a Chinese word
            meaning ginger. The tuber is known to possess numerous medicinal &
            health benefits. And it is used by a lot of healthcare
            professionals.
            <br />
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
                    id: "Kulanjan",
                    name: "Kulanjan",
                    price: price,
                    quantity,
                    weight: selectedWeight,
                    image: "/images/kulanjan-2.webp",
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
            <p>SKU: 16</p>
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
                    <h4>Medicinal properties of Kulanjan:</h4>
                    1.Antimicrobial
                    <br />
                    2.Anti-inflammatory
                    <br />
                    3.Anti- HIV
                    <br />
                    4.Immunomodulator
                    <br />
                    5.Anti-Diabetic
                    <br />
                    6.Anti-diuretic
                    <br />
                    7.Anti-ulcerative 8.Anti-dementia
                    <br />
                  </li>

                  <li>
                    <h4>Medicinal uses of Kulanjan:</h4>
                    1. Phlegm, chest congestion, cough, asthma, and other
                    respiratory ailments:
                    <br />
                    Kulanjan has expectorant, antioxidant, and antimicrobial
                    properties. Being hot in potency, it reduces cough.
                    <br />
                    2. Throat irritation and bad breath:
                    <br />
                    Ayurveda recommends to use this herb for oral and voice
                    problems.
                    <br />
                    3. Fever, lung congestion, flu, nausea:
                    <br />
                    This remedy needs powdered kulanjan powder and misri. Mix
                    these two ingredients in equal amount and talk half a
                    teaspoon with milk or hot water.
                    <br />
                    4. Kulanjan contains excellent anti-inflammatory properties
                    and hence it is used in the treatment of arthritis &
                    rheumatoid arthritis.
                    <br />
                    5. It helps relieve discomfort that is caused due to ulcers
                    and inflammation of the abdomen.
                    <br />
                    6. Kulanjan also improves blood circulation in the body.
                    <br />
                    <strong>
                      P.S. – Kulanjan is a medicinal herb. It is recommended to
                      consult a doctor first before taking any dosage.
                    </strong>
                  </li>
                </ul>
                x
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

export default Kulanjan;
