import React from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiSearch } from "react-icons/fi";
import { FaRegUserCircle, FaYoutube } from "react-icons/fa";

const Navbar = ({ toggleSidebar }) => {
  return (
    <div className="flex items-center justify-between bg-gray-900 text-white p-4 ">
      <div className="flex justify-center items-center">
        <button onClick={toggleSidebar} className="text-2xl">
          <FiMenu />
        </button>
        <FaYoutube size={32} className="text-red-600 ml-4" />
        <span className="ml-2 text-xl font-bold">MyTube</span>
      </div>
      <div className="flex items-center space-x-2 bg-gray-800 rounded-md w-1/3">
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent text-white placeholder-gray-500 outline-none w-full"
        />
        <button>
          <FiSearch size={20} />
        </button>
      </div>
      <Link to="/profile" className="flex items-center space-x-2 cursor-pointer hover:text-gray-300">
        <FaRegUserCircle size={30} />
        <span className="hidden sm:block">Profile</span>
      </Link>
    </div>
  );
};

export default Navbar;
