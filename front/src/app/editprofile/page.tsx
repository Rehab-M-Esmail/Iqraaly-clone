'use client';

import React, { useState, useEffect } from 'react';

const EditProfilePage = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Sample user data
  useEffect(() => {
    const sampleUserData = {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      profilePhoto: '/images/freida.jpg',
      bio: 'Audiobook enthusiast.',
      subscriptionPlan: 'Premium',
    };

    setUser(sampleUserData);
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;

  const handleSaveChanges = () => {
   
    alert('Profile updated successfully!');
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>

      <div className="flex flex-col items-center">
        <img
          src={user.profilePhoto}
          alt={user.name}
          width={150}
          height={150}
          className="rounded-full border-4 border-gray-300"
        />
        <input
          type="text"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          className="mt-4 px-4 py-2 border rounded-md w-full max-w-xs"
        />
        <textarea
          value={user.bio}
          onChange={(e) => setUser({ ...user, bio: e.target.value })}
          className="mt-4 px-4 py-2 border rounded-md w-full max-w-xs"
        />
        <button
          onClick={handleSaveChanges}
          className="mt-6 px-6 py-2 bg-blue-600 text-black font-semibold rounded-lg hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditProfilePage;
