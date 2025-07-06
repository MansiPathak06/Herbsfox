import React, { useState } from "react";
import "./Products.css";
import Footer from "../pages/Footer";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ProductData from "../data/ProductData";
import { useEffect } from "react";

const Baibadang = () => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    setRelatedProducts(getRelatedProducts());
  }, []);
  const getRelatedProducts = () => {
    const productsExceptCurrent = ProductData.filter(
      (product) => product.caption.toLowerCase() !== "babchi"
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
    "100gm": 265,
    "200gm": 371,
    "400gm": 499,
    "800gm": 751,
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
            src="/images/baibhadang-2.webp"
            className="image-h"
            alt="Baibadang"
          />
          <div className="sub-images">
            <img src="/images/6-1.webp" className="image-1" alt="Baibadang"
            onClick={() => openFullscreen("/images/6-1.webp")}
             />
            <img
              src="/images/Orange-Black-Modern-Photocentric-Skincare-Product-Instagram-Post-1.webp"
              className="image-2"
              alt="Baibadang"
               onClick={() => openFullscreen("/images/Orange-Black-Modern-Photocentric-Skincare-Product-Instagram-Post-1.webp")}
            />
            <img
              src="/public/images/6.webp"
              className="image-3"
              alt="Baibadang"
            />
          </div>
        </div>

        <div className="rightside-container">
          <h2 className="product-heading">Baibadang</h2>
          <h2 className="cost">₹265.00 – ₹751.00</h2>
          <p className="mini-para">
            Herbsfox Baibadang – Vaividang Red – Embilia Ribes Burm- False Red
            Pepper – Vayuvilamgam – Vidanga
          </p>
          <ul>
            <li className="mini-para">Introduction to Baibhadang:</li>
          </ul>
          <p className="paragraph">
            Vidanga goes by the botanical name Embelia ribes and is a member of
            the Primulaceae family. Touted as false pepper, due to its close
            resemblance to black pepper seeds, Vidanga is a versatile herb that
            has been used since archaic times to treat a variety of diseases but
            is especially used for successfully curing worm infestation. It is
            mentioned in several ayurvedic scriptures for all its ayurvedic and
            medicinal characteristics.
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
                    id: "Badibadag",
                    name: "Baibadang",
                    price: price,
                    quantity,
                    weight: selectedWeight,
                    image: "/images/baibhadang-2.webp",
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
            <p>SKU: 6</p>
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
                    According to Bhavaprakasha Nighantu, Vidanga is a pungent
                    herb that chiefly helps to reduce morbidity, enhance blood
                    circulation, boost appetite, abolish phlegm, make the body
                    light, and is extremely effective in killing worms of all
                    types. Whereas the scriptures of Rajanighantu interpret
                    Vidanga as a pungent, hot, light, herb that strengthens
                    balance between wind and phlegm particles, is beneficial to
                    treat anorexia and promotes digestive power. Vidanga is a
                    potent herb that is highly beneficial for indigestion and
                    also helps to treat constipation due to its laxative
                    property.
                  </li>
                  <li>
                    <h4>Health Benefits</h4>
                    1. <strong>Cures Worm Infestation</strong>
                    <br />
                    Worms mainly occur in the stomach and intestines due to low
                    Agni or Mandagni (weak digestive fire). This low digestive
                    fire renders a favourable environment in the stomach for the
                    growth and multiplication of worms and parasites. Vidanga
                    possessing powerful Krimighna (anti-worms) trait helps in
                    the treatment and management of worm infestation and killing
                    parasites and worms including threadworms, roundworms,
                    pinworms etc.
                    <br />
                    2. <strong>Alleviates Digestive Anomalies</strong>
                    <br />
                    Indigestion in medical terms chiefly occurs due to vitiation
                    of the Pitta dosha and depicts a state of an incomplete
                    process of digestion. Being a potent digestive herb, Vidanga
                    actively helps in treating a wide range of gastrointestinal
                    anomalies as well, like Gerd or gastroesophageal reflux
                    disease, flatulence, peptic ulcer, constipation, heartburn,
                    and stomach pain. Thanks to the powerful carminative nature
                    of the herb, prescribed usage extensively helps in
                    demolishing the food particles in the stomach and intestine.
                    <br />
                    3. <br />
                    <strong>Augments Skin Health</strong>
                    Vidanga plays a crucial part in treating various skin woes
                    effectively. The abundance of antioxidants in this herb is
                    incredibly effective in destroying the harmful free radicals
                    from the body and its antipruritic essence rids the itching
                    sensation caused due to allergic conditions like psoriasis,
                    scabies, patchy skin, eczema, acne, sunburn etc. Several
                    studies show that Vidanga has dominant anti-bacterial and
                    anti-parasitic qualities that are vastly used for
                    eliminating bacteria from the body. 4.{" "}
                    <strong>Relieves Stress And Anxiety</strong>
                    <br />
                    Thanks to its powerful adaptogenic quality, Vidanga is
                    highly vital in treating numerous psychotic situations like
                    depression, dementia, Parkinson’s etc. It normalizes the
                    Vata and Pitta doshas in the body which in turn maintains
                    the serotonin levels under control and helps to curtail
                    various symptoms of anxiety which includes restlessness,
                    cold hands, feet, etc.
                    <br />
                    <strong>
                      P.S. – It is strongly advised to consult an ayurvedic
                      doctor or medical practitioner before taking the
                      medication.
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

export default Baibadang;
