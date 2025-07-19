import React, { useEffect, useState } from "react";
import ProductCard from "./Productcard";
import "./shop.css";

const ProductGrid = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = () => {
    fetch(`https://herbsfox.onrender.com/products?category=${category}`)
      .then((res) => res.json())
      .then((data) => {
        const productList = Array.isArray(data) ? data : data.products || [];
          console.log("Sample product:", productList[0]); // 👈 ADD THIS
        setProducts(productList);
        setPage(1); // Reset page on category change
      })
      .catch((err) => console.error(`❌ Failed to fetch ${category}:`, err));
  };

 const getFirstPrice = (product) => {
  try {
    if (product.weight_price_map) {
      const parsedMap = JSON.parse(product.weight_price_map); // ✅ Convert string to object
      const prices = Object.values(parsedMap)
        .map(p => parseFloat(p))
        .filter(p => !isNaN(p));
      return prices.length > 0 ? prices[0] : 0;
    }
  } catch (err) {
    console.error("❌ Error parsing weight_price_map:", err);
  }
  return 0;
};


  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === "lowToHigh") return getFirstPrice(a) - getFirstPrice(b);
    if (sortOption === "highToLow") return getFirstPrice(b) - getFirstPrice(a);
    return 0; // Default
  });
  console.log("Sorted Prices:", sortedProducts.map(p => getFirstPrice(p)));


  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const currentProducts = sortedProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="gallery">
      {/* Top Section with Heading and Sort Dropdown */}
      <div className="grid-header">
        <h1 className="shop-heading capitalize">{category}</h1>
        <div className="sort-container">
          <select
            id="sort"
            value={sortOption}
            // onChange={(e) => setSortOption(e.target.value)}
            onChange={(e) => {
              console.log("Selected sorting option:", e.target.value); // 👈 Add this line
              setSortOption(e.target.value);
            }}
            className="sort-dropdown"
          >
            <option value="default">Default Sorting</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Product Cards */}
      <div className="image-row">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={page === i + 1 ? "active" : ""}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
