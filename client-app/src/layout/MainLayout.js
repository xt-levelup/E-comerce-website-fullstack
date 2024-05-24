import { Outlet, NavLink } from "react-router-dom";

import styles from "./MainLayout.module.css";

const MainLayout = () => {
  return (
    <div>
      <div>
        <nav>
          <div className={styles.left}>
            <NavLink
              to="/"
              className={({ isActive }) => {
                return isActive ? styles.active : undefined;
              }}
              end
            >
              Home
            </NavLink>
            <NavLink
              to="/shop"
              className={({ isActive }) => {
                return isActive ? styles.active : undefined;
              }}
            >
              Shop
            </NavLink>

            {/* <NavLink
              to="/checkout"
              className={({ isActive }) => {
                return isActive ? styles.active : undefined;
              }}
            >
              Checkout
            </NavLink> */}
          </div>
          <div>
            <h2>BOUTIQUE</h2>
          </div>
          <div className={styles.right}>
            <NavLink
              to="/cart"
              className={({ isActive }) => {
                return isActive ? styles.active : undefined;
              }}
            >
              <span className={styles.icon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
                Cart
              </span>
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) => {
                return isActive ? styles.active : undefined;
              }}
            >
              <span className={styles.icon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                  />
                </svg>
                Login
              </span>
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) => {
                return isActive ? styles.active : undefined;
              }}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                  />
                </svg>
                Signup
              </span>
            </NavLink>
          </div>
        </nav>
      </div>
      <div>
        <Outlet />
      </div>
      <div className={styles.footer}>
        <div className={styles["footer-part"]}>
          <h3>CUSTOMER SERVICES</h3>
          <a href="#">Help & Contact Us</a>
          <a href="#">Returns & Refunds</a>
          <a href="#">Online Stores</a>
          <a href="#">Terms & Conditions</a>
        </div>
        <div className={styles["footer-part"]}>
          <h3>COMPANY</h3>
          <a href="#">What We Do</a>
          <a href="#">Available Services</a>
          <a href="#">Latest Posts</a>
          <a href="#">FAQs</a>
        </div>
        <div className={styles["footer-part"]}>
          <h3>SOCIAL MEDIA</h3>
          <a href="#">Twitter X</a>
          <a href="#">Instagram</a>
          <a href="#">Facebook</a>
          <a href="#">Pinterest</a>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
