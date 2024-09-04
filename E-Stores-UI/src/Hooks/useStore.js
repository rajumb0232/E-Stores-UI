import { useEffect, useState } from "react";
import AxiosPrivateInstance from "../API/AxiosPrivateInstance";
import { useAuth } from "../Auth/AuthProvider";

const useStore = () => {
  const [store, setStore] = useState(null);
  const [prevAddress, setPrevAddress] = useState(null);
  const [prevContacts, setPrevContacts] = useState([]);
  const axiosInstance = AxiosPrivateInstance();
  const { auth } = useAuth();

  useEffect(() => {
    if (store) {
      setPrevAddress(store?.address);
      setPrevContacts(store?.address?.contacts || []);
    }
  }, [store]);

  const updateStoreState = (data) => {
    if (data) {
      localStorage.setItem("store-data", JSON.stringify(data));
      setStore(data);
      return true;
    } else {
      console.log("Invalid Store Data Found.");
      return false;
    }
  };

  const fetch = async () => {
    try {
      const response = await axiosInstance.get("/stores");
      if (response.status === 302) {
        updateStoreState(response?.data?.data);
      }
    } catch (error) {
      if (error.response && error.response.data.status === 302) {
        updateStoreState(error?.response?.data?.data);
      } else {
        return false;
      }
    }
  };

  const getStore = (force) => {
    if (!force) {
      const backup = localStorage.getItem("store-data");
      if (backup) {
        const storeData = JSON.parse(backup);
        setStore(storeData);
      } else {
        fetch();
      }
    } else {
      fetch();
    }
  };

  useEffect(() => {
    if (auth?.authenticated && auth?.roles?.includes("SELLER")) {
      getStore(false);
    }
  }, [auth]);

  const cleanStore = () => {
    localStorage.removeItem("store-data");
    localStorage.removeItem("store");
  };

  return { store, prevAddress, prevContacts, getStore, cleanStore };
};

export default useStore;
