import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";

const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className="flex flex-col">
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="flex">
          <Sidebar isOpen={isSidebarOpen} />
          <div
            className={`flex-1 p-8 transition-all duration-300 ${
              isSidebarOpen ? "ml-48" : "ml-20"
            }`}
          >
            {/* Main Content Goes Here */}
            <h1 className="text-3xl font-bold">Welcome to MyTube!</h1>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
