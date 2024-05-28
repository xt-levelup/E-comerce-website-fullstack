import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./authSlice";
import fetchProductsSlice from "./fetchProductsSlice";

const store = configureStore({
  reducer: {
    authSlice: authSlice,
    fetchProductsSlice: fetchProductsSlice,
  },
});

export default store;
