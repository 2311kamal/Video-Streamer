import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';



const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} />
        <div className="flex-1 ml-64 p-8">
          {/* Main Content Goes Here */}
          <h1 className="text-3xl font-bold">Welcome to MyTube!</h1>
        </div>
      </div>
    </div>
  );
};

export default App;
