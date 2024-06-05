import { Outlet, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../pages/UsersPage.module.css";
import { authSliceActions } from "../store/authSlice";
import { Helmet } from "react-helmet";

const UsersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const errorMessage = useSelector((state) => {
    return state.authSlice.errorMessage;
  });

  const [usersData, setUsersData] = useState(null);
  const [usersList, setUsersList] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const getUsers = async () => {
    const urlServer = "http://localhost:5000/getUsers";
    const localStorageData = JSON.parse(localStorage.getItem("userData"));
    const token = localStorageData && localStorageData.token;
    const response = await fetch(urlServer, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      if (
        (data && data.message === "jwt malformed") ||
        (data && data.message === "jwt expired")
      ) {
        dispatch(
          authSliceActions.errorMessageUpdate("Login again to access data!")
        );
        localStorage.removeItem("userData");
      } else {
        dispatch(
          authSliceActions.errorMessageUpdate(
            data && data.message
              ? data.message
              : data && data.msg
              ? data.msg
              : "Cannot get users now! Please try again later!"
          )
        );
      }
    } else {
      setUsersData(data);
      dispatch(authSliceActions.errorMessageUpdate(null));
    }
  };

  const userTypeUpdateServer = async (userTypeUpdate, updateUserId) => {
    const urlServer = "http://localhost:5000/userTypeUpdate";
    const localStorageData = JSON.parse(localStorage.getItem("userData"));
    const token = localStorageData && localStorageData.token;
    const response = await fetch(urlServer, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userTypeUpdate: userTypeUpdate,
        updateUserId: updateUserId,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      if (
        (data && data.message === "jwt malformed") ||
        (data && data.message === "jwt expired")
      ) {
        dispatch(
          authSliceActions.errorMessageUpdate("Login again to access data!")
        );
        localStorage.removeItem("userData");
      } else {
        dispatch(
          authSliceActions.errorMessageUpdate(
            data && data.message
              ? data.message
              : data && data.msg
              ? data.msg
              : "Cannot get update user now! Please try again later!"
          )
        );
      }
    } else {
      console.log("data userTypeUpdateServer:", data);
      dispatch(authSliceActions.errorMessageUpdate(null));
      getUsers();
    }
  };

  const userTypeUpdateHandle = (selectId, updateUserId) => {
    const requireValue = document.getElementById(selectId).value;
    console.log("requireValue", requireValue);
    try {
      userTypeUpdateServer(requireValue, updateUserId);
    } catch (err) {
      dispatch(
        authSliceActions.errorMessageUpdate("Cannot change user type now!")
      );
    }
  };

  useEffect(() => {
    try {
      getUsers();
    } catch (err) {
      dispatch(
        authSliceActions.errorMessageUpdate(
          "Cannot get users data now! Try again later!"
        )
      );
    }
  }, []);

  useEffect(() => {
    if (
      usersData &&
      usersData.users &&
      Array.isArray(usersData.users) &&
      usersData.users.length > 0
    ) {
      const localStorageData = JSON.parse(localStorage.getItem("userData"));
      const currentUserId = localStorageData && localStorageData.userId;
      const currentUserFound = usersData.users.find((user) => {
        if (currentUserId) {
          return user._id.toString() === currentUserId.toString();
        }
      });
      //   console.log("currentUserFound:", currentUserFound);
      setCurrentUser(currentUserFound);
      if (currentUserFound && currentUserFound.userType) {
        setIsAdmin(currentUserFound.userType === "admin" ? true : false);
      }
      const usersListFound = usersData.users.filter((user) => {
        return user._id.toString() !== currentUserId.toString();
      });
      setUsersList(usersListFound);
    }
  }, [usersData]);

  useEffect(() => {
    console.log("errorMessage:", errorMessage);
  }, [errorMessage]);
  useEffect(() => {
    console.log("usersData:", usersData);
  }, [usersData]);
  useEffect(() => {
    console.log("currentUser:", currentUser);
  }, [currentUser]);
  useEffect(() => {
    console.log("usersList:", usersList);
  }, [usersList]);

  return (
    <div className={styles.contain}>
      <Helmet>
        <title>Users</title>
      </Helmet>
      <h2>Users</h2>
      {!errorMessage && (
        <div className={styles.upon}>
          <div className={styles["current-user"]}>
            <h3>Current User: {currentUser && currentUser.email}</h3>
            <p
              style={{
                color: isAdmin
                  ? "blue"
                  : currentUser && currentUser.userType === "counselor"
                  ? "green"
                  : "rgb(150 150 150)",
              }}
            >
              Type: {currentUser && currentUser.userType}
            </p>
          </div>
        </div>
      )}
      {!errorMessage && (
        <div className={styles.bottom}>
          <h3>User List</h3>
          {usersList &&
            Array.isArray(usersList) &&
            usersList.length > 0 &&
            usersList.map((user) => {
              return (
                <div key={user._id} className={styles["user-detail"]}>
                  <p>Email: {user.email ? user.email : "Not update yet"}</p>
                  <p>Name: {user.name ? user.name : "Not update yet"}</p>
                  <p>Phone: {user.phone ? user.phone : "Not update yet"}</p>
                  <p>
                    Address: {user.address ? user.address : "Not update yet"}
                  </p>
                  <div className={styles["user-type"]}>
                    <p>Type:</p>
                    {isAdmin ? (
                      <select
                        defaultValue={
                          user.userType ? user.userType : "Not update yet"
                        }
                        id={`select-${user._id}`}
                      >
                        <option>admin</option>
                        <option>counselor</option>
                        <option>normal</option>
                      </select>
                    ) : (
                      <p>{user.userType ? user.userType : "Not update yet"}</p>
                    )}
                    {isAdmin ? (
                      <button
                        onClick={() =>
                          userTypeUpdateHandle(`select-${user._id}`, user._id)
                        }
                      >
                        Change
                      </button>
                    ) : (
                      <p style={{ color: "rgb(150 150 150)" }}>Change</p>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      )}

      {errorMessage && (
        <p
          style={{
            color: "red",
            fontWeight: "600",
            textAlign: "center",
            border: "none",
          }}
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default UsersPage;
