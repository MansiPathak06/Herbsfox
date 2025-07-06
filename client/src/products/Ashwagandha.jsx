import React, { useState } from "react";
import "./Products.css";
import Footer from "../pages/Footer";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ProductData from "../data/ProductData";
import { useEffect } from "react";

const Ashwagandha = () => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    setRelatedProducts(getRelatedProducts());
  }, []);
  const getRelatedProducts = () => {
    const productsExceptCurrent = ProductData.filter(
      (product) => product.caption.toLowerCase() !== "ashwagandha"
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
    "100gm": 264,
    "200gm": 368,
    "400gm": 510,
    "800gm": 767,
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
            src="/images/ashwagandha-2.webp"
            className="image-h"
            alt="ashwagandha"
            
          />
          <div className="sub-images">
            <img
              src="/images/ashwagandha-1.webp"
              className="image-1"
              alt="ashwagandha"
               onClick={() => openFullscreen("/images/ashwagandha-1.webp")}
            />
            <img
              src="/images/ashwagandha-3.webp"
              className="image-2"
              alt="ashwagandha"
              onClick={() => openFullscreen("/images/ashwagandha-3.webp")}
            />
            <img
              src="/images/Blue-Simple-Hair-Conditioner-Product-Preview-Instagram-Post-2.webp"
              className="image-3"
              alt="ashwagandha"
              onClick={() => openFullscreen("/images/Blue-Simple-Hair-Conditioner-Product-Preview-Instagram-Post-2.webp")}
            />
          </div>
        </div>

        <div className="rightside-container">
          <h2 className="product-heading">Ashwagandha</h2>
          <h2 className="cost">₹264.00 – ₹767.00</h2>
          <p className="mini-para">
            Herbsfox Ashwagandha Roots – Ashvagandha Jadd – Asgandh Nagori –
            Indian Ginseng – Withania Somnifera
          </p>
          <ul>
            <li className="mini-para">Introduction to Ashwagandha:</li>
          </ul>
          <p className="paragraph">
            Ashwagandha, also known as Withania somnifera, is an ancient
            medicinal herb that has been used for centuries in traditional
            Ayurvedic medicine. This adaptogenic herb is native to India,
            Africa, and the Mediterranean region. Ashwagandha is derived from
            the Sanskrit words ‘ashva’ (meaning horse) and ‘gandha’ (meaning
            smell), referring to the root’s strong smell reminiscent of a horse.
            The roots of this plant are the most widely used part due to their
            numerous health benefits.
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
                    id: "Ashwagandha",
                    name: "Ashwagandha",
                    price: price,
                    quantity,
                    weight: selectedWeight,
                    image: "/images/ashwagandha-2.webp",
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
            <p>SKU: 30</p>
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
                    <h4>History Of Ashwagandha:</h4>
                    Ashwagandha has a rich history dating back over 3,000 years.
                    This herb was first mentioned in the sacred Ayurvedic texts,
                    including the Charaka Samhita and Susruta Samhita, which are
                    considered the foundations of ancient Indian medicine. It
                    was revered for its ability to promote vitality, improve
                    overall health, and enhance longevity. The historical
                    significance of ashwagandha in traditional medicine as an
                    effective adaptogen has made it an integral part of
                    Ayurvedic practices for generations.
                  </li>
                  <li>
                    <h4>Health Benefits of Ashwagandha:</h4>
                    The health benefits of ashwagandha roots are vast and have
                    been supported by modern scientific research. Here are some
                    of the key benefits backed by studies:
                    <br />
                    1.Stress reduction and anxiety relief: Ashwagandha is an
                    adaptogenic herb, meaning it helps the body adapt to stress
                    and normalize physiological functions. It has been shown to
                    reduce cortisol levels, the hormone associated with stress,
                    leading to decreased anxiety symptoms.
                    <br />
                    2. Improved cognitive function and memory: Ashwagandha
                    contains compounds called withanolides, which have been
                    found to protect nerve cells from oxidative stress and
                    promote the regeneration of damaged nerve cells. This can
                    enhance cognitive function, memory, and overall brain
                    health.
                    <br />
                    3. Enhanced immune system: Ashwagandha has immune-boosting
                    properties by increasing the activity of natural killer
                    cells and supporting the production of antibodies. This can
                    strengthen the body’s defense against infections and
                    diseases.
                    <br />
                    4. Anti-inflammatory effects: The active compounds in
                    ashwagandha possess potent anti-inflammatory properties,
                    inhibiting the production of pro-inflammatory molecules like
                    cytokines. This makes it beneficial for individuals with
                    chronic inflammatory conditions such as arthritis.
                    <br />
                    5. Balancing hormones: Ashwagandha has been used
                    traditionally to balance hormones in both men and women. It
                    can help regulate cortisol levels, promote healthy thyroid
                    function, and support reproductive health.
                  </li>
                  <li>
                    <h4>Usage of Ashwagandha:</h4>
                    Ashwagandha roots can be used in various forms to harness
                    its health benefits: 1. Powder: The dried roots can be
                    ground into a fine powder and consumed mixed with water,
                    milk, or added to smoothies. This is one of the most
                    convenient and popular ways to consume ashwagandha.
                    <br />
                    2. Capsules/Tablets: For those who prefer a more convenient
                    option, ashwagandha supplements in capsule or tablet form
                    are widely available. It is important to choose
                    high-quality, standardized supplements from reputable
                    brands.
                    <br />
                    3. Tincture: Ashwagandha tinctures are made by soaking the
                    roots in alcohol or a solvent to extract the active
                    components. This concentrated liquid form can be added to
                    beverages or taken directly.
                    <br />
                    4. Tea/Decoction: Ashwagandha roots can be brewed into a tea
                    or decoction. Simply simmer the roots in water for 15-20
                    minutes, strain, and enjoy. Adding honey or a natural
                    sweetener can enhance the taste.
                    <br />
                  </li>
                  <li>
                    <h4>Side Effects of Ashwagandha:</h4>
                    While ashwagandha is generally safe for most people, it is
                    essential to be mindful of potential side effects,
                    especially in higher doses. Some possible side effects
                    include:
                    <br />
                    1. Gastrointestinal issues: In rare cases, ashwagandha may
                    cause stomach discomfort, vomiting, or diarrhea. If you
                    experience any digestive disturbances, it is recommended to
                    reduce the dosage or discontinue use.
                    <br />
                    2. Hypotension: Ashwagandha may lower blood pressure, so
                    individuals with low blood pressure should use caution or
                    consult their healthcare provider before using this herb.
                    <br />
                    3. Allergic reactions: Although rare, some individuals may
                    have an allergic reaction to ashwagandha. If you notice any
                    signs of an allergic reaction, such as rashes, itching, or
                    difficulty breathing, discontinue use and seek medical
                    attention.
                    <br />
                  </li>
                  <li>
                    <h4>Conclusion:</h4>
                    Ashwagandha roots are a powerful herbal remedy with a rich
                    history and a wide range of health benefits. This
                    adaptogenic herb has been used for thousands of years in
                    traditional medicine to promote overall health and
                    well-being. Its stress-reducing, cognitive-enhancing,
                    immune-boosting, and hormonal-balancing properties make it a
                    highly valuable herb to incorporate into your daily routine.
                    However, it is always advisable to consult with a healthcare
                    professional before starting any new supplement or herb,
                    especially if you have any underlying health conditions or
                    are taking medications.
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

export default Ashwagandha;
