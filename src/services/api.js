import axios from "axios";

const API = axios.create({
  baseURL: "https://chemovigi-backend.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
