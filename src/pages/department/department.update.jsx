import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../store/AuthContext";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Button, ButtonLink, Input } from "../../components";

export const DepartmentUpdate = () => {
    const { id } = useParams();

    const { token } = useAuth();

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const [department, setDepartment] = useState("");
    //console.log(agency);

    const updateDepartment = useMutation(async () => {
        try {
            await axios.put(
                `http://localhost:8000/api/departments/${id}`,
                department,
                config
            );
        } catch (error) {
            console.error(error);
        }
    });

    const handleUpdate = (event) => {
        event.preventDefault();
        updateDepartment.mutate();
    };

    const getDepartment = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/departments/${id}`,
                config
            );
            const departmentData = response.data.data;
            if (departmentData) {
                setDepartment(departmentData);
            }
            return departmentData;
        } catch (error) {
            //console.error(error);
        }
    };

    const { data: departmentData } = useQuery(["departmentData", id], getDepartment);

    return (
        <div className="card-min">
            <div className="card-min__header">
                <h2>Update Department</h2>
            </div>
            <form onSubmit={handleUpdate}>
                <Input
                    labelName="Name"
                    type="text"
                    name="name"
                    value={department.name}
                    onChange={(e) => setDepartment({ ...department, name: e.target.value })}
                    placeholder="Enter Name..."
                    errorMessage="*"
                />
                <div className="button-group--user">
                    <Button type="submit" text="Update" className="txt-light btn-primary" />
                    <ButtonLink type="button" className="btn-default" route={"/department"} text="Cancel" linkText="txt-light txt-sm" />
                </div>
            </form>
        </div>
    );
};