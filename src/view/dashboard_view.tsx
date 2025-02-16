import React from 'react';
import backgroundImage from '../assets/dashboard_bg.jpg'; // Import your background image
import Header from './header';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Darkened Background */}
      <div
        className="relative min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="relative flex flex-col items-center justify-center min-h-screen pt-20">
          {/* Text */}
          <h1 className="text-5xl font-bold text-white mb-8 text-center">
                From Vision to Reality:<br></br> Perfect Tiles Every Time
          </h1>

          {/* Button */}
          <button
            className="bg-black text-white py-3 px-8 rounded-full hover:bg-gray-900 transition-all"
            onClick={() => alert('Button clicked!')}
          >
            Get Started
          </button>
        </main>
      </div>

      {/* Scrollable Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Stones Header */}
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Stones</h2>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Product 1 */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <img
                src="https://via.placeholder.com/150"
                alt="Product 1"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">Product 1</h3>
              <p className="text-gray-600 mt-2">$100</p>
            </div>

            {/* Product 2 */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <img
                src="https://via.placeholder.com/150"
                alt="Product 2"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">Product 2</h3>
              <p className="text-gray-600 mt-2">$150</p>
            </div>

            {/* Product 3 */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <img
                src="https://via.placeholder.com/150"
                alt="Product 3"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">Product 3</h3>
              <p className="text-gray-600 mt-2">$200</p>
            </div>

            {/* Product 4 */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <img
                src="https://via.placeholder.com/150"
                alt="Product 4"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">Product 4</h3>
              <p className="text-gray-600 mt-2">$250</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;