import React from "react";
import { Outlet } from "react-router-dom";
import Headers from "./Components/Headers";
import Footer from "./Components/Footer";
import { useAuth } from "./Hooks/useAuth";
import SellerBin from "./Context/SellerBin";

function App() {
  const { auth } = useAuth();
  const { roles } = auth;

  const body = () => {
    return (
      <>
        <Headers />
        <Outlet />
        <Footer />
      </>
    );
  };
  
  return (
    <>
      {roles.includes("SELLER") ? (
        <SellerBin>
          {body}
        </SellerBin>
      ) : (
        <>
          {body}
        </>
      )}
    </>
  );
}

export default App;
