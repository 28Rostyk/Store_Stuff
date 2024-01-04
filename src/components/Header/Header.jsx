import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { toggleForm, logout } from "../../features/user/userSlice";
import styles from "../../styles/Header.module.css";

import { ROUTES } from "../../utils/routes";

import LOGO from "../../images/logo.svg";
import AVATAR from "../../images/avatar.jpg";

const Header = () => {
  const [values, setValues] = useState({
    name: "Guest",
    email: "",
    avatar: AVATAR,
  });

  const { user, isLogin } = useSelector(({ user }) => user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLogin) {
      setValues({ name: "Guest", avatar: AVATAR });
    } else {
      setValues(user);
    }
  }, [user, isLogin]);

  const handleClick = async () => {
    if (!user) {
      // Якщо користувач не увійшов у систему, покажіть форму
      dispatch(toggleForm(true));
    } else {
      // Якщо користувач увійшов у систему, зачекайте оновлення стану
      await new Promise((resolve) => setTimeout(resolve, 0));
      // Перевірте оновлений стан isLogin та покажіть/приховайте форму за потреби
      if (!isLogin) {
        dispatch(toggleForm(true));
      }
    }
  };

  const handleLogout = () => {
    // Викликаємо action для виходу з системи
    dispatch(logout());
    // Встановлюємо значення за замовчуванням після виходу з системи
    // setValues({ name: "Guest", avatar: AVATAR });
  };

  const backgroundImage = values.avatar ? values.avatar : AVATAR;

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Link to={ROUTES.HOME}>
          <img src={LOGO} alt="stuff" />
        </Link>
      </div>
      <div className={styles.info}>
        <div className={styles.user} onClick={handleClick}>
          <div
            className={styles.avatar}
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div className={styles.username}>
            {values.name ? values.name : values.email}
          </div>
        </div>
        {isLogin && <button onClick={handleLogout}>Logout</button>}
        <form className={styles.form}>
          <div className={styles.icon}>
            <svg className="icon">
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#search`} />
            </svg>
          </div>
          <div className={styles.input}>
            <input
              type="search"
              name="search"
              placeholder="Пошук..."
              autoComplete="off"
              onChange={() => {}}
              value=""
            />
          </div>
          {false && <div className={styles.box}></div>}
        </form>
        <div className={styles.account}>
          {isLogin ? (
            <Link to={ROUTES.FAVOURITE} className={styles.favourites}>
              <svg className={styles["icon-fav"]}>
                <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#heart`} />
              </svg>
            </Link>
          ) : (
            // Якщо користувач не увійшов у систему, викликаємо toggleForm
            <div className={styles.favourites} onClick={handleClick}>
              <svg className={styles["icon-fav"]}>
                <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#heart`} />
              </svg>
            </div>
          )}
          <Link to={ROUTES.CART} className={styles.cart}>
            <svg className={styles["icon-cart"]}>
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#bag`} />
            </svg>
            <span className={styles.count}>2</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
