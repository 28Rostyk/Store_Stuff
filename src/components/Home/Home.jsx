import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Poster from "../Poster/Poster";
import Products from "../Products/Products";
import Categories from "../Categories/Categories";
import Banner from "../Banner/Banner";
import { useEffect } from "react";
import { filterByPrice } from "../../features/products/productsSlice";

const Home = () => {
  const { list, allList, filtered, totalPage, currentPage } = useSelector(
    ({ products }) => products
  );

  const {
    list: { categories },
  } = useSelector(({ categories }) => categories);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!allList.length) return;
    dispatch(filterByPrice(100));
  }, [dispatch, allList.length]);

  return (
    <>
      <Poster />
      <Products products={list} amount={5} title="Trending" />
      <Categories categories={categories} amount={5} title="Worth seeing" />
      <Banner />
      <Products products={filtered} amount={5} title="Less than 100$" />
    </>
  );
};

export default Home;
