"use client";

import React from "react";
import Link from "next/link";

type LinkedBook = {
  id: string; 
  title: string;
  rating: number;
  image: string;
};

type Props = {
  sectionTitle: string;
  books: LinkedBook[];
};

const LinkedBooksSection: React.FC<Props> = ({ sectionTitle, books }) => {
  return (
    <div className="py-6 px-4">
      <h2 className="text-xl font-semibold mb-4 text-orange-700">{sectionTitle}</h2>
      <div className="flex space-x-4 overflow-x-auto scrollbar-thin scrollbar-thumb-orange-700/50 scrollbar-track-blue-950/30">
        {books.map((book) => (
          <Link
            href={`/audiobook/${book.id}`} 
            key={book.id}
            className="min-w-[200px] bg-blue-950/50 backdrop-blur-md p-4 rounded-lg border border-orange-700/30 shadow-lg hover:shadow-orange-700/50 transition-all duration-300 transform hover:scale-105 group"
          >
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-52 object-cover rounded-lg mb-3 group-hover:brightness-110 transition-all duration-300"
            />
            <h3 className="text-lg font-semibold text-orange-700">{book.title}</h3>
            <p className="text-white">Rating: {book.rating} ⭐</p>
          </Link>
        ))}
      </div>

      <style jsx>{`
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        .scrollbar-thumb-orange-700\/50 {
          scrollbar-color: rgba(194, 65, 12, 0.5) transparent;
        }
        .scrollbar-track-blue-950\/30 {
          scrollbar-track-color: rgba(12, 10, 57, 0.3) transparent;
        }
      `}</style>
    </div>
  );
};

export default LinkedBooksSection;