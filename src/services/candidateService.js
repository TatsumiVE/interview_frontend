import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api/candidates";

const candidateService = () => {
  const config = (token) => ({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const getAll = async (token) => {
    const response = await axios.get(baseUrl, config(token));
    return response.data;
  };

  const get = async (id, token) => {
    const response = await axios.get(`${baseUrl}/${id}`, config(token));
    return response.data;
  };

  return {
    getAll,
    get,
  };
};

export default candidateService();
