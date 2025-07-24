import React, { useState } from "react";
import "../styles/Navbar.css";
import { CircleUserRound } from 'lucide-react';




function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-brand">🛒 QuickCart</div>

      
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <div className={`bar ${isOpen ? "rotate-top" : ""}`}></div>
        <div className={`bar ${isOpen ? "hide" : ""}`}></div>
        <div className={`bar ${isOpen ? "rotate-bottom" : ""}`}></div>
      </div>

      
      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <a href="/">Home</a>
        <a href="/products">Products</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        <a href="/signin"><CircleUserRound /></a>
      </div>
    </nav>
  );
}

export default Navbar;