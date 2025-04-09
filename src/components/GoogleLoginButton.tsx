import React from "react";
import "./GoogleLoginButton.css";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

const GoogleLoginButton: React.FC = () => {
  const handleLogin = () => {
    const clientId = CLIENT_ID;
    const redirectUri = REDIRECT_URI;
    const scope =
      "openid profile email https://www.googleapis.com/auth/gmail.readonly";
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline`;

    // Redirect the user to Google's OAuth 2.0 endpoint
    window.location.href = authUrl;
  };
  return (
    <div className="landing-container">
      <header className="landing-header">
        <div className="logo">SortifyAI</div>
      </header>
      <div className="landing-hero">
        <h1>Welcome to SortifyAI</h1>
        <p>Your personal assistant for email tasks.</p>
        <button className="landing-button" onClick={handleLogin}>
          Get Started
        </button>
      </div>
      <div className="landing-features">
        <div className="landing-feature">
          <h3>Organize Emails</h3>
          <p>Sort and filter your inbox with ease.</p>
        </div>
        <div className="landing-feature">
          <h3>Automate Tasks</h3>
          <p>Turn emails into actionable todos.</p>
        </div>
        <div className="landing-feature">
          <h3>Gain Insights</h3>
          <p>Get smart analytics at a glance.</p>
        </div>
      </div>
    </div>
  );
};

export default GoogleLoginButton;
