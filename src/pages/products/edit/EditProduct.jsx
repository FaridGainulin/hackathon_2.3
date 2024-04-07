import React, { useEffect, useState } from "react";
import AuthForm from "../../../features/auth/AuthForm";
import Input from "../../../widgets/inputs/Input";
import Button from "../../../widgets/buttons/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  editProduct,
  getOneProduct,
} from "../../../store/products/products.actions";
import { useNavigate, useParams } from "react-router-dom";
import InputNew from "../../../widgets/inputs/InputNew";
import ButtonNew from "../../../widgets/buttons/ButtonNew";
import BannerLeft from "../../../widgets/bannerLeft/BannerLeft";
import BannerRight from "../../../widgets/bannerRight/BannerRight";

const EditProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
  });

  const { oneProduct } = useSelector((state) => state.products);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getOneProduct(id));
  }, [dispatch]);

  useEffect(() => {
    oneProduct && setProduct(oneProduct);
  }, [oneProduct]);

  function handleChange(e) {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    for (let key in product) {
      if (!product[key]) {
        alert("Заполните все поля...");
        return;
      }
    }
    dispatch(editProduct({ id, product }));
    setProduct({
      title: "",
      description: "",
      price: "",
      image: "",
    });
    navigate("/");
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <BannerLeft />
      <AuthForm>
        <form className="formStyles" onSubmit={handleSubmit}>
          <h2>Изменить карточку</h2>
          <InputNew
            onChange={handleChange}
            name="title"
            value={product.title}
          />
          <InputNew
            onChange={handleChange}
            name="description"
            value={product.description}
          />
          <InputNew
            onChange={handleChange}
            name="price"
            value={product.price}
          />
          <InputNew
            onChange={handleChange}
            name="image"
            value={product.image}
          />
          <ButtonNew color="blue">Сохранить</ButtonNew>
        </form>
      </AuthForm>
      <BannerRight />
    </div>
  );
};

export default EditProduct;
