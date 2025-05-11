import React from "react";
import Link from "next/link";

const SubscriptionCard = () => {
  return (
    <div className="relative w-full my-16 px-6">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-700/10 to-blue-950/30 rounded-3xl blur-xl -z-10 animate-pulse-slow"></div>
      <div className="relative bg-gradient-to-br from-blue-950/80 to-orange-700/30 backdrop-blur-md rounded-3xl p-10 flex items-center justify-between shadow-lg border-2 border-orange-700/50 transition-all duration-500 hover:shadow-orange-700/60 group animate-float">
        <div className="flex-1 space-y-6 z-10">
          <h3 className="text-4xl font-extrabold text-white ">"Discover the World of Audiobooks"</h3>
          <p className="text-gray-200 text-lg animate-slide-in">Find your next favorite audiobook from a vast collection.</p><br></br>
          <Link href="/login">
            <button className="px-8 py-4 bg-orange-700 text-white rounded-xl text-lg font-semibold hover:bg-orange-800 focus:ring-2 focus:ring-orange-700 transition-all duration-300 transform hover:scale-100 ">
              Subscribe Now
            </button>
          </Link>
        </div>
        <div className="flex-1 relative group-hover:brightness-110 transition-all duration-500 transform group-hover:-rotate-3">
          <img
            src="/images/audiobook3.jpg"
            alt="Audiobook"
            className="w-full h-72 object-cover rounded-2xl shadow-xl border-2 border-orange-700/50"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-orange-700/30 to-blue-950/20 rounded-2xl group-hover:animate-glow pointer-events-none"></div>
          <div className="absolute inset-0 rounded-2xl border-2 border-orange-700/50 group-hover:animate-glow pointer-events-none"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 5px rgba(194, 65, 12, 0.5);
            border-color: rgba(194, 65, 12, 0.5);
          }
          50% {
            box-shadow: 0 0 20px rgba(194, 65, 12, 0.9);
            border-color: rgba(194, 65, 12, 0.9);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes pulse-slow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.5;
          }
        }
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 5px rgba(194, 65, 12, 0.5);
            background-color: rgba(194, 65, 12, 0.8);
          }
          50% {
            box-shadow: 0 0 20px rgba(194, 65, 12, 1);
            background-color: rgba(194, 65, 12, 1);
          }
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        .animate-slide-in {
          animation: slide-in 1s ease-out;
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default SubscriptionCard;