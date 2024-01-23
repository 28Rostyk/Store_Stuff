import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import styles from "../../styles/Product.module.css";
import { ROUTES } from "../../utils/routes";

import { addItemToCart } from "../../features/user/userSlice";
import { removeFromFavourite, updateCart } from "../../utils/common";
import { updateUser } from "../../features/user/userOperation";

const SIZES = [4, 4.5, 5];

const Product = (item) => {
  const { id, images, title, price, description } = item;

  const [currentSize, setCurrentSize] = useState();
  const [currentImage, setCurrentImage] = useState();

  const { user, isLogin } = useSelector(({ user }) => user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!images.length) return;

    setCurrentImage(images[0]);
  }, [images]);

  const addToCart = () => {
    if (isLogin) {
      const updatedUser = {
        ...user,
        basket: updateCart(user.basket || [], item),
      };

      dispatch(updateUser(updatedUser));
      return;
    }

    dispatch(addItemToCart(item));
  };

  // const updateCart = (cart, payload) => {
  //   let newCart = [...cart];
  //   const found = cart.find(({ id }) => id === payload.id);

  //   if (found) {
  //     newCart = newCart.map((item) => {
  //       return item.id === payload.id
  //         ? { ...item, quantity: payload.quantity || item.quantity + 1 }
  //         : item;
  //     });
  //   } else {
  //     newCart.push({ ...payload, quantity: 1 });
  //   }

  //   return newCart;
  // };

  const addToFavourite = () => {
    const updatedUser = {
      ...user,
      favouriteProducts: [...user.favouriteProducts, item],
    };

    dispatch(updateUser(updatedUser));
  };

  const isFavourite = user?.favouriteProducts?.map(({ id }) => id) || [];

  return (
    <section className={styles.product}>
      <div className={styles.images}>
        <div
          className={styles.current}
          style={{ backgroundImage: `url(${currentImage})` }}
        />
        <div className={styles["images-list"]}>
          {images.map((image, i) => (
            <div
              key={i}
              className={styles.image}
              style={{ backgroundImage: `url(${image})` }}
              onClick={() => setCurrentImage(image)}
            />
          ))}
        </div>
      </div>
      <div className={styles.info}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.price}>{price}$</div>
        <div className={styles.color}>
          <span>Color:</span> Green
        </div>
        <div className={styles.sizes}>
          <span>Sizes:</span>

          <div className={styles.list}>
            {SIZES.map((size) => (
              <div
                onClick={() => setCurrentSize(size)}
                className={`${styles.size} ${
                  currentSize === size ? styles.active : ""
                }`}
                key={size}
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        <p className={styles.description}>{description}</p>

        <div className={styles.actions}>
          <button
            onClick={addToCart}
            className={styles.add}
            disabled={!currentSize}
          >
            Додати в корзину
          </button>
          {isLogin && (
            <>
              {!isFavourite.includes(id) ? (
                <button onClick={addToFavourite} className={styles.favourite}>
                  Додати в улюблені
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(updateUser(removeFromFavourite(user, id)));
                  }}
                  className={styles.favourite}
                >
                  Видалити з улюбленого
                </button>
              )}
            </>
          )}
        </div>

        <div className={styles.bottom}>
          <div className={styles.purchase}>19 people purchased</div>

          <Link to={ROUTES.HOME}>Повернутися в магазин</Link>
        </div>
      </div>
    </section>
  );
};

export default Product;
