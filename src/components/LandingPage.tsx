import React, { useState } from "react";
import "./LandingPage.css";
import inboxflow from "../assets/inboxflow.png";
import dashboard from "../assets/dashboard.png";
import logo from "../assets/logo.png";
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import EventNoteIcon from '@mui/icons-material/EventNote';
import SnoozeIcon from '@mui/icons-material/Snooze';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import PublicIcon from '@mui/icons-material/Public';
import EmailIcon from '@mui/icons-material/Email';
import SearchIcon from '@mui/icons-material/Search';
import ListIcon from '@mui/icons-material/List';
import { submitEmail } from "../api/submitEmail";
import WaitlistModal from "./WaitlistModal";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

const LandingPage: React.FC = () => {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  // const [feedbackMessage, setFeedbackMessage] = useState("");
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);
  // const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const handleConnectGmail = () => {
    // Replace with your actual authentication logic.
    const clientId = CLIENT_ID;
    const redirectUri = REDIRECT_URI;
    const scope =
      "openid profile email https://www.googleapis.com/auth/gmail.readonly";
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline`;
    window.location.href = authUrl;
  };

  const handleJoinWaitlist = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitEmail(email);
      // Set a custom success message
      // setFeedbackMessage(
      //   "Thank you for subscribing! You'll receive an invite via email shortly."
      // );
      setEmail("");
      setShowWaitlistModal(false);
    } catch (error: unknown) {
      // Set a custom error message based on the error, if available
      // setFeedbackMessage(
      //   error instanceof Error
      //     ? error.message
      //     : "Something went wrong. Please try again later."
      // );
      console.error(error);
    } finally {
      setIsSubmitting(false);
      // Open the feedback modal after submit attempt
      // setShowFeedbackModal(true);
    }
  };

  const handleWaitlistClick = () => {
    setShowWaitlistModal(true);
  };

  return (
    <div className="landing-container">
      <section className="hero">
        <div className="hero-content">
          <div>
            <img src={logo} alt="Sortify logo" className="sortify-logo" />
            <h2>Sortify</h2>
            <h1>Turn your inbox into a smart, focused to-do list.</h1>
            <p>
              AI-powered clarity from the chaos of email. Get started in seconds
              and prepare for a future where all your productivity tools are
              seamlessly integrated.
            </p>
            <div className="hero-cta">
              <button className="btn primary" onClick={handleConnectGmail}>
                Connect Gmail
                <EmailIcon style={{ marginLeft: '8px', marginRight: '0', verticalAlign: 'middle' }} />
              </button>
              <button className="btn ghost" onClick={handleWaitlistClick}>
                Join the Waitlist
              </button>
            </div>
          </div>
        </div>
        <div className="hero-illustration">
          <img src={inboxflow} alt="Illustration of inbox to tasks flow" />
        </div>
      </section>

      <section id="howItWorks" className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-icon">
              <EmailIcon style={{ fontSize: 60, color: '#F97316' }} />
            </div>
            <h3>Connect Gmail</h3>
          </div>
          <div className="step">
            <div className="step-icon">
              <SearchIcon style={{ fontSize: 60, color: '#F97316' }} />
            </div>
            <h3>Sortify scans your inbox</h3>
          </div>
          <div className="step">
            <div className="step-icon">
              <ListIcon style={{ fontSize: 60, color: '#F97316' }} />
            </div>
            <h3>You get a clean to-do list every morning</h3>
          </div>
        </div>
      </section>

      <section className="benefits">
        <h2>Benefits</h2>
        <div className="benefits-content">
          <div className="dashboard-image">
            {/* Replace with an actual dashboard image if available */}
            <img src={dashboard} height={300} alt="Clean dashboard" />
          </div>
          <div className="benefits-list">
            <div className="benefit-item">
              <AssignmentTurnedInIcon />
              <span>Extracts tasks from emails</span>
            </div>
            <div className="benefit-item">
              <FlashOnIcon />
              <span>Prioritizes what matters</span>
            </div>
            <div className="benefit-item">
              <EventNoteIcon />
              <span>Daily AI digest</span>
            </div>
            <div className="benefit-item">
              <SnoozeIcon />
              <span>Snooze + mark done</span>
            </div>
            <div className="benefit-item">
              <RocketLaunchIcon />
              <span>Pro integrations coming soon</span>
            </div>
            <div className="benefit-item">
              <PublicIcon />
              <span>Future expansions to include holistic AI productivity tools</span>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial-list">
          <div className="testimonial">
            <p><i>"I finally stopped forgetting email tasks."</i></p>
            <span>- Freelance Designer</span>
          </div>
          <div className="testimonial">
            <p><i>"Sortify is my quiet AI assistant."</i></p>
            <span>- Solo Startup Founder</span>
          </div>
        </div>
      </section>

      {/* <section className="pricing">
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
      </section> */}

      <footer className="footer">
        <div className="footer-logo">
          <img src={logo} alt="Sortify logo" className="footer-logo" />
        </div>
        <p className="tagline">Work clearer with AI</p>
        <div className="footer-links">
          <a href="#">Privacy</a>
          <a href="#">Contact</a>
          <a href="#">Twitter</a>
        </div>
      </footer>

      <WaitlistModal
        show={showWaitlistModal}
        onClose={() => setShowWaitlistModal(false)}
        onSubmit={handleJoinWaitlist}
        email={email}
        onEmailChange={(e) => setEmail(e.target.value)}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default LandingPage;
