import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./auth";
import fetchProductsSlice from "./fetchProductsSlice";

const store = configureStore({
  reducer: {
    authSlice: authSlice,
    fetchProductsSlice: fetchProductsSlice,
  },
});

export default store;
