import React, { useState } from "react";

import "./Products.css";
import Footer from "../pages/Footer";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ProductData from "../data/ProductData";
import { useEffect } from "react";

const Isabgolbhusi = () => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    setRelatedProducts(getRelatedProducts());
  }, []);
  const getRelatedProducts = () => {
    const productsExceptCurrent = ProductData.filter(
      (product) => product.caption.toLowerCase() !== "inderyanphal"
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
    "100gm": 332,
    "200gm": 530,
    "400gm": 798,
    "800gm": 1349,
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
          <img src="/images/15.webp" className="image-h" alt="Isabgolbhusi" />
          <div className="sub-images">
            <img
              src="/images/14-1.webp"
              className="image-1"
              alt="Isabgolbhusi"
              onClick={() => openFullscreen("/images/14-1.webp")}
            />
            <img
              src="/images/isabgol-husk-4.webp"
              className="image-2"
              alt="Isabgolbhusi"
              onClick={() => openFullscreen("/images/isabgol-husk-4.webp")}
            />
            <img
              src="/images/14.webp"
              className="image-3"
              alt="Isabgolbhusi"
              onClick={() => openFullscreen("/images/14.webp")}
            />
          </div>
        </div>

        <div className="rightside-container">
          <h2 className="product-heading">Isabgol bhusi</h2>
          <h2 className="cost">₹332.00 – ₹1,349.00</h2>
          <p className="mini-para">
            Herbsfox Isabgol Bhusi – Isabagol Bhoonsi – Psyllium Husk – Plantago
            ovata
          </p>
          <ul>
            <li className="mini-para">Introduction to Isabgolbhusi:</li>
          </ul>
          <p className="paragraph">
            Although known to be an effective home remedy for constipation, the
            wonders of Isabgol are not just limited to its role as a laxative.
            <br />
            What is Isabgol or Psyllium Husk?
            <br />
            A form of fibre that is made from the husk of the Plantago ovata
            seeds, Isabgol, or Psyllium Husks, is a gluey and oily textured
            laxative that is popularly used as a digestive remedy for our body.
            The Plantago ovata, also known as desert Indianwheat, blond
            plantain, and blond psyllium, is a medicinal plant with long and
            narrow leaves found majorly in Asia, North Africa, and the
            Mediterranean region.
            <br />
            The term ‘Isabgol’ derives from the words ‘asp’ and ‘ghol’, which in
            Sanskrit mean ‘horse flower’. Are you curious to know its benefits
            and why it has remained a trusted go-to remedy for digestive issues?
            Keep reading!
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
                    id: "Isabgolbhusi",
                    name: "Insabgol Bhusi",
                    price: price,
                    quantity,
                    weight: selectedWeight,
                    image: "/images/15.webp",
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
            <p>SKU: 13</p>
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
                    <h4>Benifits of Isabgolbhusi</h4>
                    Isabgol has been an old-time home remedy for treating
                    constipation, weight loss, diabetes, and many other health
                    conditions.
                    <br />
                    1. Isabgol Benefits for Constipation
                    <br />
                    By being a bulk-forming laxative and rich in fibre, Isabol
                    benefits constipated individuals by making their stool soft
                    and easy to excrete, making it an extremely effective cure
                    for constipation. As it adds unfermented gel to the stool,
                    Isabgol contributes to its easy passage as it acts as an
                    emollient and lubricant.
                    <br />
                    2. Isabgol Benefits for Diarrhoea
                    <br />
                    Isabgol can also benefit those suffering from diarrhoea or
                    faecal incontinence from liquid stools by blocking the
                    calcium ion channels. It also has antisecretory and
                    antidiarrheal properties, which can help get relief from
                    diarrhoea. 3. Isabgol Benefits for Irritable Bowel System
                    <br />
                    By undergoing anaerobic fermentation in the intestines,
                    Isabgol fibre produces metabolites that are antioxidants and
                    anti-inflammatory, which makes it helpful in treating
                    irritable bowel syndrome (IBS), which is an intestinal
                    disorder.
                    <br />
                    4. Isabgol Benefits for Healthy Gut
                    <br />
                    Isabgol can also be our gut’s best friend because of its
                    prebiotic properties. Prebiotics are compounds that promote
                    the growth of healthy microorganisms like bacteria and fungi
                    in our gut, which further helps in improving our immune
                    system, making our body strong enough to fight infection,
                    maintain healthy cells, and prevent inflammation.
                    <br />
                    5. Isabgol Benefits for Heart Health
                    <br />
                    Isabgol has also proven to be helpful in the prevention of
                    heart diseases. Consuming it as a part of our diet can lower
                    our blood pressure, improve lipid levels, and strengthen our
                    heart muscles.
                    <br />
                    6. Isabgol Benefits for Diabetes
                    <br />
                    Isabgol has also been found to be effective for people with
                    diabetes. The gelatin that Isabgol contains slows down the
                    process of glucose breakdown and absorption into our bodies.
                    Doing so, it can help us in controlling blood sugar levels
                    in our bodies.
                    <br />
                    7. It acts as a blood purifier and hence good for skin
                    diseases like acne, boils etc.
                    <br />
                    8. Lowers blood sugar level.
                    <br />
                    <h4>Side Effects of Isabgol</h4>
                    Due to its laxative effects and ability to create intestinal
                    bulk, psyllium might have adverse side effects. So, before
                    you decide to go ahead with a daily dose of Isabgol, you
                    might want to consider some of its most common side effects,
                    which include diarrhoea, abdominal pain, gas, frequent bowel
                    movements, and nausea.
                    <br />
                    <strong>
                      P.S. – Make sure to check with your doctor if you start
                      experiencing symptoms like itchiness, difficulties in
                      breathing, rashes appearing on your skin, swelling of the
                      face and throat or any other side effects.
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

export default Isabgolbhusi;
