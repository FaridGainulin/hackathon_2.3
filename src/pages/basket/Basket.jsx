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

      <div className={styles.inner}>
        {basket?.map(({ product, id }) => (
          <div key={product.id}>
            <p>
              {product.title}
              {product.description}
              {product.price}
              <ButtonNew
                onClick={() => dispatch(deleteBasketItem(id))}
                color="red"
              >
                Удалить
              </ButtonNew>
            </p>

            {/* <pre>{JSON.stringify(item)}</pre> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Basket;
