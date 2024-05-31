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
  const cartToView = useSelector((state) => {
    return state.authSlice.cartToView;
  });
  const errorMessage = useSelector((state) => {
    return state.authSlice.errorMessage;
  });
  const productData = useSelector((state) => {
    return state.fetchProductsSlice.productData;
  });

  const [cartData, setCartData] = useState(null);
  // const [cartToView, setCartToView] = useState(null);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [viewsReturn, setViewsReturn] = useState(null);

  // const [initQuantity, setInitQuantity] = useState(null);
  // const []

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
      dispatch(
        authSliceActions.cartToViewUpdate(
          getData.slice().sort((a, b) => {
            return a.product.name.localeCompare(b.product.name);
          })
        )
      );
    }
  }, [productData, cartData]);

  const goToShopping = () => {
    updateCartHandle();
    navigate("/shop");
  };
  const goToCheckout = () => {
    updateCartHandle();
    navigate("/checkout");
  };

  const nextHandle = (productId) => {
    const currentProduct =
      cartToView &&
      cartToView.find((product) => {
        return product.item._id === productId;
      });
    // console.log("currentProduct:", currentProduct);

    if (currentProduct && currentProduct.item.quantity > 0) {
      // console.log("currentProduct:", currentProduct);
      const newQuantity = currentProduct.item.quantity + 1;
      // console.log(newQuantity);
      const newItem = { ...currentProduct.item, quantity: newQuantity };
      // console.log("newItem:", newItem);
      const newCurrentProduct = { ...currentProduct, item: newItem };
      // console.log("newCurrentProduct:", newCurrentProduct);

      // console.log("productId:", productId);
      // console.log("cartToView:", cartToView);
      const cartToViewFilter = cartToView.filter((prod) => {
        return prod.item._id !== productId;
      });
      // console.log("cartoViewFilter:", cartToViewFilter);
      const newCartToView = [...cartToViewFilter, newCurrentProduct];
      // console.log("newCartToView:", newCartToView);
      const newCartToViewSort = newCartToView.slice().sort((a, b) => {
        return a.product.name.localeCompare(b.product.name);
      });
      dispatch(authSliceActions.cartToViewUpdate(newCartToViewSort));
    } else if (currentProduct && currentProduct.item.quantity < 0) {
      // console.log("currentProduct:", currentProduct);
      const newQuantity = 1;
      // console.log(newQuantity);
      const newItem = { ...currentProduct.item, quantity: newQuantity };
      // console.log("newItem:", newItem);
      const newCurrentProduct = { ...currentProduct, item: newItem };
      // console.log("newCurrentProduct:", newCurrentProduct);

      // console.log("productId:", productId);
      // console.log("cartToView:", cartToView);
      const cartToViewFilter = cartToView.filter((prod) => {
        return prod.item._id !== productId;
      });
      // console.log("cartoViewFilter:", cartToViewFilter);
      const newCartToView = [...cartToViewFilter, newCurrentProduct];
      // console.log("newCartToView:", newCartToView);
      const newCartToViewSort = newCartToView.slice().sort((a, b) => {
        return a.product.name.localeCompare(b.product.name);
      });
      dispatch(authSliceActions.cartToViewUpdate(newCartToViewSort));
    }
  };
  const prevHandle = (productId) => {
    const currentProduct =
      cartToView &&
      cartToView.find((product) => {
        return product.item._id === productId;
      });
    if (currentProduct && currentProduct.item.quantity > 1) {
      // console.log("currentProduct:", currentProduct);
      const newQuantity = currentProduct.item.quantity - 1;
      // console.log(newQuantity);
      const newItem = { ...currentProduct.item, quantity: newQuantity };
      // console.log("newItem:", newItem);
      const newCurrentProduct = { ...currentProduct, item: newItem };
      // console.log("newCurrentProduct:", newCurrentProduct);

      // console.log("productId:", productId);
      // console.log("cartToView:", cartToView);
      const cartToViewFilter = cartToView.filter((prod) => {
        return prod.item._id !== productId;
      });
      // console.log("cartoViewFilter:", cartToViewFilter);
      const newCartToView = [...cartToViewFilter, newCurrentProduct];
      // console.log("newCartToView:", newCartToView);
      const newCartToViewSort = newCartToView.slice().sort((a, b) => {
        return a.product.name.localeCompare(b.product.name);
      });
      dispatch(authSliceActions.cartToViewUpdate(newCartToViewSort));
    } else if (currentProduct && currentProduct.item.quantity < 0) {
      // console.log("currentProduct:", currentProduct);
      const newQuantity = 1;
      // console.log(newQuantity);
      const newItem = { ...currentProduct.item, quantity: newQuantity };
      // console.log("newItem:", newItem);
      const newCurrentProduct = { ...currentProduct, item: newItem };
      // console.log("newCurrentProduct:", newCurrentProduct);

      // console.log("productId:", productId);
      // console.log("cartToView:", cartToView);
      const cartToViewFilter = cartToView.filter((prod) => {
        return prod.item._id !== productId;
      });
      // console.log("cartoViewFilter:", cartToViewFilter);
      const newCartToView = [...cartToViewFilter, newCurrentProduct];
      // console.log("newCartToView:", newCartToView);
      const newCartToViewSort = newCartToView.slice().sort((a, b) => {
        return a.product.name.localeCompare(b.product.name);
      });
      dispatch(authSliceActions.cartToViewUpdate(newCartToViewSort));
    }
  };

  useEffect(() => {
    if (cartToView && cartToView.length > 0) {
      const listPriceTotal = cartToView.map((cart) => {
        return cart.item.quantity * cart.product.price;
      });
      console.log("listPriceTotal:", listPriceTotal);
      const totalPrice = listPriceTotal.reduce((accum, current) => {
        return accum + current;
      }, 0);
      setTotal(totalPrice);
      const newCartToView = cartToView.map((product) => {
        return product.item;
      });
      console.log("newCartToView:", newCartToView);
      setViewsReturn(newCartToView);
    }
  }, [cartToView]);

  const removeCartItemHandle = async (productId) => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    const token = localStorageData && localStorageData.token;
    const urlServer = "http://localhost:5000/removeCartItem";
    const response = await fetch(urlServer, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        productId: productId,
      }),
    });
    const data = await response.json();
    console.log("data removeCartItemHandle:", data);
    if (!response.ok) {
      dispatch(
        authSliceActions.errorMessageUpdate(
          data && data.message
            ? data.message
            : data && data.msg
            ? data.msg
            : "Cannot remove this item now! Maybe you lost internet!"
        )
      );
    } else {
      dispatch(authSliceActions.errorMessageUpdate(null));
      getCartHandle();
    }
  };

  const updateCartHandle = async () => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    const token = localStorageData && localStorageData.token;
    const urlServer = "http://localhost:5000/updateCart";
    const response = await fetch(urlServer, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        newItems: viewsReturn,
      }),
    });
    const data = await response.json();
    console.log("data updateCartHandle:", data);
    if (!response.ok) {
      dispatch(
        authSliceActions.errorMessageUpdate(
          data && data.message
            ? data.message
            : data && data.msg
            ? data.msg
            : "Cannot update cart now! Maybe you lost internet!"
        )
      );
    } else {
      dispatch(authSliceActions.errorMessageUpdate(null));
      getCartHandle();
    }
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
  useEffect(() => {
    console.log("cartToView:", cartToView);
  }, [cartToView]);
  useEffect(() => {
    console.log("total:", total);
  }, [total]);
  useEffect(() => {
    console.log("viewsReturn:", viewsReturn);
  }, [viewsReturn]);

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
                    <div>
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
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <svg
                          class="w-6 h-6 text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          onClick={() => prevHandle(product.item._id)}
                        >
                          <path
                            fill-rule="evenodd"
                            d="M13.729 5.575c1.304-1.074 3.27-.146 3.27 1.544v9.762c0 1.69-1.966 2.618-3.27 1.544l-5.927-4.881a2 2 0 0 1 0-3.088l5.927-4.88Z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <input
                          type="number"
                          min="1"
                          value={product.item.quantity}
                          style={{
                            width: "36px",
                            height: "24px",
                            textAlign: "right",
                          }}
                          // value={cartNumber}
                          // onChange={cartNumberInputHandle}
                        />
                        <svg
                          class="w-6 h-6 text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          onClick={() => nextHandle(product.item._id)}
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10.271 5.575C8.967 4.501 7 5.43 7 7.12v9.762c0 1.69 1.967 2.618 3.271 1.544l5.927-4.881a2 2 0 0 0 0-3.088l-5.927-4.88Z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
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
                      className={styles["trash-icon"]}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-6"
                        onClick={() =>
                          removeCartItemHandle(product.item.productId)
                        }
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
                <p>{total.toLocaleString("vi-VN")} VND</p>
              </div>
              <hr />
              <div>
                <h4>TOTAL</h4>
                <p>{total.toLocaleString("vi-VN")} VND</p>
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
