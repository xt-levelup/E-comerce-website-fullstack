import { Helmet } from "react-helmet";
import styles from "./RegisterPage.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { authSliceActions } from "../store/auth";

const RegisterPage = () => {
  const dispatch = useDispatch();

  // const [errorMessage, setErrorMessage] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");

  const email = useSelector((state) => {
    return state.authSlice.email;
  });
  const name = useSelector((state) => {
    return state.authSlice.name;
  });
  const password = useSelector((state) => {
    return state.authSlice.password;
  });
  const phone = useSelector((state) => {
    return state.authSlice.phone;
  });
  const errorMessage = useSelector((state) => {
    return state.authSlice.errorMessage;
  });

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(authSliceActions.errorMessageUpdate(null));
  }, []);

  const clickHandle = () => {
    navigate("/login");
  };

  const emailHandle = (event) => {
    dispatch(authSliceActions.emailUpdate(event.target.value));
  };
  const nameHandle = (event) => {
    dispatch(authSliceActions.nameUpdate(event.target.value));
  };
  const passwordHandle = (event) => {
    dispatch(authSliceActions.passwordUpdate(event.target.value));
  };
  const confirmPasswordHandle = (event) => {
    setConfirmPassword(event.target.value);
  };
  const phoneHandle = (event) => {
    dispatch(authSliceActions.phoneUpdate(event.target.value));
  };

  const postRegister = async () => {
    console.log("CLicked postRegister!");
    const urlServer = "http://localhost:5000/signup";
    const response = await fetch(urlServer, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        name: name,
        password: password,
        confirmPassword: confirmPassword,
        phone: phone,
        userType: "normal",
      }),
    });
    const data = await response.json();
    console.log("data post register:", data);

    if (!response.ok) {
      // console.log("!response.ok!");
      dispatch(
        authSliceActions.errorMessageUpdate(
          data && data.message
            ? data.message
            : data && data.msg
            ? data.msg
            : "Something went wrong when signup!"
        )
      );
    } else {
      console.log("data post register:", data);
      dispatch(authSliceActions.errorMessageUpdate(null));
      dispatch(authSliceActions.emailUpdate(""));
      dispatch(authSliceActions.passwordUpdate(""));
      dispatch(authSliceActions.nameUpdate(""));
      dispatch(authSliceActions.phoneUpdate(""));
      navigate("/login");
    }
  };

  useEffect(() => {
    console.log("email:", email);
  }, [email]);
  useEffect(() => {
    console.log("name:", name);
  }, [name]);
  useEffect(() => {
    console.log("password:", password);
  }, [password]);
  useEffect(() => {
    console.log("confirmPassword:", confirmPassword);
  }, [confirmPassword]);
  useEffect(() => {
    console.log("phone:", phone);
  }, [phone]);
  useEffect(() => {
    console.log("errorMessage:", errorMessage);
  }, [errorMessage]);

  return (
    <div>
      <Helmet>
        <title>RegisterPage</title>
      </Helmet>
      <div className={styles.contain}>
        <div className={styles.content}>
          <h1>Sign Up</h1>
          <form>
            {errorMessage && (
              <p
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "red",
                }}
              >
                {errorMessage}
              </p>
            )}
            <div>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={nameHandle}
              />
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
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={confirmPasswordHandle}
              />
              <input
                type="number"
                placeholder="Phone"
                value={phone}
                onChange={phoneHandle}
              />
            </div>
            <button type="button" onClick={postRegister}>
              SIGN UP
            </button>
          </form>
          <div className={styles.click}>
            <p>Login</p>
            <p>?</p>
            <p
              style={{ color: "blue", cursor: "pointer" }}
              onClick={clickHandle}
            >
              Click
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
