import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import styles from "./SignupPage.module.css";
import { authSliceActions } from "../store/authSlice";

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const email = useSelector((state) => {
    return state.authSlice.email;
  });
  const name = useSelector((state) => {
    return state.authSlice.name;
  });
  const phone = useSelector((state) => {
    return state.authSlice.phone;
  });
  const errorMessage = useSelector((state) => {
    return state.authSlice.errorMessage;
  });

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const emailHandle = (event) => {
    dispatch(authSliceActions.emailUpdate(event.target.value));
  };
  const nameHandle = (event) => {
    dispatch(authSliceActions.nameUpdate(event.target.value));
  };
  const phoneHandle = (event) => {
    dispatch(authSliceActions.phoneUpdate(event.target.value));
  };
  const passwordHandle = (event) => {
    setPassword(event.target.value);
  };
  const confirmPasswordHandle = (event) => {
    setConfirmPassword(event.target.value);
  };

  const signupHandle = async () => {
    const urlServer = "http://localhost:5000/signup";
    const response = await fetch(urlServer, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        name: name,
        phone: phone,
        userType: "counselor",
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
            : "Cannot signup now!"
        )
      );
    } else {
      dispatch(authSliceActions.errorMessageUpdate(null));
      dispatch(authSliceActions.emailUpdate(""));
      dispatch(authSliceActions.phoneUpdate(""));
      setConfirmPassword("");
      setPassword("");
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
    console.log("phone:", phone);
  }, [phone]);
  useEffect(() => {
    console.log("confirmPassword:", confirmPassword);
  }, [confirmPassword]);
  useEffect(() => {
    console.log("errorMessage:", errorMessage);
  }, [errorMessage]);

  return (
    <div className={styles.contain}>
      <Helmet>
        <title>Sign up</title>
      </Helmet>
      <h1>SignupPage</h1>
      <form>
        {errorMessage && (
          <p style={{ color: "red", textAlign: "center", fontWeight: "bold" }}>
            {errorMessage}
          </p>
        )}
        <div>
          <input type="text" placeholder="Full Name" onChange={nameHandle} />
          <input type="email" placeholder="Email" onChange={emailHandle} />
          <input
            type="password"
            placeholder="Password"
            onChange={passwordHandle}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            onChange={confirmPasswordHandle}
          />
          <input type="number" placeholder="Phone" onChange={phoneHandle} />
        </div>
        <button type="button" onClick={signupHandle}>
          SIGN UP
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
