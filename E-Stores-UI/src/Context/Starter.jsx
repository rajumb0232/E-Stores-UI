import React, { createContext, useContext, useEffect, useState } from "react";
import { useCategoryCatalogue } from "../Hooks/useOptions";
import useStore from "../Hooks/useStore";
import { useAuth } from "../Hooks/useAuth";

export const StarterDataContext = createContext({});

const Starter = ({ children }) => {
  const { catagories, getCategories } = useCategoryCatalogue();
  const { store, prevAddress, prevContacts, cleanStore } = useStore();
  const { auth, setAuth } = useAuth();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const logout = () => {
    if (auth.authenticated) {
      localStorage.removeItem("user");
      cleanStore();
      setAuth({
        userId: "",
        username: "",
        roles: ["CUSTOMER"],
        accessExpiration: null,
        refreshExpiration: null,
        authenticated: false,
      });
    }
  };

  return (
    <StarterDataContext.Provider
      value={{
        catagories,
        getCategories,
        store,
        prevAddress,
        prevContacts,
        logout,
        sidebarVisible,
        setSidebarVisible
      }}
    >
      {children}
    </StarterDataContext.Provider>
  );
};

export default Starter;

export const useStarter = () => useContext(StarterDataContext);
