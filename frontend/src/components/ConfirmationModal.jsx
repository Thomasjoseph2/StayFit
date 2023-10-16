import ReactModal from 'react-modal';
import React, { useState } from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false} // To prevent a11y warnings
      style={{
        content: {
          width: '300px',
          margin: 'auto',
          textAlign: 'center',
        },
      }}
    >
      <p>{message}</p>
      <button onClick={onConfirm}>Confirm</button>
      <button onClick={onClose}>Cancel</button>
    </ReactModal>
  );
};

export default ConfirmationModal;
