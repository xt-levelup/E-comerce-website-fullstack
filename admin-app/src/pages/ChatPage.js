import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import openSocket from "socket.io-client";

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
  const [chatContent, setChatContent] = useState([]);
  const [userIdClick, setUserIdClick] = useState(null);
  const [currentMessage, setCurrentMessagge] = useState("");
  const [userIdChat, setUserIdChat] = useState(null);
  const [count, setCount] = useState(1);

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

  // useEffect(() => {
  //   const socket = openSocket("http://localhost:5000");
  //   socket.on("posts", (data) => {
  //     if (data.action === "addMessageAdmin") {
  //       console.log(
  //         `socket ${
  //           JSON.parse(localStorage.getItem("userData")).email
  //         } connected: ${currentMessage}`
  //       );
  //       getChats();
  //     }
  //   });
  // }, []);

  useEffect(() => {
    const socket = openSocket("http://localhost:5000");
    socket.on("adminPosts", (data) => {
      if (data.action === "adminAddMessage") {
        console.log(
          `socket ${
            JSON.parse(localStorage.getItem("userData")).email
          } connected!: ${count}`
        );
        getChats();
      }
    });
  }, []);

  const currentMessageHandle = (event) => {
    setCurrentMessagge(event.target.value);
  };

  const getChats = async () => {
    const token = localStorageData && localStorageData.token;
    const urlServer = "http://localhost:5000/getChats";
    const response = await fetch(urlServer, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        userId: localStorageData && localStorageData.userId,
      }),
    });
    const data = await response.json();
    console.log("data getChats:", data);
    if (!response.ok) {
      dispatch(
        authSliceActions.errorMessageUpdate(
          (data && data.message === "jwt malformed") ||
            (data && data.message === "jwt expired")
            ? "Login again to access data!"
            : data && data.message
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
      const messages =
        userIdClick &&
        data &&
        data.find((chat) => {
          return chat.userId === userIdClick;
        }).messages;
      setChatContent(messages);
      return data;
    }
  };

  useEffect(() => {
    try {
      getChats();
    } catch (err) {
      dispatch(authSliceActions.errorMessageUpdate(err.message));
    }
  }, []);

  const userIdHandle = async (userId) => {
    const newChatData = await getChats();
    const messages =
      newChatData &&
      newChatData.length > 0 &&
      newChatData.find((chat) => {
        return chat.userId === userId;
      }).messages;
    setChatContent(messages);
    setUserIdClick(userId);
    setUserIdChat(userId);
  };

  const addMessageHandle = async () => {
    const token = localStorageData && localStorageData.token;
    const urlServer = "http://localhost:5000/adminAddMessage";
    const response = await fetch(urlServer, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        userIdChat: userIdChat,
        currentMessage: currentMessage,
        userId: localStorageData && localStorageData.userId,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      if (
        (data && data.msg === "Chat not be empty!") ||
        (data && data.msg === "Who are you want to send message?")
      ) {
        dispatch(authSliceActions.errorMessageUpdate(data.msg));
      } else {
        dispatch(
          authSliceActions.errorMessageUpdate(
            data && data.message
              ? data.message
              : data && data.msg
              ? data.msg
              : "Please login and trying again later!"
          )
        );
        dispatch(authSliceActions.localStorageDataUpdate(null));
        localStorage.removeItem("userData");
      }
    } else {
      // setChatData(data);
      dispatch(authSliceActions.errorMessageUpdate(null));
      getChats();
      setCurrentMessagge("");
      setCount(count + 1);
    }
  };

  const closeErrorHandle = () => {
    dispatch(authSliceActions.errorMessageUpdate(null));
  };

  // useEffect(() => {
  //   console.log("errorMessage:", errorMessage);
  // }, [errorMessage]);
  // useEffect(() => {
  //   console.log("localStorageData:", localStorageData);
  // }, [localStorageData]);
  // useEffect(() => {
  //   console.log("chatData:", chatData);
  // }, [chatData]);
  useEffect(() => {
    console.log("chatContent:", chatContent);
  }, [chatContent]);
  // useEffect(() => {
  //   console.log("currentMessage:", currentMessage);
  // }, [currentMessage]);
  // useEffect(() => {
  //   console.log("userIdChat:", userIdChat);
  // }, [userIdChat]);

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
              position: "fixed",
              transform: "translate(-50% -50%)",
              left: "50%",
              top: "50%",
            }}
          >
            <p>Error: {errorMessage}</p>
            <p>Please Login Again</p>
            <button
              style={{ backgroundColor: "blue", cursor: "pointer" }}
              onClick={closeErrorHandle}
            >
              Close X
            </button>
          </div>
        )}

        <div className={styles["list-users"]}>
          <div>
            <input type="text" placeholder="Search Contact" />
          </div>
          <div>
            {chatData &&
              chatData.length > 0 &&
              chatData.map((chat) => {
                return (
                  <div key={chat.userId} style={{ wordBreak: "break-word" }}>
                    <p>icon</p>
                    <p
                      onClick={() => userIdHandle(chat.userId)}
                      style={
                        userIdClick === chat.userId
                          ? { fontWeight: "600" }
                          : undefined
                      }
                    >
                      {chat.userId}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>

        <div className={styles.messages}>
          <div className={styles["message-content"]}>
            {chatContent &&
              chatContent.length > 0 &&
              chatContent.map((chat) => {
                return (
                  <div
                    key={chat._id}
                    className={
                      chat.userChatType === "normal"
                        ? styles["message-content-client"]
                        : styles["message-content-admin"]
                    }
                  >
                    <p>{chat.currentMessage}</p>
                  </div>
                );
              })}
          </div>
          <div className={styles["message-enter"]}>
            <input
              type="text"
              value={currentMessage}
              onChange={currentMessageHandle}
            />
            <p onClick={addMessageHandle} style={{ cursor: "pointer" }}>
              icon
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
