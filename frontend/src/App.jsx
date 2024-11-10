import React, { useState } from "react";
import Sidebar from "./components/Sidebar";

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);



  return (
    <>
      <Sidebar />
    </>
  );
}

export default App;
