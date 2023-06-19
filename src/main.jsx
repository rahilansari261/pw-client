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
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
