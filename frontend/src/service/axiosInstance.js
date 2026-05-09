import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://loacalhost:8080",
  withCredentials: true,
});



export default axiosInstance;
