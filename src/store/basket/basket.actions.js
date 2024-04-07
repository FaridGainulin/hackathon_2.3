import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASKET_API = "http://localhost:8006/basket";

export const createBasketItem = createAsyncThunk(
  "basket/createBasketItem",
  async (basket, { dispatch }) => {
    axios.post(BASKET_API, basket);
    dispatch(getBasket());
  }
);

export const getBasket = createAsyncThunk("basket/getBasket", async () => {
  const userId = localStorage.getItem("currentUser");
  if (!userId) {
    return;
  }

  const { data } = await axios.get(
    `${BASKET_API}?userId=${userId}&_expand=product`
  );

  return data;
});

export const deleteBasketItem = createAsyncThunk(
  "basket/deleteBasketItem",
  async (id, { dispatch }) => {
    await axios.delete(`${BASKET_API}/${id}`);

    dispatch(getBasket());
  }
);
