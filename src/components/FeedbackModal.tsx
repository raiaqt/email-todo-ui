import React from "react";
import "./FeedbackModal.css";

interface Props {
  show: boolean;
  message: string;
  onClose: () => void;
  title: string;
}

const FeedbackModal: React.FC<Props> = ({ show, message, onClose, title }) => {
  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal-content animated">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{title}</h2>
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default FeedbackModal;
