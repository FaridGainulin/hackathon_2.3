import React, { useEffect } from "react";
import ProductCard from "../../widgets/productCard/ProductCard";
import { useDispatch } from "react-redux";
import { getProducts } from "../../store/products/products.actions";
import Slider from "../../widgets/slider/Slider";
import BannerLeft from "../../widgets/bannerLeft/BannerLeft";
import BannerRight from "../../widgets/bannerRight/BannerRight";

const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BannerLeft />
        <Slider />
        <BannerRight />
      </div>
      <ProductCard />;
    </div>
  );
};

export default HomePage;
