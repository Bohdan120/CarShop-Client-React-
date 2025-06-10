import axios from "axios";
import { tokensService } from "./tokens";

const cartApi = axios.create({
    baseURL: process.env.REACT_APP_API_URL + "cart",
    withCredentials: true
});

cartApi.interceptors.request.use(
    (config) => {
        const token = tokensService.getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const cartService = {
    getAll: function () {
        return cartApi.get('');
    },
    add: function (id) {
        return cartApi.post(`${id}`);
    },
    remove: function (id) {
        return cartApi.delete(`${id}`);
    },
    getCount: function () {
        return cartApi.get('count');
    },
    exists: function (id) {
        return cartApi.get(`exists/${id}`);
    },
    getIds: function () {
        return cartApi.get('ids');
    },
    clear: function () {
        return cartApi.delete('clear'); 
    }
};