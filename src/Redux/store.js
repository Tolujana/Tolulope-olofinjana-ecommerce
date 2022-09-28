import { configureStore } from "@reduxjs/toolkit";
import bagReducer from "./bagSlice";
import cartReducer from "./cartSlice";
export default configureStore({
  reducer: { cart: cartReducer, bag: bagReducer },
});
