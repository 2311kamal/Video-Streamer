import React from 'react';
import { FiHome, FiTrendingUp, FiBookmark, FiSettings, FiStar } from 'react-icons/fi';
import { FaYoutube, FaHistory, FaRegClock } from 'react-icons/fa';

const Sidebar = ({ isOpen }) => {
  return (
    <div
      className={`fixed top-16 left-0 h-full bg-gray-900 text-gray-300 transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Logo Section */}
      <div className="flex justify-center items-center pt-6 pb-6">
        <FaYoutube size={32} className="text-red-600" />
        {isOpen && <span className="ml-2 text-xl font-bold">MyTube</span>}
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col items-start space-y-8 ml-4">
        {/* Home Link */}
        <a
          href="/"
          className="flex items-center text-gray-300 hover:text-white space-x-4"
        >
          <FiHome size={24} />
          {isOpen && (
            <span className="ml-4 transition-opacity duration-300">Home</span>
          )}
        </a>

        {/* Trending Link */}
        <a
          href="/trending"
          className="flex items-center text-gray-300 hover:text-white space-x-4"
        >
          <FiTrendingUp size={24} />
          {isOpen && (
            <span className="ml-4 transition-opacity duration-300">Trending</span>
          )}
        </a>

        {/* Library Link */}
        <a
          href="/library"
          className="flex items-center text-gray-300 hover:text-white space-x-4"
        >
          <FiBookmark size={24} />
          {isOpen && (
            <span className="ml-4 transition-opacity duration-300">Library</span>
          )}
        </a>

        {/* Settings Link */}
        <a
          href="/settings"
          className="flex items-center text-gray-300 hover:text-white space-x-4"
        >
          <FiSettings size={24} />
          {isOpen && (
            <span className="ml-4 transition-opacity duration-300">Settings</span>
          )}
        </a>

        {/* You Section (Visible only when expanded) */}
        {isOpen && (
          <div className="mt-6 space-y-6">
            <div className="text-sm text-gray-500">You</div>
            <a
              href="/history"
              className="flex items-center text-gray-300 hover:text-white space-x-4"
            >
              <FaHistory size={24} />
              <span className="ml-4 transition-opacity duration-300">History</span>
            </a>
            <a
              href="/your-videos"
              className="flex items-center text-gray-300 hover:text-white space-x-4"
            >
              <FaRegClock size={24} />
              <span className="ml-4 transition-opacity duration-300">Your Videos</span>
            </a>
            <a
              href="/playlist"
              className="flex items-center text-gray-300 hover:text-white space-x-4"
            >
              <FiStar size={24} />
              <span className="ml-4 transition-opacity duration-300">Playlist</span>
            </a>
            <a
              href="/watch-later"
              className="flex items-center text-gray-300 hover:text-white space-x-4"
            >
              <FaRegClock size={24} />
              <span className="ml-4 transition-opacity duration-300">Watch Later</span>
            </a>
          </div>
        )}

        {/* Subtle Line Between Sections */}
        {isOpen && <div className="border-t border-gray-600 my-4"></div>}

        {/* Subscriptions Section (Visible only when expanded) */}
        {isOpen && (
          <div className="mt-6 space-y-6">
            <div className="text-sm text-gray-500">Subscriptions</div>
            {/* Example Subscriptions */}
            <a
              href="/subscription-1"
              className="flex items-center text-gray-300 hover:text-white space-x-4"
            >
              <FiStar size={24} />
              <span className="ml-4 transition-opacity duration-300">Subscription 1</span>
            </a>
            <a
              href="/subscription-2"
              className="flex items-center text-gray-300 hover:text-white space-x-4"
            >
              <FiStar size={24} />
              <span className="ml-4 transition-opacity duration-300">Subscription 2</span>
            </a>
            <a
              href="/subscription-3"
              className="flex items-center text-gray-300 hover:text-white space-x-4"
            >
              <FiStar size={24} />
              <span className="ml-4 transition-opacity duration-300">Subscription 3</span>
            </a>
            <a
              href="/subscription-4"
              className="flex items-center text-gray-300 hover:text-white space-x-4"
            >
              <FiStar size={24} />
              <span className="ml-4 transition-opacity duration-300">Subscription 4</span>
            </a>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
