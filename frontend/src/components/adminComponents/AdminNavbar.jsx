import React from 'react';

const AdminNavbar = () => {
  return (
    <nav className="bg-gray-900 p-4 flex justify-between items-center">
      <h1 className="text-white text-xl">Admin Dashboard</h1>
      <div>
        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
