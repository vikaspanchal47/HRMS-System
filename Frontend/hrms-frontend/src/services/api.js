import axios from "axios";

const API = axios.create({
  baseURL: "https://hrms-backend.onrender.com"
});

export default API;