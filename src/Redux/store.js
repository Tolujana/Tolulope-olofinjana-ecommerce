import { configureStore } from "@reduxjs/toolkit";
import bagReducer from "./bagSlice";
import productReducer from "./cartSlice";
export default configureStore({
  reducer: { product: productReducer, bag: bagReducer },
});
