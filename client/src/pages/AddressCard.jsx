// AddressCard.jsx
import React from "react";

const AddressCard = ({ title, address, onEdit }) => (
  <div className="address-card">
    <h3>{title}</h3>

    {address ? (
      <div className="address-details">
        <p>{address.firstName} {address.lastName}</p>
        <p>{address.street}</p>
        <p>{address.city}, {address.state} – {address.pinCode}</p>
        <p>{address.phone && <>📞 {address.phone}</>}</p>
        <p>✉️ {address.email}</p>
      </div>
    ) : (
      <p className="ptag">You have not set up this type of address yet.</p>
    )}

    <button className="edit-btn" onClick={onEdit}>
      EDIT
    </button>
  </div>
);

export default AddressCard;