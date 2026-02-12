import axios, { isAxiosError } from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;
console.log(baseURL);
export const http = axios.create({
  baseURL: baseURL,
  timeout: 10000,
});

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isAxiosError(error)) {
      if (error.response?.status === 401) {
        // check is try before? logout
        // use refreshToken to get new tokens
        // store new tokens
        // retry the request
      }
    }

    return Promise.reject(error);
  },
);
