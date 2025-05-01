"use client";

import { useParams } from "next/navigation";
import { allBooks } from "@/app/data/books";
import Image from "next/image";
import { useEffect, useState } from "react";
import AuthorCard from "../../../../components/authorcard";
import ReaderCard from "../../../../components/readercard";
import Rating from "../../../../components/rating";
import ReviewCard from "../../../../components/reviewcard";
import { FaHeart } from "react-icons/fa";
import cacheAudio from "../../../../../offline_mode/cachAudio";

const BookDetailsPage = () => {
  const params = useParams();
  const id = params?.id as string;
  const [book, setBook] = useState<any>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const found = allBooks.find((b) => b.id === id);
    setBook(found || null);
  }, [id]);

  if (!book) return <div className="p-6">Book not found.</div>;

  return (
    <div className="relative p-6 max-w-5xl mx-auto space-y-16">

      {/* Floating Favorite Button */}
      <button
        onClick={() => setIsFavorite(!isFavorite)}
        className={`absolute top-6 right-6 z-10 text-3xl ${
          isFavorite ? "text-red-500" : "text-gray-300 hover:text-red-400"
        } transition-all duration-300`}
        title="Add to Favorites"
      >
        <FaHeart />
      </button>

      {/* Book Cover & Title */}
      <div className="text-center">
        <Image
          src={book.image}
          alt={book.title}
          width={300}
          height={400}
          className="rounded-3xl mx-auto shadow-2xl"
        />
        <h1 className="text-6xl font-extrabold text-gray-800 mt-8">{book.title}</h1>
      </div>

      {/* Audio Player */}
      <div className="mt-6">
        <audio controls className="w-full bg-gray-100 rounded-xl shadow-md gap-10">
          <source src={book.audioUrl} type="audio/mpeg"/>
          Your browser does not support the audio element.
        </audio>
      </div>
      {  /* Cache Audio Button */}
      <div>
          <button
          title="offline mode."
          onClick={() => cacheAudio(book.audioUrl)}>
          offline
        </button>
      </div>

      {/* Author and Reader Section */}
      <div className="flex flex-wrap justify-center gap-10 mt-8">
       <AuthorCard author={book.author} />
       <ReaderCard reader={book.reader} />
      </div>


      {/* Rating */}
      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">Rating</h2>
        <Rating rating={book.rating} />
      </div>

      {/* Reviews Section */}
      <div className="mt-16 space-y-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">What Listeners Say</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {book.reviews.map((review: any, index: number) => (
            <ReviewCard key={index} user={review.user} comment={review.comment} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
