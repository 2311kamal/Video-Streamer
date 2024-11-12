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

        </div>
      </div>
    </Router>
  );
};

export default App;
