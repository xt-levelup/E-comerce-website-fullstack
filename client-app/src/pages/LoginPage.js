import { Helmet } from "react-helmet";
import styles from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const signupHandle = () => {
    navigate("/register");
  };
  return (
    <div>
      <Helmet>
        <title>Login Page</title>
      </Helmet>
      <div className={styles.contain}>
        <div className={styles.content}>
          <h1>Sign Up</h1>
          <form>
            <div>
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
            </div>
            <button>SIGN IN</button>
          </form>
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
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
