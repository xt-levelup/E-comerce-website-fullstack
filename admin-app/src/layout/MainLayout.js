import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import styles from "./MainLayout.module.css";
import { authSliceActions } from "../store/authSlice";

// --- LAYOUT TỔNG CỦA TRANG DÀNH CHO KHÁCH HÀNG ---------------

const MainLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useSelector((state) => {
    return state.authSlice.auth;
  });
  const localStorageData = useSelector((state) => {
    return state.authSlice.localStorageData;
  });
  const [menuList, setMenuList] = useState([
    "Chat Room",
    "Product Page",
    "Add Product",
    "Edit Product",
    "Users",
  ]);
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const [downClick, setDownClick] = useState(false);

  // useEffect(()=>{
  //   const
  // },[]);

  useEffect(() => {
    if (location.pathname === "/") {
      setCurrentPage("Dashboard");
    } else if (location.pathname === "/chat") {
      setCurrentPage("Chat Room");
    } else if (location.pathname === "/chat") {
      setCurrentPage("Chat Room");
    } else if (location.pathname === "/product") {
      setCurrentPage("Product Page");
    } else if (location.pathname === "/add-product") {
      setCurrentPage("Add Product");
    } else if (location.pathname === "/users-page") {
      setCurrentPage("Users");
    } else if (location.pathname === "/login") {
      setCurrentPage("Login Page");
    } else if (location.pathname === "/register") {
      setCurrentPage("Register Page");
    } else {
      setCurrentPage("Edit Product");
    }
  }, [location]);

  useEffect(() => {
    const menuFullList = [
      "Dashboard",
      "Chat Room",
      "Product Page",
      "Add Product",
      "Users",
    ];
    if (currentPage) {
      const newMenuList = menuFullList.filter((item) => {
        return item !== currentPage;
      });
      setMenuList(newMenuList);
    }
  }, [currentPage]);

  const downButtonHandle = () => {
    setDownClick(!downClick);
  };

  const clickListItemHandle = (event) => {
    if (event.target.textContent === "Dashboard") {
      setCurrentPage(event.target.textContent);
      setDownClick(false);
      navigate("/");
    } else if (event.target.textContent === "Chat Room") {
      setCurrentPage(event.target.textContent);
      setDownClick(false);
      navigate("/chat");
    } else if (event.target.textContent === "Product Page") {
      setCurrentPage(event.target.textContent);
      setDownClick(false);
      navigate("/product");
    } else if (event.target.textContent === "Add Product") {
      setCurrentPage(event.target.textContent);
      setDownClick(false);
      navigate("/add-product");
    } else if (event.target.textContent === "Users") {
      setCurrentPage(event.target.textContent);
      setDownClick(false);
      navigate("/users-page");
    }
  };

  // --- Chức năng logout ----------------------------------
  const logoutHandle = () => {
    localStorage.removeItem("userData");
    dispatch(authSliceActions.localStorageDataUpdate(null));
    dispatch(authSliceActions.authUpdate(false));
  };
  // -------------------------------------------------------

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
            <NavLink
              to="/users-page"
              className={({ isActive }) => {
                return isActive ? styles.active : undefined;
              }}
            >
              Users
            </NavLink>
            <div className={styles["media-under-800"]}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "1em",
                }}
              >
                <h3>{currentPage}</h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                  width="24px"
                  height="24px"
                  style={{ cursor: "pointer" }}
                  onClick={downButtonHandle}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25"
                  />
                </svg>
              </div>
              {downClick && (
                <div className={styles["menu-list"]}>
                  {menuList &&
                    Array.isArray(menuList) &&
                    menuList.length > 0 &&
                    menuList.map((item) => {
                      return (
                        <p
                          key={item}
                          style={{ cursor: "pointer" }}
                          onClick={clickListItemHandle}
                        >
                          {item}
                        </p>
                      );
                    })}
                </div>
              )}
            </div>
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
