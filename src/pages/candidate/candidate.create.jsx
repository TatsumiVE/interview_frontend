import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import Check from "../validation.jsx";
import {
  Dropdown,
  Input,
  Button,
  TextArea,
  InputCheckbox,
  ButtonLink,
  Radio,
} from "../../components/utilites";
import { useMutation } from "react-query";
import { useAuth } from "../../store/AuthContext";
import { useNavigate } from "react-router-dom";
import positionService from "../../services/positionService";
import agencyService from "../../services/agencyService";
import Loader from "../../components/loader";
import languageService from "../../services/languageService";

export const CandidateCreate = () => {
  const [languageList, setLanguageList] = useState([]);
  const { token } = useAuth();
  const navigate = useNavigate();
  const [formActive, setFormActive] = useState(false);
  const [experienceValid, setExperienceValid] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    phone_number: "",
    residential_address: "",
    date_of_birth: "2000-01-01",
    cv_path: "",
    willingness_to_travel: "",
    expected_salary: "",
    last_salary: "",
    earliest_starting_date: "",
    position_id: "",
    agency_id: "",
    data: [],
  });
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const [data, setData] = useState([
    { devlanguage_id: "", year: "", month: "" },
  ]);

  const requestData = data.map((row) => {
    const totalMonths = parseInt(row.year) * 12 + parseInt(row.month);

    return {
      experience: {
        month: totalMonths,
      },
      devlanguage_id: row.devlanguage_id,
    };
  });

  const addCandidate = async (formData) => {
    const response = await axios.post(
      "http://localhost:8000/api/candidates",
      { ...formData, data: requestData },
      config
    );
    return response.data.data;
  };

  const {
    data: positions,
    isLoading: isPositionLoading,
    isError: isPositionError,
    isSuccess: isPositionSuccess,
    error: positionError,
  } = useQuery(["get", "positions"], () => positionService.getAll(token));

  const {
    data: agencies,
    isLoading: isAgencyLoading,
    isError: isAgencyError,
    isSuccess: isAgencySuccess,
    error: agencyError,
  } = useQuery(["get", "agencies"], () => agencyService.getAll(token));

  const {
    data: languages,
    isLoading: isLanguageLoading,
    isError: isLanguageError,
    isSuccess: isLanguageSuccess,
    error: languageError,
  } = useQuery(["get", "languages"], () => languageService.getAll(token));

  useEffect(() => {
    languages && setLanguageList(languages);
  }, [languages]);

  const createCandidate = useMutation({
    mutationKey: ["post", "candidates"],
    mutationFn: addCandidate,
    onSuccess: ({ id, name }) => {
      navigate("/interview/create", {
        state: {
          id: id,
          name: name,
          stageId: "0",
        },
      });
    },
    onError: (e) => console.log(e),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    createCandidate.mutate(formData);
  };
  const handleAdd = () => {
    setData([...data, { languageList: "", year: "", month: "" }]);
  };

  const handleRemove = (index) => {
    const list = [...data];
    list.splice(index, 1);
    setData(list);
  };
  if (isAgencyLoading || isPositionLoading) return <Loader />;
  if (isPositionError) return "Something went wrong...";
  if (positionError) return `An error has occurred: ${positionError.message}`;
  if (isAgencyError) return "Something went wrong...";
  if (agencyError) return `An error has occurred: ${agencyError.message}`;
  const isAllValid = () => {
    return (
      Check.isValidText(formData.name) &&
      Check.isValidEmail(formData.email) &&
      Check.isValidPhoneNumber(formData.phone_number) &&
      Check.isValidCVPathLink(formData.cv_path) &&
      Check.isValidAge(formData.date_of_birth) &&
      Check.isValidAddress(formData.residential_address) &&
      Check.isValidSelect(formData.position_id) &&
      Check.isValidSelect(formData.agency_id) &&
      Check.isValidSalary(formData.expected_salary) &&
      Check.isValidSalary(formData.last_salary) &&
      Check.isValidStartingDate(formData.earliest_starting_date) &&
      Check.isValidGender(formData.gender) &&
      experienceValid
    );
  };
  return (
    <>
      <div className="card">
        <h1>Create Candidate</h1>
        <form
          onSubmit={handleSubmit}
          className="card-form"
          onBlur={() => {
            setFormActive(true);
          }}
        >
          <div className="card-wrap">
            <div className="card-left">
              <div className="input-group">
                <Input
                  labelName="Name"
                  type="text"
                  name="name"
                  placeholder=" Enter Candidate Name..."
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  errorMessage="*"
                />
                {!Check.isValidText(formData.name) && formActive ? (
                  <span className="txt-danger validated-error">
                    Name must be at least 5 characters !
                  </span>
                ) : null}
              </div>
              <div className="input-group">
                <Input
                  labelName="Email"
                  type="email"
                  name="email"
                  placeholder=" Enter  example@gmail.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  errorMessage="*"
                />
                {!Check.isValidEmail(formData.email) && formActive ? (
                  <span className="txt-danger validated-error">
                    Email format is invalid!
                  </span>
                ) : null}
              </div>
              <div className="input-group">
                <Input
                  labelName="Phone Number"
                  type="tel"
                  name="phoneNumber"
                  placeholder=" Enter  09*********"
                  value={formData.phone_number}
                  onChange={(e) =>
                    setFormData({ ...formData, phone_number: e.target.value })
                  }
                  errorMessage="*"
                />
                {!Check.isValidPhoneNumber(formData.phone_number) &&
                formActive ? (
                  <span className="txt-danger validated-error">
                    Phone Number format is invalid!
                  </span>
                ) : null}
              </div>
              <div className="input-group">
                <Input
                  labelName="CV Form Path"
                  type="text"
                  name="cv_path"
                  placeholder="https://www.example.com/cv/name "
                  value={formData.cv_path}
                  onChange={(e) =>
                    setFormData({ ...formData, cv_path: e.target.value })
                  }
                  errorMessage="*"
                />
                {!Check.isValidCVPathLink(formData.cv_path) && formActive ? (
                  <span className="txt-danger validated-error">
                    CV form format is invalid!
                  </span>
                ) : null}
              </div>
              <div className="input-group">
                <Input
                  labelName="Date of Birth"
                  type="date"
                  name="date_of_birth"
                  placeholder=" Enter Date of Birth..."
                  value={formData.date_of_birth}
                  onChange={(e) =>
                    setFormData({ ...formData, date_of_birth: e.target.value })
                  }
                  errorMessage="*"
                />
                {!Check.isValidAge(formData.date_of_birth) && formActive ? (
                  <span className="txt-danger validated-error">
                    Age is at least 18 years.
                  </span>
                ) : null}
              </div>
              <div className="input-group">
                <TextArea
                  labelName="Address"
                  name="residential_address"
                  placeholder=" "
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      residential_address: e.target.value,
                    })
                  }
                  errorMessage="*"
                />
                {!Check.isValidAddress(formData.residential_address) &&
                formActive ? (
                  <span className="txt-danger validated-error">
                    Address format is invalid!
                  </span>
                ) : null}
              </div>
            </div>
            <div className="card-right">
              <div className="input-group">
                <Dropdown
                  labelName="Position"
                  options={positions}
                  selectedValue={formData.position_id}
                  onChange={(e) =>
                    setFormData({ ...formData, position_id: e.target.value })
                  }
                  errorMessage="*"
                />
                {!Check.isValidSelect(formData.position_id) && formActive ? (
                  <span className="txt-danger validated-error">
                    Position field is required!
                  </span>
                ) : null}
              </div>
              <div className="input-group">
                <Dropdown
                  labelName="Agency"
                  options={agencies}
                  selectedValue={formData.agency_id}
                  onChange={(e) =>
                    setFormData({ ...formData, agency_id: e.target.value })
                  }
                  errorMessage="*"
                />
                {!Check.isValidSelect(formData.agency_id) && formActive ? (
                  <span className="txt-danger validated-error">
                    Agency field is required!
                  </span>
                ) : null}
              </div>
              <div className="input-group">
                <Input
                  labelName="Expected Salary"
                  type="number"
                  name="expected_salary"
                  placeholder=" Enter Expected Salary..."
                  value={formData.expected_salary}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      expected_salary: e.target.value,
                    })
                  }
                />
                {!Check.isValidSalary(formData.expected_salary) &&
                formActive ? (
                  <span className="txt-danger validated-error">
                    Salary amount is invalid!
                  </span>
                ) : null}
              </div>
              <div className="input-group">
                <Input
                  labelName="Last Salary"
                  type="number"
                  name="last_salary"
                  placeholder=" Enter Last Salary..."
                  value={formData.last_salary}
                  onChange={(e) =>
                    setFormData({ ...formData, last_salary: e.target.value })
                  }
                />
                {!Check.isValidSalary(formData.last_salary) && formActive ? (
                  <span className="txt-danger validated-error">
                    Salary amount is invalid!
                  </span>
                ) : null}
              </div>
              <div className="input-group">
                <Input
                  labelName="Earliest Starting Date"
                  type="date"
                  name="earliest_starting_date"
                  placeholder="Enter Earliest Starting Date..."
                  value={formData.earliest_starting_date}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      earliest_starting_date: e.target.value,
                    })
                  }
                />
                {!Check.isValidStartingDate(formData.earliest_starting_date) &&
                formActive ? (
                  <span className="txt-danger validated-error">
                    Earliest Starting Date is invalid!
                  </span>
                ) : null}
              </div>

              <div className="input-form">
                <label>
                  Gender <span className="txt-danger">*</span>
                </label>
                <div className="input-group">
                  <div className="radio-group">
                    <Radio
                      labelName="Male"
                      value="1"
                      name="gender"
                      checked={formData.gender == "1"}
                      onChange={(e) =>
                        setFormData({ ...formData, gender: e.target.value })
                      }
                    />
                    <Radio
                      labelName="Female"
                      value="2"
                      name="gender"
                      checked={formData.gender == "2"}
                      onChange={(e) =>
                        setFormData({ ...formData, gender: e.target.value })
                      }
                    />
                    <Radio
                      labelName="Non-Binary"
                      value="3"
                      name="gender"
                      checked={formData.gender == "3"}
                      onChange={(e) =>
                        setFormData({ ...formData, gender: e.target.value })
                      }
                    />
                  </div>
                  {!Check.isValidGender(formData.gender) && formActive ? (
                    <span className="txt-danger validated-error">
                      Gender field is required
                    </span>
                  ) : null}
                </div>
              </div>
              <InputCheckbox
                type="checkbox"
                name="willingness_to_travel"
                value={formData.willingness_to_travel}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    willingness_to_travel: e.target.value,
                  })
                }
                labelName="Willingness To Travel"
              />
            </div>
          </div>
          <div className="input-form">
            <label>Experience</label>
            <div className="card-btnPlus">
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
          </div>

          <div className="card-border">
            {data.map((row, index) => (
              <div key={index} className="card-box">
                <div className="card-language">
                  <Dropdown
                    labelName="Language"
                    options={languageList.map((lan) => ({
                      ...lan,
                      disabled: !!data.filter(
                        (d) => d.devlanguage_id == lan.id
                      )[0],
                    }))}
                    onChange={(e) => {
                      const updatedData = [...data];
                      updatedData[index].devlanguage_id = e.target.value;
                      setData(updatedData);
                    }}
                    errorMessage="*"
                  />
                  <div className="card-btnMinus">
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
                <div className="card-experience">
                  <label className="experience-label">
                    Experience <span className="txt-danger">*</span>
                  </label>
                  <div className="experience-group">
                    <div className="input-group">
                      <Input
                        labelName=""
                        name="year"
                        type="number"
                        placeholder=" Enter Year..."
                        value={row.year}
                        onChange={(e) => {
                          const updatedData = [...data];
                          updatedData[index].year = e.target.value;
                          setData(updatedData);
                          const sum =
                            parseInt(e.target.value) + parseInt(row.month);
                          if (sum < 6) {
                            setExperienceValid(false);
                          } else {
                            setExperienceValid(true);
                          }
                        }}
                      />
                      <Input
                        labelName=""
                        name="month"
                        type="number"
                        placeholder=" Enter Month..."
                        value={row.month}
                        onChange={(e) => {
                          const updatedData = [...data];
                          updatedData[index].month = e.target.value;
                          setData(updatedData);
                          const sum =
                            parseInt(row.year) + parseInt(e.target.value);
                          if (sum <= 6) {
                            setExperienceValid(false);
                          } else {
                            setExperienceValid(true);
                          }
                        }}
                      />
                      {experienceValid ? null : (
                        <span className="txt-danger validated-error">
                          experience at least 6 months
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="button-group">
            <Button
              type="submit"
              text="Create"
              disabled={!isAllValid()}
              className="txt-light btn-primary"
            />
            <ButtonLink
              type="button"
              className="btn-default"
              route={"/interview"}
              text="Cancel"
              linkText="txt-light txt-sm"
            />
          </div>
        </form>
      </div>
    </>
  );
};
