import React from 'react';
import '../App.css'; // Import modal styles

const Modal = ({ show, onClose, children }) => {
  if (!show) return null; // Don't render the modal if `show` is false

  // Close modal if overlay is clicked
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
