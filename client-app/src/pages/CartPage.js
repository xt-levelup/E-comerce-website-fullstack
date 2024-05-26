import { Helmet } from "react-helmet";
import styles from "./CartPage.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { authSliceActions } from "../store/auth";

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const author = useSelector((state) => {
    return state.authSlice.author;
  });

  const goToShopping = () => {
    navigate("/shop");
  };
  const goToCheckout = () => {
    navigate("/checkout");
  };

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
            <div className={styles["list-items"]}>
              <h4>IMAGE</h4>
              <h4>PRODUCT</h4>
              <h4>PRICE</h4>
              <h4>QUANTITY</h4>
              <h4>TOTAL</h4>
              <h4>REMOVE</h4>
            </div>
            <div className={styles["list-items"]}>
              <p>image</p>
              <p>product</p>
              <p>price</p>
              <p>quantity</p>
              <p>total</p>
              <p>remove</p>
            </div>
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
