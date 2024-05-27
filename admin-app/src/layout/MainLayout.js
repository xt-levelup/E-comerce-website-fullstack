import { Outlet, NavLink } from "react-router-dom";

import styles from "./MainLayout.module.css";

const MainLayout = () => {
  return (
    <div className={styles.contain}>
      <div className={styles.nav}>
        <nav>
          <div>
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
          <div>
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
        </nav>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
