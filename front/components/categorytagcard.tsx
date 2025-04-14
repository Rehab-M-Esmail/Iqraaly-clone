"use client";

const categories = [
  { name: "Comedy", icon: "🎭" },
  { name: "Business", icon: "💼" },
  { name: "Horror", icon: "👻" },
  { name: "Romance", icon: "❤️" },
  { name: "Life coaching", icon:"😃"},
  { name: "Drama", icon:"✨"},
  { name: "History", icon:"📜"},
  { name: "Novels", icon:"📖"},
  { name: "Science fiction", icon:"👽"},
  { name: "Educational", icon:"🎓"}
];

const CategoryCards = () => {
  return (
    <div className="py-6">
      <h2 className="text-center text-xl font-bold mb-4">Categories</h2>
      <div className="flex flex-wrap justify-center gap-4 px-4">
        {categories.map((category, index) => (
          <div
            key={index}
            className="w-32 h-32 bg-beige rounded-xl flex flex-col items-center justify-center shadow text-center"
            style={{ backgroundColor: "#f5f5dc" }} // beige 
          >
            <span className="text-3xl mb-2">{category.icon}</span>
            <span className="text-sm font-medium">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCards;
