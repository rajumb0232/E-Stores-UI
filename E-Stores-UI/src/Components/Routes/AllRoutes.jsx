import React, { Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import App from "../../App";
import {
  noAuthRoutes,
  preAuthRoutes,
  commonPostAuthRoutes,
  customerRoutes,
  sellerRoutes,
} from "./Navigations";
import { useAuth } from "../Auth/AuthProvider";

const AllRoutes = () => {
  const {
    auth: { authenticated, roles },
  } = useAuth();
  

  const generateRoutes = (routesList) =>
    routesList.map((route, index) => {
      console.log(route.path);
      return (
        <Route key={index} path={route.path} element={route.element}>
          {route.subRoutes && generateRoutes(route.subRoutes)}
        </Route>
      );
    });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<App />}>
          {/* Public Routes */}
          {generateRoutes(noAuthRoutes)}

          {/* Pre Authentication Routes */}
          {!authenticated && generateRoutes(preAuthRoutes)}

          {/* Common Post Authentication Routes */}
          {authenticated && generateRoutes(commonPostAuthRoutes)}

          {/* Seller Routes */}
          {authenticated &&
            roles.includes("SELLER") &&
            generateRoutes(sellerRoutes)}

          {/* Customer Routes */}
          {authenticated &&
            roles.includes("CUSTOMER") &&
            generateRoutes(customerRoutes)}

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AllRoutes;
