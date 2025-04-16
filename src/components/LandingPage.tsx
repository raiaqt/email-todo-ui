import React, { useState } from "react";
import "./LandingPage.css";
import inboxflow from "../assets/inboxflow.png";
import dashboard from "../assets/dashboard.png";
import logo from "../assets/logo.png";
import aiSort from "../assets/AISort.png";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import ArchiveIcon from "@mui/icons-material/Archive";
import futureVision from "../assets/futureVision.png";
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

      {/* SECTION 1 – What Sortify Does */}
      <section className="split-section">
        <div className="image-content">
          <img src={aiSort} alt="AI sorting tasks illustration" />
        </div>
        <div className="text-content">
          <h2>What Sortify Does</h2>
          <p>
            Sortify connects to Gmail and uses AI to turn your inbox into a
            clear, prioritized to-do list. You can also add tasks manually or
            assign them to teammates — all with your data staying on your
            device.
          </p>
          <ul>
            <li>
              <AssignmentIcon
                style={{
                  verticalAlign: "middle",
                  marginRight: "0.5em",
                  color: "#F97316",
                }}
              />
              Converts emails into actionable tasks
            </li>
            <li>
              <PersonAddAltIcon
                style={{
                  verticalAlign: "middle",
                  marginRight: "0.5em",
                  color: "#F97316",
                }}
              />
              Add your own tasks or delegate to others
            </li>
            <li>
              <PrivacyTipIcon
                style={{
                  verticalAlign: "middle",
                  marginRight: "0.5em",
                  color: "#F97316",
                }}
              />
              Your data stays private — we never store it
            </li>
          </ul>
        </div>
      </section>

      {/* SECTION 2 – Smart Inbox */}
      <section className="split-section reverse">
        <div className="image-content">
          <img src={dashboard} alt="Sortify dashboard UI" />
        </div>
        <div className="text-content">
          <h2>Your Smart Inbox</h2>
          <p>
            A calm, focused dashboard powered by AI. Sortify filters the noise
            and highlights only what matters — so you can move fast and stay
            clear.
          </p>
          <ul>
            <li>
              <LabelImportantIcon
                style={{
                  verticalAlign: "middle",
                  marginRight: "0.5em",
                  color: "#F97316",
                }}
              />
              Automatically surfaces high-priority tasks
            </li>
            <li>
              <LightbulbIcon
                style={{
                  verticalAlign: "middle",
                  marginRight: "0.5em",
                  color: "#F97316",
                }}
              />
              Learns what you care about and improves over time
            </li>
            <li>
              <ArchiveIcon
                style={{
                  verticalAlign: "middle",
                  marginRight: "0.5em",
                  color: "#F97316",
                }}
              />
              One-click actions: done, archive, assign
            </li>
          </ul>
        </div>
      </section>

      {/* SECTION 3 – Future Vision */}
      <section className="split-section">
        <div className="image-content">
          <img src={futureVision} alt="Future vision of AI workspace" />
        </div>
        <div className="text-content">
          <h2>The AI Workspace That Works for You</h2>
          <p>
            Sortify is evolving into an AI-powered system built for maximum
            productivity. Like an intelligent assistant, it adapts to your
            workflow so you can stay focused on creating value. Let Sortify
            handle the rest.
          </p>
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
          Sortify is evolving into your intelligent productivity engine, not
          just understanding your emails, but integrating your calendar, files,
          team workflows, and habits. As AI grows smarter, so does your
          workspace.
        </p>
        <div className="cta">
          <button className="btn primary" onClick={handleWaitlistClick}>
            Try it out for free
          </button>
        </div>
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
