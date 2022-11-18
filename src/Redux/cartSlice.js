import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "product",
  initialState: { items: {}, message: { message: "", isError: "" } },
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
      // filter object based on id
      const { payload } = action;

      delete state.items[payload];
      state.message = {
        message: "Product removed successfully",
        isError: false,
      };
    },
    updateAttribute: (state, action) => {
      // filter object based on id
      const { payload } = action;
      const { selectedAttribute } = state.items[payload.id];

      state.items[payload.id].selectedAttribute = {
        ...selectedAttribute,
        ...payload.attribute,
      };
      console.log(payload.attribute);
    },
    changeQuantity: (state, action) => {
      if (action.payload.value > 0) {
        state.items[action.payload.id].quantity += 1;
      } else {
        if (state.items[action.payload.id].quantity > 1) {
          state.items[action.payload.id].quantity -= 1;
        } else {
          delete state.items[action.payload.id];
        }
      }
    },
    displayMessage: (state, action) => {
      console.log(state.message);
      state.message = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addProduct,
  removeProduct,
  changeQuantity,
  updateAttribute,
  displayMessage,
} = cartSlice.actions;

export default cartSlice.reducer;
