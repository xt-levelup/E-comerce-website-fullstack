import { createSlice } from "@reduxjs/toolkit";

const initValues = {
  email: "",
  name: "",
  phone: "",
  errorMessage: null,
  auth: false,
  localStorageData: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState: initValues,
  reducers: {
    emailUpdate(state, action) {
      state.email = action.payload;
    },
    nameUpdate(state, action) {
      state.name = action.payload;
    },
    phoneUpdate(state, action) {
      state.phone = action.payload;
    },
    errorMessageUpdate(state, action) {
      state.errorMessage = action.payload;
    },
    authUpdate(state, action) {
      state.auth = action.payload;
    },
    localStorageDataUpdate(state, action) {
      state.localStorageData = action.payload;
    },
  },
});

export const authSliceActions = authSlice.actions;

export default authSlice.reducer;
