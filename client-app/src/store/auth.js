import { createSlice } from "@reduxjs/toolkit";

const authInit = {
  author: null,
  email: "",
  name: "",
  password: "",
  phone: "",
  errorMessage: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState: authInit,
  reducers: {
    emailUpdate(state, action) {
      state.email = action.payload;
    },
    nameUpdate(state, action) {
      state.name = action.payload;
    },
    passwordUpdate(state, action) {
      state.password = action.payload;
    },
    phoneUpdate(state, action) {
      state.phone = action.payload;
    },
    errorMessageUpdate(state, action) {
      state.errorMessage = action.payload;
    },
    authorUpdate(state, action) {
      state.author = action.payload;
    },
  },
});

export const authSliceActions = authSlice.actions;
export default authSlice.reducer;
