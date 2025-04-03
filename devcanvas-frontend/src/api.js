import axios from "axios";

const canvasApi = axios.create({
  baseURL: "http://localhost:3000",
  // baseURL: "https://devcanvas-backend.onrender.com",  //productionUrl
  validateStatus: function (status) {
    return status < 500;
  },
  withCredentials: true,
  headers: {
    "Cache-Control": "no-cache, no-store, must-revalidate",
    'Content-Type': 'application/json',
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
