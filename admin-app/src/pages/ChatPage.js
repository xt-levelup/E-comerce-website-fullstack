import { Helmet } from "react-helmet";

import styles from "./ChatPage.module.css";

const ChatPage = () => {
  return (
    <div className={styles.contain}>
      <Helmet>
        <title>Chat Room</title>
      </Helmet>
      <div>
        <h2>ChatPage</h2>
        <p>Apps / Chat</p>
      </div>
      <div className={styles.action}>
        <div className={styles["list-users"]}>
          <div>
            <input type="text" placeholder="Search Contact" />
          </div>
          <div>
            <div>
              <p>icon</p>
              <p>iduser</p>
            </div>
            <div>
              <p>icon</p>
              <p>iduser</p>
            </div>
          </div>
        </div>
        <div className={styles.messages}>
          <div className={styles["message-content"]}>
            <p>Chat 1</p>
            <p>Chat 2</p>
            <p>Chat ...</p>
          </div>
          <div className={styles["message-enter"]}>
            <input type="text" />
            <p>icon</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
