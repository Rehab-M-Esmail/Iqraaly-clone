"use client";

import { useState } from "react";
import { allBooks } from "@/app/data/books";
import Footer from "../../../components/footer";
import SearchBar from "../../../components/searchbar"; 
import CategoryTagCard from "../../../components/categorytagcard"; 
import AnotherQuoteCard from "../../../components/quotecard";
import LinkedBooksSection from "../../../components/linkedaudiocardsection";
import Navbar from "../../../components/navbar";

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const fictionBooks = allBooks.filter((book) => book.category === "Thriller");
  const topSellers = allBooks.filter((book) => book.category === "Self Love");
  const financeBooks = allBooks.filter((book) => book.category === "Motivation");
  const latestNovels = allBooks.filter((book) => book.category === "Comedy");

  const filteredBooks = searchQuery
    ? allBooks.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen bg-blue-950 relative overflow-hidden">
      {/* Holographic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/90 to-orange-700/10 animate-holo-bg"></div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[800px] h-[800px] bg-orange-700/20 rounded-full -top-96 -left-96 blur-4xl animate-pulse-slow"></div>
        <div className="absolute w-[800px] h-[800px] bg-blue-950/20 rounded-full -bottom-96 -right-96 blur-4xl animate-pulse-slow delay-2000"></div>
      </div>

      <div className="w-screen">
        <Navbar />
      </div>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <AnotherQuoteCard />
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {/* Search Results */}
        {searchQuery && (
          <section className="my-10">
            <h2 className="text-3xl font-bold mb-4 text-white animate-slide-in">
              Search Results for "{searchQuery}"
            </h2>
            {filteredBooks.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {filteredBooks.map((book) => (
                  <a
                    key={book.id}
                    href={`/audiobook/${book.id}`}
                    className="bg-blue-950/50 backdrop-blur-md p-4 rounded-lg border border-orange-700/30 shadow-lg hover:shadow-orange-700/50 transition-all duration-300 transform hover:scale-105 group"
                  >
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-52 object-cover rounded-t-lg mb-3 group-hover:brightness-110 transition-all duration-300"
                    />
                    <h3 className="text-lg font-semibold text-orange-700">{book.title}</h3>
                    <p className="text-gray-200">Rating: {book.rating} ⭐</p>
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-gray-200">No results found for "{searchQuery}".</p>
            )}
          </section>
        )}

        <CategoryTagCard />

        {/* Sections by Category */}
        {!searchQuery && (
          <>
            <section className="my-10">
              <h2 className="text-3xl font-bold mb-1 text-white animate-pulse">Popular in Fiction</h2>
              <LinkedBooksSection sectionTitle=" " books={fictionBooks} />
            </section>

            <section className="my-10">
              <h2 className="text-3xl font-bold mb-1 text-white animate-pulse">Top Seller Books</h2>
              <LinkedBooksSection sectionTitle=" " books={topSellers} />
            </section>

            <section className="my-10">
              <h2 className="text-3xl font-bold mb-1 text-white animate-pulse">Top Finance Books</h2>
              <LinkedBooksSection sectionTitle=" " books={financeBooks} />
            </section>

            <section className="my-10">
              <h2 className="text-3xl font-bold mb-1 text-white animate-pulse">Latest Novels</h2>
              <LinkedBooksSection sectionTitle=" " books={latestNovels} />
            </section>
          </>
        )}
      </div>

      <Footer />

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
      `}</style>
    </div>
  );
}