import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../features/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { getRelatedProducts } from "../../features/products/productsSlice";
import { ROUTES } from "../../utils/routes";
import Product from "./Product";
import Products from "./Products";
import Loader from "../../shared/Loader/Loader";

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, isLoading, isFetching, isSuccess } = useGetProductByIdQuery(id);
  const { related, allList } = useSelector(({ products }) => products);

  useEffect(() => {
    if (!isFetching && !isLoading && !isSuccess) {
      navigate(ROUTES.HOME);
    }
  }, [isLoading, isFetching, isSuccess, navigate]);

  useEffect(() => {
    if (!data || !allList.length) return;
    dispatch(getRelatedProducts(data.category.id));
  }, [data, dispatch, allList.length]);

  return !data ? (
    <section className="preloader">
      <Loader />
    </section>
  ) : (
    <>
      <Product {...data} />
      <Products products={related} amount={5} title="Схожі товари" />
    </>
  );
};

export default SingleProduct;
