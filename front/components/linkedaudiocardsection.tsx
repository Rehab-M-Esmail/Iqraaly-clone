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
      <h2 className="text-xl font-semibold mb-4">{sectionTitle}</h2>

      <div className="flex space-x-4 overflow-x-auto no-scrollbar">
        {books.map((book) => (
          <Link
            href={`/audiobook/${book.id}`} 
            key={book.id}
            className="min-w-[200px] bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-52 object-cover rounded-lg mb-3"
            />
            <h3 className="text-lg font-semibold">{book.title}</h3>
            <p className="text-gray-500">Rating: {book.rating} ⭐</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LinkedBooksSection;
