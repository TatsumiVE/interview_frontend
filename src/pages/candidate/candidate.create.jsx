import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
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
  const [error,setError] = useState([]);

  const [formData, setFormData] = useState({
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
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const [data, setData] = useState([
    { devlanguage_id: "", year: "", month: "" },
  ]);

  const requestData = data.map((row) => ({
    experience: {
      month: row.month,
      year: row.year,
    },
    devlanguage_id: row.devlanguage_id,
  }));

  const addCandidate = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/candidates",
        { ...formData, data: requestData },
        config
      );

      return response.data.data.id;
    } catch (error) {
      setError(error.response.data);
    }
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
    onSuccess: (id) => {
      navigate("/interview/create", {
        state: {
          id: id,
          stageId: "0",
        },
      });
    },
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
  return (
    <>
    {error && <span className="txt-danger txt-ss">{error}</span>}
      <div className="card">
        <form onSubmit={handleSubmit} className="card-form">
          <div className="card-wrap">
            <div className="card-left">
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

              <Input
                labelName="Email"
                type="email"
                name="email"
                placeholder=" Enter Email..."
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                errorMessage="*"
              />

              <Input
                labelName="Phone Number"
                type="tel"
                name="phoneNumber"
                placeholder=" Enter Phone Number..."
                value={formData.phone_number}
                onChange={(e) =>
                  setFormData({ ...formData, phone_number: e.target.value })
                }
                errorMessage="*"
              />

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

              <TextArea
                labelName="Address"
                name="residential_address"
                placeholder=" Enter Residential Address..."
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    residential_address: e.target.value,
                  })
                }
                errorMessage="*"
              />

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
                 <span className="txt-danger">*</span>
              </div>
            </div>
            <div className="card-right">
              <Dropdown
                labelName="Position"
                options={positions}
                selectedValue={formData.position_id}
                onChange={(e) =>
                  setFormData({ ...formData, position_id: e.target.value })
                }
                errorMessage="*"
              />

              <Dropdown
                labelName="Agency"
                options={agencies}
                selectedValue={formData.agency_id}
                onChange={(e) =>
                  setFormData({ ...formData, agency_id: e.target.value })
                }
                errorMessage="*"
              />

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

              <Input
                labelName="CV Path"
                type="text"
                name="cv_path"
                placeholder=" Enter Cv Path..."
                value={formData.cv_path}
                onChange={(e) =>
                  setFormData({ ...formData, cv_path: e.target.value })
                }
                errorMessage="*"
              />

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
                  <Dropdown
                    labelName="Language"
                    options={languageList}
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
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="button-group">
            <Button
              type="submit"
              text="Create"
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


