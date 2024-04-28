import { useState } from "react";
import AxiosPrivateInstance from "../API/AxiosPrivateInstance";

const useImage = () => {
  const [imageURL, setImageURL] = useState("");
  const axiosInstance = AxiosPrivateInstance();

  const getImageURL = async (url) => {
    const response = await axiosInstance.get(url, { responseType: "blob" });
    try {
      if (response.status === 200) {
        const url = URL.createObjectURL(response.data);
        setImageURL(url);
      } else {
        console.log(response?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { imageURL, getImageURL };
};

export default useImage;
