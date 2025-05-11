"use client";

import dynamic from "next/dynamic";
import React from "react";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

const carouselItems = [
  { src: "/images/audi1.jpg", alt: "Offer 1", caption: "Explore New Worlds with Audiobooks" },
  { src: "/images/audi6.jpg", alt: "Offer 2", caption: "Immerse Yourself in Epic Stories" },
  { src: "/images/audi5.jpg", alt: "Offer 3", caption: "Discover Your Next Favorite Listen" },
  { src: "/images/audi7.png", alt: "Offer 4", caption: "Unleash Your Imagination Today" },
];

const Carousel: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    customPaging: () => (
      <div className="w-4 h-4 bg-orange-700 rounded-full border border-orange-700/50 animate-glow hover:scale-125 transition-transform duration-300"></div>
    ),
    dotsClass: "slick-dots absolute bottom-6 flex space-x-3 justify-center",
  };

  return (
    <div className="w-full py-8 relative animate-float">
      <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 to-transparent rounded-2xl -z-10"></div>
      <Slider {...settings}>
        {carouselItems.map((item, index) => (
          <div key={index} className="h-[60vh] flex justify-center items-center relative group">
            <div className="relative w-full h-full">
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover rounded-2xl shadow-2xl transition-all duration-500 group-hover:brightness-110"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-orange-700/20 to-blue-950/40 rounded-2xl group-hover:animate-glow pointer-events-none"></div>
              <div className="absolute inset-0 rounded-2xl border-2 border-orange-700/50 group-hover:animate-glow pointer-events-none"></div>
              <div className="absolute bottom-16 left-8 right-8">
                <h3 className="text-2xl md:text-3xl font-bold text-white animate-slide-in">{item.caption}</h3>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      <style jsx>{`
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 5px rgba(194, 65, 12, 0.5);
            border-color: rgba(194, 65, 12, 0.5);
            background-color: rgba(194, 65, 12, 0.7);
          }
          50% {
            box-shadow: 0 0 15px rgba(194, 65, 12, 0.9);
            border-color: rgba(194, 65, 12, 0.9);
            background-color: rgba(194, 65, 12, 0.9);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        .animate-slide-in {
          animation: slide-in 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Carousel;