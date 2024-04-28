import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "../../App";
import { navs } from "./Navigations";
import { useAuth } from "../Context/AuthProvider";
const LazyExplore = React.lazy(() => import ("../Public/Explore"))

const AllRoutes = () => {
  const { auth } = useAuth();
  const { authenticated, role } = auth;

  return (
    <Routes>
        <Route path="/" element={<App />}>
          {role !== "SELLER" && role !== "ADMIN" && role !== "SUPER_ADMIN" && (
            <Route path="/explore" element={
              <React.Suspense fallback="Loading...">
                <LazyExplore />
              </React.Suspense>
            } />
          )}

          {navs.map((nav, i) => {
            if (authenticated) {
              if (nav.isVisibleAfterLogin) {
                if (nav.authorizedTo.includes("ALL")){
                  return <Route key={i} path={nav.path} element={nav.element} />;
                }
                else if (nav.authorizedTo.includes(role)){
                  return <Route key={i} path={nav.path} element={nav.element} />;
                }
              }
            } else if (!nav.isPrivate){
              return <Route key={i} path={nav.path} element={nav.element} />;
            }
          })}
        </Route>
    </Routes>
  );
};

export default AllRoutes;
