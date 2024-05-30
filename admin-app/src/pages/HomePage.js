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
    console.log("localStorageData:", localStorageData);
  }, [localStorageData]);
  useEffect(() => {
    console.log("usersData:", usersData);
  }, [usersData]);
  useEffect(() => {
    console.log("errorMessage:", errorMessage);
  }, [errorMessage]);

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
            <div>Icon User</div>
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
                  44.779.000
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
                {usersData && usersData.orders.slice(0, 6).length}
              </p>
              <p>New Order</p>
            </div>
            <div>Icon</div>
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
            <div className={styles.row}>
              <p>ID User</p>
              <p style={{ borderLeft: "none" }}>Name</p>
              <p style={{ borderLeft: "none" }}>Phone</p>
              <p style={{ borderLeft: "none" }}>Address</p>
              <p style={{ borderLeft: "none" }}>Total</p>
              <p style={{ borderLeft: "none" }}>Delivery</p>
              <p style={{ borderLeft: "none" }}>Status</p>
              <p style={{ borderLeft: "none" }}>Detail</p>
            </div>
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
