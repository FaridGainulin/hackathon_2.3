import { createSlice } from "@reduxjs/toolkit";
import { getBasket } from "./basket.actions";

const INIT_STATE = {
  basket: [],
  loading: false,
  error: false,
};

const basketSlice = createSlice({
  name: "basket",
  initialState: INIT_STATE,
  reducers: {
    resetBasket: (state) => {
      state.basket = [];
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getBasket.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBasket.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getBasket.fulfilled, (state, action) => {
        state.loading = false;
        state.basket = action.payload;
      }),
});

export const { resetBasket } = basketSlice.actions;
export default basketSlice.reducer;
