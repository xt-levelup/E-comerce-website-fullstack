import { Helmet } from "react-helmet";
import styles from "./ShopPage.module.css";
import { useState, useEffect } from "react";

const ShopPage = () => {
  const [valueShow, setValueShow] = useState(null);
  const [pageNumber, setPageNumber] = useState("1");

  const allHandle = () => {
    setValueShow("All");
  };
  const iphoneHandle = () => {
    setValueShow("iPhone");
  };
  const ipadHandle = () => {
    setValueShow("iPad");
  };
  const macbookHandle = () => {
    setValueShow("Macbook");
  };
  const airpodHandle = () => {
    setValueShow("Airpad");
  };
  const watchHandle = () => {
    setValueShow("Watch");
  };
  const mouseHandle = () => {
    setValueShow("Mouse");
  };
  const keyboardHandle = () => {
    setValueShow("Keyboard");
  };
  const otherHandle = () => {
    setValueShow("Other");
  };
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
        <title>Shop Page</title>
      </Helmet>
      <div>
        <div className={styles.banner}>
          <h1>SHOP</h1>
          <h3>SHOP</h3>
        </div>
        <div className={styles.products}>
          <div>
            <h2>CATEGORIES</h2>
            <div className={styles["products-nav"]}>
              <h4
                style={{
                  backgroundColor: "black",
                  padding: "1em",
                  color: "white",
                }}
              >
                APPLE
              </h4>
              <p onClick={allHandle}>All</p>
              <h4>IPHONE & MAC</h4>
              <p onClick={iphoneHandle}>iPhone</p>
              <p onClick={ipadHandle}>iPad</p>
              <p onClick={macbookHandle}>Macbook</p>
              <h4>WIRELESS</h4>
              <p onClick={airpodHandle}>Airpod</p>
              <p onClick={watchHandle}>Watch</p>
              <h4>OTHERS</h4>
              <p onClick={mouseHandle}>Mouse</p>
              <p onClick={keyboardHandle}>Keyboard</p>
              <p onClick={otherHandle}>Other</p>
            </div>
          </div>
          <div className={styles["products-show"]}>
            <div className={styles["products-search"]}>
              <input type="text" placeholder="Enter Search Here!" />
              <select>
                <option>Default sorting</option>
                <option>Ascending</option>
                <option>Decrease</option>
              </select>
            </div>
            <div>
              <p>{valueShow}</p>
            </div>
            <div className={styles["products-pages"]}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
                onClick={prevButtonHandle}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
                />
              </svg>
              <input
                type="number"
                min="1"
                value={pageNumber}
                onChange={pageNumberInputHandle}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
                onClick={nextButtonHandle}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
