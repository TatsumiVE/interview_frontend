import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Dropdown, Input, InputCheckbox, TextArea } from '../../components';

export const CandidateUpdate = () => {
    const { id } = useParams();
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

    });

    console.log("afa",candidate);
    const getCandidate = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/candidates/${id}`);
            setCandidate(response.data.data);
            return response.data.data;
        } catch (error) {
            console.error(error);
        }
    };


    const getPosition = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/positions");
            return response.data.data;
        } catch (error) {
            console.error(error);
        }
    };

    const getAgency = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/agencies");
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

    if (isCandidateLoading || isAgencyLoading || isPositionLoading) return 'Loading...';
    if (isCandidateError) return 'Something went wrong...';
    if (candidateError) return `An error has occurred: ${candidateError.message}`;
    if (isPositionError) return 'Something went wrong...';
    if (positionError) return `An error has occurred: ${positionError.message}`;
    if (isAgencyError) return 'Something went wrong...';
    if (agencyError) return `An error has occurred: ${agencyError.message}`;

    const handleUpdate = () => {

    }
    return (
        <>
            <div className="card">
                <form onSubmit={handleUpdate} className="card-form">
                    <div className="card-wrap">
                        <div className="card-left">
                            <Input
                                labelName="Name"
                                type="text"
                                name="name"
                                placeholder=" Enter Candidate Name..."
                                value={candidate.name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Input
                                labelName="Email"
                                type="email"
                                name="email"
                                placeholder=" Enter Email..."
                                value={candidate.email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input
                                labelName="Phone Number"
                                type="tel"
                                name="phone_number"
                                placeholder=" Enter Phone Number..."
                                value={candidate.phone_number}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <Input
                                labelName="Date of Birth"
                                type="date"
                                name="date_of_birth"
                                placeholder=" Enter Date of Birth..."
                                value={candidate.date_of_birth}
                                onChange={(e) => setBirth(e.target.value)}
                            />

                            {/* <TextArea
                                labelName="Address"
                                name="residential_address"
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder=" Enter Residential Address..."
                                className=""
                                text={candidate.residential_address}
                            /> */}

                            <InputCheckbox
                                type="checkbox"
                                name="willingness_to_travel"
                                value={candidate.willingness_to_travel}
                                placeholder=""
                                onChange={(e) => setTravel(e.target.checked)}
                                labelName="Willingness To Travel"
                            />
                            {/* <div className="radio-group">
                                <InputCheckbox
                                    labelName="Male"
                                    type="radio"
                                    name="gender"
                                    placeholder=""
                                    value="1"
                                    check={candidate.gender === 1}
                                    onChange={(e) => setGender(e.target.value)}
                                />
                                <InputCheckbox
                                    labelName="Female"
                                    type="radio"
                                    name="gender"
                                    placeholder=""
                                    value="2"
                                    checked=""
                                    onChange={(e) => setGender(e.target.value)}
                                />
                                <InputCheckbox
                                    labelName="Non Binary"
                                    type="radio"
                                    name="gender"
                                    placeholder=""
                                    value="3"
                                    checked=""
                                    onChange={(e) => setGender(e.target.value)}
                                />
                            </div> */}

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
                                value={candidate.expected_salary}
                                onChange={(e) => setExpected(e.target.value)}
                            />
                            <Input
                                labelName="Last Salary"
                                type="number"
                                name="last_salary"
                                placeholder=" Enter Last Salary..."
                                value={candidate.last_salary}
                                onChange={(e) => setLast(e.target.value)}
                            />

                            <Input
                                labelName="CV Path"
                                type="text"
                                name="cv_path"
                                placeholder=" Enter Cv Path..."
                                value={candidate.cv_path}
                                onChange={(e) => setCv(e.target.value)}
                            />

                            <Input
                                labelName="Earliest Starting Date"
                                type="date"
                                name="earliest_starting_date"
                                placeholder="Enter Earliest Starting Date..."
                                value={candidate.earliest_starting_date}
                                onChange={(e) => setEarliest(e.target.value)}
                            />
                        </div>
                    </div>
                    {/* <div className="card-btnPlus">
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
                                        options={languageList.data}
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
                                    <span className="experience-group">
                                        <Input
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
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div> */}
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
        </>
    )
}
