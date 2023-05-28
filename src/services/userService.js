import axios from "axios";
const baseUrl = "http://localhost:8000/api/interviewers"; // test

export const getUser = async (token) => {
  return await axios.get(baseUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
