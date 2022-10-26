import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from "./currencySlice";
import productReducer from "./cartSlice";
export default configureStore({
  reducer: { cart: productReducer, currency: currencyReducer },
});
