import { useNavigate } from "react-router-dom";
import AxiosPrivateInstance from "../API/AxiosPrivateInstance";
import { useEffect, useState } from "react";

const useLoginRefresher = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const axiosInstance = AxiosPrivateInstance();

  const clearData = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("store");
    sessionStorage.clear();
    caches.delete("user");
    setUser({
      userId: "",
      username: "",
      roles: ["CUSTOMER"],
      accessExpiration: null,
      refreshExpiration: null,
      authenticated: false,
    })
  };

  useEffect(() => {
    if (user?.userId) localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  // refresh and update the logic
  const refresh = async () => {
    try {
      console.log("refreshing request sent to server");
      const response = await axiosInstance.post("/refresh");
      if (response.status === 200) {
        const accessExpiration = response.data.data.accessExpiration;
        const refreshExpiration = response.data.data.refreshExpiration;
        setUser({
          ...response.data.data,
          accessExpiration: new Date(new Date().getTime() + accessExpiration * 1000),
          refreshExpiration: new Date(new Date().getTime() + refreshExpiration * 1000)
        });
      } else {
        console.log(response.data);
      }
    } catch (error) {
      if (error.response.status === 401) {
        console.log("Server responded with unauthorized", error);
      } else {
        console.error("Error refreshing login:", error);
      }
      clearData();
      navigate("/");
    }
  };

  // core logic to validate agaist localStorage then decide whether to hit the server or not,
  const handleRefresh = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (
      user &&
      user?.userId &&
      user?.accessExpiration &&
      user?.refreshExpiration
    ) {
      const { accessExpiration, refreshExpiration } = user;
      if (new Date(refreshExpiration) > new Date()) {
        console.log("refresh not expired!");
        if (new Date(accessExpiration) > new Date()) {
          console.log("access not expired!");
          setUser(user);
        } else refresh();
      } else {
        clearData();
        console.log("User login expired | Navigating to explore...");
        navigate("/");
      }
    } else {
      clearData();
      console.log("User not logged in | Navigating to explore...");
      navigate("/");
    }
  };

  let refreshing = false;
  useEffect(() => {
    if (!refreshing) {
      console.log("Refreshing...");
      refreshing = true;
      handleRefresh();
    }
  }, []);

  return { user };
};

export default useLoginRefresher;
