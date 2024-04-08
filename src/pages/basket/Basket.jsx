import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import styles from "./basket.module.css";
import InputNew from "../../widgets/inputs/InputNew";
import ButtonNew from "../../widgets/buttons/ButtonNew";
import { deleteBasketItem, getBasket } from "../../store/basket/basket.actions";

const Basket = () => {
  const { basket, loading } = useSelector((state) => state.basket);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBasket());
  }, [dispatch]);
  return (
    <div className={styles.cont}>
      <h1>Корзина</h1>

      <div>
        {basket?.map(({ product, id }) => (
          <div className={styles.inner} key={product.id}>
            <div className={styles.inner.Wrap}>
              <div className={styles.innerImg}>
                <img src={product.image} alt="" />
              </div>
              <div>
                <p className={styles.innerTitle}>{product.title}</p>
                <p className={styles.descript}>{product.description}</p>
                <p className={styles.innerPrice}>{product.price}$</p>
                <p className={styles.oldPrice}>
                  {Math.floor(product.price * 1.1)} $
                </p>
              </div>
              <div>
                <ButtonNew
                  onClick={() => dispatch(deleteBasketItem(id))}
                  color="red"
                >
                  Удалить
                </ButtonNew>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Basket;
