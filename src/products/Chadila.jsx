import React, { useState } from "react";

import "./Products.css";
import Footer from "../pages/Footer";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ProductData from "../data/ProductData";
import { useEffect } from "react";

const Chadila = () => {
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
    "100gm": 219,
    "200gm": 272,
    "400gm": 308,
    "800gm": 385,
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
            src="/images/chadila-2.webp"
            className="image-h"
            alt="Shitalchini"
          />
          <div className="sub-images">
            <img
              src="/images/chadila-3.webp"
              className="image-1"
              alt="Shitalchini"
              onClick={() => openFullscreen("/images/chadila-3.webp")}
            />
            <img
              src="/images/chadila-4.webp"
              className="image-2"
              alt="Shitalchini"
              onClick={() => openFullscreen("/images/chadila-4.webp")}
            />
            <img
              src="/images/chadila.webp"
              className="image-3"
              alt="Shitalchini"
              onClick={() => openFullscreen("/images/chadila.webp")}
            />
          </div>
        </div>

        <div className="rightside-container">
          <h2 className="product-heading"> Chadila</h2>
          <h2 className="cost">₹219.00 – ₹385.00</h2>
          <p className="mini-para">
            Chadila / Pathar Phool / Permalia Perlata – Stone Flower
          </p>
          <ul>
            <li className="mini-para">Introduction to Chadila:</li>
          </ul>
          <p className="paragraph">
            For not only does stone flower lend a subtle delicate zest and
            overpowering earthy fragrance to numerous traditional Indian food
            recipes, but it also holds outstanding medicinal properties for
            rectifying kidney stones, mending tissue injuries and enhancing
            overall health. Many researchers even hypothesise that its general
            terms of “Stone Flower” in English or “Patthar Ke Phool”, “Patthar
            Phool”, “Pathar Phool” in Hindi originated from its marvellous uses
            in remedying renal calculi i.e. kidney stones. In the vernacular
            tongue in the different parts of India, it is referred to as “Dagad
            Phool” in Marathi, “Kalpasi” in Tamil, “Charila”, “Chadila” in
            Hindi, “Dagad Da Phool” in Punjabi, “Shailaj” in Bengali and “Kallu
            Huvu” in Kannada
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
                    id: "Chadila",
                    name: "Chadila",
                    price: price,
                    quantity,
                    weight: selectedWeight,
                    image: "/images/chadila-2.webp",
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
            <p>SKU: 7</p>
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
                    Termed as Parmotrema perlatum, Parmelia perlata in
                    scientific nomenclature, stone flower belongs to the
                    Parmeliaceae botanical family and is fundamentally a lichen
                    – a symbiotic association of algae and fungi. However, it is
                    an edible fungus or moss that sprouts amid tree trunks,
                    mountains, rocks in the hilly areas of India, in the
                    Himalayas in the North, highlands and elevations of the
                    West, East, Deccan Peninsula in the South. Stone flower is
                    renowned for its potent ability to eliminate kidney stones
                    from the system and uplift renal functions. Moreover, it
                    supplies tremendous merits for wound-healing when applied as
                    a topical herbal formulation, thanks to its strong
                    antimicrobial and anti-inflammatory traits.
                    <br />
                    Displaying superb capabilities in balancing the exacerbated
                    kapha and pitta doshas, besides relieving asthma symptoms
                    and curing respiratory illnesses owing to its decongestant
                    qualities, stone flower is undoubtedly a panacea from Mother
                    Nature for alleviating myriad health woes.
                  </li>
                  <li>
                    <h4>Health Benefits Of Stone Flower:</h4>
                    1. Treats Kidney And Bladder Illnesses
                    <br />
                    Stone flower is highly beneficial in curing instances of
                    kidney stones, due to its strong kapha balancing attributes,
                    along with excellent diuretic abilities that help in smooth
                    excretion of urine and liquid wastes from the system. It is
                    also widely applied in traditional ayurvedic formulations as
                    an effective remedy for urolithiasis i.e. formation of
                    stones in the bladder, urinary tract, as well as to treat
                    UTI i.e. urinary tract infection and pacifying cases of
                    dysuria or painful urination.
                    <br />
                    2. Repairs Bruised Tissues
                    <br />
                    Laden with potent anti-inflammatory agents, stone flower or
                    patthar phool works wonders in healing wounds on external
                    tissues of skin. It also possesses amazing antimicrobial
                    properties that thwart(prevent) infections from stemming in
                    the exposed areas of injured skin. Regular topical
                    application of a ground paste of stone flower mixed with
                    coconut oil is a proven solution for faster wound healing
                    and helps in diminishing scars.
                    <br />
                    3. Mitigates Asthma Symptoms
                    <br />
                    Patthar Phool contains a treasure trove of antioxidants that
                    showcase powerful decongestant traits. This is very useful
                    in resolving asthma symptoms of wheezing, chest congestion,
                    breathing difficulty, chest pain and obstruction in the
                    lungs and respiratory passages. Ingesting some curry or dal
                    prepared with generous amounts of thoroughly boiled stone
                    flower aids in clearing the nasal, throat and respiratory
                    tracts, thus amending discomforting indications of asthma.
                    <br />
                    4. Preserves Gut Health
                    <br />
                    Touted for its Pitta-balancing qualities, stone flower is a
                    time-tested natural remedy for correcting instances of
                    gastritis in the gut, due to its valuable “Sheeta” or
                    cooling potency that helps bring down high acidity and
                    excessive heat in the gastrointestinal tract. Moreover, it
                    comprises astounding antimicrobial characteristics, that are
                    useful in treating inflammation, ulcers in the stomach,
                    intestines, triggered by bacteria.
                    <br />
                    5. Augments Heart Wellness
                    <br />
                    Stone flower is a proven ayurvedic herb for rectifying a
                    host of heart-related conditions such as hypertension i.e.
                    high blood pressure and atherosclerosis. Like the potent
                    herb Arjuna, stone flower powders and decoctions also work
                    as a powerful cardiac tonic, with strong phenolic
                    antioxidants, that prevent clogging of blood vessels with
                    unhealthy fats of triglycerides, bad LDL cholesterol and
                    increase the good HDL cholesterol levels in bloodstream.
                    <br />
                    <strong>
                      P.S. – Consult with a medical professional before taking
                      any dosage of particular herb.
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

export default Chadila;
