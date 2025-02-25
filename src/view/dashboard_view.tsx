import React from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate for navigation
import { useGetProducts } from './query'; // Assuming this is where your hook is stored
import backgroundImage from '../assets/dashboard_bg.jpg'; // Import your background image
import Header from './header';

const Dashboard: React.FC = () => {
  const navigate = useNavigate(); // For navigation
  const { data: products, isLoading, error } = useGetProducts(); // Fetch products from the server

  // If loading or error, display loading or error message
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  // Ensure products is defined before proceeding
  if (!products || products.length === 0) {
    return <div>No products available.</div>;
  }

  // Only display the first 4 products
  const displayedProducts = products.slice(0, 4);

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
            From Vision to Reality:<br /> Perfect Tiles Every Time
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Display the first 4 products */}
            {displayedProducts.map((product) => (
              <div
                key={product._id}
                className="bg-gray-100 p-6 rounded-lg shadow-md relative"
              >
                <img
                  src={product.image}
                  alt={product.item_name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800">{product.item_name}</h3>
                <p className="text-gray-600 mt-2">${product.item_price}</p>

                {/* Hover effect to show "View All" */}
                <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    className="bg-white text-black py-2 px-4 rounded-full"
                    onClick={() => navigate('/shop')} // Navigate to shop page
                  >
                    View All Products
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
