import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./HistoryDetail.module.css";
import { authSliceActions } from "../store/auth";

const HistoryDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const errorMessage = useSelector((state) => {
    return state.authSlice.errorMessage;
  });

  const orderId = params.orderId;

  const [orderDetail, setOrderDetail] = useState(null);
  const [errorHistoryDetail, setErrorHistoryDetail] = useState(null);

  useEffect(() => {
    try {
      getOrderDetail();
    } catch (err) {
      dispatch(
        authSliceActions.errorMessageUpdate(
          "Cannot get data now! Please try again later!"
        )
      );
    }
  }, []);

  const getOrderDetail = async () => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    const token = localStorageData && localStorageData.token;
    const urlServer = "http://localhost:5000/orderDetail";
    const response = await fetch(urlServer, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        orderId: orderId,
      }),
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
        setErrorHistoryDetail(
          data && data.message
            ? data.message
            : data && data.msg
            ? data.msg
            : "Cannot get data now! Maybe you lost internet!"
        );
      }
    } else {
      dispatch(authSliceActions.errorMessageUpdate(null));
      setErrorHistoryDetail(null);
      setOrderDetail(data);
    }
  };

  console.log("orderId:", orderId);
  useEffect(() => {
    console.log("orderDetail:", orderDetail);
  }, [orderDetail]);

  return (
    <div className={styles.contain}>
      <Helmet>
        <title>History Detail Page</title>
      </Helmet>
      <div className={styles.banner}>
        <h1>History Detail</h1>
        <h3>History Detail</h3>
      </div>
      {!errorMessage && (
        <div>
          <div style={{ margin: "0 3em 3em 3em" }}>
            <h2>INFORMATION ORDER</h2>
            <div>
              <p>ID User: {orderDetail && orderDetail.userId}</p>
              <p>Full name: {orderDetail && orderDetail.order.name}</p>
              <p>Phone: {orderDetail && orderDetail.order.phone}</p>
              <p>Address: {orderDetail && orderDetail.order.address}</p>
              <p>
                Total:
                {orderDetail &&
                  orderDetail.order.orderPrice.toLocaleString("vi-VN")}{" "}
                VND
              </p>
            </div>
          </div>
          <div>
            <div className={styles.header}>
              <div>ID RPODUCT</div>
              <div>IMAGE</div>
              <div>NAME</div>
              <div>PRICE</div>
              <div>COUNT</div>
            </div>
            {orderDetail &&
              orderDetail.order.orderItems.length > 0 &&
              orderDetail.order.orderItems.map((prod) => {
                return (
                  <div className={styles.list}>
                    <div>{prod.currentProd._id}</div>
                    <div>
                      <img
                        src={`http://localhost:5000/${prod.currentProd.imageUrls[0]}`}
                      />
                    </div>
                    <div>{prod.currentProd.name}</div>
                    <div>
                      {prod.currentProd.price.toLocaleString("vi-VN")} VND
                    </div>
                    <div>{prod.quantity}</div>
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
            fontSize: "18px",
            textAlign: "center",
          }}
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default HistoryDetail;
