import { createSlice } from "@reduxjs/toolkit";

export const currencySlice = createSlice({
  name: "currency",
  initialState: {
    currencyIndex: null,
  },
  reducers: {
    updateCurrency: (state, action) => {
      state.currencyIndex = action.payload;
    },
    removeItem: (state) => {
      state.value -= 1;
    },
    UpdateItem: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateCurrency } = currencySlice.actions;

export default currencySlice.reducer;
