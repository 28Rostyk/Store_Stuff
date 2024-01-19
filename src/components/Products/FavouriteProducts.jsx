import React from "react";
import Products from "./Products";
import { useSelector } from "react-redux";
import Loader from "../../shared/Loader/Loader";

const FavouriteProducts = () => {
  const { user, isLogin } = useSelector(({ user }) => user);
  const { isLoading } = useSelector(({ products }) => products);
  return (
    <>
      {isLogin ? (
        <Products
          products={user.favouriteProducts}
          amount={5}
          title="Улюблене"
        />
      ) : (
        <span>Вам потрібно увійти</span>
      )}
      {isLoading && <Loader />}
    </>
  );
};

export default FavouriteProducts;
