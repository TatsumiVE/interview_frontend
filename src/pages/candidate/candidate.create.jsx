import { useEffect, useState } from "react";
import axios from "axios";
import { Dropdown, Input, Button, Textarea } from "../../components/utilites";
import { useMutation } from "react-query";

export const CandidateCreate = () => {
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

  const [data, setData] = useState([
    { devlanguage_id: "", year: "", month: "" },
  ]);

  const addCandidate = async (formData) => {
    const response = await axios.post(
      "http://localhost:8000/api/candidates",
      formData
    );
    return response;
  };

  const { mutate: createCandidate } = useMutation({
    mutationKey: ["post", "candidates"],
    mutationFn: addCandidate,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestData = data.map((row) => ({
      experience: {
        month: row.month,
        year: row.year,
      },
      devlanguage_id: row.devlanguage_id, // Assuming language is selected from dropdown
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
      position_id: position_id.toString(),
      agency_id: agency_id.toString(),
    };

    createCandidate(formData);
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
          "http://localhost:8000/api/dev_languages"
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
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <Input
          labelName="Name"
          type="text"
          name="name"
          placeholder="Enter Candidate Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {/* <label>
          Name
          <Input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Candidate Name"
          />
        </label> */}
        <br />
        <Input
          labelName="Email"
          type="email"
          name="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* <label>
          Email
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
          />
        </label> */}

        <br />
        <Input
          labelName="Phone Number"
          type="tel"
          name="phoneNumber"
          placeholder="Enter Phone Number"
          value={phone_number}
          onChange={(e) => setPhone(e.target.value)}
        />
        {/* <label>
          Phone Number
          <input
            type="text"
            name="phone_number"
            value={phone_number}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label> */}
        <br />
        <Input
          labelName="Date Of Birth"
          type="date"
          name="date_of_birth"
          placeholder="Enter Date of Birth"
          value={date_of_birth}
          onChange={(e) => setBirth(e.target.value)}
        />

        {/* <label>
          Date of Birth
          <input
            type="date"
            name="date_of_birth"
            value={date_of_birth}
            onChange={(e) => setBirth(e.target.value)}
          />
        </label> */}
        <br />
        <Textarea 
            labelName="Address"
            name="residential_address"
            onChange={(e) => setAddress(e.target.value)}
            placeholder ="Please enter your address" />

        {/* <label>
          Address
          <textarea
            name="residential_address"
            value={residential_address}
            onChange={(e) => setAddress(e.target.value)}
          >
            Enter Residential Address
          </textarea>
        </label> */}

        {/* <label>
          Residential Address
          <input
            type="text"
            name="residential_address"
            value={residential_address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label> */}
        <br />
        <Input
          labelName="Willingness To Travel"
          type="checkbox"
          name="willingness_to_travel"
          value=""
          placeholder=""
          onChange={(e) => setTravel(e.target.checked)}
        />
        {/* <label>
          Willingness to Travel
          <input
            type="checkbox"
            name="willingness_to_travel"
            checked={willingness_to_travel}
            onChange={(e) => setTravel(e.target.checked)}
          />
        </label> */}
        <br />
        <Input
          labelName="Male"
          type="radio"
          name="gender"
          placeholder=""
          value="0"
          checked={gender === "1"}
          onChange={(e) => setGender(e.target.value)}
        />
        {/* <label>
          Male
          <input
            type="radio"
            name="gender"
            value="0"
            checked={gender === "0"}
            onChange={(e) => setGender(e.target.value)}
          />
        </label> */}
        <br />
        <Input
          labelName="Female"
          type="radio"
          name="gender"
          placeholder=""
          value="1"
          checked={gender === "2"}
          onChange={(e) => setGender(e.target.value)}
        />
        {/* <label>
          Female
          <input
            type="radio"
            name="gender"
            value="1"
            checked={gender === "1"}
            onChange={(e) => setGender(e.target.value)}
          />6
        </label> */}
        <br />
        <Input
          labelName="No Boundary"
          type="radio"
          name="gender"
          placeholder=""
          value="2"
          checked={gender === "3"}
          onChange={(e) => setGender(e.target.value)}
        />
        {/* <label>
          other
          <input
            type="radio"
            name="gender"
            value="2"
            checked={gender === "2"}
            onChange={(e) => setGender(e.target.value)}
          />
        </label> */}
        <br />

        <Dropdown
          labelName="Position"
          options={position_id.data}
          selectedValue={position_id}
          onChange={(e) => setPosition(e.target.value)}
        ></Dropdown>

        <br />

        <Dropdown
          labelName="Agency"
          options={agency_id.data}
          selectedValue={agency_id}
          onChange={(e) => setAgency(e.target.value)}
        />

        <br />
        <Input
          labelName="Expected Salary"
          type="number"
          name="expected_salary"
          placeholder="Enter Expected Salary"
          value={expected_salary}
          onChange={(e) => setExpected(e.target.value)}
        />
        {/* <label>
          Expected Salary
          <input
            type="number"
            name="expected_salary"
            value={expected_salary}
            onChange={(e) => setExpected(e.target.value)}
          />
        </label> */}
        <br />
        <Input
          labelName="Last Salary"
          type="number"
          name="last_salary"
          placeholder="Enter Last Salary"
          value={last_salary}
          onChange={(e) => setLast(e.target.value)}
        />
        {/* <label>
          Last Salary
          <input
            type="number"
            name="last_salary"
            value={last_salary}
            onChange={(e) => setLast(e.target.value)}
          />
        </label> */}
        <br />
        <Input
          labelName="CV Path"
          type="text"
          name="cv_path"
          placeholder="Enter Cv Path"
          value={cv_path}
          onChange={(e) => setCv(e.target.value)}
        />
        {/* <label>
          CV Path
          <input
            type="text"
            name="cv_path"
            value={cv_path}
            onChange={(e) => setCv(e.target.value)}
          />
        </label> */}
        <br />
        <Input
          labelName="Earliest Starting Date"
          type="date"
          name="earliest_starting_date"
          placeholder="Enter Earliest Starting Date"
          value={earliest_starting_date}
          onChange={(e) => setEarliest(e.target.value)}
        />
        {/* <label>
          Earliest Starting Date
          <input
            type="date"
            name="earliest_starting_date"
            value={earliest_starting_date}
            onChange={(e) => setEarliest(e.target.value)}
          />
        </label> */}
        <br />
        {data.map((row, index) => (
          <div key={index}>
            <br />
            {/* <label>
              Language */}
            <Dropdown
              labelName="Language"
              options={languageList.data}
              onChange={(e) => {
                const updatedData = [...data];
                updatedData[index].devlanguage_id = e.target.value;

                setData(updatedData);
              }}
            />
            {/* </label> */}
            <label>
              Experience
              <Input
                name="year"
                type="number"
                placeholder="Year"
                value={row.year}
                onChange={(e) => {
                  const updatedData = [...data];
                  updatedData[index].year = e.target.value;
                  setData(updatedData);
                }}
              />
              <Input
                name="month"
                type="number"
                placeholder="Month"
                value={row.month}
                onChange={(e) => {
                  const updatedData = [...data];
                  updatedData[index].month = e.target.value;
                  setData(updatedData);
                }}
              />
            </label>
            {data.length > 1 && (
              <Button
                type="button"
                onClick={() => handleRemove(index)}
                text="-"
                btnColor=""
              />
            )}
          </div>
        ))}
        {data.length < 4 && (
          <Button type="button" onClick={handleAdd} text="+" btnColor="" />
          // <button type="button" onClick={handleAdd}>
          //   +
          // </button>
        )}
        <Button type="submit" text="Submit" />
      </form>
    </>
  );
};
