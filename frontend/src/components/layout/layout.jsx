import React, { useState } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { Outlet } from "react-router-dom";
import useAuthCheck from "../../hooks/useAuthCheck";

function Layout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  useAuthCheck();

  return (
    <div className=" flex flex-col">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex h-[calc(100vh-72px)]">
        <Sidebar isOpen={isSidebarOpen} />
        <main
          className={`flex-grow overflow-y-auto transition-all duration-300  scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-mybg`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
