import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./AddProductPage.module.css";
import { authSliceActions } from "../store/authSlice";
import { fetchProductsSliceAction } from "../store/fetchProductsSlice";

const AddProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const productId = params.productId;
  const errorMessage = useSelector((state) => {
    return state.authSlice.errorMessage;
  });
  const auth = useSelector((state) => {
    return state.authSlice.auth;
  });
  const productData = useSelector((state) => {
    return state.fetchProductsSlice.productData;
  });

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [longDesc, setLongDesc] = useState("");
  const [images, setImages] = useState(null);
  const [initQuantity, setInitQuantity] = useState(0);
  const [inventoryQuantity, setInventoryQuantity] = useState(0);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("userData"))) {
      dispatch(fetchProductsSliceAction());
    }
  }, []);

  useEffect(() => {
    if (productId) {
      const editData =
        productData &&
        Array.isArray(productData) &&
        productData.find((product) => {
          return product._id.toString() === productId.toString();
        });
      if (editData) {
        setName(editData.name);
        setPrice(editData.price);
        setCategory(editData.category);
        setShortDesc(editData.short_desc);
        setLongDesc(editData.long_desc);
        setInitQuantity(editData.initQuantity);
        setInventoryQuantity(editData.inventoryQuantity);
      }
    }
  }, [productData]);

  const nameHandle = (event) => {
    setName(event.target.value);
  };
  const priceHandle = (event) => {
    setPrice(event.target.value);
  };
  const categoryHandle = (event) => {
    setCategory(event.target.value);
  };
  const shortDescHandle = (event) => {
    setShortDesc(event.target.value);
  };
  const longDescHandle = (event) => {
    setLongDesc(event.target.value);
  };
  const initQuantityHandle = (event) => {
    setInitQuantity(event.target.value);
  };
  const inventoryQuantityHandle = (event) => {
    setInventoryQuantity(event.target.value);
  };

  const imagesHandle = (event) => {
    const uploadedImages = Array.from(event.target.files);
    setImages(uploadedImages);
  };

  const addProductHandle = async (event) => {
    event.preventDefault();
    const urlServer = productId
      ? "http://localhost:5000/editProduct"
      : "http://localhost:5000/addProduct";

    const localStorageData = JSON.parse(localStorage.getItem("userData"));
    const token = localStorageData && localStorageData.token;
    const userId = localStorageData && localStorageData.userId;
    const formData = new FormData();
    formData.append("id", productId ? productId : null);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("shortDesc", shortDesc);
    formData.append("longDesc", longDesc);
    formData.append("initQuantity", initQuantity);
    formData.append("inventoryQuantity", inventoryQuantity);
    formData.append("userId", userId);
    formData.append("productId", productId);

    if (images && images.length > 5) {
      dispatch(
        authSliceActions.errorMessageUpdate("Please choose max to 5 images!")
      );
      return;
    }

    if (images && images.length) {
      for (let i = 0; i < images.length; i++) {
        // console.log(`images${i}:`, images[i]);
        formData.append("imageFiles", images[i]);
      }
    }

    const response = await fetch(urlServer, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    });
    const data = await response.json();
    if (!response.ok) {
      if (
        (data && data.message === "Wrong token!") ||
        (data && data.message === "jwt expired") ||
        (data && data.message === "jwt malformed")
      ) {
        localStorage.removeItem("userData");
        dispatch(authSliceActions.authUpdate(false));
        dispatch(
          authSliceActions.errorMessageUpdate(
            "Please login again! Your login is expired or something wrong!"
          )
        );
      } else {
        dispatch(
          authSliceActions.errorMessageUpdate(
            data && data.message
              ? data.message
              : data && data.msg
              ? data.msg
              : "Cannot add product now! Maybe you login again or Please trying later!"
          )
        );
      }
    } else {
      dispatch(authSliceActions.errorMessageUpdate(null));
      navigate("/product");
    }
  };

  const closeErrorMessage = () => {
    dispatch(authSliceActions.errorMessageUpdate(null));
  };

  return (
    <div className={styles.contain}>
      <Helmet>
        <title>Add Product</title>
      </Helmet>
      <h2>{productId ? "Edit The Product" : "Add Product Page"}</h2>
      {auth && (
        <form>
          {errorMessage && (
            <div
              style={{
                position: "fixed",
                transform: "translate(-50%,-50%)",
                width: "50%",
                // height: "20%",
                backgroundColor: "rgb(190 190 190)",
                top: "50%",
                left: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "12px",
                gap: "1em",
                padding: "1em",
              }}
            >
              <p
                style={{
                  color: "red",
                  textAlign: "center",
                  border: "none",
                  fontWeight: "bold",
                }}
              >
                {errorMessage}
              </p>
              <button
                style={{ height: "36px", width: "36px" }}
                onClick={closeErrorMessage}
              >
                X
              </button>
            </div>
          )}
          <div>
            <label>Product Name</label>
            <input
              type="text"
              placeholder="Enter Product Name"
              value={name}
              onChange={nameHandle}
            />
          </div>
          <div>
            <label>Price</label>
            <input
              type="number"
              placeholder="Enter Price"
              value={price}
              onChange={priceHandle}
              min="1"
            />
          </div>
          <div>
            <label>Category</label>
            <input
              type="text"
              placeholder="Enter Category"
              value={category}
              onChange={categoryHandle}
            />
          </div>
          <div>
            <label>Short Description</label>
            <textarea
              placeholder="Enter Short Description"
              style={{ height: "72px" }}
              value={shortDesc}
              onChange={shortDescHandle}
            />
          </div>
          <div>
            <label>Long Description</label>
            <textarea
              placeholder="Enter Long Descrtiption"
              style={{ height: "120px" }}
              value={longDesc}
              onChange={longDescHandle}
            />
          </div>
          <div>
            <label>Upload image (max 5 images)</label>

            <input
              type="file"
              name="imageName"
              multiple
              accept="image/*"
              onChange={imagesHandle}
            />
          </div>
          <div>
            <label>Init Quantity</label>
            <input
              type="number"
              min="1"
              style={{ width: "210px", textAlign: "center" }}
              placeholder="Init Quantity"
              value={initQuantity}
              onChange={initQuantityHandle}
            />
          </div>
          <div>
            <label>Inventory Quantity</label>
            <input
              type="number"
              min="1"
              style={{ width: "210px", textAlign: "center" }}
              placeholder="Inventory Quantity"
              value={inventoryQuantity}
              onChange={inventoryQuantityHandle}
            />
          </div>
          <button type="button" onClick={addProductHandle}>
            Submit
          </button>
        </form>
      )}
      {!auth && (
        <p
          style={{
            color: "red",
            textAlign: "center",
            fontWeight: "600",
            fontSize: "18px",
          }}
        >
          Login to access data!
        </p>
      )}
    </div>
  );
};

export default AddProductPage;
