import React from "react";
import Products from "./Products";
import { useSelector } from "react-redux";
import Loader from "../../shared/Loader/Loader";

const FavouriteProducts = () => {
  const { favourite } = useSelector(({ user }) => user);
  const { isLoading } = useSelector(({ products }) => products);
  return (
    <>
      <Products products={favourite} amount={5} title="Улюблене" />
      {isLoading && <Loader />}
    </>
  );
};

export default FavouriteProducts;
