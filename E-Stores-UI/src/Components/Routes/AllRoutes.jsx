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
  const [role1, role2] = roles;

  const route = (index, path, element) => (
    <Route key={index} path={path} element={element} />
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<App />}>

          {/* Public Routes */}
          {noAuthRoutes.map((r, i) => route(i, r.path, r.element))}

          {/* Pre Authentication Routes */}
          {!authenticated &&
            preAuthRoutes.map((r, i) => route(i, r.path, r.element))}\
          
          {/* Common Post Authentication Routes */}
          {authenticated &&
            commonPostAuthRoutes.map((r, i) => route(i, r.path, r.element))}

          {/* Seller Routes */}
          {authenticated &&
            roles.includes("SELLER") &&
            sellerRoutes.map((r, i) => route(i, r.path, r.element))}

          {/* Customer Routes */}
          {authenticated &&
            roles.includes("CUSTOMER") &&
            customerRoutes.map((r, i) => route(i, r.path, r.element))}

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" />} />
          
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AllRoutes;

// {
//   navs.map((nav, i) => {
//     if (authenticated) {
//       /* making sure that only routes that should be availabel ofter login is returned */
//       if (nav.isVisibleAfterLogin) {
//         /* two if conditions makes sure that routes with specific to that role is only returned */
//         if (nav.authorizedTo.includes(role2)) {
//           return <Route key={i} path={nav.path} element={nav.element} />;
//         }
//         if (nav.authorizedTo.includes(role1)) {
//           return <Route key={i} path={nav.path} element={nav.element} />;
//         }
//       }
//       /* if the user is not logged in, the routes that are not private is returned */
//     } else if (!nav.isPrivate) {
//       return <Route key={i} path={nav.path} element={nav.element} />;
//     }
//   });
// }
