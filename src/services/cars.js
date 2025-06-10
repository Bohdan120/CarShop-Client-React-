import axios from "axios";
import { tokensService } from "./tokens";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL + "cars",
    withCredentials: true 
});

api.interceptors.request.use(
    (config) => {
        const token = tokensService.getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const carsService = {
    get: function (params = {}) {
        return api.get('all', { params });
    },
    getById: function (id) {
        return api.get(`${id}`);
    },
    getCategories: function () {
        return api.get('categories');
    },
    getMakes: function () {    
        return api.get('makes');
    },
    create: function (model) {
        return api.post("", model);
    },
    delete: function (id) {
        return api.delete(`${id}`);
    },
    edit: function (model) {
        return api.put("", model);
    }
};
