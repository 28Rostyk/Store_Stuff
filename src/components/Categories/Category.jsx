import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { useGetProductsQuery } from "../../features/api/apiSlice";

import styles from "../../styles/Category.module.css";

import Products from "../Products/Products";

import { ROUTES } from "../../utils/routes";

const Category = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    list: { categories },
  } = useSelector(({ categories }) => categories);

  const defaultValues = {
    search: "",
    price_min: 0,
    // price_max: 0,
  };

  const defaultParams = {
    categoryId: id,
    limit: 5,
    offset: 0,
    ...defaultValues,
  };

  const [isEnd, setEnd] = useState(false);
  const [cat, setCat] = useState(null);
  const [items, setItems] = useState([]);
  const [values, setValues] = useState(defaultValues);
  const [params, setParams] = useState(defaultParams);
  const [error, setError] = useState();

  const { data = [], isLoading, isSuccess } = useGetProductsQuery(params);
  const products = data.products;

  useEffect(() => {
    if (!id) return;

    setValues(defaultValues);
    setItems([]);
    setEnd(false);
    setParams({ ...defaultParams, categoryId: id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (isLoading) return;

    if (!products.length) return setEnd(true);

    setItems((_items) => [..._items, ...products]);
  }, [products, isLoading]);

  useEffect(() => {
    if (
      !id ||
      !categories ||
      !categories.length ||
      !Array.isArray(categories)
    ) {
      // Виклик редіректу на головну сторінку
      // navigate(ROUTES.HOME);
      return;
    }

    // Перевірка, чи id є числом
    if (isNaN(Number(id))) {
      // Виклик редіректу на головну сторінку
      navigate(ROUTES.HOME);
      return;
    }

    const category = categories.find((item) => item.id === Number(id));

    if (!category) {
      setError("Category not found");
      return;
    }

    setCat(category);
  }, [categories, id, navigate]);

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setItems([]);
    setEnd(false);
    setParams({ ...defaultParams, ...values });
  };

  const handleReset = () => {
    setValues(defaultValues);
    setParams(defaultParams);
    setEnd(false);
  };

  if (error) {
    // Якщо категорії не існує
    return <p>Уппс немає такої категорії</p>;
  }

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>{cat?.name}</h2>

      <form className={styles.filters} onSubmit={handleSubmit}>
        <div className={styles.filter}>
          <input
            type="text"
            name="search"
            onChange={handleChange}
            placeholder="Product name"
            value={values.search}
          />
        </div>
        <div className={styles.filter}>
          <input
            type="number"
            name="price_min"
            onChange={handleChange}
            placeholder="0"
            value={values.price_min}
          />
          <span>Price from</span>
        </div>
        <div className={styles.filter}>
          <input
            type="number"
            name="price_max"
            onChange={handleChange}
            placeholder="0"
            value={values.price_max}
          />
          <span>Price to</span>
        </div>

        <button type="submit" hidden />
      </form>

      {isLoading ? (
        <div className="preloader">Loading...</div>
      ) : !isSuccess || !items.length ? (
        <div className={styles.back}>
          <span>No results</span>
          <button onClick={handleReset}>Reset</button>
        </div>
      ) : (
        <Products
          title=""
          products={items}
          style={{ padding: 0 }}
          amount={items.length}
        />
      )}

      {!isEnd && (
        <div className={styles.more}>
          <button
            onClick={() =>
              setParams({ ...params, offset: params.offset + params.limit })
            }
          >
            See more
          </button>
        </div>
      )}
    </section>
  );
};

export default Category;
