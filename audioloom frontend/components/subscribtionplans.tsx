"use client";
import React from "react";
import Link from "next/link";

const plans = [
  { name: "Basic", price: "$5/month", description: "Access to all basic audiobooks" },
  { name: "Premium", price: "$15/month", description: "Access to premium audiobooks & features" },
  { name: "Ultimate", price: "$30/month", description: "Access to everything, exclusive content" },
];

const SubscriptionPlans = () => {
  return (
    <div className="py-12 bg-blue-950/50 backdrop-blur-md">
      <h2 className="text-center text-4xl font-bold text-white mb-12 ">Our Subscription Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-6">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-blue-950/70 to-orange-700/20 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-orange-700/40 transition-all duration-500 transform hover:scale-105 hover:shadow-orange-700/50 group"
          >
            <h3 className="text-2xl font-bold text-white text-center">{plan.name}</h3>
            <p className="text-center text-orange-700 text-xl font-semibold mt-2">{plan.price}</p>
            <p className="text-gray-200 text-center mt-4">{plan.description}</p>
            <Link href="/login">
              <button className="mt-6 px-6 py-3 bg-orange-700 text-white rounded-lg w-full hover:bg-orange-800 focus:ring-2 focus:ring-orange-700 transition-all duration-300 transform hover:scale-105 ">
                Subscribe Now
              </button>
            </Link>
            <div className="absolute inset-0 rounded-2xl border-2 border-orange-700/50 group-hover:animate-glow pointer-events-none"></div>
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 5px rgba(194, 65, 12, 0.5);
            border-color: rgba(194, 65, 12, 0.5);
          }
          50% {
            box-shadow: 0 0 15px rgba(194, 65, 12, 0.9);
            border-color: rgba(194, 65, 12, 0.9);
          }
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default SubscriptionPlans;