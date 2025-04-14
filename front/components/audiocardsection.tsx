import React from "react";
import AudiobookCard from "./audiobookcard";
import Link from "next/link";

type Audiobook = {
  id: string;
  title: string;
  rating: number;
  image: string;
};

type Props = {
  sectionTitle: string;
  audiobooks: Audiobook[];
};

const AudiobookCardsSection: React.FC<Props> = ({ sectionTitle, audiobooks }) => {
  return (
    <div className="py-6 px-4">
      <h2 className="text-center text-4xl font-bold mb-4">{sectionTitle}</h2>

      {/* Horizontal scroll container */}
      <div className="flex space-x-4 overflow-x-auto no-scrollbar">
        {audiobooks.map((book, index) => (
          <Link key={index} href="/subscription">
            
              <AudiobookCard
                title={book.title}
                rating={book.rating}
                image={book.image}
              />
            
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AudiobookCardsSection;
