import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./reducers/authSlice";
import drawerReducer from "./reducers/drawerSlice";
import sidebarWidthReducer from "./reducers/sidebarwidthSlice";
import userReducer from "./reducers/userSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  drawer: drawerReducer,
  sidebarWidth: sidebarWidthReducer,
  user: userReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
