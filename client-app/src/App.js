import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { lazy, Suspense } from "react";

const MainLayout = lazy(() => {
  return import("./layout/MainLayout.js");
});
const CartPage = lazy(() => {
  return import("./pages/CartPage.js");
});
const CheckoutPage = lazy(() => {
  return import("./pages/CheckoutPage.js");
});
const DetailPage = lazy(() => {
  return import("./pages/DetailPage.js");
});
const HomePage = lazy(() => {
  return import("./pages/HomePage.js");
});
const LoginPage = lazy(() => {
  return import("./pages/LoginPage.js");
});
const RegisterPage = lazy(() => {
  return import("./pages/RegisterPage.js");
});
const ShopPage = lazy(() => {
  return import("./pages/ShopPage.js");
});
const HistoryPage = lazy(() => {
  return import("./pages/HistoryPage.js");
});
const HistoryDetail = lazy(() => {
  return import("./pages/HistoryDetail.js");
});

const App = () => {
  const loading = (
    <p style={{ textAlign: "center", margin: "3em 0" }}>Loading page ...</p>
  );

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
          path: "shop",
          element: (
            <Suspense fallback={loading}>
              <ShopPage />
            </Suspense>
          ),
        },
        {
          path: "cart",
          element: (
            <Suspense fallback={loading}>
              <CartPage />
            </Suspense>
          ),
        },
        {
          path: "checkout",
          element: (
            <Suspense fallback={loading}>
              <CheckoutPage />
            </Suspense>
          ),
        },
        {
          path: "checkout",
          element: (
            <Suspense fallback={loading}>
              <CheckoutPage />
            </Suspense>
          ),
        },
        {
          path: "detail",
          element: (
            <Suspense fallback={loading}>
              <DetailPage />
            </Suspense>
          ),
        },
        {
          path: "detail/:productId",
          element: (
            <Suspense fallback={loading}>
              <DetailPage />
            </Suspense>
          ),
        },
        {
          path: "history",
          element: (
            <Suspense fallback={loading}>
              <HistoryPage />
            </Suspense>
          ),
        },
        {
          path: "history-detail/:orderId",
          element: (
            <Suspense fallback={loading}>
              <HistoryDetail />
            </Suspense>
          ),
        },
        {
          path: "register",
          element: (
            <Suspense fallback={loading}>
              <RegisterPage />
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
          path: "*",
          element: <Navigate to="/" />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
