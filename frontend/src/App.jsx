import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import HomePage from "./pages/homePage";
import Layout from "./components/layout";
import Library from "./pages/library";
import Login from "./pages/login";
import LoginSignup from "./pages/LoginSignup";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<HomePage />} />
        <Route path="profile" />
        <Route path="trending" element={<LoginSignup />} />
        <Route path="library" element={<Library />} />
        <Route path="settings" />
        <Route path="playlist" />
      </Route>
      <Route path="login" element={<Login />} />
    </Route>
  )
);

export default router;
