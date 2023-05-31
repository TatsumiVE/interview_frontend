import { useState } from "react";
import axios from "axios";
import { useMutation } from "react-query";
import { useAuth } from "../../store/AuthContext";
import { Button, ButtonLink, Input } from "../../components";

export const PositionCreate = () => {
    const [name, setName] = useState("");
    const { token } = useAuth();

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const addPosition = async () => {
        try {
            const response = await axios.post(
                "http://localhost:8000/api/positions",
                { name },
                config
            );
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const { mutate: createPosition } = useMutation({
        mutationKey: ["post", "positions"],
        mutationFn: addPosition,
    });

    return (
        <div className="card-min">
            <div className="card-min__header">
                <h2>Create Position</h2>
            </div>
            <form className="card-min__form"
                onSubmit={(e) => {
                    e.preventDefault();
                    createPosition();
                }}
            >
                <Input
                    labelName="Name"
                    type="text"
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Name..."
                    errorMessage="*"
                />
                <div className="button-group--user">
                    <Button type="submit" text="Create" className="txt-light btn-primary" />
                    <ButtonLink type="button" className="btn-default" route={"/position"} text="Cancel" linkText="txt-light txt-sm" />
                </div>
            </form>
        </div>
    );
};