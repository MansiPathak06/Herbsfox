import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    main_image: "",
    sub_image1: "",
    sub_image2: "",
    sub_image3: "",
    price_range: "",
    technical_name: "",
    about: "",
    sku: "",
    category: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/admin/products", form);
      alert("Product added successfully");
      setForm({});
    } catch (err) {
      console.error(err);
      alert("Error adding product");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
      <h2>Add Product</h2>
      {Object.keys(form).map((key) => (
        <div key={key}>
          <label>{key}:</label>
          <input name={key} value={form[key] || ""} onChange={handleChange} />
        </div>
      ))}
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProduct;
