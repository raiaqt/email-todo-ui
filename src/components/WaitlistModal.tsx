import React from 'react';

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
  isSubmitting
}) => {
  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <form onSubmit={onSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={onEmailChange}
            required
          />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default WaitlistModal;