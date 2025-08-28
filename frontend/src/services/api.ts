import axios from "axios"
import auth from "./login"

export default function baseApi(baseurl: string){
    const api = axios.create({
        baseURL:baseurl,
        withCredentials: true
    })

    api.interceptors.request.use(async (config) => {
        const token = auth.getToken()

        if(token) {
            config.headers["x-access-token"] = `${token}`
        }

        return config
    })

    api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await api.post("/refresh");
        localStorage.setItem("token", data.token);

        originalRequest.headers["x-access-token"] = `${data.token}`;
        return api(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

    return api
}