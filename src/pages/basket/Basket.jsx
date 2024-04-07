import React from "react";
import styles from "./basket.module.css";
import InputNew from "../../widgets/inputs/InputNew";
import ButtonNew from "../../widgets/buttons/ButtonNew";

const Basket = () => {
  return (
    <div className={styles.cont}>
      <h1>Корзина</h1>
      <div className={styles.inner}></div>
    </div>
  );
};

export default Basket;
