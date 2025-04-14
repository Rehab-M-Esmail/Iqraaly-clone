'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const UserProfilePage = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Sample user data, will be replaced with actual API call logic
  useEffect(() => {
    const sampleUserData = {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      profilePhoto: '/images/freida.jpg',
      bio: 'Audiobook enthusiast and passionate about learning new things.',
      subscriptionPlan: 'Premium',
    };

    setUser(sampleUserData);
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="flex flex-col items-center">
        {/* Profile Picture */}
        <Image
          src={user.profilePhoto}
          alt={user.name}
          width={150}
          height={150}
          className="rounded-full border-4 border-gray-300"
        />
        <h2 className="text-2xl font-bold mt-4">{user.name}</h2>
        <p className="text-gray-500">{user.email}</p>

        {/* Bio Section */}
        <div className="mt-6 text-center">
          <h3 className="font-semibold text-lg">Bio</h3>
          <p className="text-gray-700 mt-2">{user.bio}</p>
        </div>

        {/* Subscription Plan */}
        <div className="mt-6 text-center">
          <h3 className="font-semibold text-lg">Subscription Plan</h3>
          <p className="text-gray-700 mt-2">{user.subscriptionPlan}</p>
        </div>

        {/* Edit Profile Button */}
        <button
          onClick={() => router.push('/editprofile')} // Link to the EditProfilePage
          className="mt-6 px-6 py-2 bg-blue-600 text-black font-semibold rounded-lg hover:bg-blue-700"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default UserProfilePage;
