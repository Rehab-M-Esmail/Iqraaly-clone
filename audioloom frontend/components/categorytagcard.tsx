"use client";

const categories = [
  { name: "Comedy", icon: "🎭" },
  { name: "Business", icon: "💼" },
  { name: "Horror", icon: "👻" },
  { name: "Romance", icon: "❤️" },
  { name: "Life coaching", icon: "😃" },
  { name: "Drama", icon: "✨" },
  { name: "History", icon: "📜" },
  { name: "Novels", icon: "📖" },
];

const CategoryTagCard = () => {
  return (
    <div className="py-6 ml-[-2rem]">
      <h2 className="text-center text-2xl font-bold mb-4 text-white animate-pulse">Categories</h2>
      <div className="flex flex-wrap justify-center gap-4 px-4">
        {categories.map((category, index) => (
          <div
            key={index}
            className="w-32 h-32 bg-gradient-to-br from-blue-950/50 to-orange-700/20 backdrop-blur-md rounded-xl flex flex-col items-center justify-center shadow-lg border border-gray-200/30 transition-all duration-300 transform hover:scale-110 hover:shadow-orange-700/50 group"
          >
            <span className="text-3xl mb-2 group-hover:animate-glow">{category.icon}</span>
            <span className="text-sm font-medium text-white">{category.name}</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes glow {
          0%, 100% {
            text-shadow: 0 0 5px rgba(194, 65, 12, 0.5);
          }
          50% {
            text-shadow: 0 0 15px rgba(194, 65, 12, 0.9), 0 0 25px rgba(194, 65, 12, 0.7);
          }
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default CategoryTagCard;