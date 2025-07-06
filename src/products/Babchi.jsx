import React, { useState } from "react";
import "./Products.css";
import Footer from "../pages/Footer";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ProductData from "../data/ProductData";
import { useEffect } from "react";

const Babchi = () => {
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
          <img src="/images/babchi-2.webp" className="image-h" alt="Himanshu" />
          <div className="sub-images">
            <img
              src="/images/babchi-4.webp"
              className="image-1"
              alt="babchi"
              onClick={() => openFullscreen("/images/babchi-4.webp")}
            />
            <img
              src="/images/Blue-Simple-Hair-Conditioner-Product-Preview-Instagram-Post-2.webp"
              className="image-2"
              alt="babhchii"
              onClick={() =>
                openFullscreen(
                  "/images/Blue-Simple-Hair-Conditioner-Product-Preview-Instagram-Post-2.webp"
                )
              }
            />
            <img
              src="/images/babchi.webp"
              className="image-3"
              alt="babchi3"
              onClick={() => openFullscreen("/images/babchi.webp")}
            />
          </div>
        </div>

        <div className="rightside-container">
          <h2 className="product-heading">Babchi</h2>
          <h2 className="cost">₹215.00 – ₹355.00</h2>
          <p className="mini-para">
            Herbsfox Chadila (Phool) – Kalpasi – Charila – Chareela – Stone
            (Flower) Spice – Patthar Phool
            <br />– Dagad Phool – Shaileya- Shaileyam – Shila Pushpa – Rock Moss
            – Parmelia Perlata
          </p>
          <ul>
            <li className="mini-para">Introduction to Babchi</li>
          </ul>
          <p className="paragraph">
            The English name of Babchi is Psoralea Corylifolia and the Sanskrit
            name is Bakuchi. Bakuchi is an Ayurvedic herb, Bakuchi is beneficial
            in skin disorders because it eliminates all toxins from the skin and
            revitalizes it.
            <br />
            It is used in tincture, to heal alopecia. It heals eczema, vitiligo,
            psoriasis in both oil and tincture form. Bakuchi can be used to stop
            bleeding and treating wounds.
            <br />
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
                    id: "Babchi",
                    name: "Babchi",
                    price: price,
                    quantity,
                    weight: selectedWeight,
                    image: "/images/babchi-2.webp",
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
            <p>SKU: 5</p>
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
                    <h4>Benefits:</h4>
                    1. Bakuchi / Babchi is an important herb that is used for
                    its medicinal properties. The seeds of Bakuchi are kidney
                    shaped, having a bitter taste and a very unpleasant odour.
                    <br />
                    2. Bakuchi controls vitiligo spot because it helps in
                    shrinking the white patches, the darker area slowly covers
                    all white skin area, which leads to visible skin changes due
                    to its Kusthaghna and Rasayana properties.
                    <br />
                    3. Bakuchi helps to treat various skin problem like itching
                    red papules, itching eruptions, eczema, ringworm, rough and
                    discoloured dermatosis, dermatosis with fissures due to its
                    Raktashodaka (Blood Purifier) properties.
                    <br />
                    4. Bakuchi helps to improve digestion due to its Ushna (hot)
                    potency which promotes digestive fire and digest food
                    quickly.
                    <br />
                    5. Bakuchi treats worm infestation due to its Krimighna
                    (anti worms) property.
                    <br />
                    6. Bakuchi has the property of balancing Kapha as well as
                    has Ushna Virya (hot in Potency) so it can help control
                    asthma, cough and bronchitis.
                    <br />
                    <strong>
                      P.S. – It is strongly recommended to consult a doctor
                      first before taking any dosage.
                    </strong>{" "}
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

export default Babchi;
