import { useEffect, useState } from "react";
import AxiosPrivateInstance from "../API/AxiosPrivateInstance";
import { useAuth } from "../Auth/AuthProvider";

const useStore = () => {
  const [store, setStore] = useState(null);
  const [prevAddress, setPrevAddress] = useState(null);
  const [prevContacts, setPrevContacts] = useState([]);
  const axiosInstance = AxiosPrivateInstance();
  const { auth } = useAuth();
  const [setUpInfo, setSetUpInfo] = useState({
    store: true,
    address: true,
    contacts: true,
  });

  // Laods setUpInfo from the localstorage
  const loadSetUpInfoFromLocalStorage = () => {
    const sac = localStorage.getItem("sac");
    if (sac) {
      const data = JSON.parse(sac);
      return {
        store: !!data?.store,
        address: !!data?.store,
        contacts: !!data?.store,
      };
    }
    return null;
  };

  // Initializing setUpInfo state from local storage once on mount
  useEffect(() => {
    const loadedSetUpInfo = loadSetUpInfoFromLocalStorage();
    if (loadedSetUpInfo) {
      setSetUpInfo(loadedSetUpInfo);
    }
  }, []);

  // Update localStorage whenever setUpInfo changes
  useEffect(() => {
    localStorage.setItem("sac", JSON.stringify(setUpInfo));
  }, [setUpInfo]);

  // Update address and contacts when store changes
  useEffect(() => {
    if (store) {
      setPrevAddress(store?.address);
      setPrevContacts(store?.address?.contacts || []);

      setSetUpInfo((prev) => ({
        ...prev,
        address: !!store?.address,
        contacts: store?.address?.contacts?.length > 0,
      }));
    }
  }, [store]);

  // Updates the store data to the state and localStorage
  const updateStoreState = (store) => {
    if (store) {
      localStorage.setItem("store-data", JSON.stringify(store));
      setStore(store);
      return true;
    } else {
      console.log("Invalid Store Data Found.");
      return false;
    }
  };

  // fetching store info through API Call
  const fetch = async () => {
    if (setUpInfo.store) {
      try {
        const response = await axiosInstance.get("/stores");
        if (response.status === 302) {
          updateStoreState(response?.data?.data);
          setSetUpInfo({ ...setUpInfo, store: true });
        }
      } catch (error) {
        if (error.response && error.response.data.status === 302) {
          updateStoreState(error?.response?.data?.data);
          setSetUpInfo({ ...setUpInfo, store: true });
        } else {
          setSetUpInfo({
            ...setUpInfo,
            store: false,
            address: false,
            contacts: false,
          });
          return false;
        }
      }
    }
  };

  // helps loading the store data from localStorage if present, else laods through API Call
  const getStore = (force) => {
    if (!force) {
      const backup = localStorage.getItem("store-data");
      if (backup) {
        const storeData = JSON.parse(backup);
        setStore(storeData);
        return;
      }
    }
    fetch();
  };

  useEffect(() => {
      if (auth?.authenticated && auth?.roles?.includes("SELLER")) {
        getStore(false);
      }
  }, [auth]);

  // cleans up the localStorage by removing store related data.
  const cleanStore = () => {
    localStorage.removeItem("store-data");
    localStorage.removeItem("store");
    localStorage.removeItem("sac");
  };

  return { store, prevAddress, prevContacts, getStore, cleanStore };
};

export default useStore;
