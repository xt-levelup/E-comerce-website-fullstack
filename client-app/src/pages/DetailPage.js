import { Helmet } from "react-helmet";
import styles from "./DetailPage.module.css";
import { useState, useEffect } from "react";

const DetailPage = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const pageNumberInputHandle = (event) => {
    setPageNumber(event.target.value);
  };

  const prevButtonHandle = () => {
    if (parseInt(pageNumber) < 0) {
      setPageNumber("1");
    } else if (parseInt(pageNumber) > 1) {
      setPageNumber(parseInt(pageNumber) - 1);
    }
  };
  const nextButtonHandle = () => {
    if (parseInt(pageNumber) < 0) {
      setPageNumber("1");
    } else {
      setPageNumber(parseInt(pageNumber) + 1);
    }
  };
  return (
    <div>
      <Helmet>
        <title>Detail Page</title>
      </Helmet>
      <div className={styles.contain}>
        <div className={styles["product-show"]}>
          <div>Image</div>
          <div className={styles["product-show-description"]}>
            <h2>Product Name</h2>
            <h4>Price</h4>
            <p>Detail Description</p>
            <div>
              <p>CATEGORY: product type</p>
              <div className={styles["product-show-add-cart"]}>
                <p>QUANTITY</p>
                <div>
                  <svg
                    class="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    onClick={prevButtonHandle}
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
                    value={pageNumber}
                    onChange={pageNumberInputHandle}
                  />
                  <svg
                    class="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    onClick={nextButtonHandle}
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.271 5.575C8.967 4.501 7 5.43 7 7.12v9.762c0 1.69 1.967 2.618 3.271 1.544l5.927-4.881a2 2 0 0 0 0-3.088l-5.927-4.88Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <button>Add To Cart</button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles["spec-description"]}>
          <h4>DESCRIPTION</h4>
          <h3>PRODUCT DESCRIPTION</h3>
          <p>Special Description</p>
        </div>
        <div>
          <h3>RELATIVE PRODUCTS</h3>
          <div>
            <div>Image</div>
            <p>Product Name</p>
            <p>Price</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
