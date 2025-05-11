import { useState } from "react";
import { AiFillStar } from "react-icons/ai";

interface RatingProps {
  rating: number;
  onRate?: (rating: number) => void;
}

const Rating = ({ rating, onRate }: RatingProps) => {
  const [hoveredRating, setHoveredRating] = useState<number>(0);

  const handleRate = (newRating: number) => {
    if (onRate) {
      onRate(newRating);
    }
  };

  return (
    <div className="flex items-center justify-center">
      {Array.from({ length: 5 }).map((_, i) => {
        const starIndex = i + 1;
        return (
          <AiFillStar
            key={i}
            size={32}
            className={`cursor-pointer transition-all duration-300 transform hover:scale-125 ${
              starIndex <= (hoveredRating || rating)
                ? "text-orange-700 animate-glow"
                : "text-gray-200"
            }`}
            onMouseEnter={() => setHoveredRating(starIndex)}
            onMouseLeave={() => setHoveredRating(0)}
            onClick={() => handleRate(starIndex)}
          />
        );
      })}
      <span className="ml-3 text-gray-200 text-lg">({rating})</span>

      <style jsx>{`
        @keyframes glow {
          0%, 100% {
            text-shadow: 0 0 5px rgba(194, 65, 12, 0.5);
          }
          50% {
            text-shadow: 0 0 15px rgba(194, 65, 12, 0.9);
          }
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Rating;