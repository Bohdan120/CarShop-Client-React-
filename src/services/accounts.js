import axios from "axios";
import { tokensService } from "./tokens";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL + "accounts",
    withCredentials: true
});

export const accountsService = {
    login: async function (model) {
        const response = await api.post('login', model);
        const { accessToken, refreshToken, role } = response.data;

        tokensService.save({ accessToken, refreshToken });
        localStorage.setItem("userRole", role); 

        return response;
    },
    logout: async function () {
        const refreshToken = tokensService.getRefreshToken();
        tokensService.clear();
        localStorage.removeItem("userRole");

        if (refreshToken)
            await api.post('logout', { refreshToken });
    },
    register: async function (model) {
        const response = await api.post('register', model);
        return response;
    },

    getRole: () => localStorage.getItem("userRole")
};
