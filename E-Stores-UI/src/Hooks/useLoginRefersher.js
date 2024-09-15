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
      const response = await axiosInstance.post("/refresh");
      if (response.status === 200) {
        const accessExpiration = response.data.data.accessExpiration;
        const refreshExpiration = response.data.data.refreshExpiration;
        setUser({
          ...response.data.data,
          accessExpiration: new Date(new Date().getTime() + accessExpiration * 1000),
          refreshExpiration: new Date(new Date().getTime() + refreshExpiration * 1000)
        });
      }
    } catch (error) {
      clearData();
      navigate("/");
    }
  };

  // core logic to validate against localStorage then decide whether to hit the server or not,
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
        if (new Date(accessExpiration) > new Date()) {
          setUser(user);
        } else refresh();
      } else {
        clearData();
        navigate("/");
      }
    } else {
      clearData();
      navigate("/");
    }
  };

  let refreshing = false;
  useEffect(() => {
    if (!refreshing) {
      refreshing = true;
      handleRefresh();
    }
  }, []);

  return { user };
};

export default useLoginRefresher;
