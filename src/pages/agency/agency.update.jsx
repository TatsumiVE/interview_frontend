import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../store/AuthContext";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Button, ButtonLink, Input } from "../../components";

export const AgencyUpdate = () => {
    const { id } = useParams();
    const { token } = useAuth();


    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const [agency, setAgency] = useState("");
    //console.log(agency);

    const updateAgency = useMutation(async () => {
        try {
            await axios.put(
                `http://localhost:8000/api/agencies/${id}`,
                agency,
                config
            );
        } catch (error) {
            console.error(error);
        }
    });

    const handleUpdate = (event) => {
        event.preventDefault();
        updateAgency.mutate();
    };

    const getAgency = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/agencies/${id}`,
                config
            );
            const agencyData = response.data.data;
            if (agencyData) {
                setAgency(agencyData);
            }
            return agencyData;
        } catch (error) {
            //console.error(error);
        }
    };

    const { data: agencyData } = useQuery(["agencyData", id], getAgency);

    return (
        <div className="card-min">
            <div className="card-min__header">
                <h2>Update Agency</h2>
            </div>
            <form onSubmit={handleUpdate} className="card-min__form">
                <Input
                    labelName="Name"
                    type="text"
                    name="name"
                    value={agency.name}
                    onChange={(e) => setAgency({ ...agency, name: e.target.value })}
                    placeholder=" Enter name..."
                    errorMessage="*"
                />
                <div className="button-group--user">
                    <Button type="submit" text="Update" className="txt-light btn-primary" />
                    <ButtonLink type="button" className="btn-default" route={"/agency"} text="Cancel" linkText="txt-light txt-sm" />
                </div>
            </form>
        </div>
    );
};
