import React, { createContext, useEffect, useState } from "react";
import { useCategoryCatalogue } from "../Hooks/useOptions";
import { useAuth } from "../Hooks/useAuth";

export const SellerBinContext = createContext({});

const SellerBin = ({ children }) => {
  const { catagories, getCategories } = useCategoryCatalogue();
  const { setAuth } = useAuth();
  const [store, setStore] = useState({
    storeId: "",
    storeName: "",
    category: "",
    logoLink: "",
    about: "",
  });
  const [address, setAddress] = useState({});
  const [contacts, setContacts] = useState({});
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);

  const cleanSellerData = () => {
    localStorage.removeItem("user");
    setLoggedOut(true);
    setAuth({
      userId: "",
      username: "",
      roles: ["CUSTOMER"],
      accessExpiration: null,
      refreshExpiration: null,
      authenticated: false,
    });
  };

  const contextValue = {
    catagories,
    getCategories,
    store,
    setStore,
    address,
    setAddress,
    contacts,
    setContacts,
    sidebarVisible,
    setSidebarVisible,
    loggedOut,
    cleanSellerData,
  };

  return (
    <SellerBinContext.Provider value={contextValue}>
      {children}
    </SellerBinContext.Provider>
  );
};

export default SellerBin;
