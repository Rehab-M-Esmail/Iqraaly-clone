"use client";

import { useState } from 'react';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import { FaBook, FaUsers } from 'react-icons/fa';

const sampleAudiobooks = [
  { id: 1, title: 'Funny Story', author: 'Madonna', approved: false },
  { id: 2, title: 'Great Big Beautiful Life', author: 'Jack Black', approved: true },
  { id: 3, title: 'Rich Dad Poor Dad', author: 'Robert De Nero', approved: false },
];

const sampleUsers = [
  { id: 1, name: 'Tom Holland', email: 'tom@audioloom.com', active: true },
  { id: 2, name: 'Sabrina Carpenter', email: 'sabrina@audioloom.com', active: false },
];

const AdminDashboard = () => {
  const [audiobooks, setAudiobooks] = useState(sampleAudiobooks);
  const [users, setUsers] = useState(sampleUsers);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleAudiobookApproval = (id: number, approved: boolean) => {
    setAudiobooks((prev) =>
      prev.map((book) =>
        book.id === id ? { ...book, approved } : book
      )
    );
  };

  const handleUserActivation = (id: number, active: boolean) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, active } : user
      )
    );
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Holographic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 to-orange-700 animate-holo-bg"></div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[800px] h-[800px] bg-orange-700/20 rounded-full -top-96 -left-96 blur-4xl animate-pulse-slow"></div>
        <div className="absolute w-[800px] h-[800px] bg-blue-950/20 rounded-full -bottom-96 -right-96 blur-4xl animate-pulse-slow delay-2000"></div>
      </div>

      {/* Sidebar */}
      <div
        className={`transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-16'
        } bg-blue-950/80 backdrop-blur-md text-white min-h-screen p-4 flex flex-col z-10 border-r border-orange-700/30`}
      >
        <div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute top-4 right-0 text-2xl p-2 bg-transparent text-orange-700 hover:bg-orange-700/20 rounded-full transition-all duration-300"
          >
            {sidebarOpen ? <HiOutlineChevronLeft /> : <HiOutlineChevronRight />}
          </button>
          <h2
            className={`text-2xl font-bold mb-8 transition-all duration-300 flex items-center gap-2 animate-slide-in ${
              sidebarOpen ? 'block' : 'hidden'
            }`}
          >
            <FaBook className="text-orange-700 animate-glow" />
            Admin Dashboard
          </h2>
          <ul className="space-y-4">
            <li>
              <button
                className={`text-lg flex items-center gap-2 transition-all duration-300 hover:text-orange-700 ${
                  sidebarOpen ? 'justify-start' : 'justify-center'
                }`}
              >
                <FaBook className="text-orange-700" />
                {sidebarOpen && <span>Manage Audiobooks</span>}
              </button>
            </li>
            <li>
              <button
                className={`text-lg flex items-center gap-2 transition-all duration-300 hover:text-orange-700 ${
                  sidebarOpen ? 'justify-start' : 'justify-center'
                }`}
              >
                <FaUsers className="text-orange-700" />
                {sidebarOpen && <span>Manage Users</span>}
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 z-10">
        {/* Audiobooks Management */}
        <div className="mb-12">
          <h1 className="text-3xl font-semibold mb-6 text-white animate-slide-in">Manage Audiobooks</h1>
          <div className="bg-blue-950/50 backdrop-blur-md rounded-xl shadow-lg border border-orange-700/20 overflow-hidden">
            <table className="min-w-full table-auto">
              <thead className="bg-blue-950/80 text-orange-700">
                <tr>
                  <th className="px-6 py-4 text-left">Title</th>
                  <th className="px-6 py-4 text-left">Author</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {audiobooks.map((book) => (
                  <tr
                    key={book.id}
                    className="border-b border-orange-700/20 hover:bg-orange-700/10 transition-all duration-300 transform hover:scale-[1.01] hover:shadow-orange-700/50"
                  >
                    <td className="px-6 py-4 text-white">{book.title}</td>
                    <td className="px-6 py-4 text-white">{book.author}</td>
                    <td className="px-6 py-4">
                      {book.approved ? (
                        <span className="text-green-400 font-semibold">Approved</span>
                      ) : (
                        <span className="text-yellow-400 font-semibold">Pending</span>
                      )}
                    </td>
                    <td className="px-6 py-4 flex space-x-2">
                      <button
                        onClick={() => handleAudiobookApproval(book.id, true)}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:ring-2 focus:ring-green-500 transition-all duration-300 transform hover:scale-105"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleAudiobookApproval(book.id, false)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:ring-2 focus:ring-red-500 transition-all duration-300 transform hover:scale-105"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* User Management */}
        <div>
          <h1 className="text-3xl font-semibold mb-6 text-white animate-slide-in">Manage Users</h1>
          <div className="bg-blue-950/50 backdrop-blur-md rounded-xl shadow-lg border border-orange-700/20 overflow-hidden">
            <table className="min-w-full table-auto">
              <thead className="bg-blue-950/80 text-orange-700">
                <tr>
                  <th className="px-6 py-4 text-left">Name</th>
                  <th className="px-6 py-4 text-left">Email</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-orange-700/20 hover:bg-orange-700/10 transition-all duration-300 transform hover:scale-[1.01] hover:shadow-orange-700/50"
                  >
                    <td className="px-6 py-4 text-white">{user.name}</td>
                    <td className="px-6 py-4 text-white">{user.email}</td>
                    <td className="px-6 py-4">
                      {user.active ? (
                        <span className="text-green-400 font-semibold">Active</span>
                      ) : (
                        <span className="text-red-400 font-semibold">Inactive</span>
                      )}
                    </td>
                    <td className="px-6 py-4 flex space-x-2">
                      <button
                        onClick={() => handleUserActivation(user.id, true)}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:ring-2 focus:ring-green-500 transition-all duration-300 transform hover:scale-105"
                      >
                        Activate
                      </button>
                      <button
                        onClick={() => handleUserActivation(user.id, false)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:ring-2 focus:ring-red-500 transition-all duration-300 transform hover:scale-105"
                      >
                        Deactivate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes holo-bg {
          0% {
            background-position: 0% 0%;
          }
          50% {
            background-position: 100% 100%;
          }
          100% {
            background-position: 0% 0%;
          }
        }
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes glow {
          0%, 100% {
            text-shadow: 0 0 5px rgba(194, 65, 12, 0.5);
          }
          50% {
            text-shadow: 0 0 15px rgba(194, 65, 12, 0.9), 0 0 25px rgba(194, 65, 12, 0.7);
          }
        }
        @keyframes pulse-slow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.5;
          }
        }
        .animate-holo-bg {
          background-size: 200% 200%;
          animation: holo-bg 10s ease infinite;
        }
        .animate-slide-in {
          animation: slide-in 1s ease-out;
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;