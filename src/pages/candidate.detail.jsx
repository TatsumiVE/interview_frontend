import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

export const CandidateDetails = () => {
  const { id } = useParams();

  const getCandidateDetails = async () => {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/candidate_details/${id}`
    );
    console.log(response.data.data);
    return response.data.data;
  };

  const {
    data: candidate,
    isLoading,
    isError,
    error,
  } = useQuery(["get", "candidate", id], getCandidateDetails);

  if (isLoading) return "Loading...";

  if (isError) return "Something went wrong";
  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <h2>Candidate Details</h2>
      <p>Name: {candidate.name}</p>
      <p>Email: {candidate.email}</p>
      <p>Gender: {candidate.gender}</p>
      <p>Phone Number: {candidate.phone_number}</p>
      <p>Applied Position: {candidate.position_id.name}</p>
      <p>Language: {candidate.languages}</p>
    </div>
  );
};
