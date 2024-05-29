import { Helmet } from "react-helmet";
import styles from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsSliceActions } from "../store/fetchProductsSlice";
import { authSliceActions } from "../store/auth";
import iphone from "../images/product_1.png";
import mac from "../images/product_2.png";
import ipad from "../images/product_3.png";
import watch from "../images/product_4.png";
import airpod from "../images/product_5.png";
import adminAvatar from "../images/avatar01.png";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const errorMessage = useSelector((state) => {
    return state.authSlice.errorMessage;
  });
  const author = useSelector((state) => {
    return state.authSlice.author;
  });

  const [boxShow, setBoxShow] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageData, setMessageData] = useState(null);

  const browseCollectionButton = () => {
    navigate("/shop");
  };

  const imageNavigation = () => {
    navigate("/shop");
  };

  const messageBoxHandle = () => {
    setBoxShow(!boxShow);
  };

  const boxShowToFalse = (event) => {
    if (event.key === "Escape") {
      setBoxShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", boxShowToFalse);
    return () => {
      window.removeEventListener("keydown", boxShowToFalse);
    };
  }, []);

  useEffect(() => {
    dispatch(
      authSliceActions.authorUpdate(JSON.parse(localStorage.getItem("user")))
    );
  }, []);

  const currentMessageHandle = (event) => {
    setCurrentMessage(event.target.value);
  };

  const sendMessageHandle = async () => {
    const urlServer = "http://localhost:5000/addMessage";
    const token = author && author.token;
    const response = await fetch(urlServer, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        currentMessage: currentMessage,
      }),
    });
    const data = await response.json();
    console.log("data sendMessageHandle:", data);
    if (!response.ok) {
      dispatch(
        authSliceActions.errorMessageUpdate(
          data && data.message
            ? data.message
            : data && data.msg
            ? data.msg
            : "Cannot send message now! Please login then try again later!"
        )
      );
      setMessageData(null);
      localStorage.removeItem("user");
      dispatch(authSliceActions.authorUpdate(null));
    } else {
      dispatch(authSliceActions.errorMessageUpdate(null));
      setMessageData(data);
      setCurrentMessage("");
    }
  };

  const chatStyleHandle = (userChatType) => {
    if (userChatType === "normal") {
      console.log("normal");
      return {
        backgroundColor: "blue",
        color: "white",
        textAlign: "right",
        padding: "1em",
      };
    } else {
      console.log("admin");
      return {
        backgroundColor: "rgb(240 240 240)",
        color: "black",
        textAlign: "left",
        padding: "1em",
      };
    }
  };

  useEffect(() => {
    console.log("boxShow:", boxShow);
  }, [boxShow]);

  useEffect(() => {
    console.log("errorMessage:", errorMessage);
  }, [errorMessage]);
  useEffect(() => {
    console.log("currentMessage:", currentMessage);
  }, [currentMessage]);
  useEffect(() => {
    console.log("messageData:", messageData);
  }, [messageData]);
  useEffect(() => {
    console.log("author:", author);
  }, [author]);

  return (
    <div>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <div className={styles.banner}>
        <div className={styles.adverse}>
          <h4>NEW INSPIRATION 2024</h4>
          <h2>20% OFF ON NEW SEASON</h2>
          <button onClick={browseCollectionButton}>Browse collections</button>
        </div>
      </div>
      <div className={styles.categories}>
        <h4>CAREFULLY CREATED COLLECTIONS</h4>
        <h3>BROWSE OUR CATEGORIES</h3>
        <div className={styles["categories-01"]}>
          <div className={styles["categories-image"]}>
            <img src={iphone} alt="product_1.png" onClick={imageNavigation} />
          </div>
          <div className={styles["categories-image"]}>
            <img src={mac} alt="product_2.png" onClick={imageNavigation} />
          </div>
        </div>
        <div className={styles["categories-02"]}>
          <div className={styles["categories-image"]}>
            <img src={ipad} alt="product_3.png" onClick={imageNavigation} />
          </div>
          <div className={styles["categories-image"]}>
            <img src={watch} alt="product_4.png" onClick={imageNavigation} />
          </div>
          <div className={styles["categories-image"]}>
            <img src={airpod} alt="product_5.png" onClick={imageNavigation} />
          </div>
        </div>
      </div>
      <div className={styles.trending}>
        <div>
          <h4>MADE THE HARD WAY</h4>
          <h3>TOP TRENDING PRODUCTS</h3>
        </div>
        <div className={styles["trending-content"]}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={styles["trending-content"]}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className={styles.guaranty}>
        <div>
          <h3>FREE SHIPPING</h3>
          <p>Free shipping worldwide</p>
        </div>
        <div>
          <h3>24X7 SERVICE</h3>
          <p>Free shipping worldwide</p>
        </div>
        <div>
          <h3>FESTIVAL OFFER</h3>
          <p>Free shipping worldwide</p>
        </div>
      </div>
      <div className={styles["advise-register"]}>
        <div>
          <h2>LET'S BE FRIEND!</h2>
          <p>Register now for favors</p>
        </div>
        <div className={styles["advise-register-button"]}>
          <input type="email" placeholder="Enter your email address" />
          <button>Subscribe</button>
        </div>
      </div>
      <div className={styles["chat-icon"]} onClick={messageBoxHandle}>
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
            d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
          />
        </svg>
      </div>
      {boxShow && (
        <div className={styles["chat-window-contain"]}>
          <div className={styles["chat-window"]}>
            <div className={styles.header}>
              <h3>Customer Support</h3>
              <button>Let's Chat App</button>
            </div>
            {!errorMessage && (
              <div className={styles.chatting}>
                {messageData &&
                  messageData.messages.length > 0 &&
                  messageData.messages.map((message) => {
                    return (
                      <div
                        key={message.date}
                        // style={chatStyleHandle(message.userChatType)}
                        className={
                          message.userChatType === "normal"
                            ? styles.client
                            : styles.admin
                        }
                      >
                        <p>{message.currentMessage}</p>
                      </div>
                    );
                  })}
                {/* <div className={styles.client}>
                  <p>Xin chao</p>
                  <p>Lam the nao de xem san pham</p>
                </div>
                <div className={styles.admin}>
                  <p>Chao ban</p>
                  <p>Ban co the vao muc Shop</p>
                </div> */}
              </div>
            )}
            {errorMessage && (
              <div
                className={styles.chatting}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "1em",
                }}
              >
                <p
                  style={{
                    textAlign: "center",
                    color: "red",
                    fontWeight: "600",
                  }}
                >
                  {errorMessage}
                </p>
                <p>Press ESC to exit this chat box and try again later!</p>
              </div>
            )}
            <div className={styles["chat-input"]}>
              <img
                src={adminAvatar}
                style={{ width: "36px", height: "36px", marginLeft: "1em" }}
              />
              <input
                type="text"
                value={currentMessage}
                onChange={currentMessageHandle}
              />
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
                  d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="size-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 0 0-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634Zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 0 1-.189-.866c0-.298.059-.605.189-.866Zm2.023 6.828a.75.75 0 1 0-1.06-1.06 3.75 3.75 0 0 1-5.304 0 .75.75 0 0 0-1.06 1.06 5.25 5.25 0 0 0 7.424 0Z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg
                viewBox="0 0 48 48"
                // fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={sendMessageHandle}
              >
                <path
                  d="M41.4193 7.30899C41.4193 7.30899 45.3046 5.79399 44.9808 9.47328C44.8729 10.9883 43.9016 16.2908 43.1461 22.0262L40.5559 39.0159C40.5559 39.0159 40.3401 41.5048 38.3974 41.9377C36.4547 42.3705 33.5408 40.4227 33.0011 39.9898C32.5694 39.6652 24.9068 34.7955 22.2086 32.4148C21.4531 31.7655 20.5897 30.4669 22.3165 28.9519L33.6487 18.1305C34.9438 16.8319 36.2389 13.8019 30.8426 17.4812L15.7331 27.7616C15.7331 27.7616 14.0063 28.8437 10.7686 27.8698L3.75342 25.7055C3.75342 25.7055 1.16321 24.0823 5.58815 22.459C16.3807 17.3729 29.6555 12.1786 41.4193 7.30899Z"
                  fill="blue"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
