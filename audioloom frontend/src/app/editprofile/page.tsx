"use client";

import React, { useState, useEffect } from 'react';
import { FaUserEdit } from 'react-icons/fa';

const EditProfilePage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  useEffect(() => {
    const sampleUserData = {
      id: '1',
      name: 'Ariana ',
      email: 'thankyounext@example.com',
      profilePhoto: '/images/ariana.jpg',
      bio: 'I see it, I like it, I want it, I got it.',
      subscriptionPlan: 'Premium',
    };

    setUser(sampleUserData);
    setPhotoPreview(sampleUserData.profilePhoto);
    setLoading(false);
  }, []);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPhotoPreview(previewUrl);
      setUser({ ...user, profilePhoto: previewUrl });
    }
  };

  const handleSaveChanges = () => {
    console.log('Profile updated:', user);
    alert('Profile updated successfully!');
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white text-2xl animate-pulse">Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-700 via-blue-900 to-orange-700 animate-gradient-bg"></div>
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute w-[600px] h-[600px] bg-white rounded-full -top-80 -left-80 blur-3xl animate-pulse"></div>
        <div className="absolute w-[600px] h-[600px] bg-gray-500 rounded-full -bottom-80 -right-80 blur-3xl animate-pulse delay-1000"></div>
      </div>
      <div className="relative z-10 bg-gray-800/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-2xl border border-orange-500/30 transform transition-all duration-500 hover:shadow-orange-500/50">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-8 text-center animate-slide-in flex items-center justify-center gap-2">
          <FaUserEdit className="text-orange-400" />
          Edit Profile
        </h2>
        <div className="flex flex-col items-center">
          <div className="relative group mb-6">
            <img
              src={photoPreview || user.profilePhoto}
              alt={user.name}
              width={150}
              height={150}
              className="rounded-full border-4 border-orange-400 object-cover shadow-xl transform transition-transform duration-300 group-hover:scale-110"
            />
            <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full cursor-pointer">
              <span className="text-white text-sm font-medium">Change Photo</span>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </label>
          </div>
          <div className="w-full max-w-md space-y-6">
            <div>
              <label htmlFor="name" className="text-sm font-medium text-white block mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="w-full px-4 py-3 bg-gray-700/50 border border-cyan-500/30 text-white placeholder-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label htmlFor="bio" className="text-sm font-medium text-white block mb-2">
                Bio
              </label>
              <textarea
                id="bio"
                value={user.bio}
                onChange={(e) => setUser({ ...user, bio: e.target.value })}
                className="w-full px-4 py-3 bg-gray-700/50 border border-cyan-500/30 text-white placeholder-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300 resize-y"
                rows={4}
                placeholder="Tell us about yourself"
              />
            </div>
            <button
              onClick={handleSaveChanges}
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-blue-950 text-white text-lg font-semibold rounded-lg hover:from-blue-950 hover:to-orange-600 focus:ring-4 focus:ring-orange-300 transition-all duration-300 transform hover:scale-105"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes gradient-bg {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-slide-in {
          animation: slide-in 1s ease-out;
        }
        .animate-gradient-bg {
          background-size: 200% 200%;
          animation: gradient-bg 15s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default EditProfilePage;