import AxiosPrivateInstance from "../API/AxiosPrivateInstance";

const useImage = () => {
  const axiosInstance = AxiosPrivateInstance();

  const getImageURL = async (url) => {
    const response = await axiosInstance.get(url, { responseType: "blob" });
    try {
      if (response.status === 200) {
        const url = URL.createObjectURL(response.data);
        return url;
      } else {
        console.log(response?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { getImageURL };
};

export default useImage;
