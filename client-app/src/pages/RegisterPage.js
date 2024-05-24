import { Helmet } from "react-helmet";
import styles from "./RegisterPage.module.css";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const clickHandle = () => {
    navigate("/login");
  };

  return (
    <div>
      <Helmet>
        <title>RegisterPage</title>
      </Helmet>
      <div className={styles.contain}>
        <div className={styles.content}>
          <h1>Sign Up</h1>
          <form>
            <div>
              <input type="text" placeholder="Full Name" />
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <input type="number" placeholder="Phone" />
            </div>
            <button>SIGN UP</button>
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
