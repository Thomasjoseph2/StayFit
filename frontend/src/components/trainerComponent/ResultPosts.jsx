import React from 'react';

const staticPosts = [
  {
    id: 1,
    imageUrl: 'https://via.placeholder.com/150',
    description: 'Sample Post 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 2,
    imageUrl: 'https://via.placeholder.com/150',
    description: 'Sample Post 2: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 3,
    imageUrl: 'https://via.placeholder.com/150',
    description: 'Sample Post 3: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
  },
  {
    id: 4,
    imageUrl: 'https://via.placeholder.com/150',
    description: 'Sample Post 4: Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
  // Add more static posts as needed
];

const ResultPosts = ({ posts }) => {
  // Ensure posts is an array, default to an empty array if not
  const validPosts = Array.isArray(posts) ? posts : [];

  return (
    <div className="container mx-auto mt-8 mb-20">
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
        {[...staticPosts, ...validPosts].map((post) => (
          <div key={post.id} className="bg-white p-4 rounded shadow-lg">
            <img src={post.imageUrl} alt="Post" className="w-full h-40 object-cover mb-4" />
            <p className="text-gray-700 text-sm">{post.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultPosts;
