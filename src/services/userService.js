import axios from "axios";

const baseUrl = "http://localhost:8000/api/interviewers"; // test

export const getUser = () => {
  return axios.get(baseUrl, (response) => response.data);
};
