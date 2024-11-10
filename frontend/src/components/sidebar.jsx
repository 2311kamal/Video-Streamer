import React, { useState } from 'react';
import { FiHome, FiTrendingUp, FiPlay, FiBookmark, FiSettings, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-900 text-gray-300 transition-all duration-300 ${
          isOpen ? 'w-64' : 'w-20'
        }`}
      >
        {/* Sidebar Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-4 bg-gray-800 text-white p-1 rounded-full focus:outline-none"
        >
          {isOpen ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
        </button>

        {/* Logo (Visible only when open) */}
        {isOpen && <div className="text-white text-2xl font-bold py-4 px-4">MyTube</div>}

        {/* Navigation Links */}
        <nav className="flex flex-col items-center space-y-4 mt-8">
          <a href="/" className="flex items-center text-gray-300 hover:text-white">
            <FiHome size={24} />
            {isOpen && <span className="ml-4">Home</span>}
          </a>
          <a href="/trending" className="flex items-center text-gray-300 hover:text-white">
            <FiTrendingUp size={24} />
            {isOpen && <span className="ml-4">Trending</span>}
          </a>
          <a href="/subscriptions" className="flex items-center text-gray-300 hover:text-white">
            <FiPlay size={24} />
            {isOpen && <span className="ml-4">Subscriptions</span>}
          </a>
          <a href="/library" className="flex items-center text-gray-300 hover:text-white">
            <FiBookmark size={24} />
            {isOpen && <span className="ml-4">Library</span>}
          </a>
          <a href="/settings" className="flex items-center text-gray-300 hover:text-white">
            <FiSettings size={24} />
            {isOpen && <span className="ml-4">Settings</span>}
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className={`flex-1 ${isOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        <div className="p-8">
          {/* Add your main content here */}
          <h1 className="text-3xl font-bold">Welcome to MyTube!</h1>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
