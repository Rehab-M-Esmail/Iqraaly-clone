import { AiFillStar } from "react-icons/ai";

interface RatingProps {
  rating: number;
}

const Rating = ({ rating }: RatingProps) => {
  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }).map((_, i) => (
        <AiFillStar
          key={i}
          className={
            i < Math.round(rating) ? "text-yellow-500 items-center" : "text-gray-300 items-center"
          }
        />
      ))}
      <span className="ml-2 text-gray-600 ">({rating})</span>
    </div>
  );
};

export default Rating;
