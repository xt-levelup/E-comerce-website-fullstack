import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import styles from "./HistoryPage.module.css";
import { authSliceActions } from "../store/auth";

const HistoryPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const errorMessage = useSelector((state) => {
    return state.authSlice.errorMessage;
  });
  const author = useSelector((state) => {
    return state.authSlice.author;
  });

  const [orders, setOrders] = useState([]);
  const [errorHistory, setErrorHistory] = useState(null);

  useEffect(() => {
    try {
      getOrder();
    } catch (err) {
      dispatch(
        authSliceActions.errorMessageUpdate(
          "Cannot get your orders! Maybe your internet is lost!"
        )
      );
    }
  }, []);

  const getOrder = async () => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    const token = localStorageData && localStorageData.token;
    const urlServer = "http://localhost:5000/getOrder";
    const response = await fetch(urlServer, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const data = await response.json();
    console.log("data getOrder:", data);
    if (!response.ok) {
      if (
        (data && data.message === "Wrong token!") ||
        (data && data.message === "jwt expired") ||
        (data && data.message === "jwt malformed")
      ) {
        dispatch(authSliceActions.errorMessageUpdate("Please login again!"));
        localStorage.removeItem("user");
        dispatch(authSliceActions.authorUpdate(null));
      } else {
        setErrorHistory(
          data && data.message
            ? data.message
            : data && data.msg
            ? data.msg
            : "Cannot get data now! Maybe you lost internet!"
        );
      }
    } else {
      dispatch(authSliceActions.errorMessageUpdate(null));
      setErrorHistory(null);
      const newData = data.slice().sort((a, b) => {
        return b.orderDate.localeCompare(a.orderDate);
      });
      console.log("newData:", newData);
      setOrders(newData);
    }
  };

  const viewHandle = (orderId) => {
    navigate(`/history-detail/${orderId}`);
  };

  useEffect(() => {
    console.log("errorMessage:", errorMessage);
  }, [errorMessage]);
  useEffect(() => {
    console.log("errorHistory:", errorHistory);
  }, [errorHistory]);
  useEffect(() => {
    console.log("orders:", orders);
  }, [orders]);
  useEffect(() => {
    console.log("author:", author);
  }, [author]);

  return (
    <div className={styles.contain}>
      <Helmet>
        <title>History Page</title>
      </Helmet>
      <div className={styles.banner}>
        <h1>History</h1>
        <h3>History</h3>
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles["header-max-1999"]}>ID Order</div>
          <div className={styles["max-1999-remove-header"]}>ID User</div>
          <div className={styles["max-1999-remove-header"]}>Name</div>
          <div className={styles["max-1999-remove-header"]}>Phone</div>
          <div className={styles["max-1999-remove-header"]}>Address</div>
          <div className={styles["header-max-1999"]}>Total</div>
          <div className={styles["header-max-1999"]}>Delevery</div>
          <div className={styles["header-max-1999"]}>Status</div>
          <div className={styles["header-max-1999"]}>Detail</div>
        </div>
        {author &&
          orders &&
          orders.length > 0 &&
          orders.map((order) => {
            return (
              <div key={order._id} className={styles.list}>
                <div className={styles["list-max-1999"]}>
                  <span>Order ID: </span>
                  {order._id}
                </div>
                <div className={styles["max-1999-remove"]}>
                  <span>Order User: </span>
                  {order.userId}
                </div>
                <div className={styles["max-1999-remove"]}>
                  <span>Name: </span>
                  {order.order.name}
                </div>
                <div className={styles["max-1999-remove"]}>
                  <span>Phone: </span>
                  {order.order.phone}
                </div>
                <div className={styles["max-1999-remove"]}>
                  <span>Address: </span>
                  {order.order.address}
                </div>
                <div className={styles["list-max-1999"]}>
                  <span>Order Price: </span>
                  {order.order.orderPrice.toLocaleString("vi-VN")} VND
                </div>
                <div className={styles["list-max-1999"]}>
                  <span>Shipping: </span>Waiting for progressing
                </div>
                <div className={styles["list-max-1999"]}>
                  <span>Payment: </span>Waiting for pay
                </div>
                <button onClick={() => viewHandle(order._id)}>
                  <p>View</p>
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
                      d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                    />
                  </svg>
                </button>
              </div>
            );
          })}
      </div>
      {errorMessage && errorMessage === "Please login again!" && (
        <p style={{ color: "red", fontWeight: "600", textAlign: "center" }}>
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default HistoryPage;
