import React from "react";
import "../styles/HomePage.css";
import { Truck, ShieldCheck, BadgeCheck } from "lucide-react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Shop Smarter with QuickCart</h1>
          <p className="hero-subtitle">
            Everything you need. Delivered fast. Trusted by thousands.
          </p>
          <Link to="/products" className="hero-btn">
            Start Shopping
          </Link>
        </div>
      </section>

      <section className="category-section">
        <h2 className="section-title">Shop by Category</h2>
        <div className="category-grid">
          <Link to="/products?category=Men" className="category-card">
            <h3>Men</h3>
          </Link>
          <Link to="/products?category=Women" className="category-card">
            <h3>Women</h3>
          </Link>
          <Link to="/products?category=Kids" className="category-card">
            <h3>Kids</h3>
          </Link>
        </div>
      </section>
      <section className="showcase-section">
        <h2 className="section-title">Discover Our Collection</h2>
        <div className="showcase-grid">
          <img
            src="https://res.cloudinary.com/donqbxlnc/image/upload/v1648516571/fashify/25d7ff1d-6680-4629-b7f8-dda51fb89dc61592396707535-Nautica-Men-Tshirts-3811592396706267-4_hxanis.webp"
            alt="Product 1"
          />
          <img
            src="https://res.cloudinary.com/donqbxlnc/image/upload/v1648516848/fashify/b33911a2-038f-419a-afd9-e7f7949310441639746739865AllenSollyJuniorBoysMaroonSlimFitCasualShirt1_k5fy77.webp"
            alt="Product 2"
          />
          <img
            src="https://res.cloudinary.com/donqbxlnc/image/upload/v1648516584/fashify/494a0494-2127-485d-8324-28aafe60ca0f1646647959983-one8-x-PUMA-Men-Orange-Brand-Logo-One8Core-Pure-Cotton-Virat-1_vdlx2v.webp"
            alt="Product 3"
          />
        </div>
      </section>

      <section className="features-section">
        <h2 className="section-title">Why Choose QuickCart?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <Truck size={36} color="var(--primary-color)" />
            <h3>Fast Delivery</h3>
            <p>Lightning-fast shipping to your doorstep.</p>
          </div>
          <div className="feature-card">
            <ShieldCheck size={36} color="var(--primary-color)" />
            <h3>Secure Checkout</h3>
            <p>Encrypted & verified payments with every order.</p>
          </div>
          <div className="feature-card">
            <BadgeCheck size={36} color="var(--primary-color)" />
            <h3>Trusted Sellers</h3>
            <p>Only verified and top-rated vendors on board.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;