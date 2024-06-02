import { createSlice } from "@reduxjs/toolkit";

const initValues = {
  navAction: "all",
};

const navSlice = createSlice({
  name: "navSlice",
  initialState: initValues,
  reducers: {
    navActionUpdate(state, action) {
      state.navAction = action.payload;
    },
  },
});

export const navSliceActions = navSlice.actions;
export default navSlice.reducer;
