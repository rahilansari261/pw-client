import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import drawerReducer from "./reducers/drawerSlice";
import sidebarWidthReducer from "./reducers/sidebarwidthSlice";
import userReducer from "./reducers/userSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    drawer: drawerReducer,
    sidebarWidth: sidebarWidthReducer,
    user: userReducer,
  },
});

export default store;
