import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import styles from "./MainLayout.module.css";
import { authSliceActions } from "../store/auth";

const MainLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const author = useSelector((state) => {
    return state.authSlice.author;
  });

  const [emailName, setEmailName] = useState(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    dispatch(
      authSliceActions.authorUpdate(JSON.parse(localStorage.getItem("user")))
    );
  }, []);

  useEffect(() => {
    setEmailName(author && author.email.split("@")[0].slice(0, 6).trim());
  }, [author]);

  const logoutHandle = () => {
    localStorage.removeItem("user");
    dispatch(authSliceActions.authorUpdate(null));
  };

  const showMoreHandle = () => {
    setShowMore(!showMore);
  };

  const toCartHandle = () => {
    navigate("/cart");
    setShowMore(false);
  };
  const toHistoryHandle = () => {
    navigate("/history");
    setShowMore(false);
  };

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
          </div>
          <div className={styles.boutique}>
            <h2>BOUTIQUE</h2>
          </div>
          <div className={styles.right}>
            {author && (
              <div className={styles["max-600"]}>
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
              </div>
            )}
            {author && (
              <div className={styles["max-600"]}>
                <NavLink
                  to="/history"
                  className={({ isActive }) => {
                    return isActive ? styles.active : undefined;
                  }}
                >
                  <span className={styles.icon}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                      />
                    </svg>
                    History
                  </span>
                </NavLink>
              </div>
            )}
            {!author && (
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
            )}
            {!author && (
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
            )}
            {author && <h3 className={styles["max-600"]}>{emailName}</h3>}
            {author && (
              <div className={styles["show-max-600"]}>
                <h3
                  onClick={showMoreHandle}
                  style={{ display: "flex", alignItems: "center", gap: "3px" }}
                >
                  {emailName}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                    width="18px"
                    height="18px"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>

                  {showMore && (
                    <div className={styles["show-more"]}>
                      <p onClick={toCartHandle}>Cart</p>
                      <p onClick={toHistoryHandle}>History</p>
                    </div>
                  )}
                </h3>
              </div>
            )}
            {author && (
              <button type="button" onClick={logoutHandle}>
                Logout
              </button>
            )}
          </div>
        </nav>
      </div>
      <div>
        <Outlet />
      </div>
      <div className={styles.footer}>
        <div className={styles["footer-part"]}>
          <h3>CUSTOMER SERVICES</h3>
          <div className={styles["footer-link"]}>
            <a href="#">Help & Contact Us</a>
            <a href="#">Returns & Refunds</a>
            <a href="#">Online Stores</a>
            <a href="#">Terms & Conditions</a>
          </div>
        </div>
        <div className={styles["footer-part"]}>
          <h3>COMPANY</h3>
          <div className={styles["footer-link"]}>
            <a href="#">What We Do</a>
            <a href="#">Available Services</a>
            <a href="#">Latest Posts</a>
            <a href="#">FAQs</a>
          </div>
        </div>
        <div className={styles["footer-part"]}>
          <h3>SOCIAL MEDIA</h3>
          <div className={styles["footer-link"]}>
            <a href="#">Twitter X</a>
            <a href="#">Instagram</a>
            <a href="#">Facebook</a>
            <a href="#">Pinterest</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
