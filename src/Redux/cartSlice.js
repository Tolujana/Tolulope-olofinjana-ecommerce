import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "product",
  initialState: { items: {} },
  reducers: {
    addProduct: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      const { payload } = action;
      const { productDetails } = payload;
      state.items = { ...state.items, [productDetails.id]: payload };
    },
    removeProduct: (state, action) => {
      // filter object based on id
      const { payload } = action;

      delete state.items[payload];
    },
    UpdateItem: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addProduct, removeProduct, incrementByAmount } =
  cartSlice.actions;

export default cartSlice.reducer;
