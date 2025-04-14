'use client';

import { useState } from 'react';

const SubscriptionPage = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>(''); 
  
  const plans = [
    {
      name: 'Basic',
      price: 5,
      features: ['Limited access to books', 'Basic features'],
      description: 'For those who just want to explore some books.',
    },
    {
      name: 'Premium',
      price: 15,
      features: ['Access to more books', 'Premium features', 'Ad-free experience'],
      description: 'Perfect for those who want more choices and better features.',
    },
    {
      name: 'Ultimate',
      price: 30,
      features: ['Unlimited access to all books', 'All features unlocked', 'Priority support'],
      description: 'The best plan for book lovers who want the complete experience.',
    },
  ];

  const handlePlanSelect = (plan: string) => {
    setSelectedPlan(plan);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Choose Your Plan</h2>

        <div className="flex gap-6 mb-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`w-1/3 p-6 rounded-lg shadow-md cursor-pointer transition-all hover:shadow-lg ${
                selectedPlan === plan.name ? 'border-4 border-blue-600' : 'border-2 border-gray-300'
              }`}
              onClick={() => handlePlanSelect(plan.name)}
            >
              <h3 className="text-2xl font-semibold text-center">{plan.name}</h3>
              <p className="text-center text-gray-500 mt-2">${plan.price} / month</p>
              <p className="mt-4 text-center text-gray-600">{plan.description}</p>
              <ul className="mt-4 space-y-2 text-gray-700">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-green-500" viewBox="0 0 16 16">
                      <path d="M12.293 4.293a1 1 0 0 1 1.414 1.414L7 12.414 4.293 9.707a1 1 0 1 1 1.414-1.414L7 9.586l5.293-5.293z" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* user plan (is visible after selecting a plan) */}
        {selectedPlan && (
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Enter Your Details</h3>

            <form>
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-600">Full Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email Address</label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>

              {/* Payment Method Field */}
              <div>
                <label htmlFor="payment" className="block text-sm font-medium text-gray-600">Payment Method</label>
                <input
                  type="text"
                  id="payment"
                  className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter payment details"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-black rounded-lg hover:bg-blue-700 transition-all mt-4"
              >
                Subscribe Now
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionPage;

