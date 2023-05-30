import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "../../store/AuthContext";
import { Button, Dropdown, Input, InputCheckbox, TextArea } from '../../components';
import Radio from '../../components/utilites/radio';

export const CandidateUpdate = () => {
    const { token } = useAuth();
    const { id } = useParams();
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
        data:requestData,

    });
  
   

    const [position, setPosition] = useState("");
    const [agency, setAgency] = useState("");
    const [languageList, setLanguageList] = useState([]);



    const updateCandidate = async () => {
        const response = await axios.put(
            `http://localhost:8000/api/candidates/${id}`,
            candidate,
            config
        );
        return response;
    };

    const { mutate: handleUpdate } = useMutation({
        mutationKey: ["put", "candidates"],
        mutationFn: updateCandidate,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();     

        handleUpdate();
    };


    const getCandidate = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/candidates/${id}`, config);

            setCandidate(response.data.data.candidate);
            console.log("candidate", response.data.data.candidate);

            return response.data.data;
        } catch (error) {
            console.error(error);
        }
    };

    const getPosition = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/positions", config);
            return response.data.data;
        } catch (error) {
            console.error(error);
        }
    };

    const getAgency = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/agencies", config);
            return response.data.data;
        } catch (error) {
            console.error(error);
        }
    };

    const getLanguages = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/dev-languages", config);
            setLanguageList(response.data.data);
            return response.data.data;
        } catch (error) {
            console.error(error);
        }
    };



    const { data: candidates, isLoading: isCandidateLoading, isError: isCandidateError, isSuccess: isCandidateSuccess, error: candidateError } = useQuery(
        ['candidates', id],
        getCandidate
    );



    const { data: positions, isLoading: isPositionLoading, isError: isPositionError, isSuccess: isPositionSuccess, error: positionError } = useQuery(
        ['positions'],
        getPosition
    );

    const { data: agencies, isLoading: isAgencyLoading, isError: isAgencyError, isSuccess: isAgencySuccess, error: agencyError } = useQuery(
        ['agencies'],
        getAgency
    );

    const { data: languages, isLoading: isLanguageLoading, isError: isLanguageError, isSuccess: isLanguageSuccess, error: languageError } = useQuery(
        ['languages'],
        getLanguages
    );

    if (isCandidateLoading || isAgencyLoading || isPositionLoading || isLanguageLoading) return 'Loading...';
    if (isCandidateError) return 'Something went wrong...';
    if (candidateError) return `An error has occurred: ${candidateError.message}`;
    if (isPositionError) return 'Something went wrong...';
    if (positionError) return `An error has occurred: ${positionError.message}`;
    if (isAgencyError) return 'Something went wrong...';
    if (agencyError) return `An error has occurred: ${agencyError.message}`;
    if (isLanguageError) return 'Something went wrong...';
    if (languageError) return `An error has occurred: ${languageError.message}`;



    const handleAdd = () => {
        setData([...data, { languageList: "", year: "", month: "" }]);
    };

    const handleRemove = (index) => {
        const list = [...data];
        list.splice(index, 1);
        setData(list);
    };


    return (

        <div className="card">
            <form onSubmit={handleSubmit} className="card-form">
                <div className="card-wrap">
                    <div className="card-left">
                        <Input
                            labelName="Name"
                            type="text"
                            name="name"
                            placeholder=" Enter Candidate Name..."
                            value={candidate.name}
                            onChange={(e) => setCandidate({ ...candidate, name: e.target.value })}
                        />
                        <Input
                            labelName="Email"
                            type="email"
                            name="email"
                            placeholder=" Enter Email..."
                            value={candidate.email}
                            onChange={(e) => setCandidate({ ...candidate, email: e.target.value })}
                        />
                        <Input
                            labelName="Phone Number"
                            type="tel"
                            name="phone_number"
                            placeholder=" Enter Phone Number..."
                            value={candidate.phone_number}
                            onChange={(e) => setCandidate({ ...candidate, phone_number: e.target.value })}
                        />
                        <Input
                            labelName="Date of Birth"
                            type="date"
                            name="date_of_birth"
                            placeholder=" Enter Date of Birth..."
                            value={candidate.date_of_birth}
                            onChange={(e) => setCandidate({ ...candidate, date_of_birth: e.target.value })}
                        />

                        <TextArea
                            labelName="Address"
                            name="residential_address"
                            onChange={(e) => setCandidate({ ...candidate, residential_address: e.target.value })}
                            placeholder=" Enter Residential Address..."
                            className=""
                            text={candidate.residential_address}
                        />

                        <InputCheckbox
                            type="checkbox"
                            name="willingness_to_travel"
                            value={candidate.willingness_to_travel}
                            checked={candidate.willingness_to_travel === 1}
                            onChange={(e) => setCandidate({ ...candidate, willingness_to_travel: e.target.checked ? 1 : 0 })}
                            labelName="Willingness To Travel"
                        />

                        <div className="radio-group">

                            <Radio
                                labelName="Male"
                                value="1"
                                name="gender"
                                checked={candidate.gender == "1"}
                                onChange={(e) => setCandidate({ ...candidate, gender: e.target.value })}
                            />
                            <Radio
                                labelName="Female"
                                value="2"
                                name="gender"
                                checked={candidate.gender == "2"}
                                onChange={(e) => setCandidate({ ...candidate, gender: e.target.value })}
                            />
                            <Radio
                                labelName="Non-Binary"
                                value="3"
                                name="gender"
                                checked={candidate.gender == "3"}
                                onChange={(e) => setCandidate({ ...candidate, gender: e.target.value })}
                            />
                        </div>

                    </div>
                    <div className="card-right">
                        <Dropdown
                            labelName="Position"
                            options={positions}
                            selectedValue={candidate.position_id}
                            onChange={(e) => setPosition(e.target.value)}
                        ></Dropdown>
                        <Dropdown
                            labelName="Agency"
                            options={agencies}
                            selectedValue={candidate.agency_id}
                            onChange={(e) => setAgency(e.target.value)}
                        />
                        <Input
                            labelName="Expected Salary"
                            type="number"
                            name="expected_salary"
                            placeholder=" Enter Expected Salary..."
                            value={candidate.expected_salary ?? '0'}
                            onChange={(e) => setCandidate({ ...candidate, expected_salary: e.target.value })}
                        />
                        <Input
                            labelName="Last Salary"
                            type="number"
                            name="last_salary"
                            placeholder=" Enter Last Salary..."
                            value={candidate.last_salary ?? '0'}
                            onChange={(e) => setCandidate({ ...candidate, last_salary: e.target.value })}
                        />

                        <Input
                            labelName="CV Path"
                            type="text"
                            name="cv_path"
                            placeholder=" Enter Cv Path..."
                            value={candidate.cv_path}
                            onChange={(e) => setCandidate({ ...candidate, cv_path: e.target.value })}
                        />

                        <Input
                            labelName="Earliest Starting Date"
                            type="date"
                            name="earliest_starting_date"
                            placeholder="Enter Earliest Starting Date..."
                            value={candidate.earliest_starting_date}
                            onChange={(e) => setCandidate({ ...candidate, earliest_starting_date: e.target.value })}
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
                                    options={languages}
                                    onChange={(e) => {
                                        const updatedData = [...data];
                                        updatedData[index].devlanguage_id = e.target.value;
                                        setData(updatedData);
                                    }}
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
                                    Experience
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
                        text="Submit"
                        className="txt-light btn-primary"
                    />
                    <Button
                        type="button"
                        text="Cancel"
                        className="txt-light btn-default"
                    />
                </div>
            </form >
        </div >

    )
}
