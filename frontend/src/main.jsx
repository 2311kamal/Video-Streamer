import { Provider } from 'react-redux';
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import store from "./store/store.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
