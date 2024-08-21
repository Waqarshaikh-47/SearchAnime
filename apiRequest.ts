import axios from "axios";

const apiRequest = axios.create({
    baseURL: 'https://api.jikan.moe/v4/'
  });


export default apiRequest