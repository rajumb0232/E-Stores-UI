import React from "react";

const LazyAccount = React.lazy(() => import("../Private/Common/Account"));

const LazyResetCredentials = React.lazy(() =>
  import("../Private/Common/ResetCredentials")
);

const LazyUpdateProfile = React.lazy(() =>
  import("../Private/Common/UpdateProfile")
);

const LazyCart = React.lazy(() => import("../Private/Customer/Cart"));

const LazyWishlist = React.lazy(() => import("../Private/Customer/Wishlist"));

const LazyAddUpdateProduct = React.lazy(() =>
  import("../Private/Seller/AddUpdateProduct")
);

const LazyOrders = React.lazy(() => import("../Private/Seller/Orders"));

const LazySellerDashboard = React.lazy(() =>
  import("../Private/Seller/SellerDashboard")
);

const LazyRegister = React.lazy(() => import("../Public/LoginAndRegister"));

const LazyVerifyOTP = React.lazy(() => import("../Public/VerifyOTP"));

const LazySetUpStoreAndRelated = React.lazy(() =>
  import("../Private/Seller/SetUpStoreAndRelated")
);

const LazyLogout = React.lazy(() => import("../Private/Common/Logout"));

const LazyExplore = React.lazy(() => import("../Public/Explore"));

export const navs = [
  /** ---------------------------------AUTH--------------------------------- */
  {
    path: "/seller/register",
    element: <LazyRegister role={"SELLER"} isLogin={false} />,
    isPrivate: false,
    isVisibleAfterLogin: false,
  },
  {
    path: "/customer/register",
    element: <LazyRegister role={"CUSTOMER"} isLogin={false} />,
    isPrivate: false,
    isVisibleAfterLogin: false,
  },
  {
    path: "/login",
    element: <LazyRegister role={""} isLogin={true} />,
    isPrivate: false,
    isVisibleAfterLogin: false,
  },
  {
    path: "/verify-email",
    element: <LazyVerifyOTP />,
    isPrivate: false,
    isVisibleAfterLogin: false,
  },
  {
    path: "/logout",
    element: <LazyLogout />,
    isPrivate: true,
    isVisibleAfterLogin: true,
    authorizedTo: ["SELLER", "CUSTOMER"],
  },

  /** ---------------------------------COMMON--------------------------------- */
  {
    path: "/account",
    element: <LazyAccount />,
    isPrivate: true,
    isVisibleAfterLogin: true,
    authorizedTo: ["SELLER", "CUSTOMER"],
  },
  {
    path: "/reset-credentials",
    element: <LazyResetCredentials />,
    isPrivate: true,
    isVisibleAfterLogin: true,
    authorizedTo: ["SELLER", "CUSTOMER"],
  },
  {
    path: "/update-profile",
    element: <LazyUpdateProfile />,
    isPrivate: true,
    isVisibleAfterLogin: true,
    authorizedTo: ["SELLER", "CUSTOMER"],
  },

  /** ---------------------------------CUSTOMER--------------------------------- */
  {
    path: "/",
    element: <LazyExplore />,
    isPrivate: false,
    isVisibleAfterLogin: true,
    authorizedTo: ["CUSTOMER"],
  },
  {
    path: "/cart",
    element: <LazyCart />,
    isPrivate: true,
    isVisibleAfterLogin: true,
    authorizedTo: ["CUSTOMER"],
  },
  {
    path: "/wishlist",
    element: <LazyWishlist />,
    isPrivate: true,
    isVisibleAfterLogin: true,
    authorizedTo: ["CUSTOMER"],
  },

  /** ---------------------------------SELLER--------------------------------- */
  {
    path: "/dashboard",
    element: <LazySellerDashboard />,
    isPrivate: true,
    isVisibleAfterLogin: true,
    authorizedTo: ["SELLER"],
  },
  {
    path: "/add-product",
    element: <LazyAddUpdateProduct />,
    isPrivate: true,
    isVisibleAfterLogin: true,
    authorizedTo: ["SELLER"],
  },
  {
    path: "/update-product",
    element: <LazyAddUpdateProduct />,
    isPrivate: true,
    isVisibleAfterLogin: true,
    authorizedTo: ["SELLER"],
  },
  {
    path: "/orders",
    element: <LazyOrders />,
    isPrivate: true,
    isVisibleAfterLogin: true,
    authorizedTo: ["SELLER", "CUSTOMER"],
  },
  {
    path: "/setup-store",
    element: <LazySetUpStoreAndRelated />,
    isPrivate: true,
    isVisibleAfterLogin: true,
    authorizedTo: ["SELLER"],
  },
];
