import axios from "axios";

const API = axios.create({
  baseURL: "https://hrms-system-backend-fbfe.onrender.com/"
});

export default API;