import { Helmet } from "react-helmet";
import styles from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import { authSliceActions } from "../store/auth";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const errorMessage = useSelector((state) => {
    return state.authSlice.errorMessage;
  });
  const email = useSelector((state) => {
    return state.authSlice.email;
  });
  const password = useSelector((state) => {
    return state.authSlice.password;
  });
  const author = useSelector((state) => {
    return state.authSlice.author;
  });

  useEffect(() => {
    dispatch(authSliceActions.errorMessageUpdate(null));
  }, []);

  const emailHandle = (event) => {
    dispatch(authSliceActions.emailUpdate(event.target.value));
  };
  const passwordHandle = (event) => {
    dispatch(authSliceActions.passwordUpdate(event.target.value));
  };

  const signupHandle = () => {
    navigate("/register");
  };

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
            : "Something went wrong under login!"
        )
      );
      return;
    } else {
      dispatch(authSliceActions.errorMessageUpdate(null));
      console.log("data post singin:", data);
      localStorage.setItem("user", JSON.stringify(data));
      dispatch(
        authSliceActions.authorUpdate(JSON.parse(localStorage.getItem("user")))
      );
      dispatch(authSliceActions.emailUpdate(""));
      dispatch(authSliceActions.passwordUpdate(""));
      navigate("/");
    }
  };

  useEffect(() => {
    console.log("errorMessage:", errorMessage);
  }, [errorMessage]);
  useEffect(() => {
    console.log("email:", email);
  }, [email]);
  useEffect(() => {
    console.log("password:", password);
  }, [password]);
  useEffect(() => {
    console.log("author:", author);
  }, [author]);

  return (
    <div>
      <Helmet>
        <title>Login Page</title>
      </Helmet>
      <div className={styles.contain}>
        <div className={styles.content}>
          <h1>Login</h1>
          {!author && (
            <form>
              {errorMessage && (
                <p
                  style={{
                    textAlign: "center",
                    color: "red",
                    fontWeight: "bold",
                  }}
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
                SIGN IN
              </button>
            </form>
          )}
          {!author && (
            <div className={styles.click}>
              <p>Create an account</p>
              <p>?</p>
              <p
                style={{ color: "blue", cursor: "pointer" }}
                onClick={signupHandle}
              >
                Sign up
              </p>
            </div>
          )}
          {author && (
            <p
              style={{
                alignItems: "center",
                color: "blue",
                fontWeight: "bold",
              }}
            >
              You are has already login!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
