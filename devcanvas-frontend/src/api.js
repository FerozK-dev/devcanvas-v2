import axios from "axios";
import { getServiceUrl } from "./helpers/urlHelper";

const backendAddress = getServiceUrl("backend");

const canvasApi = axios.create({
  baseURL: process.env.NODE_ENV === 'development'
    ? "http://localhost:3000"
    : backendAddress,
  validateStatus: function (status) {
    return status < 500;
  },
  withCredentials: true,
  headers: {
    "Cache-Control": "no-cache, no-store, must-revalidate",
    // 'Content-Type': 'application/json',
    Pragma: "no-cache",
    Expires: "0",
  },
});

canvasApi.interceptors.response.use(
  (response) => {
    // console.log("Response:", response);
    return response;
  },
  (error) => {

    console.error("Response Error:", error);
    return Promise.reject(error);
  }
);


export default canvasApi;
