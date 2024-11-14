import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import HomePage from "./pages/homePage";
import Layout from "./components/layout";
import Profile from "./pages/profile";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<HomePage />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Route>
  )
);

export default router;
