"use client";

import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-blue-700">
      
      <h1 className="text-5xl font-bold text-white mb-8">Audioloom</h1>

      {/* Login Form */}
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Welcome to Audioloom</h2>
        <div className="flex justify-center mb-6">
       <img
         src="/images/audi8.png"
         alt="Audiobook"
         className="w-2/3 h-auto object-cover rounded-lg shadow-md"
       />
       </div>

        <form className="space-y-6">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="text-lg text-center font-bold text-black mb-4 block">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="text-lg  text-center font-bold text-black mb-4 block">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-2/3 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </button>
          </div>
        </form>

        {/* Forgot Password and Sign Up Links */}
        <div className="mt-6 text-center text-gray-600">
          <Link href="/forgot-password" className="text-blue-600 hover:underline">
            Forgot Password?
          </Link>
        </div>
        <div className="mt-3 text-center text-gray-600">
          <span>Don't have an account? </span>
          <Link href="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
