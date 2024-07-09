import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
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
              if (nav.isVisibleAfterLogin) {
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
            } else if (!nav.isPrivate) {
              return <Route key={i} path={nav.path} element={nav.element} />;
            }
          })}
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AllRoutes;
