import React, { useEffect, useState } from "react";
import styles from "./productCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getProducts,
} from "../../store/products/products.actions";
import { Link, useSearchParams } from "react-router-dom";
import Loader from "../loader/Loader";
import Pagination from "../pagintaion/Pagination";
import ButtonNew from "../buttons/ButtonNew";

const ProductsCard = () => {
  const { products, loading, error } = useSelector((state) => state.products);
  const { currentUser } = useSelector((state) => state.users);

  const dispatch = useDispatch();
  return (
    <div>
      {(loading || error) && <Loader />}
      <div className={styles.cardList}>
        {products.map((item) => (
          <div key={item.id} className={styles.card}>
            <img src={item.image} alt="" />

            <div style={{ padding: "10px" }}>
              <p className={styles.title}>{item.title}</p>
              <p className={styles.descript}>{item.description}</p>
              <p className={styles.price}>{item.price} $</p>
              <span className={styles.oldPrice}>
                {Math.floor(item.price * 1.1)} $
              </span>
              <span className={styles.purchases}>
                Купили {Math.floor(Math.random() * 20 + 1)} шт.
              </span>
            </div>
            {currentUser && currentUser.email === "admin@gmail.com" ? (
              <div className={styles.btnWraper}>
                <Link to={`/edit-product/${item.id}`}>
                  <ButtonNew color="green">Изменить</ButtonNew>
                </Link>

                <ButtonNew
                  onClick={() => dispatch(deleteProduct(item.id))}
                  color="red"
                >
                  Удалить
                </ButtonNew>
              </div>
            ) : (
              ""
            )}
            <Link
              className={styles.cardViewLink}
              to={`/view-product/${item.id}`}
            />
          </div>
        ))}
      </div>
      <Pagination />
    </div>
  );
};

export default ProductsCard;
