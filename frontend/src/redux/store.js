import { configureStore } from "@reduxjs/toolkit";
import UserReducers from "./userSlice";
import ProductReducer from "./productSlice";
import CartReducer from "./CartSlice";
const store = configureStore({
  reducer: {
    user: UserReducers,
    product: ProductReducer,
    cart: CartReducer,
  },
});

export default store;
