import { Helmet } from "react-helmet";
import styles from "./ShopPage.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchProductsSliceActions } from "../store/fetchProductsSlice";
import { authSliceActions } from "../store/auth";
import { navSliceActions } from "../store/nav";

const ShopPage = () => {
  const [valueShow, setValueShow] = useState(null);
  const [pageNumber, setPageNumber] = useState("1");
  // const [navAction, setNavAction] = useState("all");
  const [searchValue, setSearchValue] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const errorMessage = useSelector((state) => {
    return state.authSlice.errorMessage;
  });
  const auth = useSelector((state) => {
    return state.authSlice.auth;
  });
  const productData = useSelector((state) => {
    return state.fetchProductsSlice.productData;
  });
  const navAction = useSelector((state) => {
    return state.navSlice.navAction;
  });

  useEffect(() => {
    try {
      dispatch(fetchProductsSliceActions());
    } catch (err) {
      dispatch(
        authSliceActions.errorMessageUpdate(
          "Cannot get data now! Please try again later!"
        )
      );
    }
    window.scrollTo({ top: 300, behavior: "smooth" });
  }, []);

  const allHandle = () => {
    setValueShow("All");
    // setNavAction("all");
    dispatch(navSliceActions.navActionUpdate("all"));
    window.scrollTo({ top: 300, behavior: "smooth" });
  };
  const iphoneHandle = () => {
    setValueShow("iPhone");
    // setNavAction("iPhone");
    dispatch(navSliceActions.navActionUpdate("iPhone"));
    window.scrollTo({ top: 300, behavior: "smooth" });
  };
  const ipadHandle = () => {
    setValueShow("iPad");
    // setNavAction("iPad");
    dispatch(navSliceActions.navActionUpdate("iPad"));
    window.scrollTo({ top: 300, behavior: "smooth" });
  };
  const macbookHandle = () => {
    setValueShow("Macbook");
    // setNavAction("macbook");
    dispatch(navSliceActions.navActionUpdate("macbook"));
    window.scrollTo({ top: 300, behavior: "smooth" });
  };
  const airpodHandle = () => {
    setValueShow("Airpod");
    // setNavAction("airpod");
    dispatch(navSliceActions.navActionUpdate("airpod"));
    window.scrollTo({ top: 300, behavior: "smooth" });
  };
  const watchHandle = () => {
    setValueShow("Watch");
    // setNavAction("watch");
    dispatch(navSliceActions.navActionUpdate("watch"));
    window.scrollTo({ top: 300, behavior: "smooth" });
  };
  const mouseHandle = () => {
    setValueShow("Mouse");
    // setNavAction("mouse");
    dispatch(navSliceActions.navActionUpdate("mouse"));
    window.scrollTo({ top: 300, behavior: "smooth" });
  };
  const keyboardHandle = () => {
    setValueShow("Keyboard");
    // setNavAction("keyboard");
    dispatch(navSliceActions.navActionUpdate("keyboard"));
    window.scrollTo({ top: 300, behavior: "smooth" });
  };
  const otherHandle = () => {
    setValueShow("Other");
    // setNavAction("other");
    dispatch(navSliceActions.navActionUpdate("other"));
    window.scrollTo({ top: "450px", behavior: "smooth" });
  };

  useEffect(() => {
    if (navAction === "all") {
      // console.log("productData:", productData);
      setValueShow(productData);
    } else if (navAction === "iPhone") {
      const iphoneData = productData.filter((prod) => {
        return prod.category === "iphone";
      });
      setValueShow(iphoneData);
    } else if (navAction === "iPad") {
      const ipadData = productData.filter((prod) => {
        return prod.category === "ipad";
      });
      setValueShow(ipadData);
    } else if (navAction === "macbook") {
      const macbookData = productData.filter((prod) => {
        return prod.category === "macbook";
      });
      setValueShow(macbookData);
    } else if (navAction === "airpod") {
      const airpodData = productData.filter((prod) => {
        return prod.category === "airpod";
      });
      setValueShow(airpodData);
    } else if (navAction === "watch") {
      const watchData = productData.filter((prod) => {
        return prod.category === "watch";
      });
      setValueShow(watchData);
    } else if (navAction === "mouse") {
      const mouseData = productData.filter((prod) => {
        return prod.category === "mouse";
      });
      setValueShow(mouseData);
    } else if (navAction === "keyboard") {
      const keyboardData = productData.filter((prod) => {
        return prod.category === "keyboard";
      });
      setValueShow(keyboardData);
    } else if (navAction === "mouse") {
      const mouseData = productData.filter((prod) => {
        return prod.category === "mouse";
      });
      setValueShow(mouseData);
    } else if (navAction === "keyboard") {
      const keyboardData = productData.filter((prod) => {
        return prod.category === "keyboard";
      });
      setValueShow(keyboardData);
    } else if (navAction === "other") {
      const otherData = productData.filter((prod) => {
        return prod.category === "other";
      });
      setValueShow(otherData);
    }
  }, [navAction, productData]);

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

  const clickProductHandle = (productId) => {
    navigate(`/detail/${productId}`);
  };

  const searchValueHandle = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    if (
      productData &&
      Array.isArray(productData) &&
      productData.length > 0 &&
      searchValue
    ) {
      const searchData = productData.filter((prod) => {
        const lowerProdName = prod.name.toLowerCase();
        const lowerProdCategory = prod.category.toLowerCase();
        const lowerSearch = searchValue.toLowerCase();
        return (
          lowerProdName.includes(lowerSearch) ||
          lowerProdCategory.includes(lowerSearch)
        );
      });
      setValueShow(searchData);
      // setNavAction(null);
      dispatch(navSliceActions.navActionUpdate(""));
    }
  }, [searchValue, productData]);

  useEffect(() => {
    console.log("productData:", productData);
  }, [productData]);
  useEffect(() => {
    console.log("errorMessage:", errorMessage);
  }, [errorMessage]);
  useEffect(() => {
    console.log("valueShow:", valueShow);
  }, [valueShow]);
  useEffect(() => {
    console.log("pageNumber:", pageNumber);
  }, [pageNumber]);
  useEffect(() => {
    console.log("navAction:", navAction);
  }, [navAction]);
  useEffect(() => {
    console.log("searchValue:", searchValue);
  }, [searchValue]);

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
            <h2 className={styles["max-700"]}>CATEGORIES</h2>
            <div className={styles["products-nav"]}>
              <h4
                style={{
                  backgroundColor: "black",
                  padding: "1em",
                  color: "white",
                }}
                className={styles["max-700"]}
              >
                APPLE
              </h4>
              <p
                onClick={allHandle}
                className={
                  navAction === "all" ? styles["action-nav"] : undefined
                }
              >
                All
              </p>
              <h4 className={styles["max-700"]}>IPHONE & MAC</h4>
              <p
                onClick={iphoneHandle}
                className={
                  navAction === "iPhone" ? styles["action-nav"] : undefined
                }
              >
                iPhone
              </p>
              <p
                onClick={ipadHandle}
                className={
                  navAction === "iPad" ? styles["action-nav"] : undefined
                }
              >
                iPad
              </p>
              <p
                onClick={macbookHandle}
                className={
                  navAction === "macbook" ? styles["action-nav"] : undefined
                }
              >
                Macbook
              </p>
              <h4 className={styles["max-700"]}>WIRELESS</h4>
              <p
                onClick={airpodHandle}
                className={
                  navAction === "airpod" ? styles["action-nav"] : undefined
                }
              >
                Airpod
              </p>
              <p
                onClick={watchHandle}
                className={
                  navAction === "watch" ? styles["action-nav"] : undefined
                }
              >
                Watch
              </p>
              <h4 className={styles["max-700"]}>OTHERS</h4>
              <p
                onClick={mouseHandle}
                className={
                  navAction === "mouse" ? styles["action-nav"] : undefined
                }
              >
                Mouse
              </p>
              <p
                onClick={keyboardHandle}
                className={
                  navAction === "keyboard" ? styles["action-nav"] : undefined
                }
              >
                Keyboard
              </p>
              <p
                onClick={otherHandle}
                className={
                  navAction === "other" ? styles["action-nav"] : undefined
                }
              >
                Other
              </p>
            </div>
          </div>
          <div className={styles["products-show"]}>
            <div className={styles["products-search"]}>
              <input
                type="text"
                placeholder="Enter Search Here!"
                value={searchValue}
                onChange={searchValueHandle}
              />
              <select className={styles["max-700"]}>
                <option>Default sorting</option>
                <option>Ascending</option>
                <option>Decrease</option>
              </select>
            </div>
            <div
              className={
                valueShow && Array.isArray(valueShow) && valueShow.length > 0
                  ? styles["show-content"]
                  : undefined
              }
            >
              {valueShow &&
                Array.isArray(valueShow) &&
                valueShow.length > 0 &&
                valueShow.map((value) => {
                  return (
                    <div
                      key={value._id}
                      className={styles["value-show"]}
                      onClick={() => clickProductHandle(value._id)}
                    >
                      <img
                        src={`http://localhost:5000/${value.imageUrls[0]}`}
                      />
                      <h3>{value.name}</h3>
                      <p>{value.price.toLocaleString("vi-VN")} VND</p>
                    </div>
                  );
                })}
              {!valueShow ||
                (valueShow.length === 0 && (
                  <p
                    style={{
                      textAlign: "center",
                      fontWeight: "600",
                      fontSize: "24px",
                      margin: "3em 0",
                    }}
                  >
                    Under updating products...
                  </p>
                ))}
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
