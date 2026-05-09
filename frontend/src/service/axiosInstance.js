import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://shopspeare.onrender.com", //live
  // baseURL: "http://localhost:8080/", //live
  withCredentials: true,
});

export default axiosInstance;
khsuhksdkjhsdkjfh