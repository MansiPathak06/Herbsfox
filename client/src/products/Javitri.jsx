import React, { useState } from "react";

import "./Products.css";
import Footer from "../pages/Footer";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ProductData from "../data/ProductData";
import { useEffect } from "react";

const Javitri = () => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    setRelatedProducts(getRelatedProducts());
  }, []);
  const getRelatedProducts = () => {
    const productsExceptCurrent = ProductData.filter(
      (product) => product.caption.toLowerCase() !== "javitri"
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
    "100gm": 470,
    "200gm": 835,
    "400gm": 1416,
    "800gm": 2502,
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
          <img src="/images/javitri-2.webp" className="image-h" alt="javitri" />
          <div className="sub-images">
            <img
              src="/images/javitri-1.webp"
              className="image-1"
              alt="javitri"
              onClick={() => openFullscreen("/images/javitri-1.webp")}
            />
            <img
              src="/images/Blue-Simple-Hair-Conditioner-Product-Preview-Instagram-Post-2.webp"
              className="image-2"
              alt="javitri"
              onClick={() =>
                openFullscreen(
                  "/images/Blue-Simple-Hair-Conditioner-Product-Preview-Instagram-Post-2.webp"
                )
              }
            />
            <img
              src="/images/javitri-3.webp"
              className="image-3"
              alt="javitri"
              onClick={() => openFullscreen("/images/javitri-3.webp")}
            />
          </div>
        </div>

        <div className="rightside-container">
          <h2 className="product-heading">Javitri</h2>
          <h2 className="cost">₹470.00 – ₹2,502.00</h2>
          <p className="mini-para">
            Herbsfox Javitri – Javetri – Jalwatri – Jalotri – Dry Mace Flower –
            Myristica Fragrans
          </p>
          <ul>
            <li className="mini-para">Introduction to Javitri :</li>
          </ul>
          <p className="paragraph">
            Javitri, also known as mace, is a popular spice used in various
            cuisines around the world. It is derived from the fruit of the
            nutmeg tree, which is native to the Moluccas Islands in Indonesia.
            Javitri has a unique flavor and aroma, making it a valuable
            ingredient in many dishes. Not only is it used for its culinary
            purposes, but it also offers several health benefits. In this
            article, we will explore the history, health benefits, usage, and
            possible side effects of javitri.
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
                    id: "Javitri",
                    name: "Javitri",
                    price: price,
                    quantity,
                    weight: selectedWeight,
                    image: "/images/javitri-2.webp",
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
            <p>SKU: 37</p>
            <p>CATEGORY: SPICES</p>
            <p>[social_share-list]</p>
          </div>
          <br />
          <div className="description-wrapper">
            <button onClick={handleToggle}>DESCRIPTION</button>
            {showDescription && (
              <p className="description-text">
                <ul>
                  <li>
                    <h4>History of Javitri:</h4>
                    Javitri has been used for centuries for its medicinal and
                    culinary properties. It is believed to have originated in
                    the Moluccas Islands, also known as the Spice Islands, where
                    it was highly regarded for its strong flavor and aroma. Arab
                    traders introduced javitri to the Middle East, and from
                    there, it spread to Europe and other parts of the world.
                  </li>
                  <li>
                    <h4>Health Benefits of Javitri:</h4>
                    Javitri is packed with essential nutrients and bioactive
                    compounds that offer numerous health benefits. Let’s take a
                    closer look at some of these benefits:
                    <br />
                    1. Boosts Digestive Health: Javitri has carminative
                    properties, which means it helps in relieving digestive
                    issues like bloating, gas, and indigestion. It also aids in
                    improving appetite and promotes proper digestion.
                    <br />
                    2. Improves Oral Health: Javitri oil is commonly used in
                    dental care products as it has antibacterial properties. It
                    helps in eliminating oral bacteria, preventing tooth decay,
                    gum infections, and bad breath.
                    <br />
                    3. Enhances Brain Function: Javitri contains myristicin and
                    macelignan, two compounds known for their neuroprotective
                    properties. These compounds help in improving cognitive
                    function, memory, and concentration.
                    <br />
                    4. Supports Heart Health: Javitri possesses antioxidant
                    properties, which help in reducing oxidative stress in the
                    body. It also helps in regulating blood pressure and
                    cholesterol levels, thus promoting heart health.
                    <br />
                    5. Anti-inflammatory Properties: The essential oil extracted
                    from javitri has anti-inflammatory properties. It can be
                    used topically to reduce swelling, pain, and inflammation
                    associated with conditions like arthritis and muscle
                    soreness.
                  </li>
                  <li>
                    <h4>Usage of Javitri:</h4>
                    Javitri is predominantly used as a spice in various cuisines
                    worldwide. It adds a distinctive flavor and aroma to both
                    sweet and savory dishes. It is commonly used in Indian,
                    Middle Eastern, and European cuisines. Apart from its
                    culinary uses, javitri is also used for its medicinal
                    properties. Here are a few ways to use javitri:
                    <br />
                    1. Culinary Uses: Javitri is typically used in ground or
                    powdered form. It is added to dishes like biryani, curry,
                    meat stews, and desserts to enhance their flavor. It can be
                    used whole in pickles and spice blends.
                    <br />
                    2. Infused Oil: Javitri oil can be prepared by steeping the
                    dried javitri in a carrier oil like coconut or sesame oil.
                    The infused oil can be used for massage, aromatherapy, or as
                    a natural remedy for various ailments.
                    <br />
                    3. Herbal Tea: Javitri can be used to make a flavorful
                    herbal tea. Add a few crushed pieces of javitri to boiling
                    water and let it steep for a few minutes. This soothing tea
                    can aid digestion and promote relaxation.
                    <br />
                  </li>
                  <li>
                    <h4>Side Effects of Javitri:</h4>
                    While javitri offers several health benefits, it should be
                    consumed in moderation. Excessive consumption may lead to a
                    few side effects:
                    <br />
                    1. Allergic Reactions: Some individuals may be allergic to
                    javitri. It can cause symptoms like skin rashes, itching,
                    swelling, and respiratory issues in sensitive individuals.
                    If you experience any allergic reactions, it is advisable to
                    discontinue use and seek medical help.
                    <br />
                    2. Pregnant and Breastfeeding Women: Javitri is not
                    recommended for pregnant and breastfeeding women as it may
                    stimulate the uterus and cause complications. It is best to
                    consult a healthcare professional before using javitri
                    during these stages.
                    <br />
                    3. Drug Interactions: Javitri may interact with certain
                    medications, such as blood thinners and medications for
                    liver and kidney diseases. If you are taking any
                    medications, it is advisable to consult your healthcare
                    provider before including javitri in your diet.
                    <br />
                  </li>
                  <li>
                    <h4>Conclusion :</h4>
                    Javitri, also known as mace, is a versatile spice with a
                    rich history and numerous health benefits. From enhancing
                    digestion to promoting brain health and supporting heart
                    health, javitri has proven its worth in the culinary and
                    medicinal world. However, it is essential to use javitri in
                    moderation and be mindful of any potential side effects. As
                    with any dietary supplement or spice, it is advisable to
                    seek guidance from a healthcare professional to ensure its
                    suitability for your specific needs.
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

export default Javitri;
