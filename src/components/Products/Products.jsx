import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "../../styles/Products.module.css";
import { Link } from "react-router-dom";
import { removeItemFromFavourite } from "../../features/user/userSlice";
import Loader from "../../shared/Loader/Loader";

const Products = ({ title, style = {}, products = [], amount }) => {
  const list = products.filter((_, i) => i < amount);
  const { favourite } = useSelector(({ user }) => user);
  const { isLoading } = useSelector(({ products }) => products);
  const dispatch = useDispatch();
  const isFavourite = favourite.map(({ id }) => id);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className={styles.products} style={style}>
      {title && <h2>{title}</h2>}
      <div className={styles.list}>
        {list.map(({ id, images, title, category: { name: cat }, price }) => (
          <Link to={`/products/${id}`} key={id} className={styles.product}>
            <div
              className={styles.image}
              style={{ backgroundImage: `url(${images[0]})` }}
            />
            <div className={styles.wrapper}>
              <h3 className={styles.title}>{title}</h3>
              <div className={styles.cat}>{title}</div>
              <div className={styles.info}>
                <div className={styles.prices}>
                  <div className={styles.price}>{price}$</div>
                  <div className={styles.oldPrice}>
                    {Math.floor(price * 0.8)}$
                  </div>
                </div>
                <div className={styles.purchases}>
                  {Math.floor(Math.random() * 20 + 1)} purchases
                </div>

                {isFavourite.includes(id) && (
                  <svg
                    className={styles["icon-fav"]}
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(removeItemFromFavourite({ id }));
                    }}
                  >
                    <use
                      xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#heart`}
                    />
                  </svg>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Products;
