import React, {
  createContext,
  useEffect,
  useState,
} from "react";
import { useCategoryCatalogue } from "../Hooks/useOptions";

export const SellerBinContext = createContext({});

const SellerBin = ({ children }) => {
  const { catagories, getCategories } = useCategoryCatalogue();
  const [store, setStore] = useState({
    storeId: "",
    storeName: "",
    category: "",
    logoLink: "",
    about: "",
  });
  const [address, setAddress] = useState({})
  const [contacts, setContacts] = useState({})
  const [sidebarVisible, setSidebarVisible] = useState(false);

  // useEffect(() => {
  //   const isFound = getStore(false);
  //   if (!isFound) {
  //     getStore(true);
  //   }
  // }, []);

  useEffect(() => console.log("from starter: ", store), [store]);

  // const logout = () => {
  //   if (auth.authenticated) {
  //     localStorage.removeItem("user");
  //     cleanStore();
  //     setAuth({
  //       userId: "",
  //       username: "",
  //       roles: ["CUSTOMER"],
  //       accessExpiration: null,
  //       refreshExpiration: null,
  //       authenticated: false,
  //     });
  //   }
  // };

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
    }

  return (
    <SellerBinContext.Provider value={contextValue}>
      {children}
    </SellerBinContext.Provider>
  );
};

export default SellerBin;