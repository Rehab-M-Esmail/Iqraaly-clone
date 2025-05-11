"use client";
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
    <div className="py-12 px-4 relative">
      <h2 className="text-center text-4xl font-bold text-white mb-8 ">{sectionTitle}</h2>
      <div className="flex space-x-6 overflow-x-auto scrollbar-thin scrollbar-thumb-orange-700/50 scrollbar-track-blue-950/30">
        {audiobooks.map((book, index) => (
          <Link key={index} href={`/login`}>
            <AudiobookCard title={book.title} rating={book.rating} image={book.image} />
          </Link>
        ))}
      </div>
      <div className="absolute inset-0 rounded-lg border-2 border-orange-700/50 animate-glow pointer-events-none"></div>

      <style jsx>{`
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 5px rgba(194, 65, 12, 0.5);
            border-color: rgba(194, 65, 12, 0.5);
          }
          50% {
            box-shadow: 0 0 15px rgba(194, 65, 12, 0.9);
            border-color: rgba(194, 65, 12, 0.9);
          }
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
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

export default AudiobookCardsSection;