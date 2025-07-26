import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { auth } from "../Firebase/Config";
import { CircleUserRound, LogOut, ShoppingBag, User } from "lucide-react";
import "../styles/Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    function updateCartCount() {
      const items = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(items.length);
    }
    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    return () => window.removeEventListener("storage", updateCartCount);
  }, [location]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      toast.success("Logged out successfully!");
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Failed to logout. Please try again.");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          <div className={`bar ${isOpen ? "rotate-top" : ""}`}></div>
          <div className={`bar ${isOpen ? "hide" : ""}`}></div>
          <div className={`bar ${isOpen ? "rotate-bottom" : ""}`}></div>
        </div>
      </div>
      <div className="nav-brand">
        <img
          src="https://res.cloudinary.com/dgjxow2yt/image/upload/v1753279272/Screenshot_2025-07-18_at_9.43.30_AM_tzmgmj.png"
          alt="QuickCart"
          className="nav-logo"
        />
        <span className="brand-text">QuickCart</span>
      </div>
      <div className="navbar-right">
        <div className={`nav-links ${isOpen ? "open" : ""}`}>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/about">About</Link>

          {user ? (
            <>
              <Link to="/account"><User size={18} /> My Account</Link>
              <button className="logout-btn" onClick={handleLogout}>
                <LogOut size={18} /> Logout
              </button>
            </>
          ) : (
            <Link to="/signin"><CircleUserRound size={20} /> Sign In</Link>
          )}
        </div>
        <Link to="/cart" className="cart-navbar-icon" aria-label="Cart">
          <ShoppingBag size={28} />
          {cartCount > 0 && <span className="cart-navbar-badge">{cartCount}</span>}
        </Link>
      </div>
      {isOpen && <div className="nav-overlay" onClick={() => setIsOpen(false)}></div>}
    </nav>
  );
}

export default Navbar;