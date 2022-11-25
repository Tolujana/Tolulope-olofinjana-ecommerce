import { createSlice } from "@reduxjs/toolkit";
const initialItems = JSON.parse(localStorage.getItem("cartItems")) || {};
export const cartSlice = createSlice({
  name: "product",
  initialState: { items: initialItems, message: { message: "", isError: "" } },
  reducers: {
    addProduct: (state, action) => {
      const { payload } = action;
      const { productDetails } = payload;
      state.items = { ...state.items, [productDetails.id]: payload };
      state.message = {
        message: "Product added successfully",
        isError: false,
      };
    },
    removeProduct: (state, action) => {
      const { payload } = action;

      delete state.items[payload];
      state.message = {
        message: "Product removed successfully",
        isError: false,
      };
    },
    updateAttribute: (state, action) => {
      const { payload } = action;
      const { selectedAttribute } = state.items[payload.id];

      state.items[payload.id].selectedAttribute = {
        ...selectedAttribute,
        ...payload.attribute,
      };
    },
    changeQuantity: (state, action) => {
      const { value, id } = action.payload;

      if (value > 0) {
        state.items[id].quantity += 1;
      } else {
        if (state.items[id].quantity > 1) {
          state.items[id].quantity -= 1;
        } else {
          delete state.items[action.payload.id];
        }
      }
    },
    displayMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addProduct, removeProduct, changeQuantity, updateAttribute, displayMessage } = cartSlice.actions;

export default cartSlice.reducer;
