"use client";

import { Dispatch, SetStateAction } from "react";
import { FaSearch } from "react-icons/fa";

type SearchBarProps = {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
};

const SearchBar = ({ searchQuery, setSearchQuery }: SearchBarProps) => {
  return (
    <div className="mb-8 relative">
      <div className="relative w-full max-w-xl mx-auto">
        <input
          type="text"
          placeholder="Search audiobooks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 pl-12 bg-blue-950/50 border border-orange-700/40 text-white placeholder-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-700 focus:border-transparent transition-all duration-300 shadow-lg hover:shadow-orange-700/50"
        />
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-200" />
      </div>
    </div>
  );
};

export default SearchBar;