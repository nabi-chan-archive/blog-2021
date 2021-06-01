import _axios from "axios";
import nProgress from "nprogress";

const axios = _axios.create({
  baseURL: "/api",
  timeout: 10000, // timeout: 10sec
});

axios.interceptors.request.use(
  (config) => {
    nProgress.start();
    return config;
  },
  (error) => {
    nProgress.done();
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => {
    nProgress.done();
    return response;
  },
  (error) => {
    nProgress.done();
    return Promise.reject(error);
  },
);

export default axios;
