import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import styles from "./ProductPage.module.css";
import { fetchProductsSliceAction } from "../store/fetchProductsSlice";

const ProductPage = () => {
  const dispatch = useDispatch();

  const productData = useSelector((state) => {
    return state.fetchProductsSlice.productData;
  });

  const [searchInput, setSearchInput] = useState("");
  const [currentProductData, setCurrentProductData] = useState(null);

  useEffect(() => {
    dispatch(fetchProductsSliceAction());
  }, []);
  useEffect(() => {
    setCurrentProductData(productData);
  }, [productData]);

  const searchInputHandle = (event) => {
    setSearchInput(event.target.value);
    const searchData = productData.filter((product) => {
      const productNameLower = product.name.toLowerCase();
      const inputLower = event.target.value.toLowerCase();
      return productNameLower.includes(inputLower);
    });
    console.log("searchData:", searchData);
    setCurrentProductData(searchData);
  };

  useEffect(() => {
    console.log("productData:", productData);
  }, [productData]);
  useEffect(() => {
    console.log("searchInput:", searchInput);
  }, [searchInput]);

  return (
    <div className={styles.contain}>
      <Helmet>
        <title>Product Page</title>
      </Helmet>

      <div>
        <h2>Products</h2>
        <input
          type="text"
          placeholder="Enter Search"
          value={searchInput}
          onChange={searchInputHandle}
        />
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
          {currentProductData &&
            currentProductData.length > 0 &&
            currentProductData.map((product) => {
              return (
                <div className={styles.product}>
                  <p>{product._id}</p>
                  <p style={{ marginLeft: "-1px" }}>{product.name}</p>
                  <p style={{ marginLeft: "-1px" }}>{product.price}</p>
                  <div style={{ marginLeft: "-1px" }}>
                    <img
                      src={`http://localhost:5000/${product.imageUrls[0]}`}
                    />
                  </div>
                  <p style={{ marginLeft: "-1px" }}>{product.category}</p>
                  <p style={{ marginLeft: "-1px" }} className={styles.edit}>
                    <button
                      style={{ backgroundColor: "green", color: "white" }}
                    >
                      Update
                    </button>
                    <button style={{ backgroundColor: "red", color: "white" }}>
                      Delete
                    </button>
                  </p>
                </div>
              );
            })}
          {!currentProductData ||
            (!currentProductData.length && (
              <p style={{ textAlign: "center", padding: "1em" }}>
                No product found!
              </p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
