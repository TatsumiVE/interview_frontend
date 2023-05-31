import { useQuery } from "react-query";
import { useAuth } from "../../store/AuthContext";
import candidateService from "../../services/candidateService";
import Loader from "../../components/loader";
import { useEffect, useState } from "react";
export const CandidateSearch = () => {
  const { token } = useAuth();
  const [data, setData] = useState([]);
  const {
    data: candidateData,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useQuery(["get", "candidate-search"], () =>
    candidateService.searchAll(token)
  );

  useEffect(() => {
    if (isSuccess) {
      setData(candidateData.data);
    }
  }, [candidateData, isSuccess]);

  if (isLoading) return <Loader />;
  if (isError) return "Something went wrong";
  if (error) return "An error has occurred: " + error.message;
  return <div>Search By Candidate</div>;
};
