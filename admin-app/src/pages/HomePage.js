import { Helmet } from "react-helmet";

import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={styles.contain}>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <h2>Dashboard</h2>
      <div className={styles.upon}>
        <div className={styles["upon-part"]}>
          <div>
            <p
              style={{
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              2
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
              2
            </p>
            <p>New Order</p>
          </div>
          <div>Icon</div>
        </div>
      </div>
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
    </div>
  );
};

export default HomePage;
