interface ReviewCardProps {
    user: string;
    comment: string;
  }
  
  const ReviewCard = ({ user, comment }: ReviewCardProps) => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
        <p className="font-semibold text-gray-800">{user}</p>
        <p className="text-gray-600 mt-2">{comment}</p>
      </div>
    );
  };
  
  export default ReviewCard;
  