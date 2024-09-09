import React from "react";
import { Outlet } from "react-router-dom";
import Headers from "./Pages/Util/Headers";
import Footer from "./Pages/Util/Footer";
import Starter from "./Context/Starter";

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
