import React, { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-brand">🛒QuickCart</div>
      <div
        className={`nav-links ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(false)}
      >
        <a href="/">Home</a>
        <a href="/products">Products</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </div>
      <div
        className="hamburger"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </nav>
  );
}

export default Navbar;