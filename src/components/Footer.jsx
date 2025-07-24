import React from "react";
import "../styles/Footer.css";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section footer-brand">
          <h2>QuickCart</h2>
          <p>Your trusted destination for effortless shopping.</p>
        </div>


        <div className="footer-section">
          <h4>Explore</h4>
          <ul>
            <li><a href="/products">Products</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/account">My Account</a></li>
          </ul>
        </div>


        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Shipping</a></li>
            <li><a href="#">Returns</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>


        <div className="footer-section footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#"><Facebook size={20} /></a>
            <a href="#"><Instagram size={20} /></a>
            <a href="#"><Twitter size={20} /></a>
            <a href="#"><Mail size={20} /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 QuickCart. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;