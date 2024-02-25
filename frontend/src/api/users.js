import API from "./api";

export const logIn = async (data) => {
  const response = await API.post(`/api/auth/login`, data);
  return response.data;
};

export const changePassword = async (data) => {
  const response = await API.put(`/api/auth/change-password`, data);
  return response.data;
};

export const resetPasswordRequest = async (data) => {
  const response = await API.put(`/api/auth/reset-password/request`, data);
  return response.data;
};
