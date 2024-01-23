import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  removeItemFromCart,
} from "../../features/user/userSlice";
import { updateUser } from "../../features/user/userOperation";

import styles from "../../styles/Cart.module.css";
import { sumBy, updateCart, removeFromCart } from "../../utils/common";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart, user, isLogin } = useSelector(({ user }) => user);

  // Визначте корзину, яку слід використовувати
  const currentCart = isLogin ? user?.basket || [] : cart || [];

  const changeQuantity = (item, quantity) => {
    if (isLogin) {
      const updatedUser = {
        ...user,
        basket: updateCart(user.basket || [], { ...item, quantity }),
      };

      dispatch(updateUser(updatedUser));
      return;
    }

    dispatch(addItemToCart({ ...item, quantity }));
  };

  const removeItem = (id) => {
    if (isLogin) {
      const updatedUser = {
        ...user,
        basket: removeFromCart(user.basket || [], id),
      };

      dispatch(updateUser(updatedUser));
    } else {
      dispatch(removeItemFromCart(id));
    }
  };

  if (!currentCart) {
    return <div>Loading...</div>; // або інше повідомлення про завантаження чи помилку
  }

  return (
    <section className={styles.cart}>
      <h2 className={styles.title}>Your cart</h2>

      {!currentCart.length ? (
        <div className={styles.empty}>Here is empty</div>
      ) : (
        <>
          <div className={styles.list}>
            {currentCart.map((item) => {
              const { title, category, images, price, id, quantity } = item;

              return (
                <div className={styles.item} key={id}>
                  <div
                    className={styles.image}
                    style={{ backgroundImage: `url(${images[0]})` }}
                  />
                  <div className={styles.info}>
                    <h3 className={styles.name}>{title}</h3>
                    <div className={styles.category}>{category.name}</div>
                  </div>

                  <div className={styles.price}>{price}$</div>

                  <div className={styles.quantity}>
                    <div
                      className={styles.minus}
                      onClick={() =>
                        changeQuantity(item, Math.max(1, quantity - 1))
                      }
                    >
                      <svg className="icon">
                        <use
                          xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#minus`}
                        />
                      </svg>
                    </div>

                    <span>{quantity}</span>

                    <div
                      className={styles.plus}
                      onClick={() =>
                        changeQuantity(item, Math.max(1, quantity + 1))
                      }
                    >
                      <svg className="icon">
                        <use
                          xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#plus`}
                        />
                      </svg>
                    </div>
                  </div>

                  <div className={styles.total}>{price * quantity}$</div>

                  <div
                    className={styles.close}
                    onClick={() => removeItem(item.id)}
                  >
                    <svg className="icon">
                      <use
                        xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`}
                      />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.actions}>
            <div className={styles.total}>
              TOTAL PRICE:{" "}
              <span>
                {sumBy(
                  currentCart.map(({ quantity, price }) => quantity * price)
                )}
                $
              </span>
            </div>

            <button className={styles.proceed}>Proceed to checkout</button>
          </div>
        </>
      )}
    </section>
  );
};

export default Cart;
