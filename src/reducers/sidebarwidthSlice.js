import { createSlice } from "@reduxjs/toolkit";

const sidebarWidthSlice = createSlice({
  name: "sidebarWidth",
  initialState: {
    width: null,
  },
  reducers: {
    sbwidth: (state, action) => {
      state.width = action.payload;
    },
  },
});

export const { sbwidth } = sidebarWidthSlice.actions;
export default sidebarWidthSlice.reducer;
