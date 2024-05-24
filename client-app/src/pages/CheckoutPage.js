import { Helmet } from "react-helmet";
import styles from "./CheckoutPage.module.css";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const navigate = useNavigate();

  const toHome = () => {
    navigate("/");
  };
  const toCart = () => {
    navigate("/cart");
  };

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
      <div className={styles.billing}>
        <div className={styles["billing-contain"]}>
          <h3>BILLING DETAILS</h3>
          <div className={styles.information}>
            <div>
              <label>FULL NAME</label>
              <input type="text" placeholder="Enter Your Full Name Here!" />
            </div>
            <div>
              <label>EMAIL</label>
              <input type="text" placeholder="Enter Your Email Here!" />
            </div>
            <div>
              <label>PHONE NUMBER</label>
              <input
                type="number"
                placeholder="Enter Your Phone Number Here!"
              />
            </div>
            <div>
              <label>ADDRESS</label>
              <input type="text" placeholder="Enter Your Address Here!" />
            </div>
            <button>Place order</button>
          </div>
        </div>
        <div className={styles["order-contain"]}>
          <div className={styles.order}>
            <h3>YOUR ORDER</h3>
            <div>
              <div className={styles["order-item"]}>
                <h5>Product name 1</h5>
                <p>Price</p>
              </div>
              <hr />
              <div className={styles["order-item"]}>
                <h5>Product name 2</h5>
                <p>Price</p>
              </div>
              <hr />
              <div className={styles["order-item"]}>
                <h4>TOTAL</h4>
                <span>Total price</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
