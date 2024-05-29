import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./ChatPage.module.css";
import { authSliceActions } from "../store/authSlice";

const ChatPage = () => {
  const dispatch = useDispatch();

  const localStorageData = useSelector((state) => {
    return state.authSlice.localStorageData;
  });
  const errorMessage = useSelector((state) => {
    return state.authSlice.errorMessage;
  });

  const [chatData, setChatData] = useState(null);

  useEffect(() => {
    dispatch(
      authSliceActions.localStorageDataUpdate(
        JSON.parse(localStorage.getItem("userData"))
      )
    );
  }, []);

  useEffect(() => {
    dispatch(authSliceActions.errorMessageUpdate(null));
  }, []);

  const getChats = async () => {
    const token = localStorageData && localStorageData.token;
    const urlServer = "http://localhost:5000/getChats";
    const response = await fetch(urlServer, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      dispatch(
        authSliceActions.errorMessageUpdate(
          data && data.message
            ? data.message
            : data && data.msg
            ? data.msg
            : "Please login again and trying later!"
        )
      );
      localStorage.removeItem("userData");
      dispatch(authSliceActions.localStorageDataUpdate(null));
      dispatch(authSliceActions.authUpdate(false));
    } else {
      dispatch(authSliceActions.errorMessageUpdate(null));
      setChatData(data);
    }
  };

  useEffect(() => {
    try {
      getChats();
    } catch (err) {
      dispatch(authSliceActions.errorMessageUpdate(err.message));
    }
  }, []);

  useEffect(() => {
    console.log("errorMessage:", errorMessage);
  }, [errorMessage]);
  useEffect(() => {
    console.log("localStorageData:", localStorageData);
  }, [localStorageData]);
  useEffect(() => {
    console.log("chatData:", chatData);
  }, [chatData]);

  return (
    <div className={styles.contain}>
      <Helmet>
        <title>Chat Room</title>
      </Helmet>
      <div>
        <h2>ChatPage</h2>
        <p>Apps / Chat</p>
      </div>
      <div className={styles.action}>
        {errorMessage && (
          <div
            style={{
              display: "flex",
              color: "red",
              flexDirection: "column",
              gap: "1em",
              alignItems: "center",
              fontWeight: "600",
            }}
          >
            <p>Error: {errorMessage}</p>
            <p>Please Login Again</p>
          </div>
        )}
        {!errorMessage && (
          <div className={styles["list-users"]}>
            <div>
              <input type="text" placeholder="Search Contact" />
            </div>
            <div>
              <div>
                <p>icon</p>
                <p>iduser</p>
              </div>
              <div>
                <p>icon</p>
                <p>iduser</p>
              </div>
            </div>
          </div>
        )}
        {!errorMessage && (
          <div className={styles.messages}>
            <div className={styles["message-content"]}>
              <p>Chat 1</p>
              <p>Chat 2</p>
              <p>Chat ...</p>
            </div>
            <div className={styles["message-enter"]}>
              <input type="text" />
              <p>icon</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
