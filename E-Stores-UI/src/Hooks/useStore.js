import { useEffect, useState } from "react";
import AxiosPrivateInstance from "../API/AxiosPrivateInstance";
import { useAuth } from "./useAuth";
import axios from "axios";
import { useSellerBin } from "./useSellerBin";

const useStore = () => {
  const {
    store,
    setStore,
    address,
    setAddress,
    contacts,
    setContacts,
    loggedOut,
  } = useSellerBin();
  const axiosInstance = AxiosPrivateInstance();
  const { auth } = useAuth();
  const [setUpInfo, setSetUpInfo] = useState({
    store: true,
    address: true,
    contacts: true,
  });

  // cleans seller data if seller logged out
  useEffect(() => {
    console.log("loggedOut: ", loggedOut);
    if (loggedOut) {
      localStorage.removeItem("store-data");
      localStorage.removeItem("store");
      localStorage.removeItem("sac");
    }
  }, [loggedOut]);

  // Loads setUpInfo from the localstorage
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

  const loadStoreFromLocalStorage = () => {
    const backup = localStorage.getItem("store-data");
    if (backup) {
      const storeData = JSON.parse(backup);
      if (storeData?.storeId && storeData?.storeId !== "") {
        setStore(storeData);
        return true;
      }
    }
  };

  // Initializing setUpInfo state from local storage once on mount
  useEffect(() => {
    const loadedSetUpInfo = loadSetUpInfoFromLocalStorage();
    if (loadedSetUpInfo) {
      setSetUpInfo(loadedSetUpInfo);
    }
    loadStoreFromLocalStorage();
  }, []);

  // Update localStorage whenever setUpInfo changes
  useEffect(() => {
    localStorage.setItem("sac", JSON.stringify(setUpInfo));
  }, [setUpInfo]);

  // Update address and contacts when store changes
  useEffect(() => {
    if (store?.storeId && store?.storeId !== "") {
      localStorage.setItem("store-data", JSON.stringify(store));
      setAddress(store?.address);
      setContacts(store?.address?.contacts || []);

      setSetUpInfo((prev) => ({
        ...prev,
        address: !!store?.address,
        contacts: store?.address?.contacts?.length > 0,
      }));
    }
  }, [store]);

  // fetching store info through API Call
  const fetch = async () => {
    if (setUpInfo.store) {
      try {
        const response = await axiosInstance.get("/stores");
        if (response.status === 302) {
          setStore({ ...store, ...response?.data?.data });
          setSetUpInfo({ ...setUpInfo, store: true });
        }
      } catch (error) {
        if (error.response && error.response.data.status === 302) {
          setStore({ ...store, ...error.response?.data?.data });
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

  // helps loading the store data from localStorage if present, else loads through API Call
  const getStore = (force) => {
    if (!force) {
      return loadStoreFromLocalStorage();
    }
    fetch();
  };

  // Adds Store to the database and localstorage and return true
  const addStore = async (data) => {
    try {
      const response = await axiosInstance.post("/stores", data);
      // validating response
      if (response.status === 201) {
        localStorage.setItem("store", "true");
        setStore({ ...store, ...response?.data?.data });
        alert("Store created successfully.");
      }
    } catch (error) {
      if (error.status === 400) alert("Please fill all the details.");
      else alert("Something went wrong.");
    }
    return true;
  };

  // Updates Store to the database and localstorage and returns true
  const updateStore = async (data) => {
    try {
      const response = await axiosInstance.put(
        `/stores/${store?.storeId}`,
        data
      );

      if (response.status === 200) {
        localStorage.setItem("store", "true");
        setStore({ ...store, ...response?.data?.data });
        alert("Store updated successfully.");
      }
    } catch (error) {
      if (error.status === 400) alert("Please fill all the details.");
      else alert("Something went wrong.");
    }
    return true;
  };

  // uploads new LOGO
  const uploadStoreImage = async (selectedLogo) => {
    const formData = new FormData();
    formData.append("image", selectedLogo);

    try {
      const response = await axiosInstance.post(
        `/stores/${store?.storeId}/images`,
        formData,
        {
          headers: { "Content-Type": "image/*" },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setStore({ ...store, logoLink: response?.data?.data });
        alert("Upload successful");
        return true;
      } else {
        alert(response?.data.message || response?.message);
        return false;
      }
    } catch (error) {
      alert(error?.response?.message);
      return false;
    }
  };

  return {
    store,
    address,
    contacts,
    getStore,
    addStore,
    updateStore,
    uploadStoreImage,
  };
};

export default useStore;

export const updateStore = () => {};
