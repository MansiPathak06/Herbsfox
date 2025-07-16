
import React, { useEffect, useState } from "react";
import axios from "axios";

import ProductCard from './Productcard';
import Footer from "./Footer";
import "./shop.css";

const Spices = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`https://herbsfox.onrender.com/products?category=spices`)
// 🔁 Filter by category
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="gallery">
      <h1 className="shop-heading">Spices</h1>
      <div className="image-row">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Spices;

//       <Footer />
//     </div>
//   );
// };

// export default Spices;


