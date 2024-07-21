import React, { createContext, useContext, useEffect } from "react";
import { useCategoryCatalogue } from "../Hooks/useOptions";
import useStore from "../Hooks/useStore";
import { useAuth } from "../Auth/AuthProvider";

const StarterDataContext = createContext();

const Starter = ({ children }) => {
  const { catagories, getCategories } = useCategoryCatalogue();
  const { store, prevAddress, prevContacts, cleanStore } = useStore();
  const { auth } = useAuth();

  useEffect(() => {
    if(!auth.authenticated){
        cleanStore();
    }
  }, [auth]);

  return (
    <StarterDataContext.Provider
      value={{ catagories, getCategories, store, prevAddress, prevContacts }}
    >
      {children}
    </StarterDataContext.Provider>
  );
};

export default Starter;

export const useStarter = () => useContext(StarterDataContext);
