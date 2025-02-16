import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 p-5 bg-gradient-to-b from-black/50 to-transparent">
      <nav className="flex justify-end space-x-6">
        <a href="/home" className="text-white hover:text-yellow-400 transition-colors duration-300">
          Home
        </a>
        <a href="#" className="text-white hover:text-yellow-400 transition-colors duration-300">
          Browse Stones
        </a>
        <a href="/visualizer" className="text-white hover:text-yellow-400 transition-colors duration-300">
          Visualizer
        </a>
        <a href="#" className="text-white hover:text-yellow-400 transition-colors duration-300">
          Profile
        </a>
      </nav>
    </header>
  );
};

export default Header;