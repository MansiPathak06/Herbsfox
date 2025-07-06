import React, { useState } from "react";
import "./Products.css";
import Footer from "../pages/Footer";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ProductData from "../data/ProductData";
import { useEffect } from "react";

const Ashokchaal = () => {
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

  // const imagesPerPage = 12;
  // const productimages = [
  //   {
  //     id: 1,
  //     src: "/images/ashok-chaal-2.webp",
  //     caption: "Ashok-chaal",
  //     caption2: "Rs.202.00-Rs.255.00",
  //     link: "/products/Ashokchaal",
  //   },
  //   {
  //     id: 2,
  //     src: "/choti peepal.webp",
  //     caption: "Choti-peepal",
  //     caption2: "Rs.283.00-Rs.927.00",
  //     link: "/products/chotipeepal",
  //   },
  //   {
  //     id: 3,
  //     src: "/ashwgandha.webp",
  //     caption: "Ashwagandha",
  //     caption2: "Rs.264.00-Rs.767.00",
  //     link: "/products/Ashwagandha",
  //   },
  //   {
  //     id: 4,
  //     src: "/badiyaan.webp",
  //     caption: "Badiyaan",
  //     caption2: "Rs.268.00-Rs.804.00",
  //     link: "/products/badiyaan",
  //   },
  // ];
  const navigate = useNavigate();
  // const [page] = useState(1);
  // const start = (page - 1) * imagesPerPage;
  // const visibleImages = productimages.slice(start, start + imagesPerPage);

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
            src="/images/ashok-chaal-2.webp"
            className="image-h"
            alt="ashokchaal"
          />
          <div className="sub-images">
            <img
              src="/images/ashok-chaal-1.webp"
              className="image-1"
              alt="ashokchaal"
              onClick={() => openFullscreen("/images/ashok-chaal-1.webp")}
            />
            <img
              src="/images/Blue-Simple-Hair-Conditioner-Product-Preview-Instagram-Post-2.webp"
              className="image-2"
              alt="ashokchaal"
              onClick={() =>
                openFullscreen(
                  "/images/Blue-Simple-Hair-Conditioner-Product-Preview-Instagram-Post-2.webp"
                )
              }
            />
            <img
              src="/images/ashok-chaal-3.webp"
              className="image-3"
              alt="ashokchaal"
              onClick={() => openFullscreen("/images/ashok-chaal-3.webp")}
            />
          </div>
        </div>

        <div className="rightside-container">
          <h2 className="product-heading">Ashok Chaal</h2>
          <h2 className="cost">₹202.00 – ₹255.00</h2>
          <p className="mini-para">
            Herbsfox Ashoka Chhal – Ashoka Chal – Ashoka Bark – Saraca indica –
            Saraca Asoca
          </p>
          <ul>
            <li className="mini-para">Introduction to Ashok Chaal:</li>
          </ul>
          <p className="paragraph">
            Ashok Chaal, commonly known as Saraca indica or simply Ashoka, is a
            tree native to the Indian subcontinent. With its rich history and
            numerous health benefits, Ashok Chaal has been widely used in
            traditional medicine for centuries. This ancient medicinal plant has
            gained significant popularity due to its potential in treating
            various ailments. In this article, we will delve into the history,
            health benefits, usage, side effects, and conclude on the immense
            value that Ashok Chaal holds
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
                    id: "ashokchaal",
                    name: "Ashok Chaal",
                    price: price,
                    quantity,
                    weight: selectedWeight,
                    image: "/images/ashok-chaal-2.webp",
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
            <p>SKU: 29</p>
            <p>CATEGORY: HERBS</p>
            <p>[social_share-list]</p>
          </div>

          <br />
          <div className="description-wrapper">
            <button onClick={handleToggle}>DESCRIPTION</button>
            {showDescription && (
              <div className="description-text">
                <ul>
                  <li>
                    <h4>History Of Ashok Chaal:</h4>
                    Ashok Chaal holds great cultural and historical significance
                    in India. Its name, Ashok, translates to “without sorrow” or
                    “that which relieves pain” in Sanskrit. Legend has it that
                    Lord Buddha was born beneath an Ashoka tree. Historically,
                    the bark of this tree has been employed in Ayurvedic
                    medicine to alleviate gynecological disorders, thereby
                    earning the name “Women’s Best Friend.”
                  </li>
                  <li>
                    <h4>Health Benefits of Ashok Chaal:</h4>
                    <ol>
                      <li>
                        Gynecological Health: One of the well-known benefits of
                        Ashok Chaal is its potential to support women’s health.
                        Its traditional use in treating menstrual disorders,
                        including irregular periods, excessive bleeding, and
                        cramps, has drawn attention from the medical community.
                        Ashok Chaal is believed to have a hormonal balancing
                        effect and can help regulate the menstrual cycle.
                      </li>
                      <li>
                        Antioxidant Properties: Ashok Chaal is rich in
                        flavonoids and tannins, which exhibit potent antioxidant
                        activity. These constituents help protect the body’s
                        cells from oxidative stress, reducing the risk of
                        chronic diseases like heart disease and cancer.
                      </li>
                      <li>
                        Anti-inflammatory Effects: Studies suggest that Ashok
                        Chaal possesses anti-inflammatory properties, making it
                        beneficial for conditions like arthritis and
                        inflammatory bowel disease. Its consumption may help
                        alleviate pain, swelling, and discomfort associated with
                        such conditions.
                      </li>
                      <li>
                        Treatment of Skin Disorders: Ashok Chaal has shown
                        promise in the treatment of various skin problems like
                        acne, eczema, and psoriasis. The plant’s antimicrobial
                        and anti-inflammatory properties can aid in reducing
                        skin inflammation, preventing infection, and promoting
                        healing.
                      </li>
                    </ol>
                  </li>
                  <li>
                    <h4>Usage of Ashok Chaal:</h4>
                    Ashok Chaal can be consumed in various forms, including
                    powder, extracts, decoctions, and capsules. These can be
                    easily found in Ayurvedic pharmacies and health food stores.
                    Additionally, the bark can be prepared as a herbal tea by
                    boiling it in water for a few minutes. It is essential to
                    consult a healthcare professional or an Ayurvedic
                    practitioner to determine the appropriate dosage and
                    duration of use.
                  </li>
                  <li>
                    <h4>Side Effects of Ashok Chaal:</h4>
                    While Ashok Chaal is generally safe for most individuals,
                    some side effects may occur, especially if consumed in high
                    doses or for extended periods. These may include stomach
                    upset, nausea, vomiting, and allergic reactions. Pregnant
                    and breastfeeding women should avoid the use of Ashok Chaal,
                    as its effects on fetal development and lactation are yet to
                    be studied extensively.
                  </li>
                  <li>
                    <h4>Conclusion:</h4>
                    Ashok Chaal, with its extensive historical use and
                    scientifically supported health benefits, continues to be an
                    invaluable plant in the realm of Ayurvedic medicine. From
                    its role in women’s health to its antioxidant and
                    anti-inflammatory effects, the numerous advantages of Ashok
                    Chaal make it a sought-after natural remedy. However, it is
                    crucial to seek guidance from healthcare professionals to
                    ensure safe and appropriate consumption. As more scientific
                    research uncovers the potential of Ashok Chaal, this ancient
                    tree will undoubtedly continue to be cherished for its
                    medicinal properties.
                  </li>
                </ul>
              </div>
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

export default Ashokchaal;
