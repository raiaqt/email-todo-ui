import React from "react";
import "./LandingPage.css";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

const LandingPage: React.FC = () => {
  const handleConnectGmail = () => {
    // Replace with your actual authentication logic.
    const clientId = CLIENT_ID;
    const redirectUri = REDIRECT_URI;
    const scope =
      "openid profile email https://www.googleapis.com/auth/gmail.readonly";
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline`;
    window.location.href = authUrl;
  };

  const handleSeeHowItWorks = () => {
    const element = document.getElementById("howItWorks");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="landing-container">
      <section className="hero">
        <div className="hero-content">
          <h1>Turn your inbox into a smart, focused to-do list.</h1>
          <p>
            AI-powered clarity from the chaos of email. Get started in seconds.
          </p>
          <div className="hero-cta">
            <button className="btn primary" onClick={handleConnectGmail}>
              Connect Gmail
            </button>
            <button className="btn ghost" onClick={handleSeeHowItWorks}>
              See How It Works
            </button>
          </div>
        </div>
        <div className="hero-illustration">
          {/* Replace with an actual illustration image if available */}
          <img
            src="assets/landing-illustration.svg"
            alt="Illustration of inbox to tasks flow"
          />
        </div>
      </section>

      <section id="howItWorks" className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-icon">1</div>
            <h3>Connect Gmail</h3>
          </div>
          <div className="step">
            <div className="step-icon">2</div>
            <h3>Sortify scans your inbox</h3>
          </div>
          <div className="step">
            <div className="step-icon">3</div>
            <h3>You get a clean to-do list every morning</h3>
          </div>
        </div>
      </section>

      <section className="benefits">
        <h2>Benefits</h2>
        <div className="benefits-content">
          <div className="dashboard-image">
            {/* Replace with an actual dashboard image if available */}
            <img src="assets/dashboard.png" alt="Clean dashboard" />
          </div>
          <div className="benefits-list">
            <div className="benefit-item">
              <span className="icon">📝</span>
              <p>Extracts tasks from emails</p>
            </div>
            <div className="benefit-item">
              <span className="icon">⚡</span>
              <p>Prioritizes what matters</p>
            </div>
            <div className="benefit-item">
              <span className="icon">📅</span>
              <p>Daily AI digest</p>
            </div>
            <div className="benefit-item">
              <span className="icon">⏰</span>
              <p>Snooze + mark done</p>
            </div>
            <div className="benefit-item">
              <span className="icon">🚀</span>
              <p>Pro integrations coming soon</p>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial-list">
          <div className="testimonial">
            <p>"I finally stopped forgetting email tasks."</p>
            <span>- Freelance Designer</span>
          </div>
          <div className="testimonial">
            <p>"Sortify is my quiet AI assistant."</p>
            <span>- Solo Startup Founder</span>
          </div>
        </div>
      </section>

      <section className="pricing">
        <h2>Pricing</h2>
        <div className="pricing-cards">
          <div className="pricing-card">
            <h3>Free Forever</h3>
            <p>Essential features to get started.</p>
          </div>
          <div className="pricing-card">
            <h3>Pro Plan</h3>
            <p>₱299/mo - More AI features.</p>
          </div>
          <div className="pricing-card">
            <h3>Founding Plan</h3>
            <p>₱499 one-time - Exclusive access.</p>
          </div>
        </div>
        <button className="btn primary">Start Free</button>
      </section>

      <footer className="footer">
        <div className="footer-logo">Sortify</div>
        <p className="tagline">Work clearer with AI</p>
        <div className="footer-links">
          <a href="#">Privacy</a>
          <a href="#">Contact</a>
          <a href="#">Twitter</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;