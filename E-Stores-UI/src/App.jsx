import React from "react";
import { Outlet } from "react-router-dom";
import Starter from "./Context/Starter";
import Headers from "./Components/Headers";
import Footer from "./Components/Footer";
import { useAuth } from "./Hooks/useAuth";

function App() {
  const { auth } = useAuth();
  const { roles } = auth;
  return (
    <>
      {roles.includes("SELLER") ? (
        <Starter>
          <Headers />
          <Outlet />
          <Footer />
        </Starter>
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
