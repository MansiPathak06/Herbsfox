import React from "react";
import { useLocation } from "react-router-dom";
import { useProductContext } from "../context/ProductContext";

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query")?.toLowerCase();
  const { products } = useProductContext();

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query)
  );

  return (
    <div>
      <h2>Search Results for: "{query}"</h2>
      {filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul>
          {filteredProducts.map((product) => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
