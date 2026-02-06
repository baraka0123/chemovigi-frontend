import axios from "axios";

const API = axios.create({
  baseURL: "https://chemovigi-backend-1.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
