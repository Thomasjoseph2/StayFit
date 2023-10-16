import React,{useState} from 'react';
import AddTrainerModal from './AddTrainerModal';

const TrainersList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tutors = [
    { id: 1, name: 'John Doe', subject: 'Mathematics', contact: 'john@example.com' },
    { id: 2, name: 'Alice Johnson', subject: 'Science', contact: 'alice@example.com' },
    { id: 3, name: 'Bob Smith', subject: 'History', contact: 'bob@example.com' },
    // Add more tutor objects as needed
  ];

    const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
        <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Tutors List</h2>
        <button onClick={openModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Trainer
        </button>
      </div>
      <h2 className="text-2xl font-bold mb-4">Tutors List</h2>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Subject</th>
            <th className="border border-gray-300 px-4 py-2">Contact</th>
          </tr>
        </thead>
        <tbody>
          {tutors.map((tutor) => (
            <tr key={tutor.id}>
              <td className="border border-gray-300 px-4 py-2">{tutor.id}</td>
              <td className="border border-gray-300 px-4 py-2">{tutor.name}</td>
              <td className="border border-gray-300 px-4 py-2">{tutor.subject}</td>
              <td className="border border-gray-300 px-4 py-2">{tutor.contact}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddTrainerModal isOpen={isModalOpen} onRequestClose={closeModal} />
    </div>
  );
};

export default TrainersList;
