import React from "react";
import Products from "./Products";
import { useSelector } from "react-redux";

const FavouriteProducts = () => {
  const { favourite } = useSelector(({ user }) => user);
  return (
    <>
      <Products products={favourite} amount={5} title="Улюблене" />
    </>
  );
};

export default FavouriteProducts;
