import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import drawerReducer from "./reducers/drawerSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    drawer: drawerReducer,
  },
});

export default store;
