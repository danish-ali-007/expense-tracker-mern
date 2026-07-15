import axios from "axios";

const API = axios.create({
  baseURL: "https://expense-tracker-mern-r3kt.onrender.com/api",
});

export default API;