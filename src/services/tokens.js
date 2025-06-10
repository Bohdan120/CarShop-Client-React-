import axios from "axios";

const accessTokenKey = "accessKey";
const refreshTokenKey = "refreshKey";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

export const tokensService = {
  save(model) {
    localStorage.setItem(accessTokenKey, model.accessToken);
    localStorage.setItem(refreshTokenKey, model.refreshToken);
  },

  clear() {
    localStorage.removeItem(accessTokenKey);
    localStorage.removeItem(refreshTokenKey);
  },

  getAccessToken() {
    return localStorage.getItem(accessTokenKey);
  },

  getRefreshToken() {
    return localStorage.getItem(refreshTokenKey);
  },

  async refreshTokens() {
    try {
      const response = await api.post("/auth/refresh-token", {
        refreshToken: this.getRefreshToken(),
      });

      const { accessToken, refreshToken } = response.data;
      this.save({ accessToken, refreshToken });

      return accessToken;
    } catch (error) {
      this.clear();
      throw error;
    }
  },
};
