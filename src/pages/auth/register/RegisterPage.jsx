import React, { useEffect, useState } from "react";
import styles from "../auth.module.css";
import AuthForm from "../../../features/auth/AuthForm";
import BannerLeft from "../../../widgets/bannerLeft/BannerLeft";
import BannerRight from "../../../widgets/bannerRight/BannerRight";
import { getUsers, registerUser } from "../../../store/users/users.actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputNew from "../../../widgets/inputs/InputNew";
import ButtonNew from "../../../widgets/buttons/ButtonNew";

const RegisterPage = () => {
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
    email: "",
    profileImage: "",
  });

  function handleChange(e) {
    const { value, name } = e.target;
    setUser({ ...user, [name]: value });
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  async function handleSubmit(e) {
    e.preventDefault();
    for (let key in user) {
      if (!user[key]) {
        alert("Заполните все поля...");
        return;
      }
    }
    if (user.password !== user.passwordConfirm) {
      alert("Пароли не совпадают...");
      return;
    }

    if (user.password.length < 6) {
      alert("Пароль должен быть не менее 6 символов...");
      return;
    }

    const userObj = await users.find(
      (item) =>
        item.username.toLocaleLowerCase() === user.username.toLocaleLowerCase()
    );

    if (userObj) {
      alert("Вы уже зарегистрированы...");
      return;
    }

    dispatch(registerUser(user));
    setUser({
      username: "",
      password: "",
      passwordConfirm: "",
      email: "",
      profileImage: "",
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
          <h2>Регистрация</h2>
          <InputNew
            placeholder="Имя..."
            onChange={handleChange}
            name="username"
            value={user.username}
            type="text"
          />
          <InputNew
            placeholder="Пароль..."
            onChange={handleChange}
            name="password"
            value={user.password}
            type="password"
          />
          <InputNew
            placeholder="Подтверждение..."
            onChange={handleChange}
            name="passwordConfirm"
            value={user.passwordConfirm}
            type="password"
          />
          <InputNew
            placeholder="Почта..."
            onChange={handleChange}
            name="email"
            value={user.email}
            type="email"
          />
          <InputNew
            placeholder="Фото..."
            onChange={handleChange}
            name="profileImage"
            value={user.profileImage}
            type="url"
          />
          <ButtonNew color="blue">Отправить</ButtonNew>
        </form>
      </AuthForm>
      <BannerRight />
    </div>
  );
};

export default RegisterPage;
