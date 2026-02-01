import API from "./api";

export const register = (data) => {
  return API.post("/auth/register", data);
};

export const login = (email, password) => {
  return API.post("/auth/login", { email, password });
};
