import React from "react";

import { useSelector } from "react-redux";

import styles from "../../styles/Sidebar.module.css";
import { NavLink } from "react-router-dom";
const Sidebar = () => {
  const {
    list: { totalPage, totalItems, perPage, currentPage, categories },
  } = useSelector(({ categories }) => categories);

  return (
    <section className={styles.sidebar}>
      <div className={styles.title}>Категорії</div>
      <nav>
        <ul className={styles.menu}>
          {categories &&
            categories.map(({ id, name }) => (
              <li key={id}>
                <NavLink
                  className={({ isActive }) =>
                    `${styles.link} ${isActive ? styles.active : ""}`
                  }
                  to={`/categories/${id}`}
                >
                  {name}
                </NavLink>
              </li>
            ))}
        </ul>
      </nav>
      <div className={styles.footer}>
        <a href="/help" target="_blank" className={styles.link}>
          Допомога
        </a>
        <a
          href="/terms"
          target="_blank"
          className={styles.link}
          style={{ textDecoration: "underline" }}
        >
          Правила та умови
        </a>
      </div>
    </section>
  );
};

export default Sidebar;
