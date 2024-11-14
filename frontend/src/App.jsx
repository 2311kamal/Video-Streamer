import React from "react";
import {
  Routes,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import HomePage from "./pages/homePage";
import Layout from "./components/layout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<HomePage />} />
      </Route>
    </Route>
  )
);

export default router;
