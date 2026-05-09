import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addItemToCartApi,
  getUserCartItemApi,
  removeUserCartItemApi,
} from "../service/apiCollections";

const initialState = {
  cartItems: [],
  totalItems: 0,
  isLoading: true,
};

export const addItemToCartAsync = createAsyncThunk(
  "cart/additem",
  async (product) => {
    try {
      const response = await addItemToCartApi({ product: product._id });
      let payload = { ...product, quantity: response?.data?.quantity || 1 };
      return payload;
    } catch (error) {
      return error;
    }
  },
);

export const getUserCartItemAsync = createAsyncThunk(
  "cart/getitem",
  async () => {
    try {
      const response = await getUserCartItemApi();
      console.log("response", response.data);
      let payload = response.data.map((item) => {
        return { ...item.product, quantity: item.quantity, id: item._id };
      });
      console.log("payload from thunk", payload);
      return Array.isArray(payload) ? payload : [];
    } catch (error) {
      return error;
    }
  },
);

export const removeUserCartItemAsync = createAsyncThunk(
  "cart/remove",
  async (cartId) => {
    try {
      const response = await removeUserCartItemApi(cartId);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
);

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    pushItemToCartList: (state, action) => {
      state.isLoading = false;
      state.cartItems.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItemToCartAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addItemToCartAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        let idx = state.cartItems.findIndex(
          (item) => item._id === action.payload._id,
        );
        if (idx >= 0) {
          state.cartItems.push(action.payload);
        }
        state.totalItems += 1;
      })
      .addCase(getUserCartItemAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserCartItemAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload;
        state.totalItems = action.payload.length;
      })
      .addCase(getUserCartItemAsync.rejected, (state) => {
        state.cartItems = [];
        state.isLoading = false;
      })
      .addCase(removeUserCartItemAsync.fulfilled, (state, action) => {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload._id,
        );
        state.totalItems -= state.totalItems;
      });
  },
});

export default CartSlice.reducer;
