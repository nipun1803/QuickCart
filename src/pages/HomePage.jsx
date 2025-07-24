import React from "react";
import "../styles/HomePage.css";
import { Link } from "react-router-dom";
import { Truck, ShieldCheck, BadgeCheck } from "lucide-react";

function HomePage() {
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-left">
            <h1>
              Welcome to <span> QuickCart</span>
            </h1>
            <p>Your trusted destination for effortless shopping.</p>
            <Link to="/products" className="hero-btn">
              Shop Now
            </Link>
          </div>
          <div className="hero-right">
            <img
              src="https://res.cloudinary.com/dgjxow2yt/image/upload/v1753274336/Screenshot_2025-07-23_at_5.20.13_PM_hxmyop.png"
              alt="Hero"
            />
          </div>
        </div>
      </section>


      <section className="features-section">
        <h2>Why QuickCart?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <Truck size={32} color="#007bff" strokeWidth={2.5} />
            <h3>Fast Delivery</h3>
            <p>Lightning-fast shipping straight to your doorstep.</p>
          </div>
          <div className="feature-card">
            <ShieldCheck size={32} color="#007bff" strokeWidth={2.5} />
            <h3>Secure Payments</h3>
            <p>Safe and seamless payment experience, every time.</p>
          </div>
          <div className="feature-card">
            <BadgeCheck size={32} color="#007bff" strokeWidth={2.5} />
            <h3>Verified Quality</h3>
            <p>Top-rated products curated for the best shopping.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
