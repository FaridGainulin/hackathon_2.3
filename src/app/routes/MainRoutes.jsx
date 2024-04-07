import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../../pages/home/HomePage";
import RegisterPage from "../../pages/auth/register/RegisterPage";
import LoginPage from "../../pages/auth/login/LoginPage";
import AuthProvider from "./AuthProvider";
import { useSelector } from "react-redux";
import EditProfile from "../../pages/auth/editProfile/EditProfile";
import AddProduct from "../../pages/products/add/AddProduct";
import EditProduct from "../../pages/products/edit/EditProduct";
import Basket from "../../pages/basket/Basket";
import ViewProduct from "../../pages/products/view/ViewProduct";
import Error404 from "../../pages/error/Error404";

const MainRoutes = () => {
  const { currentUser, oneUser } = useSelector((state) => state.users);
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/basket" element={<Basket />} />
      <Route path="/view-product/:id" element={<ViewProduct />} />
      <Route element={<AuthProvider />}>
        <Route path="edit-product/:id" element={<EditProduct />} />

        <Route path="/create-product" element={<AddProduct />} />
        <Route path="/edit-profile" element={<EditProfile />} />
      </Route>
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default MainRoutes;
