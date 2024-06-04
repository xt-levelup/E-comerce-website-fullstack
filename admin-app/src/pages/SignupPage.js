import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./SignupPage.module.css";
import { authSliceActions } from "../store/authSlice";

// --- TRANG ĐĂNG KÝ DÀNH CHO KHÁCH HÀNG --------------------

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

  useEffect(() => {
    dispatch(authSliceActions.errorMessageUpdate(null));
  }, []);

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

  // --- Gửi thông tin về server để đăng ký ------------------
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
  // ------------------------------------------------------------

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
            onChange={passwordHandle}
            value={password}
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
        <button type="button" onClick={signupHandle}>
          SIGN UP
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
