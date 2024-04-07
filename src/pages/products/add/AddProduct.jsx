import React, { useState } from "react";
import AuthForm from "../../../features/auth/AuthForm";
import Input from "../../../widgets/inputs/Input";
import Button from "../../../widgets/buttons/Button";
import { useDispatch } from "react-redux";
import { createProduct } from "../../../store/products/products.actions";
import { useNavigate } from "react-router-dom";
import InputNew from "../../../widgets/inputs/InputNew";
import ButtonNew from "../../../widgets/buttons/ButtonNew";
import BannerLeft from "../../../widgets/bannerLeft/BannerLeft";
import BannerRight from "../../../widgets/bannerRight/BannerRight";

const AddProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    for (let key in product) {
      if (!product[key]) {
        alert("Some inputs are empty!");
        return;
      }
    }
    dispatch(createProduct(product));
    setProduct({
      title: "",
      description: "",
      price: "",
      image: "",
    });
    navigate("/");
    console.log(product);
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
          <h2>Добавить карточку</h2>
          <InputNew
            placeholder="Наименование..."
            onChange={handleChange}
            name="title"
            value={product.title}
          />
          <InputNew
            placeholder="Описание..."
            onChange={handleChange}
            name="description"
            value={product.description}
          />
          <InputNew
            placeholder="Цена..."
            onChange={handleChange}
            name="price"
            value={product.price}
          />
          <InputNew
            placeholder="Изображение..."
            onChange={handleChange}
            name="image"
            value={product.image}
          />
          <ButtonNew color="blue">Добавить</ButtonNew>
        </form>
      </AuthForm>
      <BannerRight />
    </div>
  );
};

export default AddProduct;
