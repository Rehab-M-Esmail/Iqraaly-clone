"use client";

const SearchBar = () => {
  return (
    <div className="mb-8">
      <input
        type="text"
        placeholder="Search audiobooks..."
        className=" w-1/2 mx-auto block px-4 py-2 border border-gray-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
};

export default SearchBar;
