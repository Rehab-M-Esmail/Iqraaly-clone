"use client";

import { useState } from 'react';

const SubscriptionPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [formData, setFormData] = useState({ name: '', email: '', payment: '' });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Subscription submitted:', { selectedPlan, ...formData });
    alert(`Subscribed to ${selectedPlan} plan!`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-700 via-blue-950 to-orange-700 animate-gradient-bg"></div>
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute w-[600px] h-[600px] bg-white rounded-full -top-80 -left-80 blur-3xl animate-pulse"></div>
        <div className="absolute w-[600px] h-[600px] bg-gray-500 rounded-full -bottom-80 -right-80 blur-3xl animate-pulse delay-1000"></div>
      </div>
      <div className="relative z-10 bg-gray-800/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-5xl border border-orange-500/30 transform transition-all duration-500 hover:shadow-orange-500/50">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-12 text-center animate-slide-in">
          Choose Your Audioloom Plan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-6 rounded-xl bg-gray-700/50 border-2 ${
                selectedPlan === plan.name ? 'border-orange-400 shadow-orange-500/50' : 'border-gray-600'
              } cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-orange-500/30 group`}
              onClick={() => handlePlanSelect(plan.name)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-blue-950 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl"></div>
              <h3 className="text-2xl font-semibold text-white text-center">{plan.name}</h3>
              <p className="text-center text-orange-500 text-3xl font-bold mt-2">${plan.price}<span className="text-sm font-normal">/month</span></p>
              <p className="mt-4 text-center text-gray-300">{plan.description}</p>
              <ul className="mt-4 space-y-2 text-gray-200">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-cyan-400" viewBox="0 0 16 16">
                      <path d="M12.293 4.293a1 1 0 0 1 1.414 1.414L7 12.414 4.293 9.707a1 1 0 1 1 1.414-1.414L7 9.586l5.293-5.293z" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {selectedPlan && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-2xl font-semibold text-white text-center">Enter Your Details</h3>
            <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-orange-500/30 text-white placeholder-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-orange-500/30 text-white placeholder-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label htmlFor="payment" className="block text-sm font-medium text-white mb-2">
                  Payment Method
                </label>
                <input
                  type="text"
                  id="payment"
                  value={formData.payment}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-orange-500/30 text-white placeholder-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
                  placeholder="Enter payment details"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-blue-950 text-white text-lg font-semibold rounded-lg hover:from-blue-950 hover:to-orange-600 focus:ring-4 focus:ring-orange-300 transition-all duration-300 transform hover:scale-105"
              >
                Subscribe Now
              </button>
            </form>
          </div>
        )}
      </div>
      <style jsx>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes gradient-bg {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-slide-in {
          animation: slide-in 1s ease-out;
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        .animate-gradient-bg {
          background-size: 200% 200%;
          animation: gradient-bg 15s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default SubscriptionPage;