import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Dropdown, Input,Button } from '../../components';
import { useAuth } from "../../store/AuthContext";

export const UserUpdate = () => {
    const { token } = useAuth();
    const { id } = useParams();
    const [user, setUser] = useState([]);

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const updateUser = useMutation(async () => {
        try {
            axios.put(`http://localhost:8000/api/users/${id}`, user, config);

        } catch (error) {
            console.error(error)
        }
    })

    const handleUpdate = (event) => {
        event.preventDefault();
        updateUser.mutate()
    }

    const getUser = async () => {
        try {

            const response = await axios.get(`http://localhost:8000/api/users/${id}`, config);
            console.log(response.data.data);
            setUser(response.data.data);
            return response.data.data;
        } catch (error) {
            console.error(error);
        }
    };

    const getRole = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/roles", config);
            return response.data.data;
        } catch (error) {
            console.error(error);
        }
    };

    const { data: users, isLoading: isUserLoading, isError: isUserError, isSuccess: isUserSuccess, error: userError } = useQuery(
        ['users', id],
        getUser
    );

    const { data: roles, isLoading: isRoleLoading, isError: isRoleError, isSuccess: isRoleSuccess, error: roleError } = useQuery(
        ['roles'],
        getRole
    );



    if (isUserLoading || isRoleLoading) return 'Loading...';
    if (isUserError) return 'Something went wrong...';
    if (userError) return `An error has occurred: ${interviewerError.message}`;
    if (isRoleError) return 'Something went wrong...';
    if (roleError) return `An error has occurred: ${roleError.message}`;

    if (isUserSuccess && isRoleSuccess && user.interviewer_id)
        return (
            <div className='card-min'>
                <div className="card-min__header">
                    <h2>Update User</h2>
                </div>
                <form onSubmit={handleUpdate} className='card-min__form'>

                    <Input
                        labelName="Name"
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        value={user.interviewer_id.name}
                        onChange={(e) => setName(e.target.value)}

                    //onChange={(e) => setUser({...user, interviewer_id: {...user.interviewer_id, name: e.target.value}})}
                    />
                    <Input
                        labelName="Email"
                        type="email"
                        name="email"
                        placeholder=" Enter Email"
                        value={user.interviewer_id.email}
                        //onChange={(e) => setUser({...user, interviewer_id: {...user.interviewer_id, email: e.target.value}})}
                        onChange={(e) => setEmail(e.target.value)}

                    />
                    <Dropdown
                        labelName="Role"
                        options={roles}
                        selectedValue={user.role[0].id}
                        onChange={(e) => setUser({ ...user, role: e.target.value })}
                    ></Dropdown>

                    <div className='button-group--user'>
                        <Button type="submit" className='txt-light btn-primary' text="Update" />
                        <Button type="button" className='txt-light btn-default' text="Cancel" />
                    </div>
            
                </form >
            </div>
        )
}