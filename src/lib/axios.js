import axios from "axios";

const api= axios.create({
  baseURL: "http://localhost:8000", // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // If you need to send cookies with requests
}); 

export default api;