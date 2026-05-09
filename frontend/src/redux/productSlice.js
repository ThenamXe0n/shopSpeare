import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllproductApi, getproductByIdApi } from "../service/apiCollections";

const initialState = {
  productList: [],
  isLoading: true,
  selectedProduct: null,
};

export const getAllproductAsync = createAsyncThunk(
  "product/getall",
  async (query) => {
    try {
      const response = await getAllproductApi(query);
      return response;
    } catch (error) {
      return error;
    }
  },
);
export const getproductByIdAsync = createAsyncThunk(
  "product/getProductDetails",
  async (id) => {
    try {
      const response = await getproductByIdApi(id);
      console.log(response);
      return response;
    } catch (error) {
      return error;
    }
  },
);

const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    selectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllproductAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllproductAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(getproductByIdAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getproductByIdAsync.fulfilled, (state, action) => {
        ((state.isLoading = false),
          (state.selectedProduct = action.payload.data));
      });
  },
});
export const { selectedProduct } = ProductSlice.actions;
export default ProductSlice.reducer;
