import React, { useState } from "react";

import "./Products.css";
import Footer from "../pages/Footer";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ProductData from "../data/ProductData";
import { useEffect } from "react";

const Dalchini = () => {
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
    "100gm": 259,
    "200gm": 356,
    "400gm": 471,
    "800gm": 724,
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
            src="/images/dalchini-2.webp"
            className="image-h"
            alt="dalchini"
            
          />
          <div className="sub-images">
            <img
              src="/images/dalchini-1.webp"
              className="image-1"
              alt="dalchini"
              onClick={() => openFullscreen("/images/dalchini-1.webp")}
            />
            <img
              src="/images/dalchini-3.webp"
              className="image-2"
              alt="dalchini"
              onClick={() => openFullscreen("/images/dalchini-3.webp")}
            />
            <img
              src="/images/Blue-Simple-Hair-Conditioner-Product-Preview-Instagram-Post-2.webp"
              className="image-3"
              alt="dalchini"
              onClick={() => openFullscreen("/images/Blue-Simple-Hair-Conditioner-Product-Preview-Instagram-Post-2.webp")}
            />
          </div>
        </div>

        <div className="rightside-container">
          <h2 className="product-heading">Dalchini</h2>
          <h2 className="cost">₹259.00 – ₹724.00</h2>
          <p className="mini-para">
            Herbsfox Ceylon Cinnamon – Dalchini – Kalmi Dalchini – True Cinnamon
            – Soft Cinnamon – Cinnamomum Zeylanicum – Dalchini Sticks
          </p>
          <ul>
            <li className="mini-para">Introduction to Dalchini:</li>
          </ul>
          <p className="paragraph">
            Dalchini, commonly known as cinnamon, is a popular spice derived
            from the inner bark of trees belonging to the Cinnamomum family.
            With its warm and sweet scent, cinnamon is widely used in cooking
            and baking, as well as in traditional medicine for its numerous
            health benefits. This article will delve into the history, health
            benefits, usage, and potential side effects of cinnamon, providing
            readers with valuable information about this versatile spice.
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
                    id: "Dalchini",
                    name: "Dalchini",
                    price: price,
                    quantity,
                    weight: selectedWeight,
                    image: "/images/dalchini-2.webp",
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
            <p>SKU: 33</p>
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
                    <h4>Introduction to Dalchini:</h4>
                    Cinnamon, also referred to as Cinnamomum zeylanicum, is
                    derived from the bark of cinnamon trees, native to South
                    Asia and Southeast Asia. It has a distinctive aroma and
                    flavor that makes it a staple ingredient in various
                    cuisines. Apart from its culinary uses, cinnamon has been
                    cultivated for centuries due to its medicinal properties. It
                    contains several active compounds that contribute to its
                    health-promoting effects, making it an essential element in
                    traditional and alternative medicine.
                  </li>
                  <li>
                    <h4>History of Dalchini:</h4>
                    The history of cinnamon dates back thousands of years and
                    has been intertwined with various civilizations and
                    cultures. It was highly valued in ancient Egypt and was
                    often used in the embalming process. Cinnamon was also a
                    symbol of wealth and power in ancient Rome, with its price
                    competing with silver. Arab traders brought cinnamon to
                    Europe, where it was used as a preservative for meat in the
                    Middle Ages. The popularity of cinnamon eventually extended
                    to other parts of the world, including the Americas and
                    Africa.
                  </li>
                  <li>
                    <h4>Health Benefits of Cinnamon:</h4>
                    1. Antioxidant properties: Cinnamon is loaded with
                    antioxidants that help protect the body against damage
                    caused by harmful free radicals. Regular consumption of
                    cinnamon can boost the body’s natural defense mechanisms and
                    reduce the risk of chronic diseases, including cancer, heart
                    disease, and neurodegenerative disorders.
                    <br />
                    2. Anti-inflammatory effects: The active compounds found in
                    cinnamon possess potent anti-inflammatory properties. These
                    compounds help reduce inflammation in the body, alleviating
                    symptoms associated with conditions like arthritis and
                    inflammatory bowel diseases.
                    <br />
                    3. Blood sugar regulation: Cinnamon has been widely studied
                    for its ability to regulate blood sugar levels. It can
                    enhance insulin sensitivity, making it beneficial for
                    individuals with diabetes or those at risk of developing the
                    condition. Incorporating cinnamon into the diet may help
                    reduce fasting blood sugar levels and improve overall
                    glycemic control.
                    <br />
                    4. Heart health: Cinnamon may contribute to heart health by
                    improving lipid profiles and reducing blood pressure.
                    Studies have shown that cinnamon can decrease levels of
                    total cholesterol, LDL cholesterol, and triglycerides while
                    increasing levels of beneficial HDL cholesterol. These
                    effects, along with its antioxidant properties, may help
                    reduce the risk of cardiovascular diseases.
                    <br />
                    5.Anti-microbial properties: Cinnamon possesses potent
                    anti-microbial properties that can help fight off bacteria,
                    viruses, and fungi. It has been traditionally used to treat
                    various infections, such as respiratory tract infections,
                    candidiasis, and foodborne illnesses.
                    <br />
                  </li>
                  <li>
                    <h4>Usage of Cinnamon:</h4>
                    Cinnamon can be used in various forms, including as a ground
                    spice, sticks, or essential oil. Here are some popular ways
                    to incorporate cinnamon into your daily routine:
                    <br />
                    1. Culinary uses: Cinnamon is widely used in baked goods and
                    desserts, adding a warm and sweet flavor. It can be
                    sprinkled on oatmeal, yogurt, or fruit for added taste and
                    aroma. Cinnamon can also be used in savory dishes like
                    stews, curries, and marinades, lending a unique and aromatic
                    twist.
                    <br />
                    2. Beverages: Cinnamon can add a delightful flavor to hot
                    beverages like tea or coffee. It can also be used to infuse
                    water or make cinnamon-based drinks like chai tea or spiced
                    cider.
                    <br />
                    3. Cinnamon supplements: Cinnamon is available in supplement
                    form, typically as an extract or in capsule form. These
                    supplements are often marketed for their potential blood
                    sugar-lowering effects and are useful for individuals
                    looking to incorporate cinnamon into their routine without
                    the taste.
                    <br />
                  </li>
                  <li>
                    <h4>Side Effects of Cinnamon:</h4>
                    While cinnamon is generally safe for consumption, it may
                    cause side effects in some individuals. The most common side
                    effect is an allergic reaction, characterized by itching,
                    swelling, or difficulty breathing. Cassia cinnamon, a common
                    variety of cinnamon, contains a compound called coumarin,
                    which can be harmful in high doses. Individuals on
                    blood-thinning medications should be cautious with cinnamon
                    consumption, as it may increase the risk of bleeding.
                    Additionally, taking excessive amounts of cinnamon
                    supplements may lead to liver damage or interact with other
                    medications.
                  </li>
                  <li>
                    <h4>Conclusion :</h4>
                    Cinnamon, with its rich history and numerous health
                    benefits, is a versatile spice that has found its way into
                    various cultures and cuisines. Its antioxidant,
                    anti-inflammatory, and blood sugar-regulating properties
                    make it a valuable addition to a balanced diet. Whether
                    sprinkled on top of a warm beverage or used as a flavorful
                    seasoning in cooking, cinnamon can bring a delightful and
                    healthful twist to your daily routine. However, it is
                    essential to consume cinnamon in moderation and be aware of
                    potential side effects, particularly for individuals with
                    specific health conditions or those taking certain
                    medications.
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

export default Dalchini;
