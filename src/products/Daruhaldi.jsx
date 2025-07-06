import React, { useState } from "react";

import "./Products.css";
import Footer from "../pages/Footer";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ProductData from "../data/ProductData";
import { useEffect } from "react";

const Daruhaldi = () => {
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
    "100gm": 204,
    "200gm": 242,
    "400gm": 250,
    "800gm": 272,
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
          <img src="/images/daru-haldi-2.webp" className="image-h" alt="Sxyz" />
          <div className="sub-images">
            <img
              src="/images/daru-haldi-3.webp"
              className="image-1"
              alt="xyz"
              onClick={() => openFullscreen("/images/daru-haldi-3.webp")}
            />
            <img
              src="/images/daru-haldi-4.webp"
              className="image-2"
              alt="xyz"
              onClick={() => openFullscreen("/images/daru-haldi-4.webp")}
            />
            <img
              src="/images/daru-haldi.webp"
              className="image-3"
              alt="xyz"
              onClick={() => openFullscreen("/images/daru-haldi.webp")}
            />
          </div>
        </div>

        <div className="rightside-container">
          <h2 className="product-heading"> DARU HALDI</h2>
          <h2 className="cost">₹204.00 – ₹272.00</h2>
          <p className="mini-para">
            Herbsfox Daru Haldi (Chaal) – Barberry Bark – Daaru Haridra –
            Kaliyak – Sumblu – Berberis Aristata
          </p>
          <ul>
            <li className="mini-para">Introduction to Daru Haldi:</li>
          </ul>
          <p className="paragraph">
            Daruharidra is also known as tree turmeric or Indian barberry. It
            has long been a part of the Ayurvedic medical system. Daruharidra’s
            fruit and stem are both frequently used for their therapeutic
            properties. The fruit is a good source of vitamin C and is edible.
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
                    id: "Daruhaldi",
                    name: "Daruhaldi",
                    price: price,
                    quantity,
                    weight: selectedWeight,
                    image: "/images/daru-haldi-2.webp",
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
            <p>SKU: 9</p>
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
                    Due to its anti-inflammatory and anti-psoriatic properties,
                    daru haldi is mostly helpful for skin conditions like
                    inflammation and psoriasis. Due to its antibacterial and
                    anti-inflammatory qualities, it aids in the management of
                    acne by halting the growth of germs that cause acne and
                    lowering inflammation.
                    <br />
                    About Daru Haldi:
                    <br />
                    Many people refer to Berberis aristata by the names
                    Daruharidra, Daru Haldi, Indian barberry, Tree turmeric, and
                    Chitra. The Berberidaceae family includes the spiky, hard,
                    and yellowish herb known as daruhidra. The sub-Himalayan
                    region, the Nilgiri Hills in southern India, and the hilly
                    regions of Nepal between the altitudes of 2000 and 3500
                    metres are where it is most frequently observed. It is
                    recognised as one of the most important herbal plants in
                    Ayurvedic, Siddha, and Unani medicine because of its
                    therapeutic benefits. The plant’s roots are the official
                    source of the drug.
                    <br />
                    Its roots, including Darvyadi kvatha, Rasaut, Darvyadi leha,
                    Rasanjana, Dasanga lepa, and others, as well as its bark,
                    rhizomes, stem, leaves, and fruits, are used in numerous
                    traditional ayurvedic medicines.
                    <br />
                  </li>

                  <li>
                    <h4>Health Benefits Of Daru Haldi:</h4>
                    1. Improves Skin Quality
                    <br />
                    Ayurveda recognises Daruharidra as a well-known go-to remedy
                    for a variety of skin conditions due to its endowment of
                    antioxidant, antibacterial, and anti-inflammatory
                    characteristics. It reduces sebum production and aids in
                    treating a variety of skin illnesses due to its blood
                    purifying properties and Kapha-Pitta features, which help
                    remove toxins from the blood. In addition to protecting the
                    skin from the damaging UVA and UVB rays’ oxidative radical
                    damage, it also delays the appearance of wrinkles, fine
                    lines, blemishes, spots, and dark undereye circles.
                    Additionally, it is useful for treating a variety of
                    allergic disorders, including psoriasis, scabies, eczema,
                    acne, pimples, and zits. Even burns, ulcers, and other
                    lesions can be healed using it.
                    <br />
                    Paste Prepration:
                    <br />
                    1 tablespoon aloe vera gel, 1 teaspoon Daruharidra powder, 1
                    teaspoon neem powder, a pinch of turmeric, and rose water
                    should be combined to form a paste. Spread this paste all
                    over your face and neck to get a beautiful, flawless
                    complexion.
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
                    2. Treats Gynaecological Problems
                    <br />
                    There is no better treatment for hormone issues than
                    daruharidra. It is essential for controlling periods,
                    treating postpartum illnesses, and even reducing severe
                    abdominal pain and bleeding. It also aids in the treatment
                    of amenorrhea (absence of menstruation),
                    dysmenorrhea-related abdominal cramps, menorrhagia
                    (abnormally heavy or prolonged bleeding), metrorrhagia
                    (abnormal bleeding from the uterus between periods)
                    <br />
                    3. Solutions for Liver Anomalies
                    <br />
                    Daruharidra develops strong hepatoprotective and
                    hepatostimulative characteristics, making it an effective
                    treatment for jaundice and other liver abnormalities
                    including cirrhosis and fatty liver, in which the liver is
                    most severely afflicted. Due to the presence of the active
                    component Berberine, Daruharidra aids in lowering blood
                    triglyceride levels as well as liver enzyme levels. By
                    causing the liver to secrete bile, which in turn allows the
                    liver enzymes to return to normal levels, the root extract
                    supports the liver’s ability to operate. Additionally, it
                    enhances liver function and cleanses the liver by getting
                    rid of AMA.
                    <br />
                    4. Controls diabetes
                    <br />
                    Daruharidra exhibits potent anti-diabetic qualities that
                    excel in regulating the body’s blood sugar levels. When
                    diabetic patients have subpar glycaemic control, the
                    biochemical components berberine and berberol are a helpful
                    way to start them on insulin therapy. Additionally, when the
                    extract of Daruharidra is consumed, the beta-pancreatic
                    cells that help produce insulin become very active.
                    Additionally, it slows down the conversion of starch into
                    glucose, which leads to low blood sugar levels in the body
                    and maintains a consistent diabetic reading.
                    <br />
                    5. Manages diarrhoea
                    <br />
                    Daruharidra is widely used for eliminating bacteria from the
                    intestines that cause diarrhoea and other intestinal
                    disorders. It also has strong antibacterial and
                    anti-diarrheal effects. It can be used to treat AMA ATISARA,
                    a type of acute diarrhoea marked by slimy bowels that are
                    sticky, full of mucus, and have a foul odour, when ingested
                    in the recommended dosages. This herb not only helps the
                    body get rid of impurities, but it also successfully lessens
                    how often you poop and even treats dysentery.
                    <br />
                    <strong>
                      {" "}
                      P.S. – It is highly recommended to consult a doctor before
                      taking ant dosage of Daru Haldi in any form.
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

export default Daruhaldi;
