import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
  
  } from "react-router-dom";
  import HomePage from "../pages/homePage";
  import Layout from "../components/layout";
  import Library from "../pages/library";
  import Login from "../pages/login";
  
  
  
  
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route >
        <Route path="/" element={<Layout />}>
          <Route path="" element={<HomePage />} />
          <Route path="library" element={<Library />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Route>
    )
  );
  
  export { router };
  