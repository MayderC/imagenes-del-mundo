import axios, { AxiosRequestConfig } from "axios";
import store from "@/store";

const apiAlegra = axios.create({
  baseURL: "https://api.alegra.com/api/v1",
  headers: {
    Authorization: " ",
    "content-type": "application/json",
  },
});

apiAlegra.interceptors.request.use(function (config: AxiosRequestConfig) {
  config.headers!["Authorization"] = "Basic " + store.state.token;
  return config;
});

const apiUnsplash = axios.create({
  baseURL: `https://api.unsplash.com`,
  headers: {
    Authorization: "Client-ID " + process.env.VUE_APP_ACCES_PUBLIC_KEY,
  },
});

export { apiAlegra, apiUnsplash };
