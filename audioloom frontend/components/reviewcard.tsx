
interface ReviewCardProps {
  user: string;
  comment: string;
}

const ReviewCard = ({ user, comment }: ReviewCardProps) => {
  return (
    <div className="relative bg-gradient-to-br from-blue-950/70 to-orange-700/20 backdrop-blur-md p-6 rounded-xl shadow-lg border border-orange-700/40 transition-all duration-500 transform hover:scale-105 hover:shadow-orange-700/60 group perspective-1000">
      <div className="absolute inset-0 rounded-xl border-2 border-orange-700/50 group-hover:animate-glow pointer-events-none"></div>
      <p className="font-semibold text-white text-lg">{user}</p>
      <p className="text-gray-200 mt-2">{comment}</p>

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
        .perspective-1000 {
          perspective: 1000px;
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ReviewCard;