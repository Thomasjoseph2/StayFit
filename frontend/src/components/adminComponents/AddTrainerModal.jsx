import React, { useState } from 'react';
import Modal from 'react-modal';

const AddTrainerModal = ({ isOpen, onRequestClose, onAddTrainer }) => {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [contact, setContact] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleAddTrainer = () => {
    // Validate inputs if necessary

    // Call the parent component's function to add the trainer
    onAddTrainer({ name, subject, contact, userId, password });

    // Clear form fields
    setName('');
    setSubject('');
    setContact('');
    setUserId('');
    setPassword('');

    // Close the modal
    onRequestClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Add Trainer</h2>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
      <input type="text" placeholder="Contact" value={contact} onChange={(e) => setContact(e.target.value)} />
      <input type="text" placeholder="User ID" value={userId} onChange={(e) => setUserId(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleAddTrainer}>Add Trainer</button>
    </Modal>
  );
};

export default AddTrainerModal;
