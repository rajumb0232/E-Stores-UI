import axios from "axios";

const baseURL = `${import.meta.env.VITE_API_URL}`;

const AxiosPrivateInstance = () =>
  axios.create({
    baseURL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });

export default AxiosPrivateInstance;
