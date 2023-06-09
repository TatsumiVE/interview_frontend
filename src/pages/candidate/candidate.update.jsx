import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../store/AuthContext";
import candidateService from "../../services/candidateService";
import languageService from "../../services/languageService";
import positionService from "../../services/positionService";
import agencyService from "../../services/agencyService";
import Loader from "../../components/loader";
import Check from "../validation.jsx";
import {
  Button,
  Dropdown,
  Input,
  InputCheckbox,
  TextArea,
  Radio,
  ButtonLink,
} from "../../components";

export const CandidateUpdate = () => {
  const { token } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const languageFilter = (specific) => {
    return specific.map((i) => ({
      devlanguage_id: i.devlanguage_id,
      year: Math.floor(i.experience / 12),
      month: i.experience % 12,
    }));
  };

  const [data, setData] = useState([
    { devlanguage_id: "", year: "", month: "" },
  ]);
  const [formActive, setFormActive] = useState(false);
  const [error, setError] = useState("");
  const [position, setPosition] = useState("");
  const [agency, setAgency] = useState("");
  const [experienceValid, setExperienceValid] = useState(false);

  const [candidate, setCandidate] = useState({
    name: "",
    email: "",
    gender: "",
    phone_number: "",
    residential_address: "",
    date_of_birth: "",
    cv_path: "",
    willingness_to_travel: "",
    expected_salary: "",
    last_salary: "",
    earliest_starting_date: "",
    position_id: "",
    agency_id: "",
    data: [],
  });

  const updateCandidate = async () => {
    const requestData = data.map((row) => {
      const totalMonths = parseInt(row.year) * 12 + parseInt(row.month);

      return {
        experience: {
          month: totalMonths,
        },
        devlanguage_id: row.devlanguage_id,
      };
    });
    try {
      const response = await axios.put(
        `http://localhost:8000/api/candidates/${id}`,
        { ...candidate, data: requestData },
        config
      );

      return response.data;
    } catch (error) {
      setError(error.response.data.data);
    }
  };

  const { mutate: handleUpdate } = useMutation({
    mutationKey: ["put", "candidates"],
    mutationFn: updateCandidate,
    onSuccess: () => {
      navigate("/candidates");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleUpdate();
  };

  const {
    data: candidateData,
    isLoading: isCandidateLoading,
    isError: isCandidateError,
    isSuccess: isCandidateSuccess,
    error: candidateError,
  } = useQuery(["get", "candidates", "id"], () =>
    candidateService.get(id, token)
  );

  useEffect(() => {
    if (isCandidateSuccess && candidateData) {
      setCandidate(candidateData.candidate);

      setData(languageFilter(candidateData.candidate.specific_languages));
    }
  }, [candidateData, isCandidateSuccess]);

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

  if (
    isCandidateLoading ||
    isAgencyLoading ||
    isPositionLoading ||
    isLanguageLoading
  )
    return <Loader></Loader>;
  if (isCandidateError) return "Something went wrong...";
  if (candidateError) return `An error has occurred: ${candidateError.message}`;
  if (isPositionError) return "Something went wrong...";
  if (positionError) return `An error has occurred: ${positionError.message}`;
  if (isAgencyError) return "Something went wrong...";
  if (agencyError) return `An error has occurred: ${agencyError.message}`;
  if (isLanguageError) return "Something went wrong...";
  if (languageError) return `An error has occurred: ${languageError.message}`;

  const handleAdd = () => {
    setData([...data, { languageList: "", year: "", month: "" }]);
  };

  const handleRemove = (index) => {
    const list = [...data];
    list.splice(index, 1);
    setData(list);
  };
  const isAllValid = () => {
    return (
      Check.isValidText(candidate.name) &&
      Check.isValidEmail(candidate.email) &&
      Check.isValidPhoneNumber(candidate.phone_number) &&
      Check.isValidCVPathLink(candidate.cv_path) &&
      Check.isValidAge(candidate.date_of_birth) &&
      Check.isValidAddress(candidate.residential_address) &&
      Check.isValidSelect(candidate.position_id) &&
      Check.isValidSelect(candidate.agency_id) &&
      Check.isValidSalary(candidate.expected_salary) &&
      Check.isValidSalary(candidate.last_salary) &&
      Check.isValidGender(candidate.gender)
    );
  };

  return (
    <div className="card">
      <div className="card__header">
        <h2>Candidate Edit Form</h2>
      </div>
      <form
        onSubmit={handleSubmit}
        onBlur={() => {
          setFormActive(true);
        }}
        className="card-form"
      >
        <div className="card-wrap">
          <div className="card-left">
            <div className="input-group">
              <Input
                labelName="Name"
                type="text"
                name="name"
                placeholder=" Enter Candidate Name..."
                value={candidate.name}
                onChange={(e) =>
                  setCandidate({ ...candidate, name: e.target.value })
                }
                errorMessage="*"
              />
              {!Check.isValidText(candidate.name) && formActive ? (
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
                placeholder=" Enter Email..."
                value={candidate.email}
                onChange={(e) =>
                  setCandidate({ ...candidate, email: e.target.value })
                }
                errorMessage="*"
              />{" "}
              {!Check.isValidText(candidate.email) && formActive ? (
                <span className="txt-danger validated-error">
                  Email format is invalid!
                </span>
              ) : null}
            </div>
            <div className="input-group">
              <Input
                labelName="Phone Number"
                type="tel"
                name="phone_number"
                placeholder=" Enter Phone Number..."
                value={candidate.phone_number}
                onChange={(e) =>
                  setCandidate({ ...candidate, phone_number: e.target.value })
                }
                errorMessage="*"
              />
              {!Check.isValidPhoneNumber(candidate.phone_number) &&
              formActive ? (
                <span className="txt-danger validated-error">
                  Phone Number format is invalid!
                </span>
              ) : null}
            </div>
            <div className="input-group">
              <Input
                labelName="Date of Birth"
                type="date"
                name="date_of_birth"
                placeholder=" Enter Date of Birth"
                value={candidate.date_of_birth}
                onChange={(e) => {
                  setCandidate({ ...candidate, date_of_birth: e.target.value });
                }}
                errorMessage="*"
              />
              {!Check.isValidAge(candidate.date_of_birth) && formActive ? (
                <span className="txt-danger validated-error">
                  Age is at least 18 years.
                </span>
              ) : null}
            </div>
            <div className="input-group">
              <TextArea
                labelName="Address"
                name="residential_address"
                onChange={(e) =>
                  setCandidate({
                    ...candidate,
                    residential_address: e.target.value,
                  })
                }
                placeholder=" Enter Residential Address..."
                text={candidate.residential_address}
                errorMessage="*"
              />
              {!Check.isValidAddress(candidate.residential_address) &&
              formActive ? (
                <span className="txt-danger validated-error">
                  Address format is invalid!
                </span>
              ) : null}
            </div>

            <InputCheckbox
              type="checkbox"
              name="willingness_to_travel"
              value={candidate.willingness_to_travel}
              checked={candidate.willingness_to_travel === 1}
              onChange={(e) =>
                setCandidate({
                  ...candidate,
                  willingness_to_travel: e.target.checked ? 1 : 0,
                })
              }
              labelName="Willingness To Travel"
            />

            <div className="input-group">
              <div className="radio-group">
                <Radio
                  labelName="Male"
                  value="1"
                  name="gender"
                  checked={candidate.gender == "1"}
                  onChange={(e) =>
                    setCandidate({ ...candidate, gender: e.target.value })
                  }
                />
                <Radio
                  labelName="Female"
                  value="2"
                  name="gender"
                  checked={candidate.gender == "2"}
                  onChange={(e) =>
                    setCandidate({ ...candidate, gender: e.target.value })
                  }
                />
                <Radio
                  labelName="Non-Binary"
                  value="3"
                  name="gender"
                  checked={candidate.gender == "3"}
                  onChange={(e) =>
                    setCandidate({ ...candidate, gender: e.target.value })
                  }
                />
                <span className="txt-danger">*</span>
              </div>
              {!Check.isValidGender(candidate.gender) && formActive ? (
                <span className="txt-danger validated-error">
                  Gender field is required
                </span>
              ) : null}
            </div>
          </div>
          <div className="card-right">
            <div className="input-group">
              <Dropdown
                labelName="Position"
                options={positions}
                selectedValue={candidate.position_id}
                onChange={(e) => setPosition(e.target.value)}
                errorMessage="*"
              />
              {!Check.isValidSelect(candidate.position_id) && formActive ? (
                <span className="txt-danger validated-error">
                  Position field is required!
                </span>
              ) : null}
            </div>
            <div className="input-group">
              <Dropdown
                labelName="Agency"
                options={agencies}
                selectedValue={candidate.agency_id}
                onChange={(e) => setAgency(e.target.value)}
                errorMessage="*"
              />
              {!Check.isValidSelect(candidate.agency_id) && formActive ? (
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
                value={candidate.expected_salary ?? "0"}
                onChange={(e) =>
                  setCandidate({
                    ...candidate,
                    expected_salary: e.target.value,
                  })
                }
              />
              {!Check.isValidSalary(candidate.expected_salary) && formActive ? (
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
                value={candidate.last_salary ?? "0"}
                onChange={(e) =>
                  setCandidate({ ...candidate, last_salary: e.target.value })
                }
              />
              {!Check.isValidSalary(candidate.last_salary) && formActive ? (
                <span className="txt-danger validated-error">
                  Salary amount is invalid!
                </span>
              ) : null}
            </div>
            <Input
              labelName="CV Path"
              type="text"
              name="cv_path"
              placeholder=" Enter Cv Path..."
              value={candidate.cv_path}
              onChange={(e) =>
                setCandidate({ ...candidate, cv_path: e.target.value })
              }
              errorMessage="*"
            />
            <div className="input-group">
              <Input
                labelName="Earliest Starting Date"
                type="date"
                name="earliest_starting_date"
                placeholder="Enter Earliest Starting Date..."
                value={candidate.earliest_starting_date}
                onChange={(e) =>
                  setCandidate({
                    ...candidate,
                    earliest_starting_date: e.target.value,
                  })
                }
              />
              {!Check.isValidStartingDate(candidate.earliest_starting_date) &&
              formActive ? (
                <span className="txt-danger validated-error">
                  Starting Date must be tomorrow or future!
                </span>
              ) : null}
            </div>
          </div>
        </div>

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

        <div className="card-border">
          {data.map((row, index) => (
            <div key={index} className="card-box">
              <div className="card-language">
                <div className="input-group">
                  <Dropdown
                    labelName="Language"
                    options={languages.map((lan) => ({
                      ...lan,
                      disabled: !!data.filter(
                        (d) => d.devlanguage_id == lan.id
                      )[0],
                    }))}
                    selectedValue={row.devlanguage_id}
                    onChange={(e) => {
                      const updatedData = [...data];
                      updatedData[index].devlanguage_id = e.target.value;
                      setData(updatedData);
                    }}
                    errorMessage="*"
                  />
                </div>

                <div className="card-btnMinus">
                  {data.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => handleRemove(index)}
                      text="-"
                      className="txt-light  btn-btnColor btnRight"
                    />
                  )}
                </div>
              </div>
              <div className="card-experience">
                <label className="experience-label">
                  Experience <span className="txt-danger">*</span>
                </label>
                <div className="experience-group">
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
                        parseInt(e.target.value) * 12 + parseInt(row.month);
                      if (sum <= 6) {
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
                        parseInt(row.year) * 12 + parseInt(e.target.value);
                      if (sum <= 6) {
                        setExperienceValid(false);
                      } else {
                        setExperienceValid(true);
                      }
                    }}
                  />
                  {experienceValid ? null : (
                    <span className="txt-danger validated-error candidate-error">
                      experience at least 6 months
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="button-group--user">
          <Button
            type="submit"
            text="Update"
            disabled={!isAllValid()}
            className="txt-light btn-primary"
          />
          <ButtonLink
            type="button"
            className="btn-btnColor cancel"
            route={"/candidates"}
            text="Cancel"
            linkText="txt-light txt-sm"
          />
        </div>
      </form>
    </div>
  );
};
