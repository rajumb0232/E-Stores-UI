import React from "react";
const LazyAccount = React.lazy(() => import("../Components/Private/Common/Account"));
const LazyResetCredentials = React.lazy(() => import("../Components/Private/Common/ResetCredentials"));
const LazyUpdateProfile = React.lazy(() => import("../Components/Private/Common/UpdateProfile"));
const LazyCart = React.lazy(() => import("../Components/Private/Customer/Cart"));
const LazyWishlist = React.lazy(() => import("../Components/Private/Customer/Wishlist"));
const LazyAddUpdateProduct = React.lazy(() => import("../Components/Private/Seller/AddUpdateProduct"));
const LazyOrders = React.lazy(() => import("../Components/Private/Seller/Orders"));
const LazySellerDashboard = React.lazy(() => import("../Components/Private/Seller/SellerDashboard"));
const LazyRegister = React.lazy(() => import("../Components/Public/LoginAndRegister"));
const LazyVerifyOTP = React.lazy(() => import("../Components/Public/VerifyOTP"));
const LazySetUpStoreAndRelated = React.lazy(() => import("../Components/Private/Seller/SetUpStoreAndRelated"));
const LazyLogout = React.lazy(() => import("../Components/Private/Common/Logout"));
const LazyExplore = React.lazy(() => import("../Components/Public/Explore"));
const LazyProducts = React.lazy(() => import("../Components/Private/Seller/Products"))
const LazyStore = React.lazy(() => import("../Components/Private/Seller/Store"))
export const preAuthRoutes = [
  {
    path: "seller/register",
    element: <LazyRegister role={"SELLER"} isLogin={false} />,
  },
  {
    path: "customer/register",
    element: <LazyRegister role={"CUSTOMER"} isLogin={false} />,
  },
  {
    path: "login",
    element: <LazyRegister role={""} isLogin={true} />,
  },
  {
    path: "verify-email",
    element: <LazyVerifyOTP />,
  }
]

export const noAuthRoutes = [
  {
    path: "/",
    element: <LazyExplore />,
  }
]

export const commonPostAuthRoutes = [
  {
    path: "account",
    element: <LazyAccount />,
  },
  {
    path: "reset-credentials",
    element: <LazyResetCredentials />,
  },
  {
    path: "update-profile",
    element: <LazyUpdateProfile />,
  },
  {
    path: "logout",
    element: <LazyLogout/>
  }
]

export const customerRoutes = [
  {
    path: "cart",
    element: <LazyCart />,
  },
  {
    path: "wishlist",
    element: <LazyWishlist />,
  }
]

export const sellerRoutes = [
  {
    path: "dashboard",
    element: <LazySellerDashboard />,
    subRoutes: [
      {
        path: "products",
        element: <LazyProducts/>
      },
      {
        path: "add-product",
        element: <LazyAddUpdateProduct update={false}/>,
      },
      {
        path: "update-product",
        element: <LazyAddUpdateProduct update={true}/>,
      },
      {
        path: "orders",
        element: <LazyOrders />,
      },
      {
        path: "store",
        element: <LazyStore />,
      },
    ]
  },
  {
    path: "setup-store",
    element: <LazySetUpStoreAndRelated />,
  }
]