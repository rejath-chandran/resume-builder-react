import React from 'react';
import { CheckCircle } from 'lucide-react';

const Pricing = () => {
  const features = [
    'Unlimited Resumes',
    'Modern Templates',
    'Export to PDF',
    'Cover Letter Builder',
    'No Watermark',
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-indigo-800 mb-4">
          Simple, Transparent Pricing
        </h2>
        <p className="text-xl text-gray-600 mb-12">
          Choose a plan that's right for you and start building your career.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-indigo-200">
            <h3 className="text-3xl font-bold text-indigo-600 mb-2">Free</h3>
            <p className="text-4xl font-extrabold mb-6">
              $0
              <span className="text-lg font-normal text-gray-500">/month</span>
            </p>
            <ul className="text-left mb-8">
              {features.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-center mb-2 text-gray-700">
                  <CheckCircle className="text-green-500 mr-2" />
                  {feature}
                </li>
              ))}
              <li className="flex items-center mb-2 text-gray-400">
                <CheckCircle className="text-gray-400 mr-2" />
                Cover Letter Builder
              </li>
              <li className="flex items-center mb-2 text-gray-400">
                <CheckCircle className="text-gray-400 mr-2" />
                No Watermark
              </li>
            </ul>
            <button className="w-full bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-full hover:bg-gray-300 transition duration-300">
              Get Started for Free
            </button>
          </div>

          {/* Premium Plan */}
          <div className="bg-indigo-600 p-8 rounded-xl shadow-2xl text-white transform scale-105">
            <p className="text-sm font-bold text-indigo-200 mb-1">MOST POPULAR</p>
            <h3 className="text-3xl font-bold mb-2">Premium</h3>
            <p className="text-4xl font-extrabold mb-6">
              $9
              <span className="text-lg font-normal text-indigo-200">/month</span>
            </p>
            <ul className="text-left mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center mb-2 text-white">
                  <CheckCircle className="text-green-300 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
            <button className="w-full bg-white text-indigo-600 font-bold py-3 px-6 rounded-full hover:bg-indigo-50 transition duration-300">
              Upgrade to Premium
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;