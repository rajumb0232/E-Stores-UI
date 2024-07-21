import React from "react";
import { Outlet } from "react-router-dom";
import Headers from "./Components/Util/Headers";
import Footer from "./Components/Util/Footer";
import Starter from "./Components/Context/Starter";

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
