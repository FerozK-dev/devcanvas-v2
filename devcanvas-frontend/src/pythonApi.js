// pythonApi.js
import axios from 'axios';

import { getServiceUrl } from "./helpers/urlHelper";
const backendAddress = getServiceUrl("ai");

const pythonApi = axios.create({
  baseURL: process.env.NODE_ENV === 'development'
  ? "http://localhost:8000"
  : backendAddress,
  withCredentials: true,
  headers: {
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    Expires: "0",
  },
});

pythonApi.interceptors.response.use(
  (response) => {
    // console.log("Response:", response);
    return response;
  },
  (error) => {

    console.error("Response Error:", error);
    return Promise.reject(error);
  }
);

export default pythonApi;
