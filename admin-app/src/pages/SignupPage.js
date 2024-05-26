import { Helmet } from "react-helmet";

import styles from "./SignupPage.module.css";

const SignupPage = () => {
  return (
    <div className={styles.contain}>
      <Helmet>
        <title>Sign up</title>
      </Helmet>
      <h1>SignupPage</h1>
      <form>
        <div>
          <input type="text" placeholder="Full Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input type="password" placeholder="Confirm Password" />
          <input type="number" placeholder="Phone" />
        </div>
        <button type="button">SIGN UP</button>
      </form>
    </div>
  );
};

export default SignupPage;
