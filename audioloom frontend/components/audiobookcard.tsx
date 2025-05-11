"use client";
interface AudiobookCardProps {
  title: string;
  rating?: number;
  image: string;
}

const AudiobookCard = ({ title, rating, image }: AudiobookCardProps) => {
  return (
    <div className="bg-gradient-to-br from-blue-950/70 to-orange-700/20 backdrop-blur-md rounded-xl p-4 w-56 shrink-0 shadow-lg border border-orange-700/40 transition-all duration-500 transform hover:scale-105 hover:shadow-orange-700/50 group">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover rounded-lg mb-2 group-hover:brightness-110 transition-all duration-300"
        />
        <div className="absolute inset-0 rounded-lg border-2 border-orange-700/50 group-hover:animate-glow pointer-events-none"></div>
      </div>
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      {rating && <p className="text-xs text-gray-200">Rating: {rating} ⭐</p>}

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

export default AudiobookCard;
  