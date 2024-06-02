import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./auth";
import fetchProductsSlice from "./fetchProductsSlice";
import navSlice from "./nav";

const store = configureStore({
  reducer: {
    authSlice: authSlice,
    fetchProductsSlice: fetchProductsSlice,
    navSlice: navSlice,
  },
});

export default store;
