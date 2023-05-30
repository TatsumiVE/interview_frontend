import { useState } from "react";
import axios from "axios";
import { useMutation } from "react-query";
import { useAuth } from "../../store/AuthContext";
import { Button, ButtonLink, Input } from "../../components";

export const DevLanguageCreate = () => {
    const [name, setName] = useState("");
    const { token } = useAuth();

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const addDevlanguage = async () => {
        try {
            const response = await axios.post(
                "http://localhost:8000/api/dev-languages",
                { name },
                config
            );
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const { mutate: createDevlanguage } = useMutation({
        mutationKey: ["post", "dev-languages"],
        mutationFn: addDevlanguage,
    });

    return (
        <div className="card-min">
            <div className="card-min__header">
                <h2>Create Language</h2>
            </div>
            <form className="card-min__form"
                onSubmit={(e) => {
                    e.preventDefault();
                    createDevlanguage();
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
                    <ButtonLink type="button" className="btn-default" route={"/devlanguage"} text="Cancel" linkText="txt-light txt-sm" />
                </div>
            </form>
        </div>
    );
};
