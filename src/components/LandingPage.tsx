import React, { useState } from "react";
import "./LandingPage.css";
import inboxflow from "../assets/inboxflow.png";
import dashboard from "../assets/dashboard.png";
import logo from "../assets/logo.png";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import EventNoteIcon from "@mui/icons-material/EventNote";
import SnoozeIcon from "@mui/icons-material/Snooze";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import PublicIcon from "@mui/icons-material/Public";
import EmailIcon from "@mui/icons-material/Email";
import SearchIcon from "@mui/icons-material/Search";
import ListIcon from "@mui/icons-material/List";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import PsychologyIcon from "@mui/icons-material/Psychology";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { submitEmail } from "../api/submitEmail";
import WaitlistModal from "./WaitlistModal";
import FeedbackModal from "./FeedbackModal";

const LandingPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleJoinWaitlist = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitEmail(email);
      setFeedbackMessage("You'll be redirected to the dashboard. Get ready for a more productive inbox!");
      setEmail("");
      setShowWaitlistModal(false);
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
    } catch (error: unknown) {
      setFeedbackMessage(error instanceof Error ? error.message : "Something went wrong. Please try again later.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
      setShowFeedbackModal(true);
    }
  };

  const handleWaitlistClick = () => setShowWaitlistModal(true);
  const handleFeedbackModalClose = () => {
    setShowFeedbackModal(false);
    window.location.reload();
  };

  return (
    <div className="landing-container">
      <section className="hero">
        <div className="hero-content">
          <div>
            <img src={logo} alt="Sortify logo" className="sortify-logo" />
            <h2>Sortify</h2>
            <h1>Your AI Assistant for a Clearer Mind</h1>
            <p>
              Sortify is your evolving AI assistant — starting with your inbox.
              It reads your emails, extracts your tasks, and gives you a clean to-do list every morning.
              One day, it will understand your entire day. Today, it’s already helping.
            </p>
            <div className="hero-cta">
              <button className="btn primary" onClick={handleWaitlistClick}>Try it out</button>
              {/* <button className="btn ghost" onClick={() => (window.location.href = "https://demo.sortify.coderai.app")}>View Demo</button> */}
            </div>
          </div>
        </div>
        <div className="hero-illustration">
          <img src={inboxflow} alt="Illustration of inbox to tasks flow" />
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-icon"><EmailIcon /></div>
            <h3>Connect Gmail</h3>
          </div>
          <div className="step">
            <div className="step-icon"><SearchIcon /></div>
            <h3>Sortify scans your inbox</h3>
          </div>
          <div className="step">
            <div className="step-icon"><ListIcon /></div>
            <h3>You get a clean to-do list every morning</h3>
          </div>
        </div>
      </section>

      <section className="benefits">
        <h2>Why It's Different</h2>
        <div className="benefits-content">
          <div className="dashboard-image">
            <img src={dashboard} height={300} alt="Clean dashboard" />
          </div>
          <div className="benefits-list">
            <div className="benefit-item"><AssignmentTurnedInIcon /><span>Extracts tasks from emails</span></div>
            <div className="benefit-item"><FlashOnIcon /><span>Prioritizes what matters</span></div>
            <div className="benefit-item"><EventNoteIcon /><span>Daily AI digest</span></div>
            <div className="benefit-item"><SnoozeIcon /><span>Snooze + mark done</span></div>
            <div className="benefit-item"><LightbulbIcon /><span>Detects what's important, not just what's recent</span></div>
            <div className="benefit-item"><PsychologyIcon /><span>Learn your blind spots over time</span></div>
            <div className="benefit-item"><AutoAwesomeIcon /><span>Sortify evolves with you — not the other way around</span></div>
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

      <footer className="footer">
        <div className="footer-logo">
          <img src={logo} alt="Sortify logo" className="footer-logo" />
        </div>
        <p className="tagline">Work clearer with AI</p>
        <div className="footer-links">
          <a href="/privacy">Privacy</a>
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
        name={name}
        onNameChange={(e) => setName(e.target.value)}
      />
      <FeedbackModal
        message={feedbackMessage}
        show={showFeedbackModal}
        onClose={handleFeedbackModalClose}
      />
    </div>
  );
};

export default LandingPage;
