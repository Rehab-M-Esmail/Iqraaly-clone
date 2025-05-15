"use client";

import Link from "next/link";
import { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useRouter } from 'next/navigation';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();


  async function sendData() {
    console.log("Sending Data ......");
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      // Handle response...
      console.log(`response to login api is ${response.status}`);
  if (response.ok)
  {
              const data = await response.json();
              console.log("Login successful!", data);
              alert('Logined successfully!');
              router.push('/categories');
  }
  else
      { 
          //alert('Failed to login!');
          router.push('/signup');
      }
    } catch (error) {
      console.error(error);
      router.push("/signup");
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login attempted with:", { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-700 via-blue-950 to-orange-700 animate-gradient-bg"></div>
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute w-[600px] h-[600px] bg-white rounded-full -top-80 -left-80 blur-3xl animate-pulse"></div>
        <div className="absolute w-[600px] h-[600px] bg-gray-500 rounded-full -bottom-80 -right-80 blur-3xl animate-pulse delay-1000"></div>
      </div>
      <div className="relative z-10 bg-gray-800/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-md border border-orange-500/30 transform transition-all duration-500 hover:shadow-orange-500/50">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-8 text-center animate-slide-in flex items-center justify-center gap-2">
          <FaSignInAlt className="text-orange-400" />
          Welcome to Audioloom
        </h1>
        <div className="flex justify-center mb-6">
        </div>
        <form onSubmit={sendData} className="space-y-6">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-white block mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-gray-700/50 border border-orange-500/30 text-white placeholder-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-white block mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 bg-gray-700/50 border border-orange-500/30 text-white placeholder-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
              required
            />
          </div>
          <div>
            {/* <Link href="/categories" passHref> */}
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-blue-950 text-white text-lg font-semibold rounded-lg hover:from-blue-950 hover:to-orange-600 focus:ring-4 focus:ring-orange-300 transition-all duration-300 transform hover:scale-105"
              >
                Login
              </button>
            {/* </Link> */}
          </div>
        </form>
        <div className="mt-6 text-center text-gray-300 space-y-2">
          <p>
            <Link href="/forgot-password" className="text-orange-400 hover:text-orange-300 hover:underline transition-all duration-200">
              Forgot Password?
            </Link>
          </p>
          <p>
            Don't have an account?{' '}
            <Link href="/signup" className="text-orange-400 hover:text-orange-300 hover:underline transition-all duration-200">
              Sign Up
            </Link>
          </p>
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

export default LoginPage;