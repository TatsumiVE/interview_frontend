import axios from "axios";

const baseUrl = "http://localhost:8000/api/candidates"; // test

export const getCandidates = () => {
  return axios.get(baseUrl, (response) => response.data);
};
