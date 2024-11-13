import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function Layout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    // <div className="h-screen w-full overflow-hidden">
    //   {/* Navbar outside the flex container to stay on top */}
    //   <Navbar toggleSidebar={toggleSidebar} />

    //   <div className="flex  ">
    //     {/* Sidebar placed within the flex container */}
    //     <Sidebar isOpen={isSidebarOpen} />

    //     {/* Main content area takes the remaining space */}
    //     <div
    //       className={`flex-1 p-4 mt-16 ${isSidebarOpen ? "ml-48" : "ml-20"}`}
    //     >
    //       <Outlet />
    //     </div>
    //   </div>
    // </div>

    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />
      <div
        className={`  h-full w-full fixed top-[72px] ${
          isSidebarOpen ? "left-[192px]" : "left-[80px]"
        } transition-all duration-300`}
      >
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
