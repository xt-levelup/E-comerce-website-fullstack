import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./HomePage.module.css";
import { authSliceActions } from "../store/authSlice";

const HomePage = () => {
  const dispatch = useDispatch();

  const localStorageData = useSelector((state) => {
    return state.authSlice.localStorageData;
  });
  const errorMessage = useSelector((state) => {
    return state.authSlice.errorMessage;
  });

  const [usersData, setUsersData] = useState(null);
  const [earningOfMonth, setEarningOfMonth] = useState(0);
  const [ordersOfMonth, setOrdersOfMonth] = useState(0);
  const [newestOrders, setNewestOrders] = useState(null);

  useEffect(() => {
    dispatch(
      authSliceActions.localStorageDataUpdate(
        JSON.parse(localStorage.getItem("userData"))
      )
    );
  }, []);

  const getUsers = async () => {
    const urlServer = "http://localhost:5000/getUsers";
    const token = localStorageData && localStorageData.token;
    const response = await fetch(urlServer, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      dispatch(
        authSliceActions.errorMessageUpdate(
          (data && data.message === "jwt malformed") ||
            (data && data.message === "jwt expired")
            ? "Login again to access data!"
            : data && data.message
            ? data.message
            : data && data.msg
            ? data.msg
            : "Cannot get users now! Please try again later!"
        )
      );
    } else {
      setUsersData(data);
      dispatch(authSliceActions.errorMessageUpdate(null));
    }
  };

  useEffect(() => {
    try {
      getUsers();
    } catch (err) {
      dispatch(authSliceActions.errorMessageUpdate(err.message));
    }
  }, []);

  useEffect(() => {
    const now = new Date();
    const monthNow = now.getMonth();
    // console.log("now:", now);
    // console.log("monthNow:", monthNow);

    const dataThisMonth =
      usersData &&
      usersData.orders &&
      Array.isArray(usersData.orders) &&
      usersData.orders.filter((order) => {
        const newOrderDay = new Date(order.orderDate);
        // console.log("newOrderDate.getMonth():", newOrderDay.getMonth());
        return newOrderDay.getMonth() === monthNow;
      });
    // console.log("dataThisMonth:", dataThisMonth);
    const sumEarningData =
      dataThisMonth &&
      Array.isArray(dataThisMonth) &&
      dataThisMonth
        .map((data) => {
          return data.order.orderPrice;
        })
        .reduce((acc, current) => {
          return acc + current;
        }, 0);
    // console.log("sumEarningData:", sumEarningData);
    setEarningOfMonth(sumEarningData);

    const newOrders =
      dataThisMonth && Array.isArray(dataThisMonth) && dataThisMonth.length;
    console.log("newOrders:", newOrders);
    setOrdersOfMonth(newOrders);

    const newestOrderData =
      usersData &&
      usersData.orders &&
      Array.isArray(usersData.orders) &&
      usersData.orders
        .slice()
        .sort((a, b) => {
          return b.orderDate.localeCompare(a.orderDate);
        })
        .slice(0, 10);

    // console.log("newestOrderData:", newestOrderData);
    setNewestOrders(newestOrderData);
  }, [usersData]);

  useEffect(() => {
    console.log("localStorageData:", localStorageData);
  }, [localStorageData]);
  useEffect(() => {
    console.log("usersData:", usersData);
  }, [usersData]);
  useEffect(() => {
    console.log("errorMessage:", errorMessage);
  }, [errorMessage]);
  useEffect(() => {
    console.log("earningOfMonth:", earningOfMonth);
  }, [earningOfMonth]);
  useEffect(() => {
    console.log("ordersOfMonth:", ordersOfMonth);
  }, [ordersOfMonth]);
  useEffect(() => {
    console.log("newestOrders:", newestOrders);
  }, [newestOrders]);

  return (
    <div className={styles.contain}>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <h2>Dashboard</h2>
      {!errorMessage && (
        <div className={styles.upon}>
          <div className={styles["upon-part"]}>
            <div>
              <p
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              >
                {usersData &&
                  usersData.users.filter((user) => {
                    return user.userType === "normal";
                  }).length}
              </p>
              <p>Clients</p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
              width="24px"
              height="24px"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
              />
            </svg>
          </div>
          <div className={styles["upon-part"]}>
            <div>
              <div style={{ display: "flex" }}>
                <p
                  style={{
                    paddingRight: "0 ",
                    fontSize: "24px",
                    fontWeight: "bold",
                  }}
                >
                  {earningOfMonth && earningOfMonth.toLocaleString("vi-VN")}
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    paddingLeft: "0",
                    fontWeight: "bold",
                  }}
                >
                  VND
                </p>
              </div>
              <p>Earns Of Month</p>
            </div>
            <div>
              <p>$</p>
            </div>
          </div>
          <div className={styles["upon-part"]}>
            <div>
              <p
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              >
                {ordersOfMonth && ordersOfMonth}
              </p>
              <p>New Order</p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
              width="24px"
              height="24px"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
              />
            </svg>
          </div>
        </div>
      )}
      {!errorMessage && (
        <div className={styles.bottom}>
          <h4>History</h4>
          <div className={styles["history-show"]}>
            <div className={styles.row}>
              <h5>ID User</h5>
              <h5 style={{ borderLeft: "none" }}>Name</h5>
              <h5 style={{ borderLeft: "none" }}>Phone</h5>
              <h5 style={{ borderLeft: "none" }}>Address</h5>
              <h5 style={{ borderLeft: "none" }}>Total</h5>
              <h5 style={{ borderLeft: "none" }}>Delivery</h5>
              <h5 style={{ borderLeft: "none" }}>Status</h5>
              <h5 style={{ borderLeft: "none" }}>Detail</h5>
            </div>
            {newestOrders &&
              Array.isArray(newestOrders) &&
              newestOrders.length > 0 &&
              newestOrders.map((order) => {
                return (
                  <div key={order._id} className={styles["list-orders"]}>
                    <p>{order.userId}</p>
                    <p style={{ borderLeft: "none" }}>{order.order.name}</p>
                    <p style={{ borderLeft: "none" }}>{order.order.phone}</p>
                    <p style={{ borderLeft: "none" }}>{order.order.address}</p>
                    <p style={{ borderLeft: "none" }}>
                      {order.order.orderPrice}
                    </p>
                    <p style={{ borderLeft: "none" }}>Not shipping yet</p>
                    <p style={{ borderLeft: "none" }}>Not pay yet</p>
                    <p style={{ borderLeft: "none" }}>
                      <button>View</button>
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      )}
      {errorMessage && (
        <p
          style={{
            color: "red",
            fontWeight: "600",
            textAlign: "center",
            border: "none",
          }}
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default HomePage;
