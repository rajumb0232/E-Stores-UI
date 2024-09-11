import React from "react";
import { Outlet } from "react-router-dom";
import Headers from "./Components/Headers";
import Footer from "./Components/Footer";
import { useAuth } from "./Hooks/useAuth";
import SellerBin from "./Context/SellerBin";

function App() {
  const { auth } = useAuth();
  const { roles } = auth;
  return (
    <>
      {roles.includes("SELLER") ? (
        <SellerBin>
          <Headers />
          <Outlet />
          <Footer />
        </SellerBin>
      ) : (
        <>
          <Headers />
          <Outlet />
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
