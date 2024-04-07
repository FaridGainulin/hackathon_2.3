import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./users/users.slice";
import productsSlice from "./products/products.slice";
import basketSlice from "./basket/basket.slice";

export const store = configureStore({
  reducer: {
    users: usersSlice,
    products: productsSlice,
    basket: basketSlice,
  },
});
