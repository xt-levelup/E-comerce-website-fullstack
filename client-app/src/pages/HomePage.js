import { Helmet } from "react-helmet";
import styles from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";
import iphone from "../images/product_1.png";
import mac from "../images/product_2.png";
import ipad from "../images/product_3.png";
import watch from "../images/product_4.png";
import airpod from "../images/product_5.png";

const HomePage = () => {
  const navigate = useNavigate();

  const browseCollectionButton = () => {
    navigate("/shop");
  };

  const imageNavigation = () => {
    navigate("/shop");
  };

  return (
    <div>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <div className={styles.banner}>
        <div className={styles.adverse}>
          <h4>NEW INSPIRATION 2024</h4>
          <h2>20% OFF ON NEW SEASON</h2>
          <button onClick={browseCollectionButton}>Browse collections</button>
        </div>
      </div>
      <div className={styles.categories}>
        <h4>CAREFULLY CREATED COLLECTIONS</h4>
        <h3>BROWSE OUR CATEGORIES</h3>
        <div className={styles["categories-01"]}>
          <div className={styles["categories-image"]}>
            <img src={iphone} alt="product_1.png" onClick={imageNavigation} />
          </div>
          <div className={styles["categories-image"]}>
            <img src={mac} alt="product_2.png" onClick={imageNavigation} />
          </div>
        </div>
        <div className={styles["categories-02"]}>
          <div className={styles["categories-image"]}>
            <img src={ipad} alt="product_3.png" onClick={imageNavigation} />
          </div>
          <div className={styles["categories-image"]}>
            <img src={watch} alt="product_4.png" onClick={imageNavigation} />
          </div>
          <div className={styles["categories-image"]}>
            <img src={airpod} alt="product_5.png" onClick={imageNavigation} />
          </div>
        </div>
      </div>
      <div className={styles.trending}>
        <div>
          <h4>MADE THE HARD WAY</h4>
          <h3>TOP TRENDING PRODUCTS</h3>
        </div>
        <div className={styles["trending-content"]}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={styles["trending-content"]}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className={styles.guaranty}>
        <div>
          <h3>FREE SHIPPING</h3>
          <p>Free shipping worldwide</p>
        </div>
        <div>
          <h3>24X7 SERVICE</h3>
          <p>Free shipping worldwide</p>
        </div>
        <div>
          <h3>FESTIVAL OFFER</h3>
          <p>Free shipping worldwide</p>
        </div>
      </div>
      <div className={styles["advise-register"]}>
        <div>
          <h2>LET'S BE FRIEND!</h2>
          <p>Register now for favors</p>
        </div>
        <div className={styles["advise-register-button"]}>
          <input type="email" placeholder="Enter your email address" />
          <button>Subscribe</button>
        </div>
      </div>
      <div className={styles["chat-icon"]}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
          />
        </svg>
      </div>
      <div className={styles["chat-window"]}>
        <div className={styles.header}>
          <h3>Customer Support</h3>
          <button>Let's Chat App</button>
        </div>
        <hr />
        <div>
          <div className={styles.client}>
            <p>Xin chao</p>
            <p>Lam the nao de xem san pham</p>
          </div>
          <div className={styles.admin}>
            <p>Chao ban</p>
            <p>Ban co the vao muc Shop</p>
          </div>
        </div>
        <hr />
        <div className={styles["chat-input"]}>
          <p>Icon</p>
          <input type="text" />
          <p>icon file</p>
          <p>icon emoji</p>
          <p>icon telegram</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
