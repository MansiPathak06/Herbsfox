import React, { useState } from "react";

import "./Products.css";
import Footer from "../pages/Footer";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ProductData from "../data/ProductData";
import { useEffect } from "react";

const Kalatil = () => {
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
    "100gm": 210,
    "200gm": 288,
    "400gm": 339,
    "800gm": 444,
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
            src="/images/kala-til-2.webp"
            className="image-h"
            alt="kala-til"
          />
          <div className="sub-images">
            <img
              src="/images/Blue-Simple-Hair-Conditioner-Product-Preview-Instagram-Post-2.webp"
              className="image-1"
              alt="kala-til"
              onClick={() => openFullscreen("/images/Blue-Simple-Hair-Conditioner-Product-Preview-Instagram-Post-2.webp")}
            />
            <img
              src="/images/kala-til-1-1.webp"
              className="image-2"
              alt="kala-til"
              onClick={() => openFullscreen("/images/kala-til-1-1.webp")}
            />
            <img
              src="/images/kala-til-3.webp"
              className="image-3"
              alt="kala-til"
              onClick={() => openFullscreen("/images/kala-til-3.webp")}
            />
          </div>
        </div>

        <div className="rightside-container">
          <h2 className="product-heading">Kala Til</h2>
          <h2 className="cost">₹210.00 – ₹444.00</h2>
          <p className="mini-para">
            Herbsfox Til Kala – Kali Til – Black Til – Black Sesame Seeds –
            Niger Seed – Sesamum Indicum
          </p>
          <ul>
            <li className="mini-para">Introduction to Kala Til:</li>
          </ul>
          <p className="paragraph">
            Kala Til, also known as black sesame seeds, is a widely used
            ingredient in many cuisines worldwide. These tiny black seeds are
            packed with nutrients and have been used for centuries for their
            numerous health benefits. In this article, we will explore the
            history, health benefits, usage, and possible side effects of Kala
            Til.
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
                    id: "Kalatil",
                    name: "Kala Til",
                    price: price,
                    quantity,
                    weight: selectedWeight,
                    image: "/images/kala-til-2.webp",
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
            <p>SKU: 39</p>
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
                    <h4>History of Kala Til:</h4>
                    Kala Til has a long history that dates back thousands of
                    years. Originating from India, black sesame seeds have been
                    used both for culinary and medicinal purposes. Ancient
                    Ayurvedic texts mention the therapeutic properties of Kala
                    Til, highlighting its ability to nourish the body and
                    promote overall well-being.
                    <br />
                    Throughout history, Kala Til has held a significant place in
                    many cultures. In Chinese tradition, these seeds were
                    believed to promote healthy hair growth and slow down the
                    aging process. Similarly, in Indian folklore, black sesame
                    seeds were considered a symbol of immortality and were often
                    included in auspicious ceremonies.
                  </li>
                  <li>
                    <h4>Health Benefits of Kala Til :</h4>
                    1. Nutritional Powerhouse: Kala Til is a rich source of
                    essential nutrients, including protein, fiber, vitamin B6,
                    iron, magnesium, and calcium. Consuming these seeds
                    regularly can help meet daily nutrient requirements and
                    support overall health.
                    <br />
                    2. Heart Health: The high content of monounsaturated and
                    polyunsaturated fats in Kala Til helps maintain healthy
                    cholesterol levels and reduces the risk of heart diseases.
                    Additionally, the presence of sesamin and sesamol compounds
                    in these seeds act as antioxidants, protecting the heart
                    from oxidative stress.
                    <br />
                    3. Bone Health: Kala Til is a great source of calcium,
                    magnesium, and phosphorus, which are essential minerals for
                    maintaining strong and healthy bones. Regular consumption of
                    black sesame seeds can help prevent osteoporosis and other
                    bone-related disorders.
                    <br />
                    4. Digestive Health: The fiber content in Kala Til promotes
                    healthy digestion and regulates bowel movements. It helps
                    prevent constipation and promotes the growth of beneficial
                    gut bacteria, supporting overall gut health.
                    <br />
                    5. Skin and Hair Health: Black sesame seeds are known for
                    their remarkable impact on skin and hair health. They are
                    rich in antioxidants, which help combat oxidative stress and
                    slow down the aging process. Regular consumption of Kala Til
                    can improve skin elasticity, reduce fine lines and wrinkles,
                    and promote healthy hair growth.
                    <br />
                  </li>
                  <li>
                    <h4>Usage of Kala Til :</h4>
                    Kala Til can be used in a variety of ways and incorporated
                    into your daily diet. Here are a few popular ways to use
                    black sesame seeds:
                    <br />
                    1. Cooking: Black sesame seeds are commonly used as a
                    topping for various dishes, including salads, stir-fries,
                    and sushi. They add a nutty flavor and a subtle crunch to
                    your meals.
                    <br />
                    2. Baking: You can use Kala Til in baking recipes to enhance
                    both the flavor and appearance of baked goods. Black sesame
                    seeds can be sprinkled on bread, cookies, or cakes before
                    baking to add a unique twist.
                    <br />
                    3. Sesame Oil: Another popular usage of Kala Til is in the
                    form of cold-pressed sesame oil, which is used in cooking
                    and as a dressing for salads. This oil has a distinct nutty
                    flavor and can add depth to your dishes.
                    <br />
                    4. Tahini: Tahini, a creamy paste made from ground sesame
                    seeds, is a staple in Middle Eastern cuisine. It is used as
                    a base for dips like hummus or as a flavoring in sauces and
                    dressings.
                    <br />
                  </li>
                  <li>
                    <h4>Side Effects of Kala Til:</h4>
                    While Kala Til is generally safe for consumption, certain
                    individuals may experience allergic reactions to sesame
                    seeds. Allergy symptoms may include hives, itching, swelling
                    of the face or throat, difficulty breathing, and digestive
                    issues. It is essential to consult a healthcare professional
                    if you experience any adverse reactions after consuming Kala
                    Til.
                    <br />
                    Additionally, individuals with certain medical conditions,
                    such as kidney stones or gallstones, should exercise caution
                    when consuming black sesame seeds due to their higher
                    oxalate content.
                  </li>
                  <li>
                    <h4>Conclusion:</h4>
                    Kala Til, or black sesame seeds, have been used for
                    centuries and are cherished for their remarkable health
                    benefits. From promoting heart health to nourishing skin and
                    hair, these tiny seeds are a nutritional powerhouse. Adding
                    Kala Til to your diet is an excellent way to boost your
                    overall well-being. However, it’s essential to be mindful of
                    possible allergic reactions and consult a healthcare
                    professional if you have any underlying health conditions.
                    Enjoy the flavor and reap the benefits of Kala Til while
                    embracing a healthy lifestyle.
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

export default Kalatil;
