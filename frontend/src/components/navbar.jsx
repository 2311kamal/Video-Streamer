import React from 'react';
import { FiMenu, FiSearch } from 'react-icons/fi';
import { FaRegUserCircle } from 'react-icons/fa';

const Navbar = ({ toggleSidebar }) => {
  return (
    <div className="flex items-center justify-between bg-gray-900 text-white p-4 fixed w-full top-0 left-0 z-20">
      {/* Drawer Toggle Button */}
      <button onClick={toggleSidebar} className="text-2xl">
        <FiMenu />
      </button>

      {/* Platform Name */}
      <div className="text-2xl font-bold">MyTube</div>

      {/* Search Bar */}
      <div className="flex items-center space-x-2 bg-gray-800 p-2 rounded-md w-1/3">
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent text-white placeholder-gray-500 outline-none w-full"
        />
        <button>
          <FiSearch size={20} />
        </button>
      </div>

      {/* Profile Section (Clickable, as an anchor) */}
      <a
        href="/profile"
        className="flex items-center space-x-2 cursor-pointer hover:text-gray-300"
      >
        <FaRegUserCircle size={30} />
        <span className="hidden sm:block">Profile</span>
      </a>
    </div>
  );
};

export default Navbar;
