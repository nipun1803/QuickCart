import React from "react";
import "../styles/AboutPage.css";
import CountUp from "react-countup";
import {
  UsersRound,
  ShieldCheck,
  ShoppingBag,
  Star,
  Smile,
} from "lucide-react";

function AboutPage() {
  return (
    <div className="about-page">
      <div className="about-wrapper">
        <section className="about-intro">
          <h1>About QuickCart</h1>
          <p>
            At QuickCart, we redefine e-commerce with speed, trust, and customer delight.
            Our mission is to make shopping effortless and enjoyable for everyone.
          </p>
        </section>

        <section className="about-features">
          <h2>What Makes Us Different</h2>
          <div className="feature-cards">
            <div className="feature-card">
              <ShieldCheck size={40} color="#007bff" />
              <h3>Trusted Platform</h3>
              <p>100% secure payments and buyer protection for every order.</p>
            </div>
            <div className="feature-card">
              <ShoppingBag size={40} color="#007bff" />
              <h3>Vast Product Range</h3>
              <p>Thousands of verified products across categories.</p>
            </div>
            <div className="feature-card">
              <Smile size={40} color="#007bff" />
              <h3>Customer First</h3>
              <p>24/7 support and return-friendly policies.</p>
            </div>
          </div>
        </section>

        <section className="stats-section">
          <h2>QuickCart in Numbers</h2>
          <div className="stats-grid">
            <div className="stat-box">
              <UsersRound size={30} />
              <h3><CountUp end={250000} duration={3} separator="," /></h3>
              <p>Orders Delivered</p>
            </div>
            <div className="stat-box">
              <Star size={30} />
              <h3><CountUp end={50000} duration={3} separator="," /></h3>
              <p>Happy Customers</p>
            </div>
            <div className="stat-box">
              <ShieldCheck size={30} />
              <h3><CountUp end={1200} duration={3} separator="," /></h3>
              <p>Verified Sellers</p>
            </div>
          </div>
        </section>


        <section className="team-section">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <img src="https://i.pravatar.cc/150?img=3" alt="Team Member" />
              <h4>Nipun Reddy</h4>
              <p>Founder & CEO</p>
            </div>
            <div className="team-member">
              <img src="https://i.pravatar.cc/150?img=5" alt="Team Member" />
              <h4>Riya Sen</h4>
              <p>Head of Marketing</p>
            </div>
            <div className="team-member">
              <img src="https://i.pravatar.cc/150?img=8" alt="Team Member" />
              <h4>Arjun Mehta</h4>
              <p>Lead Developer</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AboutPage;