"use client";

import { useState } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { FaBook, FaUsers, FaPlus, FaEdit, FaTrash, FaFileUpload } from "react-icons/fa";

interface FileMetadata {
  name: string;
  size: number;
}

interface Audiobook {
  id: number;
  title: string;
  author: string;
  duration: string; 
  genre: string; 
  file?: FileMetadata;
}

interface User {
  id: number;
  name: string;
  email: string;
  active: boolean;
}

const sampleAudiobooks: Audiobook[] = [
  { id: 1, title: "Funny Story", author: "Madonna", duration: "5h 30m", genre: "Comedy" },
  { id: 2, title: "Great Big Beautiful Life", author: "Jack Black", duration: "4h 15m", genre: "Self-Help" },
  { id: 3, title: "Rich Dad Poor Dad", author: "Robert De Niro", duration: "6h 20m", genre: "Finance" },
];

const sampleUsers: User[] = [
  { id: 1, name: "Tom Holland", email: "tom@audioloom.com", active: true },
  { id: 2, name: "Sabrina Carpenter", email: "sabrina@audioloom.com", active: false },
];

const AdminDashboard = () => {
  const [audiobooks, setAudiobooks] = useState<Audiobook[]>(sampleAudiobooks);
  const [users, setUsers] = useState<User[]>(sampleUsers);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [newBook, setNewBook] = useState<{
    id: string;
    title: string;
    author: string;
    duration: string;
    genre: string;
    file?: File;
  }>({
    id: "",
    title: "",
    author: "",
    duration: "",
    genre: "",
    file: undefined,
  });
  const [editBook, setEditBook] = useState<Audiobook | null>(null);
  const [editFile, setEditFile] = useState<File | undefined>(undefined);

  const handleUserActivation = (id: number, active: boolean) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, active } : user))
    );
  };

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      newBook.id.trim() &&
      newBook.title.trim() &&
      newBook.author.trim() &&
      newBook.duration.trim() &&
      newBook.genre.trim()
    ) {
      const newAudiobook: Audiobook = {
        id: parseInt(newBook.id),
        title: newBook.title,
        author: newBook.author,
        duration: newBook.duration,
        genre: newBook.genre,
        file: newBook.file ? { name: newBook.file.name, size: newBook.file.size } : undefined,
      };
      setAudiobooks((prev) => [...prev, newAudiobook]);
      setNewBook({ id: "", title: "", author: "", duration: "", genre: "", file: undefined });
    }
  };

  const handleDeleteBook = (id: number) => {
    setAudiobooks((prev) => prev.filter((book) => book.id !== id));
  };

  const handleEditBook = (book: Audiobook) => {
    setEditBook(book);
    setEditFile(undefined);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      editBook &&
      editBook.id.toString().trim() &&
      editBook.title.trim() &&
      editBook.author.trim() &&
      editBook.duration.trim() &&
      editBook.genre.trim()
    ) {
      setAudiobooks((prev) =>
        prev.map((book) =>
          book.id === editBook.id
            ? {
                ...editBook,
                file: editFile ? { name: editFile.name, size: editFile.size } : editBook.file,
              }
            : book
        )
      );
      setEditBook(null);
      setEditFile(undefined);
    }
  };

  const handleCancelEdit = () => {
    setEditBook(null);
    setEditFile(undefined);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, isEdit: boolean) => {
    const file = e.target.files?.[0];
    if (file) {
      if (isEdit) {
        setEditFile(file);
      } else {
        setNewBook((prev) => ({ ...prev, file }));
      }
    }
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
          sidebarOpen ? "w-64" : "w-16"
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
              sidebarOpen ? "block" : "hidden"
            }`}
          >
            <FaBook className="text-orange-700 animate-glow" />
            Admin Dashboard
          </h2>
          <ul className="space-y-4">
            <li>
              <button
                className={`text-lg flex items-center gap-2 transition-all duration-300 hover:text-orange-700 ${
                  sidebarOpen ? "justify-start" : "justify-center"
                }`}
              >
                <FaBook className="text-orange-700" />
                {sidebarOpen && <span>Manage Audiobooks</span>}
              </button>
            </li>
            <li>
              <button
                className={`text-lg flex items-center gap-2 transition-all duration-300 hover:text-orange-700 ${
                  sidebarOpen ? "justify-start" : "justify-center"
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
          <h1 className="text-3xl font-semibold mb-6 text-white animate-slide-in">
            Manage Audiobooks
          </h1>
          {/* Add New Book Form */}
          <div className="mb-6 bg-blue-950/50 backdrop-blur-md rounded-xl p-4 border border-orange-700/20">
            <h3 className="text-xl font-medium text-orange-400 mb-4 animate-glow">
              Add New Audiobook
            </h3>
            <form onSubmit={handleAddBook} className="flex gap-4 flex-wrap">
              <input
                type="number"
                value={newBook.id}
                onChange={(e) => setNewBook({ ...newBook, id: e.target.value })}
                placeholder="ID"
                className="flex-1 min-w-[200px] p-2 rounded-lg bg-gray-800/70 border border-orange-700/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-600"
              />
              <input
                type="text"
                value={newBook.title}
                onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                placeholder="Title"
                className="flex-1 min-w-[200px] p-2 rounded-lg bg-gray-800/70 border border-orange-700/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-600"
              />
              <input
                type="text"
                value={newBook.author}
                onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                placeholder="Author"
                className="flex-1 min-w-[200px] p-2 rounded-lg bg-gray-800/70 border border-orange-700/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-600"
              />
              <input
                type="text"
                value={newBook.duration}
                onChange={(e) => setNewBook({ ...newBook, duration: e.target.value })}
                placeholder="Duration (e.g., 3h 45m)"
                className="flex-1 min-w-[200px] p-2 rounded-lg bg-gray-800/70 border border-orange-700/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-600"
              />
              <input
                type="text"
                value={newBook.genre}
                onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
                placeholder="Genre"
                className="flex-1 min-w-[200px] p-2 rounded-lg bg-gray-800/70 border border-orange-700/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-600"
              />
              <label className="flex items-center gap-2 bg-gray-800/70 border border-orange-700/30 rounded-lg p-2 cursor-pointer hover:bg-gray-700/70 transition-all duration-300">
                <FaFileUpload className="text-orange-700" />
                <span className="text-white">
                  {newBook.file ? newBook.file.name : "Upload Audio File"}
                </span>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => handleFileChange(e, false)}
                  className="hidden"
                />
              </label>
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-900 to-blue-950 text-white px-4 py-2 rounded-lg hover:from-orange-700 hover:to-orange-600 transition-all duration-300 transform hover:scale-105"
              >
                <FaPlus /> Add
              </button>
            </form>
          </div>
          <div className="bg-blue-950/50 backdrop-blur-md rounded-xl shadow-lg border border-orange-700/20 overflow-hidden">
            <table className="min-w-full table-auto">
              <thead className="bg-blue-950/80 text-orange-700">
                <tr>
                  <th className="px-6 py-4 text-left">ID</th>
                  <th className="px-6 py-4 text-left">Title</th>
                  <th className="px-6 py-4 text-left">Author</th>
                  <th className="px-6 py-4 text-left">Duration</th>
                  <th className="px-6 py-4 text-left">Genre</th>
                  <th className="px-6 py-4 text-left">File</th>
                  <th className="px-6 py-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {audiobooks.map((book) => (
                  <tr
                    key={book.id}
                    className="border-b border-orange-700/20 hover:bg-orange-700/10 transition-all duration-300 transform hover:scale-[1.01] hover:shadow-orange-700/50"
                  >
                    <td className="px-6 py-4 text-white">
                      {editBook?.id === book.id ? (
                        <input
                          type="number"
                          value={editBook.id}
                          onChange={(e) =>
                            setEditBook({ ...editBook, id: parseInt(e.target.value) })
                          }
                          className="p-2 rounded-lg bg-gray-800/70 border border-orange-700/30 text-white focus:outline-none focus:ring-2 focus:ring-orange-600"
                        />
                      ) : (
                        book.id
                      )}
                    </td>
                    <td className="px-6 py-4 text-white">
                      {editBook?.id === book.id ? (
                        <input
                          type="text"
                          value={editBook.title}
                          onChange={(e) =>
                            setEditBook({ ...editBook, title: e.target.value })
                          }
                          className="p-2 rounded-lg bg-gray-800/70 border border-orange-700/30 text-white focus:outline-none focus:ring-2 focus:ring-orange-600"
                        />
                      ) : (
                        book.title
                      )}
                    </td>
                    <td className="px-6 py-4 text-white">
                      {editBook?.id === book.id ? (
                        <input
                          type="text"
                          value={editBook.author}
                          onChange={(e) =>
                            setEditBook({ ...editBook, author: e.target.value })
                          }
                          className="p-2 rounded-lg bg-gray-800/70 border border-orange-700/30 text-white focus:outline-none focus:ring-2 focus:ring-orange-600"
                        />
                      ) : (
                        book.author
                      )}
                    </td>
                    <td className="px-6 py-4 text-white">
                      {editBook?.id === book.id ? (
                        <input
                          type="text"
                          value={editBook.duration}
                          onChange={(e) =>
                            setEditBook({ ...editBook, duration: e.target.value })
                          }
                          className="p-2 rounded-lg bg-gray-800/70 border border-orange-700/30 text-white focus:outline-none focus:ring-2 focus:ring-orange-600"
                        />
                      ) : (
                        book.duration
                      )}
                    </td>
                    <td className="px-6 py-4 text-white">
                      {editBook?.id === book.id ? (
                        <input
                          type="text"
                          value={editBook.genre}
                          onChange={(e) =>
                            setEditBook({ ...editBook, genre: e.target.value })
                          }
                          className="p-2 rounded-lg bg-gray-800/70 border border-orange-700/30 text-white focus:outline-none focus:ring-2 focus:ring-orange-600"
                        />
                      ) : (
                        book.genre
                      )}
                    </td>
                    <td className="px-6 py-4 text-white">
                      {editBook?.id === book.id ? (
                        <label className="flex items-center gap-2 bg-gray-800/70 border border-orange-700/30 rounded-lg p-2 cursor-pointer hover:bg-gray-700/70 transition-all duration-300">
                          <FaFileUpload className="text-orange-700" />
                          <span className="text-white">
                            {editFile
                              ? editFile.name
                              : book.file
                              ? book.file.name
                              : "Upload Audio File"}
                          </span>
                          <input
                            type="file"
                            accept="audio/*"
                            onChange={(e) => handleFileChange(e, true)}
                            className="hidden"
                          />
                        </label>
                      ) : book.file ? (
                        <span>{book.file.name}</span>
                      ) : (
                        "No file"
                      )}
                    </td>
                    <td className="px-6 py-4 flex space-x-2">
                      {editBook?.id === book.id ? (
                        <>
                          <button
                            onClick={handleSaveEdit}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 transition-all duration-300 transform hover:scale-105"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEditBook(book)}
                            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-500 transition-all duration-300 transform hover:scale-105"
                          >
                            <FaEdit /> Edit
                          </button>
                          <button
                            onClick={() => handleDeleteBook(book.id)}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:ring-2 focus:ring-red-500 transition-all duration-300 transform hover:scale-105"
                          >
                            <FaTrash /> Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* User Management */}
        <div>
          <h1 className="text-3xl font-semibold mb-6 text-white animate-slide-in">
            Manage Users
          </h1>
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
          0%,
          100% {
            text-shadow: 0 0 5px rgba(194, 65, 12, 0.5);
          }
          50% {
            text-shadow: 0 0 15px rgba(194, 65, 12, 0.9), 0 0 25px rgba(194, 65, 12, 0.7);
          }
        }
        @keyframes pulse-slow {
          0%,
          100% {
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