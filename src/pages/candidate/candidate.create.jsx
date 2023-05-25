import { useEffect, useState } from "react";
import axios from "axios";
import { Dropdown, Input, Button } from "../../components/utilites";
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
  const [position, setPosition] = useState("");
  const [agency, setAgency] = useState("");
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
      devlanguage_id: row.devlanguage_id,
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
      position_id: position,
      agency_id: agency,
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
          "http://localhost:8000/api/dev-languages"
        );
        setLanguageList(languageResponse.data);

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
      <div className="card">
        <div className="card-flap">
          <form onSubmit={handleSubmit} className="card-form">
            <div className="card-wrap">
              <div className="card-left">
                <div className="card-input">
                  <Input
                    labelName="Name"
                    type="text"
                    name="name"
                    placeholder="Enter Candidate Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="card-input">
                  <Input
                    labelName="Email"
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="card-input">
                  <Input
                    labelName="Phone Number"
                    type="tel"
                    name="phoneNumber"
                    placeholder="Enter Phone Number"
                    value={phone_number}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="card-input">
                  <Input
                    labelName="Date of Birth"
                    type="date"
                    name="date_of_birth"
                    placeholder="Enter Date of Birth"
                    value={date_of_birth}
                    onChange={(e) => setBirth(e.target.value)}
                  />
                </div>
                <div className="card-input">
                  <label>
                    Address
                    <textarea
                      name="residential_address"
                      value={residential_address}
                      onChange={(e) => setAddress(e.target.value)}
                    >
                      Enter Residential Address
                    </textarea>
                  </label>
                </div>

                <div className="card-input">
                  <Input
                    type="checkbox"
                    name="willingness_to_travel"
                    value=""
                    placeholder=""
                    onChange={(e) => setTravel(e.target.checked)}
                    labelName="Willingness To Travel"
                  />
                </div>

                <div className="card-input">
                  <Input
                    labelName="Male"
                    type="radio"
                    name="gender"
                    placeholder=""
                    value="0"
                    checked={gender === "1"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <Input
                    labelName="Female"
                    type="radio"
                    name="gender"
                    placeholder=""
                    value="1"
                    checked={gender === "2"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <Input
                    labelName="Non Binary"
                    type="radio"
                    name="gender"
                    placeholder=""
                    value="2"
                    checked={gender === "3"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </div>
              </div>
              <div className="card-right">
                <div className="card-input">
                  <Dropdown
                    labelName="Position"
                    options={position.data}
                    selectedValue={position}
                    onChange={(e) => setPosition(e.target.value)}
                  ></Dropdown>
                </div>
                <div className="card-input">
                  <Dropdown
                    labelName="Agency"
                    options={agency.data}
                    selectedValue={agency}
                    onChange={(e) => setAgency(e.target.value)}
                  />
                </div>
                <div className="card-input">
                  <Input
                    labelName="Expected Salary"
                    type="number"
                    name="expected_salary"
                    placeholder="Enter Expected Salary"
                    value={expected_salary}
                    onChange={(e) => setExpected(e.target.value)}
                  />
                </div>
                <div className="card-input">
                  <Input
                    labelName="Last Salary"
                    type="number"
                    name="last_salary"
                    placeholder="Enter Last Salary"
                    value={last_salary}
                    onChange={(e) => setLast(e.target.value)}
                  />
                </div>
                <div className="card-input">
                  <Input
                    labelName="CV Path"
                    type="text"
                    name="cv_path"
                    placeholder="Enter Cv Path"
                    value={cv_path}
                    onChange={(e) => setCv(e.target.value)}
                  />
                </div>
                <div className="card-input">
                  <Input
                    labelName="Earliest Starting Date"
                    type="date"
                    name="earliest_starting_date"
                    placeholder="Enter Earliest Starting Date"
                    value={earliest_starting_date}
                    onChange={(e) => setEarliest(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="card-input--btnPlus">
              {data.length < 4 && (
                <Button
                  type="button"
                  onClick={handleAdd}
                  text="+"
                  btnColor=""
                  className="txt-light btn-primary btnRight"
                />
              )}
            </div>

            <div className="card-input--border">
              {data.map((row, index) => (
                <div key={index} className="card-input--box">
                  <div className="card-input--first">
                    <div className="card-input--language">
                      <Dropdown
                        labelName="Language"
                        options={languageList.data}
                        onChange={(e) => {
                          const updatedData = [...data];
                          updatedData[index].devlanguage_id = e.target.value;
                          setData(updatedData);
                        }}
                      />
                    </div>
                    <div className="card-input--btnMinus">
                      {data.length > 1 && (
                        <Button
                          type="button"
                          onClick={() => handleRemove(index)}
                          text="-"
                          className="txt-light btn-default btnRight"
                        />
                      )}
                    </div>
                  </div>
                  <div className="card-input--second">
                    <label>
                      Experience
                      <div className="card-input--experience">
                        <Input
                          name="year"
                          type="number"
                          placeholder="Enter Year"
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
                          placeholder="Enter Month"
                          value={row.month}
                          onChange={(e) => {
                            const updatedData = [...data];
                            updatedData[index].month = e.target.value;
                            setData(updatedData);
                          }}
                        />
                      </div>
                    </label>
                  </div>
                </div>
              ))}
            </div>
            <div className="button-group">
              <Button
                type="submit"
                text="Submit"
                className="txt-light btn-primary"
              />
              <Button
                type="submit"
                text="Cancel"
                className="txt-light btn-default"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
