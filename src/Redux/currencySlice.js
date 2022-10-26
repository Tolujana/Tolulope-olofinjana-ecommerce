import { createSlice } from "@reduxjs/toolkit";

export const currencySlice = createSlice({
  name: "currency",
  initialState: {
    value: 0,
  },
  reducers: {
    AddItem: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
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
export const { increment, decrement, incrementByAmount } =
  currencySlice.actions;

export default currencySlice.reducer;
