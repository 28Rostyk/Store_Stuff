import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toggleForm, toggleFormType } from "../../features/user/userSlice";

import UserSignupForm from "./UserSignupForm";
import UserLoginForm from "./UserLoginForm";

import styles from "../../styles/User.module.css";

const UserForm = () => {
  const dispatch = useDispatch();
  const { showForm, formType } = useSelector(({ user }) => user);

  const closeForm = useCallback(() => {
    dispatch(toggleForm(false));
  }, [dispatch]);

  const toggleCurrentFormType = (type) => dispatch(toggleFormType(type));

  useEffect(() => {
    const handleEscKeyPress = (event) => {
      if (event.key === "Escape") {
        closeForm();
      }
    };

    // Додаємо обробник подій клавіш до вікна
    window.addEventListener("keydown", handleEscKeyPress);

    // Прибираємо обробник подій при розміщенні компонента
    return () => {
      window.removeEventListener("keydown", handleEscKeyPress);
    };
  }, [closeForm]);

  return showForm ? (
    <>
      <div className={styles.overlay} onClick={closeForm} />
      {formType === "signup" ? (
        <UserSignupForm
          toggleCurrentFormType={toggleCurrentFormType}
          closeForm={closeForm}
        />
      ) : (
        <UserLoginForm
          toggleCurrentFormType={toggleCurrentFormType}
          closeForm={closeForm}
        />
      )}
    </>
  ) : (
    <></>
  );
};

export default UserForm;
