"use client";
import Image from "next/image";
import "../app/globals.css";
import Carousel from "../../components/horizontalscroll";
import SubscriptionCard from "../../components/subscribtioncard";
import AudiobookCardsSection from "../../components/audiocardsection";
import AnotherQuoteCard from "../../components/quotecard";
import SubscriptionPlans from "../../components/subscribtionplans";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";

const homeAudiobooks = [
  { id: "1", title: "Funny Story", rating: 4.5, image: "/images/book1.jpg" },
  { id: "2", title: "Great Big Beautiful Life", rating: 4.8, image: "/images/book2.jpg" },
  { id: "3", title: "Rich Dad Poor Dad", rating: 4.2, image: "/images/book3.jpg" },
  { id: "4", title: "It Ends With Us", rating: 3.4, image: "/images/book5.jpg" },
  { id: "5", title: "Good vibes,Good life", rating: 4.6, image: "/images/book7.jpg" },
  { id: "6", title: "The Crash", rating: 3.7, image: "/images/book8.jpg" },
  { id: "7", title: "The atomic Habits", rating: 4.1, image: "/images/book6.jpg" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-blue-950 relative overflow-hidden">
      {/* Holographic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/95 via-orange-700/20 to-blue-950/95 animate-holo-bg"></div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[1000px] h-[1000px] bg-orange-700/30 rounded-full -top-96 -left-96 blur-4xl animate-pulse-slow"></div>
        <div className="absolute w-[1000px] h-[1000px] bg-blue-950/30 rounded-full -bottom-96 -right-96 blur-4xl animate-pulse-slow delay-2000"></div>
      </div>

      <div className="w-screen">
        <Navbar />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 py-16 space-y-24 z-10">
        <Carousel />
        <SubscriptionCard />
        <AudiobookCardsSection audiobooks={homeAudiobooks} sectionTitle="Trending Now" />
        <AnotherQuoteCard />
        <SubscriptionPlans />
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
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}