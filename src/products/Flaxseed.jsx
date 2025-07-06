import React, { useState } from "react";

import "./Products.css";
import Footer from "../pages/Footer";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ProductData from "../data/ProductData";
import { useEffect } from "react";

const Flaxseed = () => {
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
    "100gm": 198,
    "200gm": 262,
    "400gm": 289,
    "800gm": 349,
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
          <img src="/images/alsi-2.webp" className="image-h" alt="Alsi" />
          <div className="sub-images">
            <img
              src="/images/alsi-3.webp"
              className="image-1"
              alt="Flax seed"
              onClick={() => openFullscreen("/images/alsi-3.webp")}
            />
            <img
              src="/images/alsi-1.webp"
              className="image-2"
              alt="Flax-seed"
              onClick={() => openFullscreen("/images/alsi-1.webp")}
            />
            <img src="/images/alsi-4.webp" className="image-3" alt="Alsi"
            onClick={() => openFullscreen("/images/alsi-4.webp")} />
          </div>
        </div>

        <div className="rightside-container">
          <h2 className="product-heading">Flax Seeds</h2>
          <h2 className="cost">₹198.00 – ₹349.00</h2>
          <p className="mini-para">
            ALSI- LINUM USITATISSIMUM- FLAX SEED
            <br />
            <p className="minipara2">
              Flax (Linum usitatissimum) is a food and fiber crop. Flaxseeds are
              a good source of dietary fiber and omega-3 fatty acids, including
              alpha-linolenic acid.
            </p>
          </p>
          <ul>
            <li className="mini-para">Introduction to Flax Seeds:</li>
          </ul>
          <p className="paragraph">
            Flaxseeds also contain phytoestrogens called lignans, which are
            similar to the hormone estrogen. The Fiber in flaxseed is found in
            the seed coat. When taken before eating, it seems to make people
            feel less hungry. It might also help limit how much cholesterol the
            body absorbs from food.
            <br />
            Flaxseed is used for constipation, diabetes, high cholesterol,
            obesity, and swelling of the kidneys in people with lupus. It is
            also used for many other conditions, but there is no good scientific
            evidence to support most of these other uses.
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
                    id: "Flaxseed",
                    name: "Flaxseed",
                    price: price,
                    quantity,
                    weight: selectedWeight,
                    image: "/images/alsi-2.webp",
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
            <p>SKU: 002</p>
            <p>CATEGORY: Seeds</p>
            <p>[social_share-list]</p>
          </div>
          <br />
          <div className="description-wrapper">
            <button onClick={handleToggle}>DESCRIPTION</button>
            {showDescription && (
              <p className="description-text">
                <ul>
                  <li>
                    <h4>Benefits of Flax Seeds:</h4>
                    1. Constipation: Flaxseed is a good source of dietary fiber.
                    Eating flaxseed in muffins or other foods seems to increase
                    bowel movements in young adults and people with diabetes.
                    <br />
                    2. Diabetes: Taking flaxseed by mouth might slightly improve
                    blood sugar control in people with type 2 diabetes. Benefits
                    seem to be greatest with ground flaxseed and when used for
                    at least 12 weeks.
                    <br />
                    3. High cholesterol: Taking flaxseed by mouth seems to help
                    reduce total cholesterol and low-density lipoprotein (LDL or
                    “bad”) cholesterol. It seems to work the best in people with
                    high cholesterol and in people who are overweight. It’s
                    unclear if taking flaxseed improves triglyceride levels.
                    Taking flaxseed doesn’t seem to improve high-density
                    lipoprotein (HDL or “good”) cholesterol levels.
                    <br />
                    4. High blood pressure: Taking flaxseed by mouth may
                    slightly reduce blood pressure in people with high blood
                    pressure.
                    <br />
                    5. Breast pain (mastalgia): Eating a flaxseed muffin daily
                    for 3 months or taking flaxseed powder by mouth daily for 2
                    months seems to reduce breast pain that occurs at the start
                    of the menstrual cycle.
                    <br />
                    6. Obesity: Taking flaxseed by mouth may help reduce body
                    weight, body mass index (BMI), and waist size in adults who
                    are overweight or obese. Taking at least 30 grams of
                    flaxseed daily for at least 12 weeks seems to work best.
                    Flaxseed mucilage may also help to reduce weight, although
                    flaxseed lignan extract doesn’t seem to help.
                    <br />
                    7. Swelling (inflammation) of the kidneys in people with
                    lupus: Taking whole or ground flaxseed by mouth seems to
                    improve kidney function in people with SLE.
                    <br />
                  </li>
                  <li>
                    <h4>Side Effects of Flax Seeds:</h4>
                    When taken in moderate amounts, flax seeds are generally
                    safe for most people. However, consuming large quantities of
                    flax seeds may lead to digestive issues such as bloating,
                    gas, stomach ache, or diarrhea. Some individuals may also
                    experience an allergic reaction to flax seeds.
                    <br />
                    To avoid potential side effects, it is recommended to start
                    with small quantities of flax seeds and gradually increase
                    the intake as tolerated. It’s also crucial to drink an
                    adequate amount of water when consuming flax seeds to help
                    prevent digestive discomfort.
                  </li>
                  <li>
                    <h4>Usage of Flax Seeds:</h4>
                    Flax seeds can be incorporated into the diet in various
                    ways, such as adding them to smoothies, yogurt, oatmeal, or
                    baked goods. Ground flax seeds are often better absorbed by
                    the body compared to whole seeds. It’s advisable to store
                    flax seeds in an airtight container in a cool, dark place to
                    prevent them from going rancid.
                  </li>
                  <strong>
                    P.S. -Consulting a healthcare provider before adding flax
                    seeds to your diet is advisable, especially for individuals
                    with certain medical conditions or those taking medications
                    that may interact with flax seeds.
                  </strong>
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

export default Flaxseed;
