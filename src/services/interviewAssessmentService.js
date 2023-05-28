import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api/interview-process"; // test

export const getAssessmentInfo = async () => {
  const response = await axios.get(baseUrl);
  return response.data.data;
};
