import { Helmet } from "react-helmet";
import styles from "./DetailPage.module.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authSliceActions } from "../store/auth";

const DetailPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [cartNumber, setCartNumber] = useState(1);
  const [productView, setProductView] = useState(null);
  const [detailDesc, setDetailDesc] = useState("");
  const [relativeProducts, setRelativeProduct] = useState(null);

  const productData = useSelector((state) => {
    return state.fetchProductsSlice.productData;
  });
  const errorMessage = useSelector((state) => {
    return state.authSlice.errorMessage;
  });

  const productId = params.productId;

  useEffect(() => {
    if (productData && productData.length) {
      const currentProduct = productData.find((product) => {
        return product._id === productId;
      });
      console.log("currentProduct:", currentProduct);
      setProductView(currentProduct);
    }
  }, [productData]);

  useEffect(() => {
    if (productView) {
      const descView = productView.long_desc.split("\n").map((string) => {
        return string.trim("\r");
      });
      setDetailDesc(descView);

      const relations = productData.filter((product) => {
        return (
          product.category === productView.category &&
          product._id !== productView._id
        );
      });
      setRelativeProduct(relations);
    }
  }, [productView]);

  const cartNumberInputHandle = (event) => {
    setCartNumber(event.target.value);
  };

  const prevButtonHandle = () => {
    if (parseInt(cartNumber) < 0) {
      setCartNumber("1");
    } else if (parseInt(cartNumber) > 1) {
      setCartNumber(parseInt(cartNumber) - 1);
    }
  };
  const nextButtonHandle = () => {
    if (parseInt(cartNumber) < 0) {
      setCartNumber("1");
    } else {
      setCartNumber(parseInt(cartNumber) + 1);
    }
  };

  const clickImageRealative = (currentProduct) => {
    setProductView(currentProduct);
    const targetElement = document.getElementById("main-title");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const addToCartHandle = async () => {
    console.log("productView._id:", productView._id);
    console.log("parseInt(cartNumber):", parseInt(cartNumber));
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    const token = localStorageData && localStorageData.token;
    const urlServer = "http://localhost:5000/clientAddToCart";
    const response = await fetch(urlServer, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        productIdAddCart: productView._id,
        numberToCart: parseInt(cartNumber),
      }),
    });
    const data = await response.json();
    console.log("data addToCartHandle:", data);
    if (!response.ok) {
      dispatch(
        authSliceActions.errorMessageUpdate(
          data && data.message
            ? data.message
            : data && data.msg
            ? data.msg
            : "Cannot add cart to cart now!"
        )
      );
    } else {
      dispatch(authSliceActions.errorMessageUpdate(null));
      navigate("/cart");
    }
  };

  useEffect(() => {
    console.log("productData:", productData);
  }, [productData]);
  useEffect(() => {
    console.log("productId:", productId);
  }, [productId]);
  useEffect(() => {
    console.log("productView:", productView);
  }, [productView]);
  useEffect(() => {
    console.log("detailDesc:", detailDesc);
  }, [detailDesc]);
  useEffect(() => {
    console.log("relativeProducts:", relativeProducts);
  }, [relativeProducts]);
  useEffect(() => {
    console.log("errorMessage:", errorMessage);
  }, [errorMessage]);

  return (
    <div>
      <Helmet>
        <title>Detail Page</title>
      </Helmet>
      <div className={styles.contain}>
        {productView && (
          <div className={styles["product-show"]}>
            <div className={styles["product-show-image"]}>
              <img src={`http://localhost:5000/${productView.imageUrls[0]}`} />
            </div>
            <div className={styles["product-show-description"]}>
              <h2 id="main-title">{productView.name}</h2>
              <h4>{productView.price.toLocaleString("vi-VN")} VND</h4>
              <p>{productView.short_desc}</p>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "1em" }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1em" }}
                >
                  <p style={{ color: "black", fontWeight: "600" }}>CATEGORY:</p>{" "}
                  <p>{productView.category}</p>
                </div>
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
                      value={cartNumber}
                      onChange={cartNumberInputHandle}
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
                  <button onClick={addToCartHandle}>Add To Cart</button>
                </div>
              </div>
            </div>
          </div>
        )}
        {productView && (
          <div className={styles["spec-description"]}>
            <h4>DESCRIPTION</h4>
            <h3>PRODUCT DESCRIPTION</h3>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              {detailDesc &&
                detailDesc.length > 0 &&
                detailDesc.map((string) => {
                  return (
                    <p style={{ color: "rgb(120 120 120)" }}>- {string}</p>
                  );
                })}
            </div>
          </div>
        )}
        {productView && (
          <div>
            <h3>RELATIVE PRODUCTS</h3>
            <div className={styles["relative-content"]}>
              {relativeProducts &&
                relativeProducts.length > 0 &&
                relativeProducts.map((product) => {
                  return (
                    <div
                      key={product._id}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "1em",
                      }}
                    >
                      <div className={styles["relative-image"]}>
                        <img
                          src={`http://localhost:5000/${product.imageUrls[0]}`}
                          onClick={() => clickImageRealative(product)}
                        />
                      </div>
                      <p style={{ fontWeight: "600", fontSize: "15px" }}>
                        {product.name}
                      </p>
                      <p
                        style={{ fontSize: "15px", color: "rgb(150 150 150)" }}
                      >
                        {product.price.toLocaleString("vi-VN")} VND
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
        {!productView && (
          <p
            style={{
              color: "red",
              fontSize: "18px",
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            There is no to view here! Please choose a product in Home Page!
          </p>
        )}
      </div>
    </div>
  );
};

export default DetailPage;
