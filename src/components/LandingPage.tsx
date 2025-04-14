import React, { useState } from "react";
import "./LandingPage.css";
import inboxflow from "../assets/inboxflow.png";
import dashboard from "../assets/dashboard.png";
import logo from "../assets/logo.png";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import EventNoteIcon from "@mui/icons-material/EventNote";
import SnoozeIcon from "@mui/icons-material/Snooze";
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
      setFeedbackMessage(
        "You'll be redirected to the dashboard. Get ready for a more productive inbox!"
      );
      setEmail("");
      setShowWaitlistModal(false);
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
    } catch (error: unknown) {
      setFeedbackMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again later."
      );
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
          <img src={logo} alt="Sortify logo" className="sortify-logo" />
          <h2>Sortify</h2>
          <h1>Turn your inbox into a smart, focused to-do list.</h1>
          <p>
            AI-powered clarity from the chaos of email. Get started in seconds
            and prepare for a future where all your productivity tools are
            seamlessly integrated.
          </p>
          <div className="hero-cta">
            <button className="btn primary" onClick={handleWaitlistClick}>
              Ready to try it out?
            </button>
          </div>
          <p className="hero-note">No Gmail access required.</p>
        </div>
        <div className="hero-illustration">
          <img src={inboxflow} alt="Illustration of inbox to tasks flow" />
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-icon">
              <EmailIcon />
            </div>
            <h3>Connect Gmail</h3>
          </div>
          <div className="step">
            <div className="step-icon">
              <SearchIcon />
            </div>
            <h3>Sortify scans your inbox</h3>
          </div>
          <div className="step">
            <div className="step-icon">
              <ListIcon />
            </div>
            <h3>You get a clean to-do list every morning</h3>
          </div>
        </div>
      </section>

      <section className="built-for-focus">
        <h2>Built for Focus</h2>
        <p className="centered-subtext">
          Sortify isn’t just a productivity tool, it’s a mindset shift. Designed
          for creators, leaders, and solopreneurs who crave clarity, our mission
          is simple: minimize distraction, maximize deep work.
        </p>
        {/* <div className="benefits-list horizontal">
          <div className="benefit-item">
            <RocketLaunchIcon />
            <span>Start every day with a zero-inbox mindset</span>
          </div>
          <div className="benefit-item">
            <PublicIcon />
            <span>Stay ahead — globally and asynchronously</span>
          </div>
          <div className="benefit-item">
            <LightbulbIcon />
            <span>Let AI highlight what needs your genius</span>
          </div>
        </div> */}
      </section>

      <section className="benefits">
        <h2>The Future of Productivity is Adaptive</h2>
        <div className="benefits-content">
          <div className="dashboard-image">
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
              <span>Archive + mark done</span>
            </div>
            <div className="benefit-item">
              <LightbulbIcon />
              <span>Detects what's important, not just what's recent</span>
            </div>
            <div className="benefit-item">
              <PsychologyIcon />
              <span>Learn your blind spots over time</span>
            </div>
            <div className="benefit-item">
              <AutoAwesomeIcon />
              <span>Sortify evolves with you — not the other way around</span>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <h2>What our users are saying</h2>
        <div className="testimonial-list">
          <div className="testimonial">
            <p>
              <i>"I finally stopped forgetting email tasks."</i>
            </p>
            <span>- Freelance Designer</span>
          </div>
          <div className="testimonial">
            <p>
              <i>"Sortify is my quiet AI assistant."</i>
            </p>
            <span>- Solo Startup Founder</span>
          </div>
        </div>
      </section>

      <section className="future-ready">
        <h2>Sortify is Just the Beginning</h2>
        <p className="centered-subtext">
          Sortify is evolving into your intelligent productivity engine — not
          just understanding your emails, but integrating your calendar, files,
          team workflows, and habits. As AI grows smarter, so does your
          workspace.
        </p>
        {/* <div className="benefits-list horizontal">
          <div className="benefit-item">
            <PsychologyIcon />
            <span>
              Adaptive to how <em>you</em> work
            </span>
          </div>
          <div className="benefit-item">
            <AutoAwesomeIcon />
            <span>Powered by evolving LLMs</span>
          </div>
          <div className="benefit-item">
            <AssignmentTurnedInIcon />
            <span>Designed for a future of flow</span>
          </div>
        </div> */}
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
