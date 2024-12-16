// DeleteConfirmModal.js
import React from 'react';
import './App.css'; // Import modal styles (ensure you have the right CSS in Modal.css)

const DeleteConfirmModal = ({ show, onClose, onDelete, contactName }) => {
  if (!show) return null; // Don't render the modal if `show` is false

  // Function to handle delete confirmation
  const handleDelete = () => {
    onDelete(); // Call the delete handler passed as a prop
    onClose();  // Close the modal after deletion
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content">
        <h3>Are you sure you want to delete {contactName}?</h3>
        <button className="close-btn" onClick={onClose}>Cancel</button>
        <button className="delete-btn" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
