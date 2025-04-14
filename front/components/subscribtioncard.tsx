import React from "react";
import Link from "next/link";

const SubscriptionCard = () => {
  return (
    <div className="flex items-center justify-between p-8 bg-orange-400 indigo-500 text-white rounded-lg my-12">
      <div className="flex-1">
        <h3 className="text-2xl font-bold mb-4">"Discover the World of Audiobooks"</h3>
        <p className="mb-4">Find your next favorite audiobook from a vast collection.</p>
        
        <Link href="/subscription">
          <button className="px-6 py-3 bg-white text-orange-400 indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition">
            Subscribe Now
          </button>
        </Link>
      </div>
      <div className="flex-1">
        <img
          src="/images/audi9.jpg"
          alt="Audiobook"
          className="w-full h-full object-cover rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};

export default SubscriptionCard;
