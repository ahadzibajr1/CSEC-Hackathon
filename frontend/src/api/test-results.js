import API from "./api";

export const getTestResults = async (params) => {
  const response = await API.get(`/api/test-result/all`);
  return response.data;
};

export const updateTestResults = async (params) => {
  const response = await API.put(
    `/api/test-result?id=${params.id}&target=${params.target}`
  );
  return response.data;
};

export const postTestResult = async (data) => {
  const response = await API.post("/api/test-result", data);
  return response.data;
};
