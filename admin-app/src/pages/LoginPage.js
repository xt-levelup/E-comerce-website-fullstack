import { Helmet } from "react-helmet";

import styles from "./LoginPage.module.css";

const LoginPage = () => {
  return (
    <div className={styles.contain}>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <h1>LoginPage</h1>
      <form>
        <div>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
        </div>
        <button type="button">LOG IN</button>
      </form>
    </div>
  );
};

export default LoginPage;
