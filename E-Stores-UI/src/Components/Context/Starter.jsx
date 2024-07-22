import React, { createContext, useContext, useEffect } from "react";
import { useCategoryCatalogue } from "../Hooks/useOptions";
import useStore from "../Hooks/useStore";
import { useAuth } from "../Auth/AuthProvider";

const StarterDataContext = createContext(null);

const Starter = ({ children }) => {
  const { catagories, getCategories } = useCategoryCatalogue();
  const { store, prevAddress, prevContacts, cleanStore } = useStore();
  const { auth, setAuth } = useAuth();

  const logout = () => {
    if (!auth.authenticated) {
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
      }}
    >
      {children}
    </StarterDataContext.Provider>
  );
};

export default Starter;

export const useStarter = () => useContext(StarterDataContext);
