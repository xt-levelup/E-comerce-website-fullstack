import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { lazy, Suspense } from "react";

const MainLayout = lazy(() => {
  return import("./layout/MainLayout.js");
});
const HomePage = lazy(() => {
  return import("./pages/HomePage.js");
});
const ChatPage = lazy(() => {
  return import("./pages/ChatPage.js");
});
const AddProductPage = lazy(() => {
  return import("./pages/AddProductPage.js");
});
const LoginPage = lazy(() => {
  return import("./pages/LoginPage.js");
});
const SignupPage = lazy(() => {
  return import("./pages/SignupPage.js");
});
const ProductPage = lazy(() => {
  return import("./pages/ProductPage.js");
});
const UsersPage = lazy(() => {
  return import("./pages/UsersPage.js");
});

const App = () => {
  const loading = <p style={{ textAlign: "center" }}>Loading page ...</p>;
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={loading}>
          <MainLayout />
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={loading}>
              <HomePage />
            </Suspense>
          ),
        },
        {
          path: "chat",
          element: (
            <Suspense fallback={loading}>
              <ChatPage />
            </Suspense>
          ),
        },
        {
          path: "product",
          element: (
            <Suspense fallback={loading}>
              <ProductPage />
            </Suspense>
          ),
        },
        {
          path: "add-product",
          element: (
            <Suspense fallback={loading}>
              <AddProductPage />
            </Suspense>
          ),
        },
        {
          path: "add-product/:productId",
          element: (
            <Suspense fallback={loading}>
              <AddProductPage />
            </Suspense>
          ),
        },
        {
          path: "login",
          element: (
            <Suspense fallback={loading}>
              <LoginPage />
            </Suspense>
          ),
        },
        {
          path: "signup",
          element: (
            <Suspense fallback={loading}>
              <SignupPage />
            </Suspense>
          ),
        },
        {
          path: "users-page",
          element: (
            <Suspense fallback={loading}>
              <UsersPage />
            </Suspense>
          ),
        },
        {
          path: "*",
          element: <Navigate to="/" />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
