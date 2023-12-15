import axios from "axios";
import { BASE_URL } from "../../utils/constats";

const instance = axios.create({
  baseURL: BASE_URL,
  // baseURL: 'http://localhost:5005/api',
});

export default instance;
