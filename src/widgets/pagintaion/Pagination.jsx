import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextPage, prevPage } from "../../store/products/products.slice";
import { getProducts } from "../../store/products/products.actions";
import styles from "./pagination.module.css";

const Pagination = () => {
  const { currentPage, lastPage } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const decrement = () => {
    dispatch(prevPage());
    dispatch(getProducts());
  };

  const increment = () => {
    dispatch(nextPage());
    dispatch(getProducts());
  };

  return (
    <div className={styles.paginatWrap}>
      {currentPage !== 1 && (
        <img
          style={{ width: "40px", cursor: "pointer" }}
          onClick={decrement}
          src="https://cdn-icons-png.flaticon.com/512/9931/9931110.png"
          alt=""
        />
      )}
      <span style={{ margin: "20px", color: "gray" }}>{currentPage}</span>
      {!lastPage && (
        <img
          style={{ width: "40px", cursor: "pointer" }}
          onClick={increment}
          src="https://cdn-icons-png.flaticon.com/512/9931/9931155.png"
          alt=""
        />
      )}
    </div>
  );
};

export default Pagination;
