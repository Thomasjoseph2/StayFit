import React from 'react';
import '../css/confirmation-dialog.css'
const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="confirmation-dialog">
      <p>{message}</p>
      <button className='bg-red-600 rounded w-20 mt-3  ' onClick={onConfirm}>Confirm</button>
      <button className='bg-green-800 rounded w-20 mt-3 ml-2 ' onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default ConfirmationDialog;
