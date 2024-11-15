import React from "react";
import { Link } from "react-router-dom";
import {
  FiHome,
  FiTrendingUp,
  FiBookmark,
  FiSettings,
  FiStar,
} from "react-icons/fi";
import {  FaHistory, FaRegClock } from "react-icons/fa";

const Sidebar = ({ isOpen }) => {
  return (
    <div
      className={`fixed top-[72px] left-0 h-full bg-gray-900 text-gray-300 transition-all duration-300  ${
        isOpen ? "w-48 " : "w-20"
      }`}
    >


      {/* Navigation Links */}
      <nav className="flex flex-col items-start space-y-8 ml-4 ">
        <div className="mt-6 space-y-6 whitespace-nowrap animate-slide-left-to-right">
          
          {/* Home Link */}
          <Link
            to="/"
            className="flex items-center text-gray-300 hover:text-white space-x-4"
          >
            <FiHome size={24} />
            {isOpen && (
              <span className="ml-4 transition-opacity duration-300 animate-slide-left-to-right">Home</span>
            )}
          </Link>

          {/* Trending Link */}
          <Link
            to="/trending"
            className="flex items-center text-gray-300 hover:text-white space-x-4"
          >
            <FiTrendingUp size={24} />
            {isOpen && (
              <span className="ml-4 transition-opacity duration-300 animate-slide-left-to-right">
                Trending
              </span>
            )}
          </Link>

          {/* Library Link */}
          <Link
            to="/library"
            className="flex items-center text-gray-300 hover:text-white space-x-4"
          >
            <FiBookmark size={24} />
            {isOpen && (
              <span className="ml-4 transition-opacity duration-300 animate-slide-left-to-right">
                Library
              </span>
            )}
          </Link>

          {/* Settings Link */}
          <Link
            to="/settings"
            className="flex items-center text-gray-300 hover:text-white space-x-4"
          >
            <FiSettings size={24} />
            {isOpen && (
              <span className="ml-4 transition-opacity duration-300 animate-slide-left-to-right">
                Settings
              </span>
            )}
          </Link>
        </div>

        {/* You Section (Visible only when expanded) */}
        {isOpen && (
          <div className="mt-6 space-y-6 whitespace-nowrap animate-slide-left-to-right">
            <div className="text-sm text-gray-500">You</div>
            <Link
              to="/history"
              className="flex items-center text-gray-300 hover:text-white space-x-4"
            >
              <FaHistory size={24} />
              <span className="ml-4 transition-opacity duration-300 overflow-hidden max-w-[10rem] animate-slide-left-to-right">
                History
              </span>
            </Link>
            <Link
              to="/your-videos"
              className="flex items-center text-gray-300 hover:text-white space-x-4"
            >
              <FaRegClock size={24} />
              <span className="ml-4 transition-opacity duration-300 animate-slide-left-to-right">
                Your Videos
              </span>
            </Link>
            <Link
              to="/playlist"
              className="flex items-center text-gray-300 hover:text-white space-x-4"
            >
              <FiStar size={24} />
              <span className="ml-4 transition-opacity duration-300 animate-slide-left-to-right">
                Playlist
              </span>
            </Link>
            <Link
              to="/watch-later"
              className="flex items-center text-gray-300 hover:text-white space-x-4"
            >
              <FaRegClock size={24} />
              <span className="ml-4 transition-opacity duration-300 animate-slide-left-to-right">
                Watch Later
              </span>
            </Link>
          </div>
        )}

        {/* Subscriptions Section (Visible only when expanded) */}
        {isOpen && (
          <div className="mt-6 space-y-6 whitespace-nowrap animate-slide-left-to-right">
            <div className="text-sm text-gray-500">Subscriptions</div>
            {/* Example Subscriptions */}
            <Link
              to="/subscription-1"
              className="flex items-center text-gray-300 hover:text-white space-x-4 animate-slide-left-to-right"
            >
              <FiStar size={24} />
              <span className="ml-4 transition-opacity duration-300">
                Subscription 1
              </span>
            </Link>
            <Link
              to="/subscription-2"
              className="flex items-center text-gray-300 hover:text-white space-x-4 animate-slide-left-to-right"
            >
              <FiStar size={24} />
              <span className="ml-4 transition-opacity duration-300">
                Subscription 2
              </span>
            </Link>
            <Link
              to="/subscription-3"
              className="flex items-center text-gray-300 hover:text-white space-x-4 animate-slide-left-to-right"
            >
              <FiStar size={24} />
              <span className="ml-4 transition-opacity duration-300">
                Subscription 3
              </span>
            </Link>
            <Link
              to="/subscription-4"
              className="flex items-center text-gray-300 hover:text-white space-x-4 animate-slide-left-to-right"
            >
              <FiStar size={24} />
              <span className="ml-4 transition-opacity duration-300">
                Subscription 4
              </span>
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;