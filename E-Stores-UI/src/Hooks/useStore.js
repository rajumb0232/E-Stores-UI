import { useEffect, useState } from "react";
import AxiosPrivateInstance from "../API/AxiosPrivateInstance";
import { useAuth } from "./useAuth";

const useStore = () => {
  const [store, setStore] = useState({
    storeId: "",
    storeName: "",
    topCategory: "",
    logoLink: "",
    about: "",
  });
  const [prevAddress, setPrevAddress] = useState({});
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
      localStorage.setItem("store-data", JSON.stringify(store));
      setPrevAddress(store?.address);
      setPrevContacts(store?.address?.contacts || []);

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

  // helps loading the store data from localStorage if present, else laods through API Call
  const getStore = (force) => {
    if (!force) {
      const backup = localStorage.getItem("store-data");
      if (backup) {
        const storeData = JSON.parse(backup);
        setStore(storeData);
        if (store?.storeId && store?.storeId !== "") return true;
        else return false;
      } else return false;
    }
    fetch();
  };

  // cleans up the localStorage by removing store related data.
  const cleanStore = () => {
    localStorage.removeItem("store-data");
    localStorage.removeItem("store");
    localStorage.removeItem("sac");
  };

  const addStore = async (data) => {
    try {
      console.log(axiosInstance);
      const response = await axiosInstance.post("/stores", data);
      // validating response
      if (response.status === 201) {
        updateCache(response?.data?.data);
        localStorage.setItem("store", "true");
        setStore({ ...store, ...response?.data?.data });
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

  const updateStore = async (data) => {
    try {
      const response = await axiosInstance.put(
        `/stores/${store?.storeId}`,
        data
      );

      // validating response
      if (response.status === 200) {
        localStorage.setItem("store", "true");
        setStore({ ...store, ...response?.data?.data });
      } else {
        alert(response?.data.message || response?.message);
        return false;
      }
    } catch (error) {
      alert(error?.response?.message);
      return false;
    }
  };

  // uploade new LOGO
  const uploadStoreImage = async (selectedLogo) => {
    const formData = new FormData();
    formData.append("image", selectedLogo);

    try {
      const response = await axiosInstance.post(
        `/stores/${store?.storeId}/images`,
        formData,
        {
          headers: { "Content-Type": "image/*" },
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
    prevAddress,
    prevContacts,
    getStore,
    cleanStore,
    addStore,
    updateStore,
    uploadStoreImage,
  };
};

export default useStore;

export const updateStore = () => {};
