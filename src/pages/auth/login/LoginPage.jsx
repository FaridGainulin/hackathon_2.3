import React, { useEffect, useState } from "react";
import AuthForm from "../../../features/auth/AuthForm";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, getUsers } from "../../../store/users/users.actions";

import InputNew from "../../../widgets/inputs/InputNew";
import ButtonNew from "../../../widgets/buttons/ButtonNew";
import BannerLeft from "../../../widgets/bannerLeft/BannerLeft";
import BannerRight from "../../../widgets/bannerRight/BannerRight";

const LoginPage = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  function handleChange(e) {
    const { value, name } = e.target;
    setUser({ ...user, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    for (let key in user) {
      if (!user[key]) {
        alert("Не все поля заполнены...");
        return;
      }
    }

    const userObj = await users.find((item) => item.username === user.username);

    if (!userObj) {
      alert("Пользователь не наиден...");
      return;
    }

    if (user.password !== userObj.password) {
      alert("Не верный пароль...");
      return;
    }

    setUser({
      username: "",
      password: "",
    });
    localStorage.setItem("currentUser", userObj.id);
    navigate("/");
    dispatch(getCurrentUser(userObj.id));
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
          <h2>Вход</h2>
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
          <ButtonNew color="blue">Отправить</ButtonNew>
        </form>
      </AuthForm>
      <BannerRight />
    </div>
  );
};

export default LoginPage;
