import axios from "axios";
const BASEURL = `http://localhost:${import.meta.env.VITE_BACKEND_PORT}`;

// Create a custom axios instance
const apiClient = axios.create({
  baseURL: BASEURL,
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default apiClient;
