import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./ProductPage.module.css";
import { fetchProductsSliceAction } from "../store/fetchProductsSlice";
import { authSliceActions } from "../store/authSlice";

const ProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productData = useSelector((state) => {
    return state.fetchProductsSlice.productData;
  });
  const errorMessage = useSelector((state) => {
    return state.authSlice.errorMessage;
  });
  const localStorageData = useSelector((state) => {
    return state.authSlice.localStorageData;
  });

  const [searchInput, setSearchInput] = useState("");
  const [currentProductData, setCurrentProductData] = useState(null);

  useEffect(() => {
    dispatch(fetchProductsSliceAction());
    dispatch(
      authSliceActions.localStorageDataUpdate(
        JSON.parse(localStorage.getItem("userData"))
      )
    );
  }, []);
  useEffect(() => {
    setCurrentProductData(productData);
  }, [productData]);
  useEffect(() => {
    dispatch(authSliceActions.errorMessageUpdate(null));
  }, []);

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

  const updateHandle = (productId) => {
    console.log("productId:", productId);
    navigate(`/add-product/${productId}`);
  };

  const deleteHandle = async (productId) => {
    const token = localStorageData && localStorageData.token;
    const urlServer = "http://localhost:5000/deleteProduct";
    try {
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
      console.log("data delete:", data);

      if (!response.ok) {
        if (
          (data && data.message === "Wrong token!") ||
          (data && data.message === "jwt expired") ||
          (data && data.message === "jwt malformed")
        ) {
          localStorage.removeItem("userData");
          dispatch(authSliceActions.localStorageDataUpdate(null));
          dispatch(authSliceActions.authUpdate(false));
          dispatch(
            authSliceActions.errorMessageUpdate(
              "Please login again! Your login is expired or something wrong!"
            )
          );
        } else if (data && data.message === "Not authorized!") {
          localStorage.removeItem("userData");
          dispatch(authSliceActions.localStorageDataUpdate(null));
          dispatch(
            authSliceActions.errorMessageUpdate(
              "You are not admin  type! Please login again or choose another task!"
            )
          );
        } else {
          dispatch(
            authSliceActions.errorMessageUpdate(
              data && data.message
                ? data.message
                : data && data.msg
                ? data.msg
                : "Cannot delete product now! Maybe you login again or Please trying later!"
            )
          );
        }
      } else {
        dispatch(authSliceActions.errorMessageUpdate(null));
        dispatch(fetchProductsSliceAction());
      }
    } catch (err) {
      dispatch(
        authSliceActions.errorMessageUpdate(
          "Cannot delete product now! Maybe you login again or Please trying later!"
        )
      );
      localStorage.removeItem("userData");
      dispatch(authSliceActions.localStorageDataUpdate(null));
    }
  };

  const closeButton = () => {
    dispatch(authSliceActions.errorMessageUpdate(null));
  };

  const backgroundColorProduct = (index) => {
    if (index % 2 === 0) {
      console.log("index:", index);
      console.log("index%2:", index % 2);
      return "rgb(240 240 240)";
    }
  };

  useEffect(() => {
    console.log("productData:", productData);
  }, [productData]);
  useEffect(() => {
    console.log("searchInput:", searchInput);
  }, [searchInput]);
  useEffect(() => {
    console.log("errorMessage:", errorMessage);
  }, [errorMessage]);

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
            currentProductData.map((product, index) => {
              return (
                <div
                  className={styles.product}
                  style={{ backgroundColor: backgroundColorProduct(index) }}
                  key={product._id}
                >
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
                      type="button"
                      style={{ backgroundColor: "green", color: "white" }}
                      onClick={() => updateHandle(product._id)}
                    >
                      Update
                    </button>
                    <button
                      style={{ backgroundColor: "red", color: "white" }}
                      onClick={() => deleteHandle(product._id)}
                    >
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
          {errorMessage && (
            <div
              style={{
                position: "fixed",
                transform: "translate(-50%,-50%)",
                top: "50%",
                left: "50%",
                padding: "1em",
                backgroundColor: "rgb(150 150 150)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1em",
                borderRadius: "6px",
              }}
            >
              <p>{errorMessage}</p>
              <button
                style={{
                  backgroundColor: "blue",
                  height: "36px",
                  color: "white",
                  border: "none",
                  borderRadius: "3px",
                  cursor: "pointer",
                }}
                onClick={closeButton}
              >
                Close X
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
