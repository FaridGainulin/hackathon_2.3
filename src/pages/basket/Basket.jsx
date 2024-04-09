import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import styles from "./basket.module.css";
import ButtonNew from "../../widgets/buttons/ButtonNew";
import {
  deleteBasket,
  deleteBasketItem,
  getBasket,
} from "../../store/basket/basket.actions";

const Basket = () => {
  const { basket, loading } = useSelector((state) => state.basket);
  const { currentUser } = useSelector((state) => state.users);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBasket());
  }, [dispatch]);
  return (
    <div className={styles.cont}>
      <h1>Корзина</h1>

      <div className={styles.container}>
        {basket?.map(({ product, id }) => (
          <div className={styles.inner} key={product.id}>
            <div className={styles.innerWrap}>
              <div className={styles.innerImg}>
                <img src={product.image} alt="" />
              </div>
              <div>
                <p className={styles.innerTitle}>{product.title}</p>
                <p className={styles.descript}>{product.description}</p>
              </div>
              <div>
                <p className={styles.innerPrice}>{product.price}$</p>
                <p className={styles.oldPrice}>
                  {Math.floor(product.price * 1.1)} $
                </p>
              </div>
              <div>
                <ButtonNew
                  className={styles.btn}
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
