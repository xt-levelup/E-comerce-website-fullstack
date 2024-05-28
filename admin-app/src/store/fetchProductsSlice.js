import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProductsSliceAction = createAsyncThunk(
  "fetchProductsSliceAction",
  async (_, { rejectWithValue }) => {
    try {
      const urlServer = "http://localhost:5000/getProducts";
      const response = await fetch(urlServer);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data && data.message ? data.message : "Cannot get products now!"
        );
      } else {
        return data;
      }
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const getProductsSlice = createSlice({
  name: "getProductsSlice",
  initialState: {
    productData: null,
    productStatus: "idle",
    productErrorMessage: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsSliceAction.fulfilled, (state, action) => {
        state.productData = action.payload;
        state.productStatus = "successfully";
        state.productErrorMessage = null;
      })
      .addCase(fetchProductsSliceAction.pending, (state, action) => {
        state.productStatus = "loading";
      })
      .addCase(fetchProductsSliceAction.rejected, (state, action) => {
        state.productData = null;
        state.productStatus = "failed";
        state.productErrorMessage = action.payload.message;
      });
  },
});

export default getProductsSlice.reducer;
