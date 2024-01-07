import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../../features/user/userOperation";

import GoogleAuth from "./GoogleAuth";

import styles from "../../styles/User.module.css";

const UserSignupForm = ({ toggleCurrentFormType, closeForm }) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isNotEmpty = Object.values(values).some((val) => val);

    if (!isNotEmpty) return;

    dispatch(createUser(values));
    closeForm();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.close} onClick={closeForm}>
        <svg className="icon">
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
        </svg>
      </div>

      <div className={styles.title}>Реєстація</div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.group}>
          <input
            type="email"
            placeholder="Ваш email"
            name="email"
            value={values.email}
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.group}>
          <input
            type="name"
            placeholder="Ім'я"
            name="name"
            value={values.name}
            autoComplete="off"
            onChange={handleChange}
          />
        </div>

        <div className={styles.group}>
          <input
            type="password"
            placeholder="Пароль"
            name="password"
            value={values.password}
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.group}>
          <input
            type="avatar"
            placeholder="Аватарка"
            name="avatar"
            value={values.avatar}
            autoComplete="off"
            onChange={handleChange}
          />
        </div>

        <div
          className={styles.link}
          onClick={() => toggleCurrentFormType("login")}
        >
          У мене вже є акаунт
        </div>

        <GoogleAuth />

        <button type="submit" className={styles.submit}>
          Зареєструватися
        </button>
      </form>
    </div>
  );
};

export default UserSignupForm;
