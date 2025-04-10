import React from "react";
import "./WaitlistModal.css";

interface WaitlistModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  email: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSubmitting: boolean;
}

const WaitlistModal: React.FC<WaitlistModalProps> = ({
  show,
  onClose,
  onSubmit,
  email,
  onEmailChange,
  isSubmitting,
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
        <p>Join our waitlist by entering your email below.</p>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            id="email"
            name="email"
            className={isValidEmail ? "" : "invalid"}
            value={email}
            onChange={onEmailChange}
            required
          />
          {!isValidEmail && (
            <span className="error-text">Please enter a valid email.</span>
          )}
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default WaitlistModal;
