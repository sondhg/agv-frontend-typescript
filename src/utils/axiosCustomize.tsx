import axios from "axios";
import { store } from "../redux/store";

const instance = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "content-type": "application/json",
  },
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    const jwt = store?.getState()?.user?.account?.jwt;
    if (jwt) {
      config.headers["Authorization"] = `Bearer ${jwt}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => response?.data ?? response,
  (error) => {
    if (error?.response?.data) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  },
);

export default instance;
