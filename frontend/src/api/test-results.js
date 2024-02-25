import API from "./api";

export const getTestResults = async (params) => {
  const response = await API.get(`/api/test-result/all`);
  return response.data;
};
