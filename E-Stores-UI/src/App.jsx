import React from "react";
import { Outlet } from "react-router-dom";
import Starter from "./Context/Starter";
import Headers from "./Components/Headers";
import Footer from "./Components/Footer";

function App() {
  return (
    <>
      <Starter>
        <Headers />
        <Outlet />
        <Footer />
      </Starter>
    </>
  );
}

export default App;
