import React, { useEffect, useState } from "react";
import AuthForm from "../../../features/auth/AuthForm";
import InputNew from "../../../widgets/inputs/InputNew";
import ButtonNew from "../../../widgets/buttons/ButtonNew";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  editProfile,
  getCurrentUser,
} from "../../../store/users/users.actions";
import BannerLeft from "../../../widgets/bannerLeft/BannerLeft";
import BannerRight from "../../../widgets/bannerRight/BannerRight";

const EditProfile = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    profileImage: "",
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(getCurrentUser());

    if (currentUser) {
      setUser({
        username: currentUser.username,
        password: currentUser.password,
        email: currentUser.email,
        profileImage: currentUser.profileImage,
      });
    }
  }, [dispatch, currentUser]);

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

    if (user.password.length < 6) {
      alert("Пароль должен быть длинее 6 символов...");
      return;
    }

    dispatch(editProfile({ user, id: currentUser.id }, dispatch));
    setUser({
      username: "",
      password: "",
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
          <h2>Изменить профиль</h2>
          <InputNew
            onChange={handleChange}
            name="username"
            value={user.username}
            type="text"
          />
          <InputNew
            onChange={handleChange}
            name="password"
            value={user.password}
            type="text"
          />

          <InputNew
            onChange={handleChange}
            name="email"
            value={user.email}
            type="email"
          />

          <InputNew
            onChange={handleChange}
            name="profileImage"
            value={user.profileImage}
            type="url"
          />

          <ButtonNew color="blue">Сохранить</ButtonNew>
        </form>
      </AuthForm>
      <BannerRight />
    </div>
  );
};

export default EditProfile;
