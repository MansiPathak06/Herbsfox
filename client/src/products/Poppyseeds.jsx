import React, { useState } from "react";

import "./Products.css";
import Footer from "../pages/Footer";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ProductData from "../data/ProductData";
import { useEffect } from "react";

const Poppyseeds = () => {
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
    "100gm": 202,
    "200gm": 237,
    "400gm": 240,
    "800gm": 255,
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
            src="/images/poopy-seeds-2.webp"
            className="image-h"
            alt="Poppy seeds"
          />
          <div className="sub-images">
            <img
              src="/images/poopy-seeds-1.webp"
              className="image-1"
              alt="Poppy-seeds"
            />
            <img
              src="/images/Orange-Black-Modern-Photocentric-Skincare-Product-Instagram-Post-1.webp"
              className="image-2"
              alt="Poppy-seeds"
            />
            <img
              src="/images/poopy-seeds-3.webp"
              className="image-3"
              alt="Poppy-seeds"
            />
          </div>
        </div>

        <div className="rightside-container">
          <h2 className="product-heading">Poppy Seeds</h2>
          <h2 className="cost">₹364.00 – ₹1,850.00</h2>
          <p className="mini-para">
            Herbsfox Khas Khas – Posta Dana – Post Koknar – Papaver Somniferum –
            Poppy Seeds – Posto Daana
          </p>
          <ul>
            <li className="mini-para">Introduction to Poppy Seeds:</li>
          </ul>
          <p className="paragraph">
            Poppy seeds are tiny, oil-rich seeds derived from the opium poppy
            plant, scientifically known as Papaver somniferum. These small but
            mighty seeds are commonly used in culinary dishes and baking around
            the world. Despite their small size, poppy seeds are packed with
            essential nutrients and have been used for centuries in traditional
            medicine due to their impressive health benefits. In this article,
            we will delve into the history, health benefits, usage, side
            effects, and conclusion on poppy seeds.
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
                    id: "Popppyseeds",
                    name: "Poppy seeds",
                    price: price,
                    quantity,
                    weight: selectedWeight,
                    image: "/images/poopy-seeds-2.webp",
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
            <p>SKU: 41</p>
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
                    <h4>History of Poppy Seeds :</h4>
                    Poppy seeds have a rich history that dates back thousands of
                    years. They were first cultivated in Ancient Mesopotamia, an
                    area that is now modern-day Iraq and Iran. They were then
                    brought to Ancient Egypt, where they were highly prized for
                    both culinary and medicinal purposes. The opium poppy plant,
                    from which poppy seeds are derived, was also used for its
                    psychoactive properties in these ancient civilizations.
                    <br />
                    Over time, poppy seeds spread to ancient Greece and Rome,
                    where they were revered for their culinary attributes. The
                    Roman naturalist, Pliny the Elder, wrote about their health
                    benefits, and they became an essential ingredient in Roman
                    kitchens. Poppy seeds continued to gain popularity
                    throughout the Middle Ages and were eventually brought to
                    Eastern Europe and Asia by traders
                  </li>
                  <li>
                    <h4>Health Benefits of Poppy Seeds:</h4>
                    1. Nutrient-Rich: Poppy seeds are a great source of
                    essential nutrients, including minerals such as calcium,
                    iron, magnesium, and phosphorus. They also contain Vitamin B
                    complex, including thiamine, riboflavin, and niacin. These
                    seeds are a powerhouse of nutrition, providing a wide array
                    of vitamins and minerals necessary for optimal bodily
                    functions.
                    <br />
                    2. Antioxidant Properties: Poppy seeds are a rich source of
                    antioxidants, including polyphenols and flavonoids. These
                    antioxidants help protect the body against the damaging
                    effects of free radicals, reducing the risk of chronic
                    diseases such as heart disease, cancer, and age-related
                    macular degeneration.
                    <br />
                    3. Promotes Digestive Health: Poppy seeds are high in
                    dietary fiber, which aids digestion and promotes regular
                    bowel movements. The fiber content helps prevent
                    constipation and promotes a healthy digestive system.
                    <br />
                    4. Boosts Energy: The high content of essential minerals and
                    carbohydrates in poppy seeds makes them a great
                    energy-boosting snack. These seeds can provide a quick burst
                    of energy and are often consumed by athletes and individuals
                    seeking an energy pick-me-up.
                    <br />
                    5. Supports Bone Health: Poppy seeds contain essential
                    minerals like calcium, phosphorus, and magnesium, which are
                    necessary for maintaining healthy bones and teeth. Regular
                    consumption of poppy seeds can help prevent conditions such
                    as osteoporosis and tooth decay.
                    <br />
                  </li>
                  <li>
                    <h4>Usage of Poppy Seeds:</h4>
                    Poppy seeds are highly versatile and can be used in various
                    culinary creations. They are commonly used in baking, as an
                    ingredient in bread, cakes, and pastries, adding a
                    delightful crunch and nutty flavor. In Eastern European
                    cuisine, they are often sprinkled on top of savory dishes,
                    enhancing their visual appeal and taste.
                    <br />
                    Apart from culinary usage, poppy seeds are also utilized in
                    traditional medicine. In Ayurveda, the ancient Indian system
                    of medicine, poppy seeds are used in remedies for inducing
                    sleep, relieving pain, and treating urinary disorders. Due
                    to their mild sedative properties, they are often used to
                    promote relaxation and alleviate stress.
                  </li>
                  <li>
                    <h4>Side Effects of Poppy Seeds:</h4>
                    While poppy seeds are generally safe for consumption, there
                    are a few considerations to keep in mind. One potential side
                    effect is the presence of trace amounts of opiates in poppy
                    seeds. These opiates, though minimal, can trigger a positive
                    drug test for opiates, leading to false accusations. It is
                    always prudent to inform medical personnel about recent
                    poppy seed consumption before undergoing any drug test or
                    medical procedure.
                    <br />
                    Additionally, excessive consumption of poppy seeds may cause
                    allergic reactions in some individuals. Those with a known
                    allergy to nuts or seeds should exercise caution and consult
                    with a healthcare professional before incorporating poppy
                    seeds into their diet.
                  </li>
                  <li>
                    <h4>Conclusion:</h4>
                    Poppy seeds have a long and fascinating history, spanning
                    across various ancient civilizations. Beyond their rich
                    cultural significance, poppy seeds offer a plethora of
                    health benefits. From providing essential nutrients to
                    promoting digestive health and supporting bone health, these
                    small seeds are a valuable addition to one’s diet.
                    <br />
                    Despite their numerous benefits, it is important to consume
                    poppy seeds in moderation and within the limits of one’s
                    dietary needs. It is also crucial to consider any potential
                    allergies or the possibility of false positive drug test
                    results due to the presence of opiates in poppy seeds.
                    <br />
                    In conclusion, poppy seeds have stood the test of time and
                    continue to thrive as a versatile ingredient in various
                    culinary dishes worldwide. With their unique flavor and
                    impressive nutritional profile, it’s no wonder that poppy
                    seeds remain a beloved ingredient in kitchens and bakeries
                    around the globe.
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

export default Poppyseeds;
