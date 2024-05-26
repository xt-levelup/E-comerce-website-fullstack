import { Helmet } from "react-helmet";

import styles from "./AddProductPage.module.css";

const AddProductPage = () => {
  return (
    <div className={styles.contain}>
      <Helmet>
        <title>Add Product</title>
      </Helmet>
      <h2>AddProductPage</h2>
      <form>
        <div>
          <label>Product Name</label>
          <input type="text" placeholder="Enter Product Name" />
        </div>
        <div>
          <label>Category</label>
          <input type="text" placeholder="Enter Category" />
        </div>
        <div>
          <label>Short Description</label>
          <textarea
            placeholder="Enter Short Description"
            style={{ height: "72px" }}
          />
        </div>
        <div>
          <label>Long Description</label>
          <textarea
            placeholder="Enter Long Descrtiption"
            style={{ height: "120px" }}
          />
        </div>
        <div>
          <label>Upload image (5 images)</label>
          <input type="file" multiple />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddProductPage;
