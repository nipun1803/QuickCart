import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../Firebase/Config";
import { CircleUserRound, LogOut, ShoppingBag, User } from "lucide-react";
import "../styles/Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <img
          src="https://res.cloudinary.com/dgjxow2yt/image/upload/v1753279272/Screenshot_2025-07-18_at_9.43.30_AM_tzmgmj.png"
          alt="QuickCart"
          className="nav-logo"
        />
        <span className="brand-text">QuickCart</span>
      </div>

      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <div className={`bar ${isOpen ? "rotate-top" : ""}`}></div>
        <div className={`bar ${isOpen ? "hide" : ""}`}></div>
        <div className={`bar ${isOpen ? "rotate-bottom" : ""}`}></div>
      </div>

      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <a href="/">Home</a>
        <a href="/products">Products</a>
        <a href="/about">About</a>
        {/* <a href="/contact">Contact</a> */}

        {user ? (
          <>
            <a href="/account"><User size={18} /> My Account</a>
            <a href="/orders"><ShoppingBag size={18} /> Orders</a>
            <button className="logout-btn" onClick={handleLogout}>
              <LogOut size={18} /> Logout
            </button>
          </>
        ) : (
          <a href="/signin"><CircleUserRound size={20} /> Sign In</a>
        )}
      </div>
    </nav>
  );
}

export default Navbar;