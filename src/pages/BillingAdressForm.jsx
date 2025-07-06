import React, { useState, useEffect } from "react";

// Matches backend expectations
const emptyAddress = {
  name: "", // Combined first + last name
  address: "", // Street address
  city: "",
  state: "",
  zip: "", // Changed from pinCode to zip
  country: "India", // Added default country
  phone: "",
  email: "",
};

const BillingAddressForm = ({ initial, onSave, onCancel }) => {
  const [data, setData] = useState(emptyAddress);
  const [isEditing, setIsEditing] = useState(!initial); // If there's no initial, allow edit

  useEffect(() => {
    if (initial) {
      // Transform initial data to match our structure if needed
      const transformed = initial.firstName
        ? {
            name: `${initial.firstName} ${initial.lastName}`.trim(),
            address: initial.street || "",
            city: initial.city || "",
            state: initial.state || "",
            zip: initial.pinCode || "",
            country: "India",
            phone: initial.phone || "",
            email: initial.email || "",
          }
        : initial;
      setData(transformed);
    }
  }, [initial]);

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ensure we only send what backend expects
    const backendData = {
      name: data.name,
      address: data.address,
      city: data.city,
      state: data.state,
      zip: data.zip,
      country: data.country,
      // Note: backend doesn't use phone/email in address
    };
    onSave(backendData);
  };

  return (
    
    <form className="address-form" onSubmit={handleSubmit}>
      <h2 className="address-form-heading">Billing Address</h2>


      <div className="form-row">
        <label>Full name*</label>
        <input
          name="name"
          value={data.name}
          onChange={handleChange}
          required
          disabled={!isEditing}
        />
      </div>

      <div className="form-row">
        <label>Street address*</label>
        <input
          name="address"
          value={data.address}
          onChange={handleChange}
          required
          disabled={!isEditing}
        />
      </div>

      <div className="form-row">
        <label>Town / City*</label>
        <input
          name="city"
          value={data.city}
          onChange={handleChange}
          required
          disabled={!isEditing}
        />
      </div>

      <div className="form-row">
        <label>State*</label>
        <input
          name="state"
          value={data.state}
          onChange={handleChange}
          required
          disabled={!isEditing}
        />
      </div>

      <div className="form-row">
        <label>ZIP code*</label>
        <input
          name="zip"
          value={data.zip}
          onChange={handleChange}
          pattern="\d{6}"
          required
          disabled={!isEditing}
        />
      </div>

      <div className="form-row">
        <label>Country*</label>
        <select
          name="country"
          value={data.country}
          onChange={handleChange}
          required
          disabled={!isEditing}
        >
          <option value="India">India</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="form-row">
        <label>Phone (optional)</label>
        <input
          name="phone"
          value={data.phone}
          onChange={handleChange}
          pattern="\d{10}"
          maxLength={10}
          disabled={!isEditing}
        />
      </div>

      <div className="form-row">
        <label>Email (optional)</label>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>

      <div className="form-actions">
        {isEditing ? (
          <>
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Save address
            </button>
          </>
        ) : (
          <>
            <button type="button" onClick={onCancel}>
              Close
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="edit-btn"
            >
              Edit address
            </button>
          </>
        )}
      </div>
    </form>
  );
};

export default BillingAddressForm;
