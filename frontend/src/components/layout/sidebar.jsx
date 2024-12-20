import React from "react";
import { Link } from "react-router-dom";
import {
  FiHome,
  FiTrendingUp,
  FiBookmark,
  FiSettings,
  FiStar,
  FiLogOut,
} from "react-icons/fi";
import { FaHistory, FaRegClock } from "react-icons/fa";
import { apiCall } from "../../utils/handleApiCall";
import { logoutUser } from "../../api/userApi";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { useLocation } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    const { response, error } = await apiCall(logoutUser);
    if (response) {
      dispatch(logout());
    } else {
      console.log(error);
    }
  };

  return (
    <div
      className={` bg-gray-900 text-gray-300 transition-all duration-300 flex-shrink-0 h-full ${
        isOpen ? "w-48 " : "w-20"
      }`}
    >
      {/* Navigation Links */}
      <nav className="flex flex-col items-start  h-[calc(100vh-136px)]  overflow-y-auto no-scrollbar">
        <div className="mt-6 space-y-6 whitespace-nowrap animate-slide-left-to-right  ml-4 ">
          {/* Home Link */}
          <Link
            to="/"
            className="flex items-center text-gray-300 hover:text-white space-x-4"
          >
            <FiHome size={24} />
            {isOpen && (
              <span className="ml-4 transition-opacity duration-300 animate-slide-left-to-right">
                Home
              </span>
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
          <div className="mt-8 space-y-6 whitespace-nowrap animate-slide-left-to-right  ml-4 ">
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
              to="/myVideos"
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
          <div className="mt-8 space-y-6 whitespace-nowrap animate-slide-left-to-right  ml-4 mb-2 ">
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
            <Link
              to="/subscription-4"
              className="flex items-center text-gray-300 hover:text-white space-x-4 animate-slide-left-to-right"
            >
              <FiStar size={24} />
              <span className="ml-4 transition-opacity duration-300">
                Subscription 5
              </span>
            </Link>
            <Link
              to="/subscription-4"
              className="flex items-center text-gray-300 hover:text-white space-x-4 animate-slide-left-to-right"
            >
              <FiStar size={24} />
              <span className="ml-4 transition-opacity duration-300">
                Subscription 6
              </span>
            </Link>
            <Link
              to="/subscription-4"
              className="flex items-center text-gray-300 hover:text-white space-x-4 animate-slide-left-to-right"
            >
              <FiStar size={24} />
              <span className="ml-4 transition-opacity duration-300">
                Subscription 7
              </span>
            </Link>
            <Link
              to="/subscription-4"
              className="flex items-center text-gray-300 hover:text-white space-x-4 animate-slide-left-to-right"
            >
              <FiStar size={24} />
              <span className="ml-4 transition-opacity duration-300">
                Subscription 8
              </span>
            </Link>
            <Link
              to="/subscription-4"
              className="flex items-center text-gray-300 hover:text-white space-x-4 animate-slide-left-to-right"
            >
              <FiStar size={24} />
              <span className="ml-4 transition-opacity duration-300">
                Subscription 9
              </span>
            </Link>
          </div>
        )}
      </nav>

      {/* Logout Link */}

      <div
        className={`animate-slide-left-to-right   bg-gray-700 transition-all duration-300 h-[64px] flex ${
          isOpen ? " w-48" : " w-20"
        }`}
      >
        <Link
          onClick={handleLogout}
          to="/login"
          state={{ from: location.pathname }}
          className="flex items-center text-gray-300 hover:text-white space-x-4 pl-4 "
        >
          <FiLogOut size={32} />
          {isOpen && (
            <span className="ml-4 transition-opacity duration-300 animate-slide-left-to-right">
              Logout
            </span>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
