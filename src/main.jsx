import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { store } from "./store";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        {/* Single ToastContainer for the whole app. Any component anywhere
            in the tree can call toast.success/error/info/warn from
            react-toastify and it will render here. */}
        <ToastContainer
          position="top-right"
          autoClose={3500}
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="colored"
        />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
