import { Helmet } from "react-helmet";
import styles from "./CheckoutPage.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { authSliceActions } from "../store/auth";
import { fetchProductsSliceActions } from "../store/fetchProductsSlice";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productData = useSelector((state) => {
    return state.fetchProductsSlice.productData;
  });
  const auth = useSelector((state) => {
    return state.authSlice.auth;
  });
  const errorMessage = useSelector((state) => {
    return state.authSlice.errorMessage;
  });

  const [cartData, setCartData] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [total, setTotal] = useState(null);
  const [order, setOrder] = useState(null);
  const [orderMessage, setOrderMessage] = useState(null);

  useEffect(() => {
    dispatch(
      authSliceActions.authorUpdate(JSON.parse(localStorage.getItem("user")))
    );
    try {
      dispatch(fetchProductsSliceActions());
      getCart();
    } catch (err) {
      dispatch(
        authSliceActions.errorMessageUpdate(
          "Cannot get server data! Please try again later!"
        )
      );
    }
  }, []);

  useEffect(() => {
    setName(cartData ? cartData.name : "");
    setEmail(cartData ? cartData.email : "");
  }, [cartData]);

  const getCart = async () => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    const token = localStorageData && localStorageData.token;
    console.log("token:", token);
    const urlServer = "http://localhost:5000/getCart";
    const response = await fetch(urlServer, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const data = await response.json();
    console.log("data getCartHandle:", data);
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
        dispatch(
          authSliceActions.errorMessageUpdate(
            data && data.message
              ? data.message
              : data && data.msg
              ? data.msg
              : "Cannot get data now! Maybe you lost internet!"
          )
        );
      }
    } else {
      dispatch(authSliceActions.errorMessageUpdate(null));
      setCartData(data);
    }
  };

  const emailHandle = (event) => {
    setEmail(event.target.value);
  };
  const nameHandle = (event) => {
    setName(event.target.value);
  };
  const phoneHandle = (event) => {
    setPhone(event.target.value);
  };
  const addressHandle = (event) => {
    setAddress(event.target.value);
  };

  const toHome = () => {
    navigate("/");
  };
  const toCart = () => {
    navigate("/cart");
  };

  const convertToProductName = (productId) => {
    const currentProduct =
      productData &&
      productData.length > 0 &&
      productData.find((product) => {
        return product._id.toString() === productId.toString();
      });
    if (currentProduct) {
      return currentProduct.name;
    } else {
      return undefined;
    }
  };
  const convertToProductPrice = (productId, quantity) => {
    const currentProduct =
      productData &&
      productData.length > 0 &&
      productData.find((product) => {
        return product._id.toString() === productId.toString();
      });
    if (currentProduct) {
      return `${currentProduct.price.toLocaleString("vi-VN")} x ${quantity}`;
    } else {
      return null;
    }
  };

  const convertToTotal = () => {
    const newDataPriceTotal =
      cartData &&
      cartData.cart &&
      cartData.cart.items &&
      cartData.cart.items.length > 0 &&
      cartData.cart.items.map((item) => {
        const currentProd =
          productData &&
          productData.length > 0 &&
          productData.find((prod) => {
            return prod._id.toString() === item.productId.toString();
          });
        console.log("currentProd:", currentProd);
        if (!currentProd) {
          return null;
        }
        return item.quantity * currentProd.price;
      });
    console.log("newDataPriceTotal:", newDataPriceTotal);
    setTotal(
      newDataPriceTotal &&
        newDataPriceTotal.reduce((acc, current) => {
          return acc + current;
        }, 0)
    );

    const newData =
      cartData &&
      cartData.cart &&
      cartData.cart.items &&
      cartData.cart.items.length > 0 &&
      cartData.cart.items.map((item) => {
        const currentProd =
          productData &&
          productData.length > 0 &&
          productData.find((prod) => {
            return prod._id.toString() === item.productId.toString();
          });
        console.log("currentProd:", currentProd);
        if (!currentProd) {
          return null;
        }
        return {
          currentProd,
          quantity: item.quantity,
          totalPrice: currentProd.price * item.quantity,
        };
      });
    console.log("newData:", newData);
    setOrder({
      orderItems: newData,
      orderPrice:
        newDataPriceTotal &&
        newDataPriceTotal.reduce((acc, current) => {
          return acc + current;
        }, 0),
      name,
      email,
      phone,
      address,
    });
  };

  useEffect(() => {
    convertToTotal();
  }, [cartData, productData, name, email, phone, address]);

  const orderHandle = async () => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    const token = localStorageData && localStorageData.token;
    const urlServer = "http://localhost:5000/userOrder";
    const response = await fetch(urlServer, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        order: order,
      }),
    });
    const data = await response.json();
    console.log("data orderHandle:", data);
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
        dispatch(
          authSliceActions.errorMessageUpdate(
            data && data.message
              ? data.message
              : data && data.msg
              ? data.msg
              : "Cannot order now! Maybe you lost internet!"
          )
        );
      }
    } else {
      dispatch(authSliceActions.errorMessageUpdate(null));
      dispatch(authSliceActions.cartToViewUpdate([]));
      getCart();
    }
  };

  const placeOrderButton = () => {
    try {
      orderHandle();
    } catch (err) {
      dispatch(
        authSliceActions.errorMessageUpdate(
          "Cannot order now! Please try again later!"
        )
      );
    }
  };

  useEffect(() => {
    console.log("errorMessage:", errorMessage);
  }, [errorMessage]);
  useEffect(() => {
    console.log("productData:", productData);
  }, [productData]);
  // useEffect(() => {
  //   console.log("auth:", auth);
  // }, [auth]);

  useEffect(() => {
    console.log("cartData:", cartData);
  }, [cartData]);
  useEffect(() => {
    console.log("order:", order);
  }, [order]);
  return (
    <div className={styles.contain}>
      <Helmet>
        <title>Checkout Page</title>
      </Helmet>
      <div className={styles.banner}>
        <h1>CHECKOUT</h1>
        <div>
          <p onClick={toHome}>HOME</p>
          <p>/</p>
          <p onClick={toCart}>CART</p>
          <p>/</p>
          <h3>CHECKOUT</h3>
        </div>
      </div>
      {!errorMessage && (
        <div className={styles.billing}>
          <div className={styles["billing-contain"]}>
            <h3>BILLING DETAILS</h3>

            <div className={styles.information}>
              <div>
                <label>FULL NAME</label>
                <input
                  type="text"
                  placeholder="Enter Your Full Name Here!"
                  value={name}
                  onChange={nameHandle}
                />
              </div>
              <div>
                <label>EMAIL</label>
                <input
                  type="text"
                  placeholder="Enter Your Email Here!"
                  value={email}
                  onChange={emailHandle}
                />
              </div>
              <div>
                <label>PHONE NUMBER</label>
                <input
                  type="number"
                  placeholder="Enter Your Phone Number Here!"
                  value={phone}
                  onChange={phoneHandle}
                />
              </div>
              <div>
                <label>ADDRESS</label>
                <input
                  type="text"
                  placeholder="Enter Your Address Here!"
                  value={address}
                  onChange={addressHandle}
                />
              </div>
              <button type="button" onClick={placeOrderButton}>
                Place order
              </button>
            </div>
          </div>
          <div className={styles["order-contain"]}>
            <div className={styles.order}>
              <h3>YOUR ORDER</h3>
              <div>
                {cartData &&
                  cartData.cart &&
                  cartData.cart.items.length > 0 &&
                  cartData.cart.items.map((item) => {
                    return (
                      <div key={item._id}>
                        <div className={styles["order-item"]}>
                          <h5>{convertToProductName(item.productId)}</h5>
                          <p style={{ textAlign: "end" }}>
                            {convertToProductPrice(
                              item.productId,
                              item.quantity
                            )}
                          </p>
                        </div>
                        <hr />
                      </div>
                    );
                  })}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <h4>TOTAL</h4>
                  <span style={{ fontSize: "18px" }}>
                    {total && total.toLocaleString("vi-VN")} VND
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {errorMessage && (
        <p
          style={{
            color: "red",
            textAlign: "center",
            fontWeight: "600",
            fontSize: "18px",
          }}
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default CheckoutPage;
