import axios from "axios";

export const api = axios.create({
  baseURL: "<API_URL>"
});

export function setToken(jwt) {
  api.defaults.headers.common["Authorization"] = `Token ${jwt}`;
}

export function clearToken() {
  delete api.defaults.headers.common["Authorization"];
}
