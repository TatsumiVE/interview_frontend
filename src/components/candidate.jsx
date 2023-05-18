import { useEffect, useState } from "react";
import axios from "axios";
import Dropdown from "./dropdown";

const CandidateCreate = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone] = useState("");
  const [date_of_birth, setBirth] = useState("");
  const [residential_address, setAddress] = useState("");
  const [willingness_to_travel, setTravel] = useState(false);
  const [gender, setGender] = useState("");

  const [expected_salary, setExpected] = useState("");
  const [last_salary, setLast] = useState("");
  const [cv_path, setCv] = useState("");

  const [earliest_starting_date, setEarliest] = useState("");

  const [position_id, setPosition] = useState([]);
  const [agency_id, setAgency] = useState([]);
  const [languageList, setLanguageList] = useState([]);
  const [devlanguage_id, setLanguage] = useState("");

  const [data, setData] = useState([{ language: "", year: "", month: "" }]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const requestData = data.map((row) => ({
        "'experience'": {
          "'month'": row.month,
          "'year'": row.year,
        },
        "'devlanguage_id'": devlanguage_id, // Assuming language is selected from dropdown
      }));

      const formData = {
        name,
        email,
        gender,
        phone_number,
        residential_address,
        date_of_birth,
        cv_path,
        data: requestData,
        willingness_to_travel,
        expected_salary,
        last_salary,
        earliest_starting_date,
        position_id: position_id.toString(), // Assuming position.data is the selected position
        agency_id: agency_id.toString(), // Assuming agency.data is the selected agency
      };
      console.log(formData);
      // Send POST request to API
      const response = await axios.post(
        "http://localhost:8000/api/candidates",
        formData
      );

      console.log("done", response.data); // Handle the response as needed
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = () => {
    setData([...data, { languageList: "", year: "", month: "" }]);
  };

  const handleRemove = (index) => {
    const list = [...data];
    list.splice(index, 1);
    setData(list);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const languageResponse = await axios.get(
          "http://localhost:8000/api/languages"
        );
        setLanguageList(languageResponse.data);
        console.log(languageResponse.data);

        const positionResponse = await axios.get(
          "http://localhost:8000/api/positions"
        );
        setPosition(positionResponse.data);
        console.log(positionResponse.data);

        const agencyResponse = await axios.get(
          "http://localhost:8000/api/agencies"
        );
        setAgency(agencyResponse.data);
        // console.log(agencyResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Candidate Name"
          />
        </label>
        <br />
        <label>
          Email
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
          />
        </label>
        <br />
        <label>
          Phone Number
          <input
            type="text"
            name="phone_number"
            value={phone_number}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        <br />
        <label>
          Date of Birth
          <input
            type="date"
            name="date_of_birth"
            value={date_of_birth}
            onChange={(e) => setBirth(e.target.value)}
          />
        </label>
        <br />
        <label>
          Residential Address
          <input
            type="text"
            name="residential_address"
            value={residential_address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <br />
        <label>
          Willingness to Travel
          <input
            type="checkbox"
            name="willingness_to_travel"
            checked={willingness_to_travel}
            onChange={(e) => setTravel(e.target.checked)}
          />
        </label>
        <br />
        <label>
          Male
          <input
            type="radio"
            name="gender"
            value="0"
            checked={gender === "0"}
            onChange={(e) => setGender(e.target.value)}
          />
        </label>
        <br />
        <label>
          Female
          <input
            type="radio"
            name="gender"
            value="1"
            checked={gender === "1"}
            onChange={(e) => setGender(e.target.value)}
          />
        </label>
        <br />
        <label>
          other
          <input
            type="radio"
            name="gender"
            value="2"
            checked={gender === "2"}
            onChange={(e) => setGender(e.target.value)}
          />
        </label>
        <br />
        <label>
          Position
          <Dropdown
            options={position_id.data}
            selectedValue={position_id}
            onChange={(e) => setPosition(e.target.value)}
          />
        </label>

        <br />
        <label>
          Agency
          <Dropdown
            options={agency_id.data}
            selectedValue={agency_id}
            onChange={(e) => setAgency(e.target.value)}
          />
        </label>

        <br />

        <label>
          Expected Salary
          <input
            type="number"
            name="expected_salary"
            value={expected_salary}
            onChange={(e) => setExpected(e.target.value)}
          />
        </label>
        <br />
        <label>
          Last Salary
          <input
            type="number"
            name="last_salary"
            value={last_salary}
            onChange={(e) => setLast(e.target.value)}
          />
        </label>
        <br />
        <label>
          CV Path
          <input
            type="text"
            name="cv_path"
            value={cv_path}
            onChange={(e) => setCv(e.target.value)}
          />
        </label>
        <br />
        <label>
          Earliest Starting Date
          <input
            type="date"
            name="earliest_starting_date"
            value={earliest_starting_date}
            onChange={(e) => setEarliest(e.target.value)}
          />
        </label>
        <br />
        {data.map((row, index) => (
          <div key={index}>
            <br />
            <label>
              Language
              <Dropdown
                options={languageList.data}
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  console.log("Selected value:", selectedValue);
                  setLanguage(selectedValue);
                }}
              />
            </label>
            <label>
              Experience
              <input
                name="year"
                type="number"
                value={row.year}
                onChange={(e) => {
                  const updatedData = [...data];
                  updatedData[index].year = e.target.value;
                  setData(updatedData);
                }}
              />
              <input
                name="month"
                type="number"
                value={row.month}
                onChange={(e) => {
                  const updatedData = [...data];
                  updatedData[index].month = e.target.value;
                  setData(updatedData);
                }}
              />
            </label>
            {data.length > 1 && (
              <button type="button" onClick={() => handleRemove(index)}>
                -
              </button>
            )}
          </div>
        ))}
        {data.length < 4 && (
          <button type="button" onClick={handleAdd}>
            +
          </button>
        )}
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default CandidateCreate;
