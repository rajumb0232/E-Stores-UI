import { useState, useEffect } from "react";
import AxiosPrivateInstance from "../API/AxiosPrivateInstance";

// --------------------------------------------------------------------------------------------------------
export const useStates = () => {
  const [states, setStates] = useState([]);
  const axiosInstance = AxiosPrivateInstance();

  const updateStates = async () => {
    try {
      const statesCache = await caches.open("user");
      const cachedResponse = await statesCache.match("/states");

      if (cachedResponse) {
        const cachedStates = await cachedResponse.json();
        setStates(cachedStates);
      } else {
        const response = await axiosInstance.get("/states");

        if (response.status === 200) {
          const responseData = response.data;
          setStates(responseData);
          statesCache.put(
            "/states",
            new Response(JSON.stringify(responseData))
          );
        } else {
          console.log("Something went wrong");
        }
      }
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  useEffect(() => {
    updateStates();
  }, []);

  return { states };
};

// --------------------------------------------------------------------------------------------------------
export const useCityDistricts = () => {
  const [districts, setDistricts] = useState([]);
  const axiosInstance = AxiosPrivateInstance();

  const updateDistricts = async (stateName) => {
    const districtsString = sessionStorage.getItem(
      `/states/${stateName}/districts`
    );

    if (districtsString) {
      const districts = JSON.parse(districtsString);
      if (districts && districts.length > 0) setDistricts(districts);
    } else {
      const response = await axiosInstance.get(
        `/states/${stateName}/districts`
      );

      if (response.status === 200) {
        sessionStorage.setItem(
          `/states/${stateName}/districts`,
          JSON.stringify(response.data)
        );
        setDistricts(response.data);
      } else console.log("Something went wrong");
    }
  };

  return { districts, updateDistricts };
};

// --------------------------------------------------------------------------------------------------------
export const useTopCategories = () => {
  const [topCategories, setTopCategories] = useState([]);
  const axiosInstance = AxiosPrivateInstance();

  const getTopCategories = async () => {
    const cache = await caches.open("user");
    const topCategories = await cache.match("/top-categories");
    let list = [];
    if (topCategories) {
      list = await topCategories.json();
      setTopCategories(list);
    } else {
      const response = await axiosInstance.get("/top-categories");
      if (response.status === 200) {
        list = response.data.map((category) => {
          return category.charAt(0) + category.slice(1).toLowerCase();
        });
        setTopCategories(list);
        cache.put("/top-categories", new Response(JSON.stringify(list)));
      } else alert("Something went wront!!");
    }
  };

  useEffect(() => {
    getTopCategories();
  }, []);

  return { topCategories };
};

// --------------------------------------------------------------------------------------------------------

export const useCategoryCatalogue = () => {
  const [catagories, setCategories] = useState([]);
  const axios = AxiosPrivateInstance();

  const getCategories = async () => {
    const backup = localStorage.getItem("categories");
    const data = backup && JSON.parse(backup);
    
    if (data) {
      setCategories(data);
    } else {
      const response = await axios.get("/categories");
      if (response.status === 200) {
        setCategories(response?.data);
        localStorage.setItem("categories", JSON.stringify(response?.data));
      }
    }
  };

  let fetchingCategories = false;
  useEffect(() => {
    if (!fetchingCategories) {
      fetchingCategories = true;
      getCategories();
    }
  }, []);

  return { catagories, getCategories };
};
