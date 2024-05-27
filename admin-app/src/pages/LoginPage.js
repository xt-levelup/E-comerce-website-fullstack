import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "./LoginPage.module.css";
import { authSliceActions } from "../store/authSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const saveToLocalStorage = (data) => {
    localStorage.setItem("userData", JSON.stringify(data));
  };
  const clearLocalStorage = () => {
    localStorage.removeItem("userData");
  };

  const email = useSelector((state) => {
    return state.authSlice.email;
  });

  const errorMessage = useSelector((state) => {
    return state.authSlice.errorMessage;
  });
  const auth = useSelector((state) => {
    return state.authSlice.auth;
  });
  const localStorageData = useSelector((state) => {
    return state.authSlice.localStorageData;
  });

  const [password, setPassword] = useState("");

  const loginHandle = async () => {
    const urlServer = "http://localhost:5000/login";
    const response = await fetch(urlServer, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      dispatch(
        authSliceActions.errorMessageUpdate(
          data && data.message
            ? data.message
            : data && data.msg
            ? data.msg
            : "Cannot login now! Please try again later!"
        )
      );
      dispatch(authSliceActions.authUpdate(false));
      clearLocalStorage();
    } else {
      dispatch(authSliceActions.errorMessageUpdate(null));
      dispatch(authSliceActions.emailUpdate(""));
      setPassword("");
      saveToLocalStorage(data);
      dispatch(
        authSliceActions.localStorageDataUpdate(
          JSON.parse(localStorage.getItem("userData"))
        )
      );
      dispatch(authSliceActions.authUpdate(true));
      navigate("/");
    }
  };

  const emailHandle = (event) => {
    dispatch(authSliceActions.emailUpdate(event.target.value));
  };
  const passwordHandle = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    console.log("email:", email);
  }, [email]);
  useEffect(() => {
    console.log("password:", password);
  }, [password]);
  useEffect(() => {
    console.log("auth:", auth);
  }, [auth]);
  useEffect(() => {
    console.log("localStorageData:", localStorageData);
  }, [localStorageData]);

  return (
    <div className={styles.contain}>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <h1>LoginPage</h1>
      {!auth && (
        <form>
          {errorMessage && (
            <p
              style={{ color: "red", fontWeight: "bold", textAlign: "center" }}
            >
              {errorMessage}
            </p>
          )}
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={emailHandle}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={passwordHandle}
            />
          </div>
          <button type="button" onClick={loginHandle}>
            LOG IN
          </button>
        </form>
      )}
      {auth && (
        <p style={{ color: "blue", fontWeight: "bold", textAlign: "center" }}>
          You are already login!
        </p>
      )}
    </div>
  );
};

export default LoginPage;
