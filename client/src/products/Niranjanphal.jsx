import React, { useState } from "react";

import "./Products.css";
import Footer from "../pages/Footer";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ProductData from "../data/ProductData";
import { useEffect } from "react";

const Niranjanphal = () => {
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
    "100gm": 584,
    "200gm": 961,
    "400gm": 1633,
    "800gm": 2979,
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
            src="/images/niranjan-phal-2.webp"
            className="image-h"
            alt="niranjanphal"
          />
          <div className="sub-images">
            <img
              src="/images/niranjan-phal-3.webp"
              className="image-1"
              alt="niranjanphal"
            />
            <img
              src="/images/niranjan-phal-4.webp"
              className="image-2"
              alt="niranjanphal"
            />
            <img
              src="/images/niranjan-phal.webp"
              className="image-3"
              alt="niranjanphal"
            />
          </div>
        </div>

        <div className="rightside-container">
          <h2 className="product-heading">Niranjan Phal</h2>
          <h2 className="cost">₹584.00 – ₹2,979.00</h2>
          <p className="mini-para">
            Herbsfox Niranjan Phal – Niranjan Fal – Malva Nut – China Fruit –
            Sterculia
            <br />
            Lychnophora with Seeds
          </p>
          <ul>
            <li className="mini-para">Introduction to Niranjan Phal:</li>
          </ul>
          <p className="paragraph">
            Niranjan Phal also known as Malva Nuts is a powerful natural
            medicine used in ancient Ayurveda. This powdered root has various
            health benefits and is helpful in managing several conditions. It is
            also known to improve vitality, strength and stamina. Niranjan Phal
            is a plant which is full of medicinal values. It is a small, white
            fruit that is considered very nutritious in ayurvedic medicine. It
            is found in nature as well as in all herbal medicines and food
            supplements.
            <br />
            Niranjan Phal is an Ayurvedic medicine that’s made of equal parts of
            asafetida, yellow myrobalan and long pepper. All these are native
            herbs of India that are found in the wild. This combination makes it
            a very light, compacted and syrupy form containing all the
            properties of these three plants.
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
                    id: "Niranjalphal",
                    name: "Niranjan Phal",
                    price: price,
                    quantity,
                    weight: selectedWeight,
                    image: "/images/niranjan-phal-2.webp",
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
            <p>SKU: 20</p>
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
                    <h4>Health Benefits of Niranjan Phal:</h4>
                    Niranjan Phal is a multi-herbal ayurvedic medicine, which is
                    almost weightless. It is rich in calcium and other minerals
                    like phosphorus and magnesium. These two ingredients help in
                    better absorption of the nutrients from food. Niranjan Phal
                    is one fruit that truly belongs to nature. It is considered
                    a powerful herb in Ayurveda, and has been known to treat
                    ailments like bronchial asthma, coughs and colds, etc.
                    <br />
                    This little fruit is also believed to enhance one’s virility
                    and increase overall sexual health. Niranjan Phal is a plant
                    that grows throughout the world. It contains many medicinal
                    properties and is mostly a small bush with yellow flowers.
                    This herb is similar in appearance to several other types of
                    plants, for example, wild carrot (Daucus carrota), but with
                    smaller leaves and thinner stems. Niranjan Phal is found
                    growing naturally in many parts of the world such as Asia,
                    Africa, South America and North America.
                    <br />
                    Malva Nuts is specially consumed due to its effect on sore
                    throat, tonsilitis and Pharyngitis. It is useful in treating
                    conditions and issues that arise due to excessive body heat.
                    Malva Nuts can be consumed by adding them in curries or
                    salads, powdered form with water or as chutney for snacks.
                    Malva Nuts is an ideal delicacy made of natural honey and
                    sugar. It is extremely hygienic, sugar free and preservative
                    free. It’s tasty flavour makes eating a pleasure.
                    <br />
                    Malva Nuts is a natural sore throat and tonsilitis
                    medication. It is a dried fruit, specially consumed to
                    relieve symptoms of common throat infections like sore
                    throat, aches and pains due to excessive heat in the body.
                    Malva Nuts are excellent for sore throats and tonsilitis. It
                    is useful in treating issues and conditions that arise due
                    to excess body heat.
                    <br />
                    Malva Nuts is a type of nut that has a variety of different
                    health benefits. It is used as a traditional medicine to
                    treat issues such as sore throat, tonsilitis and
                    pharyngitis. Malva nuts soothes the stomach and helps
                    relieve the pain associated with colic in infants. Malva
                    Nuts is a traditional Ayurvedic remedy that is used to
                    improve immunity and cure various illnesses. Consumed with
                    honey, this tasty snack is known to soothe the throat and
                    body, improving health overall.
                    <br />
                    <strong>
                      P.S. – Consult a doctor first before taking any dosage.
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
      <Footer />
    </div>
  );
};

export default Niranjanphal;
