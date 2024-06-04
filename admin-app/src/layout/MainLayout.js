import { Outlet, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import styles from "./MainLayout.module.css";
import { authSliceActions } from "../store/authSlice";

const MainLayout = () => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => {
    return state.authSlice.auth;
  });
  const localStorageData = useSelector((state) => {
    return state.authSlice.localStorageData;
  });

  const logoutHandle = () => {
    localStorage.removeItem("userData");
    dispatch(authSliceActions.localStorageDataUpdate(null));
    dispatch(authSliceActions.authUpdate(false));
  };

  useEffect(() => {
    console.log("auth:", auth);
  }, [auth]);
  useEffect(() => {
    console.log("localStorageData:", localStorageData);
  }, [localStorageData]);
  return (
    <div className={styles.contain}>
      <div className={styles.nav}>
        <nav>
          <div className={styles["nav-left"]}>
            <NavLink
              to="/"
              className={({ isActive }) => {
                return isActive ? styles.active : undefined;
              }}
              end
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/chat"
              className={({ isActive }) => {
                return isActive ? styles.active : undefined;
              }}
            >
              Chat Room
            </NavLink>
            <NavLink
              to="/product"
              className={({ isActive }) => {
                return isActive ? styles.active : undefined;
              }}
            >
              Product Page
            </NavLink>
            <NavLink
              to="/add-product"
              className={({ isActive }) => {
                return isActive ? styles.active : undefined;
              }}
            >
              Add Product
            </NavLink>
          </div>
          {!auth && (
            <div className={styles["nav-right"]}>
              <NavLink
                to="/login"
                className={({ isActive }) => {
                  return isActive ? styles.active : undefined;
                }}
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className={({ isActive }) => {
                  return isActive ? styles.active : undefined;
                }}
              >
                Signup
              </NavLink>
            </div>
          )}
          {auth && (
            <div className={styles["nav-right"]}>
              <p style={{ color: "blue", fontWeight: "600", border: "none" }}>
                {localStorageData && localStorageData.email}
              </p>
              <button
                style={{
                  backgroundColor: "red",
                  color: "white",
                  width: "72px",
                  height: "36px",
                  border: "none",
                  borderRadius: "3px",
                  cursor: "pointer",
                }}
                onClick={logoutHandle}
              >
                Logout
              </button>
            </div>
          )}
        </nav>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
