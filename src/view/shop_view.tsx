import React, { useState } from 'react';
import Header from './header'; // Adjust the import path based on your file structure

type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  category: 'marble' | 'tile' | 'granite';
};

const products: Product[] = [
  {
    id: 1,
    name: 'Carrara Marble',
    description: 'Elegant white marble with subtle gray veins.',
    price: '$75/sq. ft.',
    image: 'https://via.placeholder.com/300x200?text=Carrara+Marble',
    category: 'marble',
  },
  {
    id: 2,
    name: 'Calacatta Gold',
    description: 'Luxurious marble with bold gold veins.',
    price: '$120/sq. ft.',
    image: 'https://via.placeholder.com/300x200?text=Calacatta+Gold',
    category: 'marble',
  },
  {
    id: 3,
    name: 'Black Galaxy Granite',
    description: 'Stunning black granite with golden speckles.',
    price: '$90/sq. ft.',
    image: 'https://via.placeholder.com/300x200?text=Black+Galaxy+Granite',
    category: 'granite',
  },
  {
    id: 4,
    name: 'Subway Tile',
    description: 'Classic white ceramic tile for modern kitchens.',
    price: '$10/sq. ft.',
    image: 'https://via.placeholder.com/300x200?text=Subway+Tile',
    category: 'tile',
  },
  {
    id: 5,
    name: 'Herringbone Tile',
    description: 'Trendy herringbone pattern for floors and walls.',
    price: '$15/sq. ft.',
    image: 'https://via.placeholder.com/300x200?text=Herringbone+Tile',
    category: 'tile',
  },
  {
    id: 6,
    name: 'Bianco Romano Granite',
    description: 'Sophisticated granite with a mix of white and gray.',
    price: '$85/sq. ft.',
    image: 'https://via.placeholder.com/300x200?text=Bianco+Romano+Granite',
    category: 'granite',
  },
];

const ShopPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'marble' | 'tile' | 'granite' | 'all'>('all');

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white-100">
      {/* Header Component */}
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
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-2 rounded-lg ${
                selectedCategory === 'all'
                  ? 'bg-gray-800 text-white'
                  : 'bg-white text-gray-800 hover:bg-gray-200'
              } transition-colors`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedCategory('marble')}
              className={`px-6 py-2 rounded-lg ${
                selectedCategory === 'marble'
                  ? 'bg-gray-800 text-white'
                  : 'bg-white text-gray-800 hover:bg-gray-200'
              } transition-colors`}
            >
              Marble
            </button>
            <button
              onClick={() => setSelectedCategory('tile')}
              className={`px-6 py-2 rounded-lg ${
                selectedCategory === 'tile'
                  ? 'bg-gray-800 text-white'
                  : 'bg-white text-gray-800 hover:bg-gray-200'
              } transition-colors`}
            >
              Tile
            </button>
            <button
              onClick={() => setSelectedCategory('granite')}
              className={`px-6 py-2 rounded-lg ${
                selectedCategory === 'granite'
                  ? 'bg-gray-800 text-white'
                  : 'bg-white text-gray-800 hover:bg-gray-200'
              } transition-colors`}
            >
              Granite
            </button>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {product.name}
                  </h2>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <p className="text-lg font-bold text-gray-900">
                    {product.price}
                  </p>
                  <button className="mt-4 w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors">
                    Add to Cart
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

export default ShopPage;