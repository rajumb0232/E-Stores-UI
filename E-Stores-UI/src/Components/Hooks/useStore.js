import { useEffect, useState } from "react";
import AxiosPrivateInstance from "../API/AxiosPrivateInstance";
import { useAuth } from "../Auth/AuthProvider";

const useStore = () => {
  const [store, setStore] = useState({});
  const [prevAddress, setPrevAddress] = useState({});
  const [prevContacts, setPrevContacts] = useState([]);
  const axiosInstance = AxiosPrivateInstance();
  const { auth } = useAuth();

  // Updating address if store exists
  let checked = false;
  useEffect(() => {
    if (!checked) {
      checked = true;
      if (store.address) {
        setPrevAddress(store.address);
      }
    }
  }, [store]);

  // update contact list if the address if updated
  useEffect(() => {
    if (prevAddress) {
      setPrevContacts(prevAddress.contacts ? prevAddress.contacts : []);
    } else {
      getPrevStore(true);
    }
  }, [prevAddress]);

  const checkForStore = async () => {
    const response = await axiosInstance.get("/stores-exist");
    try {
      if (response.status === 200) {
        if (response.data === true) {
          localStorage.setItem("store", "true");
          return true;
        } else return false;
      } else console.log(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const updateStoreState = (data) => {
    localStorage.setItem("store-data", JSON.stringify(data));
    setStore(data);
    return true;
  };

  const fetch = async () => {
    try {
      const response = await axiosInstance.get("/stores");
      if (response.status === 302) {
        updateStoreState(response?.data?.data);
      }
    } catch (error) {
      if (error.response.data.status === 302) {
        updateStoreState(error?.response?.data?.data);
      } else {
        console.log(error.stack);
        return false;
      }
    }
  };

  const getPrevStore = async (doForce) => {
    if (!doForce) {
      const backup = localStorage.getItem("store-data");
      const storeData = backup && JSON.parse(backup);
      if (storeData) {
        setStore(storeData);
      } else fetch();
    } else fetch();
  };

  // begin
  let flag = false;
  useEffect(() => {
    if (!flag && auth.authenticated) {
      flag = true;
      getPrevStore();
    }
  }, []);

  const cleanStore = () => {
    localStorage.removeItem("store-data");
    localStorage.removeItem("store");
  }

  return { store, prevAddress, prevContacts, cleanStore };
};

export default useStore;
