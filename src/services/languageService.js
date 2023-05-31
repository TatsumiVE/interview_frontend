import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api/dev-languages";

const languageService = () => {
  const config = (token) => ({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const getAll = async (token) => {
    const response = await axios.get(baseUrl, config(token));
    return response.data.data;
  };

  return {
    getAll,
  };
};

export default languageService();
