import React, { useState } from "react";

import "./Products.css";
import Footer from "../pages/Footer";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ProductData from "../data/ProductData";
import { useEffect } from "react";

const Ratanjot = () => {
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
    "100gm": 253,
    "200gm": 345,
    "400gm": 499,
    "800gm": 680,
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
            src="/images/ratanjot-2.webp"
            className="image-h"
            alt="ratanjot"
          />
          <div className="sub-images">
            <img
              src="/images/ratanjot.webp"
              className="image-1"
              alt="ratanjot"
            />
            <img
              src="/images/ratanjot-4.webp"
              className="image-2"
              alt="ratanjot"
            />
            <img
              src="/images/ratanjot-3.webp"
              className="image-3"
              alt="ratanjot"
            />
          </div>
        </div>

        <div className="rightside-container">
          <h2 className="product-heading">Ratanjot</h2>
          <h2 className="cost">₹253.00 – ₹680.00</h2>
          <p className="mini-para">
            Herbsfox Ratanjot Root – Ratanjyot Jadd – Jatropha Curcas – Alkanet
            Root – Alkanna Tinctoria
          </p>
          <ul>
            <li className="mini-para">Introduction to Ratanjot:</li>
          </ul>
          <p className="paragraph">
            Ratanjot root, scientifically known as Onosma echioides, is a
            perennial herbaceous plant native to India and other parts of Asia.
            The plant has long been valued for its medicinal properties and is
            widely used in traditional Ayurvedic medicine. The root of the
            Ratanjot plant is particularly sought-after for its numerous health
            benefits and therapeutic uses. In this article, we will delve into
            the history, health benefits, usage, potential side effects, and
            conclude with an overview of Ratanjot root.
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
                    id: "Ratanjot",
                    name: "Ratanjot",
                    price: price,
                    quantity,
                    weight: selectedWeight,
                    image: "/images/ratanjot-2.webp",
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
            <p>SKU: 21</p>
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
                    <h4>History of Ratanjot:</h4>
                    Ratanjot root has been used for centuries in various
                    traditional healing systems, including Ayurveda, due to its
                    potent medicinal properties. In Ayurvedic medicine, it is
                    known as “Ratanjot” which translates to “jewel-like root.”
                    Ancient texts describe the plant’s ability to treat ailments
                    such as skin disorders, asthma, cough, wounds, and digestive
                    issues. The historical significance of Ratanjot root as a
                    herbal remedy has led to its continued use in modern herbal
                    medicine.
                  </li>
                  <li>
                    <h4>Health Benefits of Ratanjot:</h4>
                    <ol>
                      <li>
                        Skin Health: Ratanjot root is known for its significant
                        benefits in maintaining and improving skin health. It
                        possesses antiseptic and anti-inflammatory properties
                        that help soothe various skin conditions like rashes,
                        burns, wounds, and insect bites. The root is often
                        ground into a powder and applied topically, promoting
                        quick healing and relieving itchiness.
                      </li>
                      <li>
                        Anti-aging Properties: The presence of antioxidants in
                        Ratanjot root helps combat free radicals which
                        contribute to premature aging and the formation of
                        wrinkles. Regular consumption or topical application of
                        Ratanjot root can aid in reducing the signs of aging,
                        leaving the skin looking youthful and radiant
                      </li>
                      <li>
                        Hair Health: Ratanjot root is commonly used to promote
                        hair health and treat hair-related issues. It can
                        stimulate hair growth, combat dandruff, and nourish the
                        scalp. People often boil the root in oil and use it as a
                        hair tonic to strengthen hair follicles and prevent hair
                        loss.
                      </li>
                      <li>
                        Respiratory Health: The expectorant properties of
                        Ratanjot root make it an effective remedy for
                        respiratory conditions like bronchitis, asthma, and
                        cough. The root helps clear mucus from the respiratory
                        passages, relieving congestion and improving breathing.
                      </li>
                      <li>
                        Digestive Aid: Ratanjot root is commonly used as a
                        digestive tonic, promoting digestion and reducing
                        digestive issues such as bloating and flatulence. It
                        also possesses mild laxative properties, aiding in
                        gentle bowel movements and relieving constipation.
                      </li>
                    </ol>
                  </li>
                  <li>
                    <h4>Usage of Ratanjot:</h4>
                    Ratanjot root can be used in various forms depending on the
                    specific health concern. It is available in powdered form,
                    ready for topical application or oral consumption. The root
                    can be infused into oil and used for hair and skin care.
                    Additionally, it is used in herbal preparations, decoctions,
                    and Ayurvedic formulations intended for internal
                    consumption.
                  </li>
                  <li>
                    <h4>Side Effects of Ratanjot:</h4>
                    While Ratanjot root is generally considered safe for most
                    individuals when used in moderate amounts, some people may
                    experience allergic reactions or skin irritation. It is
                    advisable to perform a patch test before using Ratanjot root
                    topically or orally. Pregnant and breastfeeding women should
                    consult a healthcare professional before using Ratanjot root
                    as its safety is not well-established in these groups.
                  </li>
                  <li>
                    <h4>Conclusion:</h4>
                    Ratanjot root holds a rich history and provides numerous
                    health benefits. From promoting skin health to supporting
                    respiratory and digestive systems, the root offers various
                    therapeutic uses. Its extensive usage in Ayurvedic medicine
                    is a testament to its efficacy. However,{" "}
                    <strong>
                      as with any herbal remedy, caution must be exercised, and
                      it is always recommended to consult a healthcare
                      professional before incorporating Ratanjot root into a
                      health regimen.
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

export default Ratanjot;
