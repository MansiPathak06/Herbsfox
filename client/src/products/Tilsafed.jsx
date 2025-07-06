import React, { useState } from "react";

import "./Products.css";
import Footer from "../pages/Footer";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ProductData from "../data/ProductData";
import { useEffect } from "react";

const Tilsafed = () => {
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
    "100gm": 213,
    "200gm": 294,
    "400gm": 351,
    "800gm": 468,
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
            src="/images/til-safed-2.webp"
            className="image-h"
            alt="tilsafed"
          />
          <div className="sub-images">
            <img
              src="/images/til-safed.webp"
              className="image-1"
              alt="tilsafed"
            />
            <img
              src="/images/til-safed-3.webp"
              className="image-2"
              alt="tilsafed"
            />
            <img
              src="/images/til-safed-4.webp"
              className="image-3"
              alt="tilsafed"
            />
          </div>
        </div>

        <div className="rightside-container">
          <h2 className="product-heading">Til Safed</h2>
          <h2 className="cost">₹213.00 – ₹468.00</h2>
          <p className="mini-para">
            Herbsfox White Sesame Seeds Raw- Safed Til – Sesamum Indicum
          </p>
          <ul>
            <li className="mini-para">Introduction to Til Safed:</li>
          </ul>
          <p className="paragraph">
            Safed Til, also known as white sesame seeds, are small, edible seeds
            that come from the Sesamum indicum plant. These seeds are widely
            used in various cuisines around the world for their nutty flavor and
            versatility. In addition to being a delicious addition to many
            dishes, they also offer significant health benefits and have a rich
            history.
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
                    id: "Til Safed",
                    name: "Til Safed",
                    price: price,
                    quantity,
                    weight: selectedWeight,
                    image: "/images/til-safed-2.webp",
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
            <p>SKU: 27</p>
            <p>CATEGORY: SEEDS</p>
            <p>[social_share-list]</p>
          </div>
          <br />
          <div className="description-wrapper">
            <button onClick={handleToggle}>DESCRIPTION</button>
            {showDescription && (
              <p className="description-text">
                <ul>
                  <li>
                    <h4>History of Til Safed:</h4>
                    The cultivation of sesame seeds dates back centuries, with
                    evidence of its use found in ancient civilizations such as
                    Babylon and Assyria. It was highly valued for its oil
                    content and was considered a valuable trade commodity in
                    ancient times. Sesame seeds were widely grown and used in
                    ancient Egypt, Greece, Rome, and India. Over time, their
                    popularity spread across the globe, and today, sesame seeds
                    are cultivated in many countries, including China, India,
                    Sudan, Myanmar, and Mexico.
                  </li>
                  <li>
                    <h4>Health Benefits of Til Safed:</h4>
                    1. Nutrient-Rich: Safed Til is packed with essential
                    nutrients, including fiber, protein, healthy fats, and
                    various vitamins and minerals like calcium, iron, and
                    magnesium.
                    <br />
                    2. Supports Heart Health: These seeds contain sesamin and
                    sesamolin compounds that can help lower cholesterol levels,
                    reduce inflammation, and support cardiovascular health.
                    <br />
                    3. Bone Health: Sesame seeds are an excellent source of
                    calcium, which is crucial for maintaining healthy bones and
                    preventing conditions like osteoporosis.
                    <br />
                    4. Digestive Health: The fiber content in safed til aids in
                    digestion, promotes bowel regularity, and prevents
                    constipation.
                    <br />
                    5. Antioxidant Properties: Sesame seeds contain
                    antioxidants, including sesamol and sesaminol, which help
                    protect against oxidative stress and reduce the risk of
                    chronic diseases.
                    <br />
                    6. Nutritional Support: The vitamin and mineral content in
                    sesame seeds contribute to overall health and well-being,
                    supporting immune function, energy production, and cellular
                    processes.
                    <br />
                  </li>
                  <li>
                    <h4>Usage of Til Safed:</h4>
                    Safed Til can be used in various ways, adding flavor,
                    texture, and nutrition to a wide range of dishes. Some
                    common uses include:
                    <br />
                    1. Culinary Usage: Sesame seeds are used in baking to top
                    bread, buns, and other baked goods. They can also be toasted
                    and used as a garnish for salads, soups, stir-fries, and
                    desserts.
                    <br />
                    2. Condiments and Sauces: Tahini, a paste made from ground
                    sesame seeds, is a key ingredient in Middle Eastern cuisine.
                    It is used in dishes like hummus and baba ganoush. Sesame
                    oil, derived from sesame seeds, is commonly used in Asian
                    cooking for its distinct flavor.
                    <br />
                    3. Snacks: Roasted sesame seeds are often consumed as a
                    standalone snack or added to granola bars, trail mixes, and
                    energy balls for a nutritious boost.
                    <br />
                  </li>
                  <li>
                    <h4>Side Effects of Til Safed:</h4>
                    While safed til offers numerous health benefits, excessive
                    consumption may have some side effects:
                    <br />
                    1. Allergies: People with allergies to sesame seeds should
                    avoid consuming them, as it may cause allergic reactions.
                    <br />
                    2. High Caloric Content: Sesame seeds are calorie-dense, and
                    excessive consumption may contribute to weight gain.
                    Moderation is key.
                    <br />
                  </li>
                  <li>
                    <h4>Conclusion:</h4>
                    Safed Til, or white sesame seeds, are a versatile and
                    nutrient-rich ingredient that has been used for centuries in
                    various cuisines. They offer several health benefits,
                    including supporting heart health, aiding digestion, and
                    promoting bone health. From culinary usage to condiments and
                    snacks, sesame seeds add flavor and nutrition to a wide
                    range of dishes. However, individuals with sesame allergies
                    should be cautious, and excessive consumption should be
                    avoided to prevent potential side effects. Incorporating
                    safed til into a balanced diet can be a delicious way to
                    enhance overall health and well-being.
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

export default Tilsafed;
