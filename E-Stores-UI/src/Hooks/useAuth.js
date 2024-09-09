import { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import AxiosPrivateInstance from "../API/AxiosPrivateInstance";
import { useStarter } from "./useStarter";

export const useAuth = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const axiosInstance = AxiosPrivateInstance();
  const { logout } = useStarter();

  const handleRegister = async (url, formData) => {
    try {
      const response = await axiosInstance.post(url, formData);
      if (response.status === 202) {
        setAuth({
          ...auth,
          userId: response.data.data.userId,
          username: response.data.data.email,
        });
        sessionStorage.setItem("email", response.data.data.email);
        return true;
      } else {
        alert(
          error.response.data.message + ": " + error.response.data.rootCause
        );
        return false;
      }
    } catch (error) {
      alert(error.response.data.message + ": " + error.response.data.rootCause);
      return false;
    }
  };

  const handleLogin = async (url, formData) => {
    try {
      const response = await axiosInstance.post(url, formData);
      if (response.status === 200) {
        const accessExpiration = response.data.data.accessExpiration;
        const refreshExpiration = response.data.data.refreshExpiration;
        const user = {
          ...response.data.data,
          accessExpiration: new Date(
            new Date().getTime() + accessExpiration * 1000
          ),
          refreshExpiration: new Date(
            new Date().getTime() + refreshExpiration * 1000
          ),
        };

        setAuth(user);
        localStorage.setItem("user", JSON.stringify(user));
        return true;
      }
    } catch (error) {
      alert(error.response.data.message + ": " + error.response.data.rootCause);
      return false;
    }
  };

  const handleLogout = async () => {
    const response = await axiosInstance.post("/logout");
    try {
      if (response.status === 200) {
        logout();
        return true;
      } else {
        alert(response?.data?.message);
        return false;
      }
    } catch (error) {
      alert(error?.response?.message);
      return false;
    }
  };

  return { auth, setAuth, handleLogin, handleRegister, handleLogout };
};
