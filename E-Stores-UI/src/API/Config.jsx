import axios from 'axios';
// Import your refresh login function

const axiosInstance = axios.create();
// const {handleRefresh} = useLoginRefresher();
// Add a request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    console.log("sending request...")
    const accessExpiry = localStorage.getItem('access_expiry');
    if (accessExpiry) {
      const expiryDate = new Date(accessExpiry);
      const currentDate = new Date();
      if (expiryDate < currentDate) {
        console.log("refreshing from interceptor...")
        // Call the refresh login function
        // handleRefresh();
        // useRefershLogin(true) // Assuming doRefreshLogin is an async function
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
