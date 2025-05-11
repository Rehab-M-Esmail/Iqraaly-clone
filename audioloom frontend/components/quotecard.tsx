"use client";

const AnotherQuoteCard = () => {
  return (
    <div className="flex items-center w-full justify-between p-8 bg-blue-950/50 backdrop-blur-md text-white rounded-lg my-12 border border-orange-700/30 shadow-lg animate-slide-in">
      <div className="flex-1">
        <h3 className="text-2xl font-bold mb-4 text-orange-700 ">"Escape into Stories"</h3>
        <p className="mb-4">Immerse yourself in captivating tales and adventures.</p>
      </div>
      <div className="flex-1">
        <img
          src="/images/audi8.png"
          alt="Audiobook"
          className="w-full h-full object-cover rounded-lg shadow-md transform transition-transform hover:scale-105 duration-300"
        />
      </div>

      <style jsx>{`
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
        .animate-slide-in {
          animation: slide-in 1s ease-out;
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AnotherQuoteCard;