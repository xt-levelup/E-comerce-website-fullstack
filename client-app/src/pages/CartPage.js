import { Helmet } from "react-helmet";
import styles from "./CartPage.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import { authSliceActions } from "../store/auth";
import { fetchProductsSliceActions } from "../store/fetchProductsSlice";

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const author = useSelector((state) => {
    return state.authSlice.author;
  });
  const errorMessage = useSelector((state) => {
    return state.authSlice.errorMessage;
  });
  const productData = useSelector((state) => {
    return state.fetchProductsSlice.productData;
  });

  const [cartData, setCartData] = useState(null);
  const [cartToView, setCartToView] = useState(null);

  useEffect(() => {
    dispatch(fetchProductsSliceActions());
    getCartHandle();
  }, []);

  const getCartHandle = async () => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    const token = localStorageData && localStorageData.token;
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
      dispatch(
        authSliceActions.errorMessageUpdate(
          data && data.message
            ? data.message
            : data && data.msg
            ? data.msg
            : "Cannot get data now! Maybe you lost internet!"
        )
      );
    } else {
      dispatch(authSliceActions.errorMessageUpdate(null));
      setCartData(data);
    }
  };

  useEffect(() => {
    if (cartData && productData) {
      const getData = cartData.cart.items.map((item) => {
        const prodId = item.productId;
        const productFilter = productData.find((product) => {
          return product._id === prodId;
        });
        return { product: productFilter, item };
      });
      console.log("getData:", getData);
      setCartToView(getData);
    }
  }, [productData, cartData]);

  const goToShopping = () => {
    navigate("/shop");
  };
  const goToCheckout = () => {
    navigate("/checkout");
  };

  useEffect(() => {
    console.log("productData:", productData);
  }, [productData]);
  useEffect(() => {
    console.log("errorMessage:", errorMessage);
  }, [errorMessage]);
  useEffect(() => {
    console.log("cartData:", cartData);
  }, [cartData]);

  return (
    <div className={styles.contain}>
      <Helmet>
        <title>Cart Page</title>
      </Helmet>
      <div className={styles.banner}>
        <h1>CART</h1>
        <h3>CART</h3>
      </div>
      <div className={styles.cart}>
        <h2>SHOPPING CART</h2>
        <div className={styles.detail}>
          <div className={styles.list}>
            <div
              className={styles["list-items"]}
              style={{ backgroundColor: "rgb(220 220 220)", padding: "1em" }}
            >
              <h4 style={{ textAlign: "center" }}>IMAGE</h4>
              <h4 style={{ textAlign: "center" }}>PRODUCT</h4>
              <h4 style={{ textAlign: "center" }}>PRICE</h4>
              <h4 style={{ textAlign: "center" }}>QUANTITY</h4>
              <h4 style={{ textAlign: "center" }}>TOTAL</h4>
              <h4 style={{ textAlign: "center" }}>REMOVE</h4>
            </div>
            {cartToView &&
              cartToView.length > 0 &&
              cartToView.map((product) => {
                return (
                  <div key={product.item._id} className={styles["list-items"]}>
                    <div style={{}}>
                      <img
                        src={`http://localhost:5000/${product.product.imageUrls[0]}`}
                      />
                    </div>
                    <h4 style={{ textAlign: "center" }}>
                      {product.product.name}
                    </h4>
                    <p style={{ textAlign: "center" }}>
                      {product.product.price.toLocaleString("vi-VN")} VND
                    </p>
                    <p style={{ textAlign: "center" }}>
                      {product.item.quantity}
                    </p>
                    <p style={{ textAlign: "center" }}>
                      {(
                        product.product.price * product.item.quantity
                      ).toLocaleString("vi-VN")}{" "}
                      VND
                    </p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
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
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </div>
                  </div>
                );
              })}

            <div className={styles.nav}>
              <div onClick={goToShopping}>
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
                    d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
                  />
                </svg>

                <p>Continue shopping</p>
              </div>
              <button onClick={goToCheckout}>
                <p>Proceed to checkout</p>
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
          </div>
          <div className={styles.total}>
            <h2>CART TOTAL</h2>
            <div className={styles["total-price"]}>
              <div>
                <h4>SUBTOTAL</h4>
                <p>199.999.999</p>
              </div>
              <hr />
              <div>
                <h4>TOTAL</h4>
                <p>199.999.999</p>
              </div>
            </div>
            <div className={styles.coupon}>
              <input type="text" placeholder="Enter your coupon!" />
              <button>
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
                    d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                  />
                </svg>
                <p>Apply coupon</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
