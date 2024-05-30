import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import openSocket from "socket.io-client";

import styles from "./ChatPage.module.css";
import { authSliceActions } from "../store/authSlice";
import avatarClient from "../images/avatar01.png";

const ChatPage = () => {
  const dispatch = useDispatch();

  const localStorageData = useSelector((state) => {
    return state.authSlice.localStorageData;
  });
  const errorMessage = useSelector((state) => {
    return state.authSlice.errorMessage;
  });
  const auth = useSelector((state) => {
    return state.authSlice.auth;
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
    if (!auth) {
      setChatData(null);
      setChatContent(null);
    }
  }, [auth]);

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

  useEffect(() => {
    const socket = openSocket("http://localhost:5000");
    socket.on("posts", (data) => {
      if (data.action === "addMessage") {
        console.log(
          `socket ${
            JSON.parse(localStorage.getItem("userData")).email
          } connected!: ${count}`
        );
        getChats();
      }
    });
  }, []);

  useEffect(() => {
    const socket = openSocket("http://localhost:5000");
    socket.on("posts", (data) => {
      if (data.action === "deleteMessageSession") {
        console.log(
          `socket ${
            JSON.parse(localStorage.getItem("userData")).email
          } connected!: ${count}`
        );
        getChats();
      }
    });
  }, []);

  useEffect(() => {
    try {
      if (localStorageData && localStorageData.userId) {
        getChats();
      }
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

  useEffect(() => {
    console.log("chatData:", chatData);
    const currentChat =
      chatData &&
      chatData.length > 0 &&
      chatData.find((chat) => {
        return chat.userId === userIdClick;
      });
    const messages =
      currentChat && currentChat.messages ? currentChat.messages : null;
    setChatContent(messages);
  }, [chatData]);

  const addMessageHandle = async (event) => {
    event.preventDefault();
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

  useEffect(() => {
    console.log("errorMessage:", errorMessage);
  }, [errorMessage]);
  // useEffect(() => {
  //   console.log("localStorageData:", localStorageData);
  // }, [localStorageData]);

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
        {/* {errorMessage && (
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
        )} */}

        <div className={styles["list-users"]}>
          <div>
            <input type="text" placeholder="Search Contact" />
          </div>
          <div>
            {chatData &&
              chatData.length > 0 &&
              chatData.map((chat) => {
                return (
                  <div
                    key={chat.userId}
                    style={{
                      wordBreak: "break-word",
                      display: "flex",
                      alignItems: "center",
                      gap: "3px",
                    }}
                  >
                    <img src={avatarClient} width="24px" height="30px" />
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
                    {chat.userChatType === "normal" && (
                      <img src={avatarClient} width="24px" height="30px" />
                    )}
                    <p>{chat.currentMessage}</p>
                  </div>
                );
              })}
          </div>
          <div className={styles["message-enter"]}>
            <form className={styles.form} onSubmit={addMessageHandle}>
              <input
                type="text"
                value={currentMessage}
                onChange={currentMessageHandle}
                placeholder="Type and enter"
              />
              <svg
                viewBox="0 0 48 48"
                // fill="none"
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                onClick={addMessageHandle}
              >
                <path
                  d="M41.4193 7.30899C41.4193 7.30899 45.3046 5.79399 44.9808 9.47328C44.8729 10.9883 43.9016 16.2908 43.1461 22.0262L40.5559 39.0159C40.5559 39.0159 40.3401 41.5048 38.3974 41.9377C36.4547 42.3705 33.5408 40.4227 33.0011 39.9898C32.5694 39.6652 24.9068 34.7955 22.2086 32.4148C21.4531 31.7655 20.5897 30.4669 22.3165 28.9519L33.6487 18.1305C34.9438 16.8319 36.2389 13.8019 30.8426 17.4812L15.7331 27.7616C15.7331 27.7616 14.0063 28.8437 10.7686 27.8698L3.75342 25.7055C3.75342 25.7055 1.16321 24.0823 5.58815 22.459C16.3807 17.3729 29.6555 12.1786 41.4193 7.30899Z"
                  fill="blue"
                />
              </svg>
            </form>
          </div>
        </div>
        {errorMessage && (
          <div className={styles.errorDisplay}>
            <p>{errorMessage}</p>
            <p>Something went wrong! Login again!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
