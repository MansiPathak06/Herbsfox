import React, { useState } from "react";
import "./Products.css";
import Footer from "../pages/Footer";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ProductData from "../data/ProductData";
import { useEffect } from "react";

const Awlamladry = () => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    setRelatedProducts(getRelatedProducts());
  }, []);
  const getRelatedProducts = () => {
    const productsExceptCurrent = ProductData.filter(
      (product) => product.caption.toLowerCase() !== "ashok chaal"
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
    "100gm": 213,
    "200gm": 259,
    "400gm": 283,
    "800gm": 338,
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
            src="/images/amla-dry-2.webp"
            className="image-h"
            alt="Awlamladry"
          />
          <div className="sub-images">
            <img
              src="/images/amla-1.webp"
              className="image-1"
              alt="Awlamladry"
              onClick={() => openFullscreen("/images/amla-1.webp")}
            />
            <img
              src="/images/Blue-Simple-Hair-Conditioner-Product-Preview-Instagram-Post-2.webp"
              className="image-2"
              alt="Awlamladry"
              onClick={() => openFullscreen("/images/Blue-Simple-Hair-Conditioner-Product-Preview-Instagram-Post-2.webp")}

            />
            <img
              src="/images/amla-dry-3.webp"
              className="image-3"
              alt="Awlamladry"
              onClick={() => openFullscreen("/images/amla-dry-3.webp")}
            />
          </div>
        </div>

        <div className="rightside-container">
          <h2 className="product-heading">Awla – Amla Dry</h2>
          <h2 className="cost">₹213.00 – ₹338.00</h2>
          <p className="mini-para">
            Herbsfox Amla Dried (Without Seeds) – Awla – Nelli Vathal – Aamla –
            Amalaki – Indian Gooseberry -Emblica Officinalis – Phyllanthus
            Emblica
          </p>
          <ul>
            <li className="mini-para">Introduction to Awla – Amla Dry :</li>
          </ul>
          <p className="paragraph">
            Amla is great for your hair because it strengthens hair follicles
            and reduces biomarkers of oxidative stress. It increases blood
            circulation in the scalp, thus stimulating hair growth. It also
            helps manage the problem of dandruff and prevents premature greying.
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
                    id: "Awlaamladry",
                    name: "Awlamladry",
                    price: price,
                    quantity,
                    weight: selectedWeight,
                    image: "/images/amla-dry-2.webp",
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
            <p>SKU: 003</p>
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
                    <h4>What is Dry Amla?</h4>
                    It is a versatile fruit that can be pickled into Amla
                    murabba or strained as Amla juice. However, dry Amla is one
                    of the most antioxidant-rich foods on earth. Amla dry fruit
                    works brilliantly for most parts of the body, commonly used
                    in several Ayurvedic and herbal preparations.
                    <br />
                    One Amla is equal to how many apples?
                    <br />
                    One Amla is equal to 10 apples. This comes as no surprise,
                    seeing the Indian gooseberry’s benefits and use in Ayurvedic
                    medicines.
                    <br />
                    It is dried to be preserved for several years and consumed
                    daily for maximum health benefits.
                    <br />
                    Dried gooseberry is obtained by drying fresh amla fruits.
                    Clean the Indian gooseberry and sun-dry them on a thick
                    cotton cloth. The drying process removes all the water, and
                    Amla’s nutrients get fully concentrated. It may take 6-8
                    days to be dried and crisp. The dried part contains all the
                    concentrations of nutrients present in it.
                    <br />
                    How many Amla to eat in a day?
                    <br />
                    The recommended intake is about 1-2 Amla daily. You can
                    consume this quantity in different forms.
                  </li>
                  <li>
                    <h4>Benefits of Eating Dry Amla Daily</h4>
                    1. Reduces the risk of heart disease
                    <br />
                    Dry amla fruit has been considered a cardioactive medication
                    since ancient times in India. Research shows that Amla helps
                    decrease cholesterol levels; it also helps prevent the
                    building up of bad cholesterol and reduces triglyceride
                    levels that otherwise pose a risk to heart health.
                    <br />
                    How to have it?
                    <br />
                    For effective results, take 0.5 grams of dry amla powder two
                    times a day for 12 weeks. It can be consumed orally with
                    water or can be mixed in Ayurvedic supplements. 2. Keeps
                    your skin hydrated and glowing
                    <br />
                    Healthy skin is one of the most significant Nellikai
                    benefits. According to studies, dry amla extracts are used
                    for different types of skin disorders. It is effective in
                    treating scabies, dry skin, and wrinkled skin. This wonder
                    fruit has exceptional skin photo-protective effects that
                    protect skin from harmful UVB radiations. That is why Amla
                    is used for therapeutic and cosmetic applications.
                    <br />
                    To avail dry amla benefits for skin, consume dry Amla daily.
                    Add dry amla powder to your face mask for a natural glow.
                    <br />
                    3. Anti-cancer properties
                    <br />
                    According to studies, amla extracts have shown anti-cancer
                    properties and are used to prevent and treat cancer. It
                    helps in blocking cancer cells from spreading. Amla is rich
                    in antioxidants, which helps in fighting free radicals in
                    the body. This reduces cell damage and hence controls the
                    risk of cancer.
                    <br />
                    How and When to have it?
                    <br />
                    To get nellikai benefits, consume 1 gram of dry Amla in
                    powder form with lukewarm water every morning. You can also
                    add honey to it.
                    <br />
                    4. An effective cure for constipation
                    <br />
                    Another significant Amla fruit benefit is regularising bowel
                    movement. It helps avoid constipation and enhances the
                    secretion of gastric juices. It also helps in the easy
                    expulsion of stool due to its laxative properties. Dry amla
                    fruit reduces gastrointestinal problems by improving
                    digestion. It works as a gastroprotective agent.
                    <br />
                    How and when to have it?
                    <br />
                    To avail Dry amla benefits for constipation, take 1 teaspoon
                    of Amla every night with warm water.
                    <br />
                    5. Good for hair
                    <br />
                    Amla is great for your hair because it strengthens hair
                    follicles and reduces biomarkers of oxidative stress. It
                    increases blood circulation in the scalp, thus stimulating
                    hair growth. It also helps manage the problem of dandruff
                    and prevents premature greying.
                    <br />
                    P.S. – Consult your doctor first before consuming particular
                    herb.
                    <br />
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

export default Awlamladry;
