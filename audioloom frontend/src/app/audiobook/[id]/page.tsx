"use client";

import { useParams } from "next/navigation";
import { allBooks } from "../../data/books";
import Image from "next/image";
import { useEffect, useState } from "react";
import AuthorCard from "../../../../components/authorcard";
import ReaderCard from "../../../../components/readercard";
import Rating from "../../../../components/rating";
import ReviewCard from "../../../../components/reviewcard";
import Navbar from "../../../../components/navbar";
import { FaHeart } from "react-icons/fa";
import { useRouter } from 'next/navigation';


interface Review {
  user: string;
  comment: string;
}

const BookDetailsPage = () => {
  const params = useParams();
  const id = params?.id as string;
  const [book, setBook] = useState<any>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [userRating, setUserRating] = useState<number>(0);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ user: "", comment: "" });
  const router = useRouter();


  useEffect(() => {
    const found = allBooks.find((b) => b.id === id);
    if (found) {
      setBook(found);
      setAverageRating(found.rating);
      setReviews(found.reviews || []);
    }
  }, [id]);

  const handleRatingSubmit = (rating: number) => {
    setUserRating(rating);
    const totalRatings = reviews.length + 1;
    const newAverage = (averageRating * reviews.length + rating) / totalRatings;
    setAverageRating(Math.round(newAverage * 10) / 10);
  };
  async function sendData() {
    console.log("Sending Data ......");
    try {
      const rev = newReview.comment;
      const user=newReview.user;
      const response = await fetch("http://localhost:3001/books/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user,rev,id }),
      });
      // Handle response...
      console.log(`response to review api is ${response.status}`);
  if (response.ok)
  {
    const data = await response.json();
    console.log("Reviewed !", data);
              alert('Reviewed successfully!');
              router.push('/');
  }
  else
      { 
          alert('Failed to review!');
          router.push('/');
      }
    } catch (error) {
      console.error(error);
      router.push("/");
    }
  }

  const handleReviewSubmit = () => {
    if (newReview.user && newReview.comment) {
      setReviews([...reviews, { user: newReview.user, comment: newReview.comment }]);
      setNewReview({ user: "", comment: "" });
    }
  };

  if (!book) return <div className="p-6 text-white">Book not found.</div>;

  return (
    <div className="min-h-screen bg-blue-950 relative overflow-hidden">
      {/* Enhanced Holographic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/95 via-orange-700/20 to-blue-950/95 animate-holo-bg"></div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[1000px] h-[1000px] bg-orange-700/30 rounded-full -top-96 -left-96 blur-4xl animate-pulse-slow"></div>
        <div className="absolute w-[1000px] h-[1000px] bg-blue-950/30 rounded-full -bottom-96 -right-96 blur-4xl animate-pulse-slow delay-2000"></div>
      </div>

      <div className="w-screen">
        <Navbar />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16 space-y-24 z-10">
        {/* Hero Section: Book Cover, Title, and Audio Player */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-950/80 rounded-3xl -z-10"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="relative group">
              <Image
                src={book.image}
                alt={book.title}
                width={400}
                height={500}
                className="rounded-3xl shadow-2xl border border-orange-700/50 group-hover:animate-glow transform transition-transform duration-500 hover:scale-100"
              />
              <div className="absolute inset-0 rounded-3xl border-2 border-orange-700/50 group-hover:animate-glow pointer-events-none"></div>
              
            </div>
            <div className="space-y-6">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`text-3xl ${
                  isFavorite ? "text-red-500 animate-glow" : "text-gray-200 hover:text-red-400"
                } transition-all duration-300 transform hover:scale-110`}
                title="Add to Favorites"
              >
                <FaHeart />
              </button>
              <h1 className="text-5xl md:text-6xl font-extrabold text-white animate-slide-in">{book.title}</h1>
              
              <audio
                controls
                className="w-full bg-blue-950/70 backdrop-blur-md rounded-xl shadow-lg border border-orange-700/30 p-2 transition-all duration-300 hover:shadow-orange-700/50"
              >
                
                <source src={book.audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
              
            </div>
          </div>
        </div>

        {/* Author and Reader Section */}
        <div className="relative">
          <div className="flex justify-center gap-8 md:gap-16">
            <div className="transform -translate-y-8">
              <AuthorCard author={book.author} />
            </div>
            <div className="transform translate-y-8">
              <ReaderCard reader={book.reader} />
            </div>
          </div>
        </div>

        {/* Rating Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4 ">Rate This Audiobook</h2>
          <Rating rating={userRating || averageRating} onRate={handleRatingSubmit} />
          <p className="text-gray-200 mt-2">Average Rating: {averageRating.toFixed(1)}</p>
        </div>

        {/* Write a Review Section */}
        <div className="bg-blue-950/70 backdrop-blur-md rounded-2xl p-8 border border-orange-700/40 shadow-lg">
          <h2 className="text-3xl font-bold text-orange-700 mb-6 animate-pulse">Write a Review</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              value={newReview.user}
              onChange={(e) => setNewReview({ ...newReview, user: e.target.value })}
              className="w-full px-4 py-3 bg-blue-950/80 border border-gray-200/40 text-white placeholder-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-700 focus:border-transparent transition-all duration-300 transform hover:scale-101"
            />
            <textarea
              placeholder="Your Review"
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              className="w-full px-4 py-3 bg-blue-950/80 border border-gray-200/40 text-white placeholder-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-700 focus:border-transparent transition-all duration-300 h-32 transform hover:scale-101"
            />
            <button
              onClick={handleReviewSubmit}
              //onClick={sendData}
              className="px-6 py-2 bg-orange-700 text-white rounded-lg hover:bg-orange-800 focus:ring-2 focus:ring-orange-700 transition-all duration-300 transform hover:scale-105 animate-glow"
            >
              Submit Review
            </button>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-white text-center mb-8 animate-slide-in">What Listeners Say</h2>
          {reviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((review, index) => (
                <ReviewCard key={index} user={review.user} comment={review.comment} />
              ))}
            </div>
          ) : (
            <p className="text-gray-200 text-center text-lg">No reviews yet. Be the first to share your thoughts!</p>
          )}
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes holo-bg {
          0% {
            background-position: 0% 0%;
          }
          50% {
            background-position: 100% 100%;
          }
          100% {
            background-position: 0% 0%;
          }
        }
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse-slow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.5;
          }
        }
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 5px rgba(194, 65, 12, 0.5);
            border-color: rgba(194, 65, 12, 0.5);
            text-shadow: 0 0 5px rgba(194, 65, 12, 0.5);
          }
          50% {
            box-shadow: 0 0 15px rgba(194, 65, 12, 0.9);
            border-color: rgba(194, 65, 12, 0.9);
            text-shadow: 0 0 15px rgba(194, 65, 12, 0.9);
          }
        }
        .animate-holo-bg {
          background-size: 200% 200%;
          animation: holo-bg 10s ease infinite;
        }
        .animate-slide-in {
          animation: slide-in 1s ease-out;
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default BookDetailsPage;