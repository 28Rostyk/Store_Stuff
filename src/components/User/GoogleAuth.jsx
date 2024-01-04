import React from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/GoogleAuth..module.css";
import GoogleIcon from "../../shared/icon/GoogleIcon";

const GOOGLE_AUTH = process.env.REACT_APP_GOOGLE_AUTH;

const GoogleAuth = () => {
  const { formType } = useSelector(({ user }) => user);

  const desc =
    formType === "signup" ? "Продовжити з Google" : "Увійти з Google";

  return (
    <a className={styles["nav-link"]} href={GOOGLE_AUTH}>
      <GoogleIcon />
      {desc}
    </a>
  );
};

export default GoogleAuth;
