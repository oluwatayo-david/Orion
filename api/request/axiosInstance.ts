import axios from "axios";
import {mmkvStorage} from "@/api/storage/mmkvStorage";
import {toast} from "sonner-native";

const API_BASE_URL = "http://192.168.137.1:3000";
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 20000,
    headers: {
        "Content-Type": "application/json",
    },
});


// Add request interceptor to attach token
axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await mmkvStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor for error handling
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            await mmkvStorage.removeItem("token");

            try {

                toast.info('you are logged out sign in')
            } catch (err) {
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
