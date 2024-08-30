import React, { Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import App from "../../App";
import {
  navs,
  noAuthRoutes,
  preAuthRoutes,
  commonPostAuthRoutes,
  customerRoutes,
  sellerRoutes,
} from "./Navigations";
import { useAuth } from "../Auth/AuthProvider";

const AllRoutes = () => {
  const { auth } = useAuth();
  const { authenticated, roles } = auth;

  const route = (index, path, element) => (
    <Route key={index} path={path} element={element} />
  );

  const routes = (list) =>
    list.map((item, index) => (
      <Route key={index} path={item.path} element={item.element} />
    ));

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<App />}>
          {/* Public Routes */}
          {route(noAuthRoutes)}

          {/* Pre Authentication Routes */}
          {!authenticated && route(preAuthRoutes)}

          {/* Common Post Authentication Routes */}
          {authenticated && routes(commonPostAuthRoutes)}

          {/* Seller Routes */}
          {authenticated && roles.includes("SELLER") && routes(sellerRoutes)}

          {/* Customer Routes */}
          {authenticated &&
            roles.includes("CUSTOMER") &&
            routes(customerRoutes)}

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AllRoutes;
