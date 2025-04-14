import React from "react";
import "./WaitlistModal.css";

interface WaitlistModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  email: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSubmitting: boolean;
  name: string;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const WaitlistModal: React.FC<WaitlistModalProps> = ({
  show,
  onClose,
  onSubmit,
  email,
  onEmailChange,
  isSubmitting,
  name,
  onNameChange,
}) => {
  if (!show) return null;

  const isValidEmail = email === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <div className="modal">
      <div className="modal-content animated">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Be first to try Sortify!</h2>
        <form onSubmit={onSubmit}>
          <div className="waitlist-form">
            <label htmlFor="name">What's your nickname?</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={onNameChange}
              required
            />
            <label htmlFor="email">How can we reach you?</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email Address (optional)"
              className={isValidEmail ? "" : "invalid"}
              value={email}
              onChange={onEmailChange}
              required
            />
            {!isValidEmail && (
              <span className="error-text">Please enter a valid email.</span>
            )}
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default WaitlistModal;
