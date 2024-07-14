import React, { Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import App from "../../App";
import { navs } from "./Navigations";
import { useAuth } from "../Auth/AuthProvider";

const AllRoutes = () => {
  const { auth } = useAuth();
  const { authenticated, roles } = auth;
  const [role1, role2] = roles;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<App />}>
          {navs.map((nav, i) => {
            if (authenticated) {
              /* making sure that only routes that should be availabel ofter login is returned */
              if (nav.isVisibleAfterLogin) {
                /* two if conditions makes sure that routes with specific to that role is only returned */
                if (nav.authorizedTo.includes(role2)) {
                  return (
                    <Route key={i} path={nav.path} element={nav.element} />
                  );
                }
                if (nav.authorizedTo.includes(role1)) {
                  return (
                    <Route key={i} path={nav.path} element={nav.element} />
                  );
                }
              }
              /* if the user is not logged in, the routes that are not private is returned */
            } else if (!nav.isPrivate) {
              return <Route key={i} path={nav.path} element={nav.element} />;
            }
          })}
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AllRoutes;
