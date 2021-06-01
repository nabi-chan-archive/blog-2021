import _axios from "axios";

const axios = _axios.create({
  baseURL: "/api",
  timeout: 10000, // timeout: 10sec
});

export default axios;
