import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

export const Employee = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const getEmployee = async () => {
    console.log("here");
    const response = await axios.get(
      `http://localhost:8000/api/interviewers?page=${currentPage}&search=${searchText}`
    );
    console.log(response.data.data);

    return response.data.data;
  };

  const {
    data: interviewers,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["get", "interviewers", currentPage, searchText],
    queryFn: getEmployee,
  });

  if (isLoading) return "Loading.....";
  if (isError) return "Something went wrong";
  if (error) return "An error has occurred: " + error.message;

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleSearch = async (event) => {
    const searchTerm = event.target.value;
    setSearchText(searchTerm);

    setCurrentPage(1); // Reset to the first page when performing a new search

    const response = await axios.get(
      `http://localhost:8000/api/interviewers?page=1&search=${searchTerm}`
    );
    console.log(response.data.data);
    return response.data.data;
  };

  return (
    <div>
      <button type="button">
        <Link to="create">Create Interviewer</Link>
    
        
      </button>

      <div className="pagination-search-container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={handleSearch}
          />
        </div>
        <div className="pagination-container">
          <button
            type="button"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>Page {currentPage}</span>
          <button type="button" onClick={handleNextPage}>
            Next
          </button>
        </div>
      </div>

      {isSuccess && interviewers.length > 0 ? (
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Position</th>
                <th>Department</th>
              </tr>
            </thead>
            <tbody>
              {interviewers.map((interviewer) => (
                <tr key={interviewer.id}>
                  <td>{interviewer.id}</td>
                  <td>{interviewer.name}</td>
                  <td>{interviewer.position_id.name}</td>
                  <td>{interviewer.position_id.department.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Interviewer list not found</p>
      )}
    </div>
  );
};
