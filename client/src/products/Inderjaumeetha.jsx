import React, { useState } from "react";

import "./Products.css";
import Footer from "../pages/Footer";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ProductData from "../data/ProductData";
import { useEffect } from "react";

const Inderjaumeetha = () => {
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
    "100gm": 215,
    "200gm": 264,
    "400gm": 293,
    "800gm": 355,
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
            src="/images/36-1.webp"
            className="image-h"
            alt="Inderjaumeetha"
          />
          <div className="sub-images">
            <img
              src="/images/36.webp"
              className="image-1"
              alt="Inderjaumeetha"
              onClick={() => openFullscreen("/images/36.webp")}
            />
            <img
              src="/images/Blue-Simple-Hair-Conditioner-Product-Preview-Instagram-Post-2.webp"
              className="image-2"
              alt="Inderjaumeetha"
              onClick={() => openFullscreen("/images/Blue-Simple-Hair-Conditioner-Product-Preview-Instagram-Post-2.webp")}
            />
            <img
              src="/images/36-2.webp"
              className="image-3"
              alt="Inderjaumeetha"
              onClick={() => openFullscreen("/images/36-2.webp")}
            />
          </div>
        </div>

        <div className="rightside-container">
          <h2 className="product-heading">Inderjau Meetha</h2>
          <h2 className="cost">₹215.00 – ₹355.00</h2>
          <p className="mini-para">
            Herbsfox Indrajau (Meetha) – Coneru – Kutaja – Inderjo Mitha –
            Indrajav Meetha – Dudhi – Sweet Indrajao – Wrightia Tinctoria
          </p>
          <ul>
            <li className="mini-para">Introduction to Inderjao Meetha:</li>
          </ul>
          <p className="paragraph">
            In the realm of herbal remedies, few plants possess the remarkable
            healing properties and cultural significance of Inderjao Mitha. Also
            known as Cissampelos pareira, Inderjao Mitha is a vine widely
            cultivated in Southeast Asia, South America, and Africa. For
            centuries, this natural wonder has been lauded for its therapeutic
            applications in various traditional medicinal practices. Its unique
            composition, steeped in bioactive compounds, offers a broad range of
            health benefits. In this comprehensive guide, we will explore the
            fascinating history, meticulous cultivation, potential side effects,
            and the myriad of ways Inderjao Mitha is harnessed for holistic
            well-being.
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
                    id: "Flaxseed",
                    name: "Flaxseed",
                    price: price,
                    quantity,
                    weight: selectedWeight,
                    image: "/images/alsi-2.webp",
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
            <p>SKU: 34</p>
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
                    <h4>
                      History and Cultural Significance of Inderjao Meetha:
                    </h4>
                    Inderjao Mitha has a rich history that spans across several
                    civilizations, leaving behind a trail of cultural,
                    medicinal, and spiritual importance. Dating back to ancient
                    India, Ayurvedic texts and folklore mention the vine for its
                    efficacy in treating numerous ailments. Known as Swapna
                    Datri or Swapnil Tuti, it played a vital role in traditional
                    practices aimed at healing, detoxification, and rejuvenation
                    <br />
                    Notably, indigenous tribes in the Amazon rainforest of South
                    America have treasured Inderjao Mitha for centuries. It was
                    revered as a sacred plant, often used in shamanic rituals
                    and spiritual ceremonies. The vine was believed to connect
                    individuals with the spirit world, promoting a sense of
                    harmony, balance, and insight.
                  </li>
                  <li>
                    <h4>Health Benefits of Inderjao Meetha:</h4>
                    The astounding array of health benefits associated with
                    Inderjao Mitha stems from its potent bioactive compounds.
                    Prized for its anti-inflammatory, antioxidant, and
                    antibacterial properties, it has become a go-to remedy for
                    numerous ailments. Let us delve into some of its most
                    remarkable therapeutic applications:
                    <br />
                    1. Digestive Health: Inderjao Mitha has long been used to
                    alleviate digestive issues such as diarrhoea, stomach pain,
                    and intestinal cramps. Its antispasmodic properties relax
                    the smooth muscles of the gastrointestinal tract, helping to
                    alleviate discomfort and restore normal digestive function.
                    <br />
                    2. Immune Support: Packed with natural antioxidants,
                    Inderjao Mitha can fortify the immune system by neutralizing
                    harmful free radicals and reducing inflammation. It aids in
                    protecting cells from oxidative damage, boosting the body’s
                    ability to fend off diseases and infections.
                    <br />
                    3. Anti-inflammatory Effects: The vine possesses powerful
                    anti-inflammatory properties, making it an ideal remedy for
                    conditions such as arthritis, gout, and chronic pain. The
                    bioactive compounds in Inderjao Mitha help to reduce
                    inflammation and alleviate discomfort, providing relief to
                    those suffering from such conditions.
                    <br />
                    4. Kidney Health: Inderjao Mitha has been traditionally used
                    to support kidney health and aid in the treatment of kidney
                    stones. It acts as a diuretic, increasing urine production
                    and facilitating the elimination of waste products and
                    toxins from the body.
                    <br />
                  </li>
                  <li>
                    <h4>Usage and Preparation of Inderjao Meetha:</h4>
                    Inderjao Mitha lends itself to various preparations, making
                    it an incredibly versatile herbal remedy. Here are some
                    popular methods of consuming it: 1. Herbal Tea: One of the
                    simplest ways to harness the potential of Inderjao Mitha is
                    through the preparation of herbal tea. Begin by boiling one
                    teaspoon of the dried leaves in a cup of water for 10
                    minutes. Strain the mixture and enjoy the aromatic infusion
                    to promote digestion, cleanse the liver, and soothe
                    inflammation.
                    <br />
                    2. Tincture: For a concentrated form of Inderjao Mitha, a
                    tincture can be prepared by macerating the plant material in
                    alcohol or another suitable solvent. This method extracts
                    the bioactive compounds efficiently, allowing for a potent
                    remedy that can be conveniently added to beverages or taken
                    directly.
                    <br />
                    3. Poultice: In cases of skin conditions, bruises, or joint
                    pain, a poultice made from Inderjao Mitha leaves can be
                    utilized for localized relief. Crush the leaves and mix them
                    with a small amount of warm water to form a paste. Apply the
                    poultice directly to the affected area and leave it for 20
                    minutes before rinsing.
                    <br />
                    <br />
                  </li>
                  <li>
                    <h4>Side Effects and Precautions of Inderjao Meetha:</h4>
                    While Inderjao Mitha offers remarkable health benefits, it
                    is essential to exercise caution and be aware of potential
                    side effects. Although rare, some individuals may experience
                    allergic reactions to the plant. If you notice any signs of
                    an allergic response, such as skin rashes, itching, or
                    difficulty breathing, discontinue use immediately and
                    consult a healthcare professional.
                    <br />
                    Furthermore, pregnant or breastfeeding women should err on
                    the side of caution and avoid consuming Inderjao Mitha. The
                    effects on the developing fetus or the infant are not yet
                    fully understood, warranting avoidance to ensure their
                    well-being.
                    <br />
                  </li>
                  <li>
                    <h4>Conclusion:</h4>
                    In conclusion, Inderjao Mitha is a perennial vine that has
                    stood the test of time, earning its place as a powerhouse of
                    natural healing. From its ancient origins in Ayurvedic
                    medicine to its significance in indigenous cultures, this
                    plant has captivated the imaginations of herbal enthusiasts
                    and medical professionals alike. With its myriad of health
                    benefits and diverse applications, Inderjao Mitha continues
                    to offer a holistic approach to well-being. As with any
                    remedy, it is essential to consult healthcare professionals
                    and make informed decisions to experience the remarkable
                    potential it has to offer. Embrace the wonders of Inderjao
                    Mitha and embark on a journey towards natural healing,
                    balance, and vitality.
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

export default Inderjaumeetha;
