import React from "react";
import Link from "next/link";

const plans = [
  { name: "Basic", price: "$5/month", description: "Access to all basic audiobooks" },
  { name: "Premium", price: "$15/month", description: "Access to premium audiobooks & features" },
  { name: "Ultimate", price: "$30/month", description: "Access to everything, including exclusive content" },
];

const SubscriptionPlans = () => {
  return (
    <div className="py-8 bg-gray-100">
      <h2 className="text-center text-4xl font-bold mb-6">Our Subscription Plans</h2>
      <div className="flex justify-center space-x-7">
        {plans.map((plan, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md w-60">
            <h3 className="text-xl font-bold text-center">{plan.name}</h3>
            <p className="text-center text-black indigo-600 text-2xl font-semibold">{plan.price}</p>
            <p className="text-center mt-4">{plan.description}</p>
            <Link href="/subscription">
              <button className="mt-6 px-6 py-3 bg-orange-400 indigo-600 text-white rounded-lg w-full hover:bg-orange-500 indigo-700">
                Subscribe Now
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlans;
