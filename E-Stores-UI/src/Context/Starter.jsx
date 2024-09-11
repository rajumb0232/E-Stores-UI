import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useCategoryCatalogue } from "../Hooks/useOptions";
import useStore from "../Hooks/useStore";
import { useAuth } from "../Hooks/useAuth";

export const StarterDataContext = createContext({});

const Starter = ({ children }) => {
  const { catagories, getCategories } = useCategoryCatalogue();
  const { store, prevAddress, prevContacts, cleanStore, getStore } = useStore();
  const { auth, setAuth } = useAuth();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  useEffect(() => {
    const isFound = getStore(false);
    if (!isFound) {
      getStore(true);
    }
  }, []);

  useEffect(() => console.log("from starter: ", store), [store]);

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

  const contextValue = {
      catagories,
      getCategories,
      store,
      prevAddress,
      prevContacts,
      logout,
      sidebarVisible,
      setSidebarVisible,
    }

  return (
    <StarterDataContext.Provider value={contextValue}>
      {children}
    </StarterDataContext.Provider>
  );
};

export default Starter;

export const useStarter = () => useContext(StarterDataContext);
