import React from "react";
import Products from "./Products";
import { useSelector } from "react-redux";
import Loader from "../../shared/Loader/Loader";

const FavouriteProducts = () => {
  const { favourite, loading } = useSelector(({ user }) => user);
  return (
    <>
      <Products products={favourite} amount={5} title="Улюблене" />
      {loading && <Loader />}
    </>
  );
};

export default FavouriteProducts;
