import React, { useEffect } from "react";
import BannerRight from "../../../widgets/bannerRight/BannerRight";
import BannerLeft from "../../../widgets/bannerLeft/BannerLeft";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deleteProduct,
  getOneProduct,
} from "../../../store/products/products.actions";
import styles from "./viewProduct.module.css";
import ButtonNew from "../../../widgets/buttons/ButtonNew";
import {
  createBasketItem,
  getBasket,
} from "../../../store/basket/basket.actions";
import { TiTick } from "react-icons/ti";

const ViewProduct = () => {
  const { oneProduct } = useSelector((state) => state.products);
  const { currentUser } = useSelector((state) => state.users);
  const { basket } = useSelector((state) => state.basket);

  const dispatch = useDispatch();
  const { id } = useParams();

  const productInBasket = basket?.some((item) => {
    return +item.product.id === +id;
  });

  useEffect(() => {
    dispatch(getOneProduct(id));
  }, [dispatch, id]);

  return (
    <div className={styles.container}>
      <BannerLeft />
      <div>
        <div className={styles.form}>
          <div className={styles.leftCont}>
            <div>
              <img
                className={styles.viewImgBig}
                src={oneProduct?.image}
                alt=""
              />
            </div>
            <div>
              <img
                className={styles.viewImgSmall}
                src={oneProduct?.image}
                alt=""
              />
              <img
                className={styles.viewImgSmall}
                src={oneProduct?.image}
                alt=""
              />
            </div>
          </div>
          <div className={styles.rightCont}>
            <div>
              <div className={styles.title}>{oneProduct?.title}</div>
              <div className={styles.description}>
                {oneProduct?.description}
              </div>
              <div className={styles.price}>{oneProduct?.price} $</div>
              <div className={styles.oldPrice}>
                {Math.floor(oneProduct?.price * 1.1)} $
              </div>
              {currentUser && currentUser.email === "admin@gmail.com" ? (
                <div className={styles.btnWraper}>
                  <Link to={`/edit-product/${oneProduct?.id}`}>
                    <ButtonNew color="green">Изменить</ButtonNew>
                  </Link>

                  <ButtonNew
                    onClick={() => dispatch(deleteProduct(oneProduct?.id))}
                    color="red"
                  >
                    Удалить
                  </ButtonNew>
                </div>
              ) : (
                ""
              )}
              {!productInBasket && currentUser && (
                <ButtonNew
                  onClick={() =>
                    dispatch(
                      createBasketItem({
                        userId: currentUser.id,
                        productId: oneProduct?.id,
                      })
                    )
                  }
                  color="blue"
                >
                  Добавить в корзину
                </ButtonNew>
              )}

              {productInBasket && (
                <div className={styles.pBtn}>
                  <TiTick />
                  Уже в корзине
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <BannerRight />
    </div>
  );
};

export default ViewProduct;
