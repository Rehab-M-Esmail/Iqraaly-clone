"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaEdit } from 'react-icons/fa';

const UserProfilePage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const sampleUserData = {
      id: '1',
      name: 'Ariana Grande',
      email: 'ariana@audioloom.com',
      profilePhoto: '/images/ariana.jpg',
      bio: 'Pop star by day, audiobook listener by night.',
      subscriptionPlan: 'Premium',
      audiobooksListened: '42',
      hoursListened: '128',
    };

    setUser(sampleUserData);
    setLoading(false);
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white text-2xl animate-pulse">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-700 via-blue-950 to-orange-700 animate-gradient-bg"></div>
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute w-[600px] h-[600px] bg-white rounded-full -top-80 -left-80 blur-3xl animate-pulse"></div>
        <div className="absolute w-[600px] h-[600px] bg-gray-500 rounded-full -bottom-80 -right-80 blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Profile Card */}
      <div className="relative z-10 bg-gray-800/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-4xl border border-orange-500/30 transform transition-all duration-500 group hover:shadow-orange-500/50">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Profile Image with 3D Tilt */}
          <div className="relative group/image">
            <Image
              src={user.profilePhoto}
              alt={user.name}
              width={200}
              height={200}
              className="rounded-full border-4 border-orange-400 object-cover shadow-xl transform transition-transform duration-300 group-hover/image:scale-110 group-hover/image:rotate-3"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 to-blue-900 opacity-0 group-hover/image:opacity-20 transition-opacity duration-300"></div>
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 animate-slide-in">
              {user.name}
            </h1>
            <p className="text-orange-300 text-lg mb-4">{user.email}</p>
            <p className="text-gray-300 leading-relaxed mb-6">{user.bio}</p>
            <button
              onClick={() => router.push('/editprofile')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-blue-900 text-white text-sm font-medium rounded-lg hover:from-blue-900 hover:to-orange-600 focus:ring-4 focus:ring-white transition-all duration-300 transform hover:scale-105"
            >
              <FaEdit />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-700/50 p-4 rounded-xl text-center transform transition-all duration-300 hover:bg-gray-700 hover:scale-105">
            <h3 className="text-lg font-semibold text-orange-500">Audiobooks Listened</h3>
            <p className="text-3xl font-bold text-white mt-2 animate-count-up">{user.audiobooksListened}</p>
          </div>
          <div className="bg-gray-700/50 p-4 rounded-xl text-center transform transition-all duration-300 hover:bg-gray-700 hover:scale-105">
            <h3 className="text-lg font-semibold text-orange-500">Hours Listened</h3>
            <p className="text-3xl font-bold text-white mt-2 animate-count-up">{user.hoursListened}</p>
          </div>
          <div className="bg-gray-700/50 p-4 rounded-xl text-center transform transition-all duration-300 hover:bg-gray-700 hover:scale-105">
            <h3 className="text-lg font-semibold text-orange-500">Subscription Plan</h3>
            <p className="text-3xl font-bold text-white mt-2">{user.subscriptionPlan}</p>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
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
        @keyframes count-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 1s ease-out;
        }
        .animate-gradient-bg {
          background-size: 200% 200%;
          animation: gradient-bg 15s ease infinite;
        }
        .animate-count-up {
          animation: count-up 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default UserProfilePage;