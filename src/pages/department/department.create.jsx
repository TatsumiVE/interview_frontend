import { useState } from "react";
import axios from "axios";
import { useMutation } from "react-query";
import { useAuth } from "../../store/AuthContext";
import { Button, ButtonLink, Input } from "../../components";

export const DepartmentCreate = () => {
    const [name, setName] = useState("");

    const { token } = useAuth();

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const addDepartment = async () => {
        try {
            const response = await axios.post(
                "http://localhost:8000/api/departments",
                { name },
                config
            );
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const { mutate: createDepartment } = useMutation({
        mutationKey: ["post", "departments"],
        mutationFn: addDepartment,
    });

    return (
        <div className="card-min">
            <div className="card-min__header">
                <h2>Create Department</h2>
            </div>
            <form className="card-min__form"
                onSubmit={(e) => {
                    e.preventDefault();
                    createDepartment();
                }}
            >
                <Input
                    labelName="Name"
                    type="text"
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    placeholder=" Enter name..."
                    errorMessage="*"
                />
                <div className="button-group--user">
                    <Button type="submit" text="Create" className="txt-light btn-primary" />
                    <ButtonLink type="button" className="btn-default" route={"/department"} text="Cancel" linkText="txt-light txt-sm" />
                </div>
            </form>
        </div>
    );
};