import { Helmet } from "react-helmet";

import styles from "./ProductPage.module.css";

const ProductPage = () => {
  return (
    <div className={styles.contain}>
      <Helmet>
        <title>Product Page</title>
      </Helmet>

      <div>
        <h2>Products</h2>
        <input type="text" placeholder="Enter Search" />
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <h4>ID</h4>
          <h4 style={{ marginLeft: "-1px" }}>Name</h4>
          <h4 style={{ marginLeft: "-1px" }}>Price</h4>
          <h4 style={{ marginLeft: "-1px" }}>Image</h4>
          <h4 style={{ marginLeft: "-1px" }}>Category</h4>
          <h4 style={{ marginLeft: "-1px" }}>Edit</h4>
        </div>
        <div className={styles.detail}>
          <div className={styles.product}>
            <p>ID</p>
            <p style={{ marginLeft: "-1px" }}>Name</p>
            <p style={{ marginLeft: "-1px" }}>Price</p>
            <p style={{ marginLeft: "-1px" }}>Image</p>
            <p style={{ marginLeft: "-1px" }}>Category</p>
            <p style={{ marginLeft: "-1px" }} className={styles.edit}>
              <button style={{ backgroundColor: "green", color: "white" }}>
                Update
              </button>
              <button style={{ backgroundColor: "red", color: "white" }}>
                Delete
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
