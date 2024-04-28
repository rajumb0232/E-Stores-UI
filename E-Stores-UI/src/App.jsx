import React from "react";
import { Outlet } from "react-router-dom";
import Headers from "./Components/Util/Headers";
import Footer from "./Components/Util/Footer";

function App() {
  return (
    <>
        <Headers />
        <Outlet />
        <Footer/>
    </>
  );
}

export default App;