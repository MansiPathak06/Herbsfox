import React, { useState } from "react";

import "./Products.css";
import Footer from "../pages/Footer";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ProductData from "../data/ProductData";
import { useEffect } from "react";

const Kutki = () => {
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
    "100gm": 392,
    "200gm": 663,
    "400gm": 1076,
    "800gm": 1850,
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
          <img src="/images/kutki-2.webp" className="image-h" alt="kutki" />
          <div className="sub-images">
            <img
              src="/images/kutki-1.webp"
              className="image-1"
              alt="kutki"
              onClick={() => openFullscreen("/images/kutki-1.webp")}
            />
            <img
              src="/images/Orange-Black-Modern-Photocentric-Skincare-Product-Instagram-Post-1.webp"
              className="image-2"
              alt="kutki"
              onClick={() =>
                openFullscreen(
                  "/images/Orange-Black-Modern-Photocentric-Skincare-Product-Instagram-Post-1.webp"
                )
              }
            />

            <img
              src="/images/kutki-3.webp"
              className="image-3"
              alt="kutki"
              onClick={() => openFullscreen("/images/kutki-3.webp")}
            />
          </div>
        </div>

        <div className="rightside-container">
          <h2 className="product-heading">Kutki</h2>
          <h2 className="cost">₹392.00 – ₹1,850.00</h2>
          <p className="mini-para">
            Herbsfox Kedar Kadvi Jadd – Kutki Root – Hellebore – Katuki Jadd –
            Kutaki Roots – Picrorhiza Kurroa
          </p>
          <ul>
            <li className="mini-para">Introduction to Kutki :</li>
          </ul>
          <p className="paragraph">
            Kutki (Picrorhiza kurroa), a small perennial herbaceous plant native
            to the Himalayan region, has been revered for centuries in
            traditional medicine systems. Known for its bitter taste and potent
            healing properties, Kutki has been extensively used in Ayurveda, an
            ancient Indian medicinal practice. This article delves into the
            fascinating history of Kutki, unravels its various health benefits,
            discusses its versatile usage, and provides crucial insights into
            potential side effects. So, let us embark on a comprehensive journey
            to discover the hidden potential of Kutki!
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
                    id: "Kutki",
                    name: "Kutki",
                    price: price,
                    quantity,
                    weight: selectedWeight,
                    image: "/images/kutki-2.webp",
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
            <p>SKU: 40</p>
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
                    <h4>History of Kutki :</h4>
                    Kutki has a rich history dating back thousands of years. It
                    finds its roots in Ayurveda, where it is classified as a
                    ‘panchakarma’ herb, meaning it plays a significant role in
                    purifying the body. Ayurvedic texts mention Kutki as
                    ‘katuki,’ which translates to ‘pungent’ due to its
                    characteristic bitter taste.
                    <br />
                    Traditionally, Kutki has been used to treat ailments such as
                    liver disorders, respiratory conditions, fever, digestive
                    disorders, and skin diseases. With its potent
                    anti-inflammatory, antioxidant, and immunomodulatory
                    properties, Kutki has played a central role in the holistic
                    approach of Ayurvedic medicine.
                  </li>
                  <li>
                    <h4>Health Benefits of Kutki :</h4>
                    1. Liver Health: Kutki is renowned for its hepatoprotective
                    properties, promoting liver health and function. It aids
                    detoxification, stimulates bile production, and protects
                    liver cells from damage caused by toxins, alcohol, or liver
                    diseases like hepatitis.
                    <br />
                    2. Digestive Health: This remarkable herb stimulates
                    appetite, enhances digestion, and helps in the alleviation
                    of indigestion, bloating, and acidity. Kutki can contribute
                    to the production of digestive enzymes, facilitating
                    nutrient absorption and supporting overall digestive
                    well-being.
                    <br />
                    3. Respiratory Health: Kutki exhibits potent
                    anti-inflammatory and bronchodilatory properties, making it
                    beneficial for respiratory ailments. It helps relieve
                    asthma, bronchitis, and allergies by reducing inflammation
                    and promoting smooth breathing.
                    <br />
                    4. Immune System Support: Kutki possesses powerful
                    immunomodulatory properties, assisting in strengthening the
                    immune system. Regular consumption of Kutki may aid in
                    warding off infections, allergies, and autoimmune
                    conditions.
                    <br />
                    5. Skin Health: Ayurveda considers Kutki an effective remedy
                    for various skin disorders, including eczema, psoriasis, and
                    vitiligo. Its potent anti-inflammatory and antioxidant
                    properties help reduce inflammation, improve skin texture,
                    and promote skin healing.
                    <br />
                  </li>
                  <li>
                    <h4>Usage of Kutki :</h4>
                    1. Powder Form: Kutki is commonly available in powdered
                    form, which can be mixed with honey, ghee, or warm water.
                    Consuming this mixture in prescribed dosages helps obtain
                    its numerous benefits.
                    <br />
                    2. Capsules/Tablets: Health supplements containing Kutki
                    extract are available in the form of capsules or tablets.
                    This convenient option ensures a standardized dosage and is
                    a popular choice for those seeking its therapeutic
                    potential.
                    <br />
                    3. Herbal Formulations: Kutki is often combined with other
                    medicinal herbs in Ayurvedic formulations to enhance its
                    efficacy for specific health conditions. Ayurvedic
                    practitioners can recommend personalized formulations based
                    on individual requirements.
                  </li>
                  <li>
                    <h4>Side Effects of Kutki :</h4>
                    While Kutki offers various health benefits, it is essential
                    to consider potential side effects. Some individuals may
                    experience gastrointestinal discomfort, such as bloating,
                    gas, or loose stools, due to the herb’s bitter nature.
                    Pregnant and breastfeeding women are advised to consult with
                    healthcare professionals before consuming Kutki supplements,
                    as its safety during these periods is not well-established.
                    Additionally, individuals with existing medical conditions,
                    such as liver disorders, should exercise caution and consult
                    their healthcare provider before consuming Kutki.
                  </li>
                  <li>
                    <h4>Conclusion:</h4>
                    Kutki, a potent herb with a rich history in traditional
                    medicine, offers a plethora of health benefits. From
                    supporting liver function and digestive health to enhancing
                    respiratory well-being and bolstering the immune system,
                    Kutki’s therapeutic potential is remarkable. However, it is
                    crucial always to consult a qualified healthcare
                    practitioner before incorporating Kutki into your health
                    regimen, particularly if you have specific medical
                    conditions or are currently taking medications.
                    <br />
                    Remember, while Kutki is generally safe when used correctly,
                    moderation and personalized guidance are key to ensure its
                    optimal and safe use. Embrace the wisdom of traditional
                    herbs like Kutki, and unlock its hidden potential for
                    promoting overall well-being and vitality.
                  </li>
                </ul>
              </p>
            )}
          </div>
        </div>
      </div>
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

export default Kutki;
