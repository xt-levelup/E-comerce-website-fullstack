import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProductsSliceActions = createAsyncThunk(
  "fetchProductsAction",
  async (_, { rejectWithValue }) => {
    const urlServer = "http://localhost:5000/getProducts";
    try {
      const response = await fetch(urlServer);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data && data.message
            ? data.message
            : "Something went wrong under getting products!"
        );
      } else {
        return data;
      }
    } catch (err) {
      console.log("err fetchProducts:", err);
      return rejectWithValue(err);
    }
  }
);

const fetchProductsSlice = createSlice({
  name: "fetchProductsSlice",
  initialState: {
    productData: null,
    productStatus: "idle",
    productError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsSliceActions.fulfilled, (state, action) => {
        state.productData = action.payload;
        state.productStatus = "succeeded!";
        state.productError = null;
      })
      .addCase(fetchProductsSliceActions.pending, (state, action) => {
        state.productStatus = "loading!";
      })
      .addCase(fetchProductsSliceActions.rejected, (state, action) => {
        state.productData = null;
        state.productStatus = "failed!";
        state.productError = action.payload.message;
      });
  },
});

export default fetchProductsSlice.reducer;
