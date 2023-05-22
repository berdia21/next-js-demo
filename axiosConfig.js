import axios from "axios";

const axiosInstance = axios.create({
  // .. where we make our configurations
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api`,
});

axiosInstance.defaults.headers.common["Content-Type"] = "application/json";

export default axiosInstance;
