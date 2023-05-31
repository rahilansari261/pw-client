import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "./fonts/Cabin/static/Cabin/Cabin-Bold.ttf";
import "./fonts/Cabin/static/Cabin/Cabin-Medium.ttf";
import "./fonts/Cabin/static/Cabin/Cabin-Regular.ttf";
import "./fonts/Cabin/static/Cabin/Cabin-SemiBold.ttf";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
