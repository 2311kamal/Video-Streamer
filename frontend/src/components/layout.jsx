import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import useAuthCheck from "../hooks/useAuthCheck";

function Layout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  useAuthCheck();

  return (
    <div className="h-full flex flex-col">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />
      <main
        className={`flex-1 overflow-y-auto transition-all duration-300 ${
          isSidebarOpen ? "ml-[192px]" : "ml-[80px]"
        } mt-[72px] scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-mybg`}
      >
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
