import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header";
import { useGetProducts } from "./query";

const categories = ["all", "Marble", "Tile", "Granite"] as const;
type Category = (typeof categories)[number];

const ShopPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const { data: products, isLoading, error } = useGetProducts();
  const navigate = useNavigate(); // Initialize navigate function

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    console.error(error);
    return <div>Error loading products</div>;
  }

  const filteredProducts =
    selectedCategory === "all"
      ? products || []
      : products?.filter((product) => product.item_type === selectedCategory) || [];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mb-16">
        <Header />
      </div>

      <div className="py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
            Marble, Tile & Granite Shop
          </h1>

          {/* Category Filters */}
          <div className="flex justify-center space-x-4 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  selectedCategory === category
                    ? "bg-gray-800 text-white"
                    : "bg-white text-gray-800 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl cursor-pointer"
                onClick={() => navigate(`/product/${product._id}`)}
              >
                <img
                  src={product.image || "https://via.placeholder.com/300"}
                  alt={product.item_name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {product.item_name}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {product.item_description || "No description available"}
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    {product.item_price ? `$${product.item_price}` : "Price not available"}
                  </p>
                  <button className="mt-4 w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center text-gray-600 mt-6">No products found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
  