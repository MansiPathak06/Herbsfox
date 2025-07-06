import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../context/CartContext";
import { useProductContext } from "../context/ProductContext";

import "./navbar.css";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { products } = useProductContext();
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false); // Added searchActive state
  const searchContainerRef = useRef(null); // Reference to detect click outside

  // Search logic
  const handleSearch = (e) => {
    e.preventDefault();
    const match = products.find((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (match) {
      navigate(match.path);
    } else {
      alert("No matching product found!");
    }
    setSearchTerm("");
  };

  // Toggle search bar visibility
  const toggleSearchBar = () => {
    setSearchActive(!searchActive);
  };

  // Close search bar if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setSearchActive(false); // Close search bar when clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className={`navbar ${searchActive ? "hidden" : ""}`}>
      {/* Logo and Hamburger */}
      <div className="navbar-top">
        <p className="logo">
          <img src="/logo1.png" alt="logo" />
        </p>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>

      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li>
          <Link to="/" onClick={() => setMenuOpen(false)}>HOME</Link>
        </li>
        <li>
          <Link to="/about" onClick={() => setMenuOpen(false)}>ABOUT</Link>
        </li>
        <li
          className="dropdown"
          onMouseEnter={() => setShopDropdownOpen(true)}
          onMouseLeave={() => setShopDropdownOpen(false)}
        >
          <Link
            to="/shop"
            className="dropdown-title"
            onClick={() => {
              setShopDropdownOpen(!shopDropdownOpen);
              setMenuOpen(false);
            }}
          >
            SHOP
          </Link>
          {(shopDropdownOpen || menuOpen) && (
            <ul className="dropdown-menu">
              <li><Link to="/herbs" onClick={() => setMenuOpen(false)}>HERBS</Link></li>
              <li><Link to="/spices" onClick={() => setMenuOpen(false)}>SPICES</Link></li>
              <li><Link to="/poojaitems" onClick={() => setMenuOpen(false)}>POOJA ITEMS</Link></li>
              <li><Link to="/seeds" onClick={() => setMenuOpen(false)}>SEEDS</Link></li>
            </ul>
          )}
        </li>
        <li>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>CONTACT US</Link>
        </li>
        <li
          className="dropdown"
          onMouseEnter={() => setAccountDropdownOpen(true)}
          onMouseLeave={() => setAccountDropdownOpen(false)}
        >
          <Link
            to="#"
            className="dropdown-title"
            onClick={(e) => {
              e.preventDefault();
              setAccountDropdownOpen(!accountDropdownOpen);
              setMenuOpen(false);
            }}
          >
            ACCOUNTS
          </Link>
          {(accountDropdownOpen || menuOpen) && (
            <ul className="dropdown-menu">
              <li><Link to="/my-account" onClick={() => setMenuOpen(false)}>MY ACCOUNT</Link></li>
              <li><Link to="/cart" onClick={() => setMenuOpen(false)}>CART</Link></li>
              <li><Link to="/checkout" onClick={() => setMenuOpen(false)}>CHECKOUT</Link></li>
            </ul>
          )}
        </li>
        <li>
          <Link to="/blogs" onClick={() => setMenuOpen(false)}>BLOGS</Link>
        </li>
      </ul>

      {/* Right Side (Cart and Search) */}
      <div className="nav-right">
        <Link to="/cart" className="cart-icon" style={{ position: "relative" }}>
          <FontAwesomeIcon icon={faCartShopping} size="2x" />
          <span className="cart-count">{cartCount}</span>
        </Link>

        {/* Search Icon Button */}
        <button className="search-icon" onClick={toggleSearchBar}>
          <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
        </button>
      </div>

      {/* Search Bar */}
      {searchActive && (
        <div className="search-container active" ref={searchContainerRef}>
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
          </form>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
