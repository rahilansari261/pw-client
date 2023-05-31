import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import drawerReducer from "./reducers/drawerSlice";
import sidebarWidthReducer from "./reducers/sidebarwidthSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    drawer: drawerReducer,
    sidebarWidth: sidebarWidthReducer,
  },
});

export default store;
