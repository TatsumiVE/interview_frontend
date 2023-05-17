import { useEffect, useState } from "react";

import axios from "axios";

export const CandidateCreate = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("done");
  };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone] = useState("");

  const [residential_address, setResidential] = useState("");
  const [willingness_to_travel, setTravel] = useState("");
  const [gender, setGender] = useState("");

  const [expected_salary, setExcepted] = useState("");
  const [last_salary, setLast] = useState("");
  const [cv_path, setCv] = useState("");

  const [earliest_starting_date, setEarliest] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");

  const [position, setPosition] = useState([]);
  const [agency, setAgency] = useState([]);
  const [language, setLanguage] = useState([]);

  const [data, setData] = useState([{ one: "" }]);
  console.log(data);
  const handleAdd = () => {
    console.log("yeah");
    setData([...data, { one: "" }]);
  };
  const handleRemove = (index) => {
    const list = [...data];
    list.splice(index, 1);
    setData(list);
  };
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/languages")
      .then((response) => setLanguage(response.data))
      .catch((error) => console.log(error));
    axios
      .get("http://localhost:8000/api/positions")
      .then((response) => setPosition(response.data))
      .catch((error) => console.log(error));
    axios
      .get("http://localhost:8000/api/agencies")
      .then((response) => setAgency(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <form action="" method="" onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            className="name"
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
            className="email"
            placeholder="Enter Email"
          />
        </label>
        <br />
        <label>
          Phone Number
          <input type="text" name="phone_number" className="phone_number" />
        </label>
        <br />
        <label>
          Date of Birth
          <input type="date" name="date_of_birth" className="date_of_birth" />
        </label>
        <br />
        <label>
          Residential Address
          <input
            type="text"
            name="residential_address"
            className="residential_address"
          />
        </label>
        <br />
        <label>
          Travel
          <input type="checkbox" name="willingness_to_travel" className="" />
        </label>
        <br />
        <label>
          Male
          <input type="radio" name="gender" className="" />
        </label>
        <br />
        <label>
          Female
          <input type="radio" name="gender" className="" />
        </label>
        <br />
        {/* <ButtonDropdown data={position} />
        <br />
        <ButtonDropdown data={agency} /> */}
        <label>
          Expected Salary
          <input type="number" name="expected_salary" className="" />
        </label>
        <br />
        <label>
          Last Salary
          <input type="number" name="last_salary" className="" />
        </label>
        <br />
        <label>
          Cv Path
          <input type="text" name="cv_path" className="" />
        </label>
        <br />
        <label>
          earliest_starting_date
          <input type="date" name="earliest_starting_date" className="" />
        </label>
        <br />
        {data.map((row, index) => (
          <div key={index}>
            <label>
              Language
              <input name="language" type="text"></input>
            </label>
            <label>
              Experience
              <input
                name="year"
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              ></input>
              <input
                name="month"
                type="number"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              ></input>
            </label>
            <button
              className="remove"
              type="button"
              onClick={() => handleRemove(index)}
            >
              -
            </button>
          </div>
        ))}

        <button className="add" type="button" onClick={handleAdd}>
          +
        </button>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
