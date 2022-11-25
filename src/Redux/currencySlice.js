import { createSlice } from "@reduxjs/toolkit";
const currencyIndex = JSON.parse(localStorage.getItem("currency"))?.currencyIndex || null;

export const currencySlice = createSlice({
  name: "currency",
  initialState: {
    currencyIndex: currencyIndex,
  },
  reducers: {
    updateCurrency: (state, action) => {
      state.currencyIndex = action.payload;
    },
  },
});

export const { updateCurrency } = currencySlice.actions;

export default currencySlice.reducer;
