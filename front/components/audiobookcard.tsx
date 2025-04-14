interface AudiobookCardProps {
  title: string;
  rating?: number;
  image: string;
}

const AudiobookCard = ({ title, rating, image }: AudiobookCardProps) => {
  return (
    <div className="bg-white p-3 rounded-lg shadow-md w-44 shrink-0">
      <img src={image} alt={title} className="w-full h-44 object-cover rounded-md mb-2" />
      <h3 className="text-sm font-semibold">{title}</h3>
      {rating && <p className="text-xs text-gray-500">Rating: {rating} ⭐</p>}
    </div>
  );
};

export default AudiobookCard;

  