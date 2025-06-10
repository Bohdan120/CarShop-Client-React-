import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL + "reviews",
    withCredentials: true,
});

export const reviewsService = {
    getGood: function () {
        return instance.get("").then((res) => res.data);
    },
};
