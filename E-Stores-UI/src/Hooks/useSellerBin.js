import { useContext } from "react";
import { SellerBinContext } from "../Context/SellerBin";

export const useSellerBin = () => {
  const {
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
  } = useContext(SellerBinContext);

  return {
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
};
