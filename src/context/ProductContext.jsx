import React, { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products] = useState([
    { id: 1, name: "Ashok Chaal", path: "/products/Ashokchaal" },
    { id: 2, name: "Ashwagandha", path: "/products/Ashwagandha" },
    { id: 3, name: "Badiyaan", path: "/products/Badiyaan" },
    { id: 4, name: "chotipeepal", path: "/products/Chotipeepal" },
    { id: 5, name: "dalchini", path: "/products/Dalchini" },
    { id: 6, name: "Inderjaumeetha", path: "/products/Inderjaumeetha" },
    { id: 7, name: "jaiphal", path: "/products/jaiphal" },
    { id: 8, name: "jatamasi", path: "/products/Jatamasi" },
    { id: 9, name: "Javitri", path: "/products/Javitri" },
    { id: 10, name: "Kahujeera", path: "/products/Kahujeera" },
    { id: 11, name: "Kalatil", path: "/products/Kalatil" },
    { id: 12, name: "Kutki", path: "/products/Kutki" },
    { id: 13, name: "Poppyseeds", path: "/products/Poppyseeds" },
    { id: 14, name: "Safedmusli", path: "/products/Safedmusli" },
    { id: 15, name: "Shitalchini", path: "/products/Shitalchini" },
    { id: 16, name: "Akarkara", path: "/products/Akarkara" },
    { id: 17, name: "Flaxseed", path: "/products/Flaxseed" },
    { id: 18, name: "Awlamladry", path: "/products/Awlaamladry" },
    { id: 19, name: "Anantmool", path: "/products/Anantmool" },
    { id: 20, name: "babchi", path: "/products/Babchi" },
    { id: 21, name: "Baibadang", path: "/products/Baibadang" },
    { id: 22, name: "Chadila", path: "/products/Chadila" },
    { id: 23, name: "Chiaseeds", path: "/products/Chiaseeds" },
    { id: 24, name: "Daruhaldi", path: "/products/Daruhaldi" },
    { id: 25, name: "Dhoop lakdi", path: "/products/Dhooplakdi" },
    { id: 26, name: "Inderjaw kadwa", path: "/products/Inderjawkadwa" },
    { id: 27, name: "Inderyanphal", path: "/products/Inderyanphal" },
    { id: 28, name: "Isabgolbhusi", path: "/products/Isabgolbhusi" },
    { id: 29, name: "Kaalijiri", path: "/products/Kaalijiri" },
    { id: 30, name: "Kalimusli", path: "/products/Kalimusli" },
    { id: 31, name: "Kondrusukha", path: "/products/Kondrusukha" },
    { id: 32, name: "Kulanjan", path: "/products/Kulanjan" },
    { id: 33, name: "Majith", path: "/products/Majith" },
    { id: 34, name: "Majuhara", path: "/products/Majuhara" },
    { id: 35, name: "Nagkesar", path: "/products/Nagkesar" },
    { id: 36, name: "Niranjanphal", path: "/products/Niranjanphal" },
    { id: 37, name: "Ratanjot", path: "/products/Ratanjot" },
    { id: 38, name: "Rumimastagi", path: "/products/Rumimastagi" },
    { id: 39, name: "Sennaleave", path: "/products/Sennaleave" },
    { id: 40, name: "Shilajeet", path: "/products/Shilajeet" },
    { id: 41, name: "Sugarbadam", path: "/products/Sugarbadam" },
    { id: 42, name: "Suranjankadvi", path: "/products/Suranjankadvi" },
    { id: 43, name: "Tilsafed", path: "/products/Tilsafed" },
  ]);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);
