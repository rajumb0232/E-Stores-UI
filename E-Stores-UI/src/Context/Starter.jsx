/* The Hook helps in automating certain tasks that are required by the application
   to serve properly */

import React, { createContext, useEffect } from "react";
import useStore from "../Hooks/useStore";

const StarterContext = createContext({});

const Starter = ({ children }) => {
  const { getStore } = useStore();

  // Triggers the getStore function responsible to load the store data to the context
  useEffect(() => {
    console.log("Loading Store Info...");
    const loaded = getStore();
    if (!loaded) getStore(true);
  }, []);

  return (
    <StarterContext.Provider value={{}}>{children}</StarterContext.Provider>
  );
};

export default Starter;
