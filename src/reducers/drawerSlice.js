import { createSlice } from "@reduxjs/toolkit";

const drawerSlice = createSlice({
  name: "drawer",
  initialState: {
    isOpen: false,
  },
  reducers: {
    open: (state, action) => {
      state.isOpen = true;
    },
    close: (state) => {
      state.isOpen = false;
    },
  },
});

export const { open, close } = drawerSlice.actions;
export default drawerSlice.reducer;
