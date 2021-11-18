import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "reactstrap";
import currentUserContext from "./currentUserContext";
import "./Profile.css";

const Profile = ({ getData, updateInfo })=>{
    const [formData, setFormData] = useState({});
    const { currentUser } = useContext(currentUserContext);
    const navigate = useNavigate();

    const handleSubmit = (e)=>{
        e.preventDefault();
        const { firstName, lastName, email, password } = formData;
        const newUserDetails = updateInfo({ firstName, lastName, email, password });
        setFormData(newUserDetails);
        navigate("/");
    }

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setFormData(data=>({...data, [name]:value}));
    }

    const updateFormData = (data)=>{
        setFormData(data);
    }

    useEffect(()=>{
        if (!currentUser) navigate("/");
        async function fetchData(){
            updateFormData(await getData());
        }
        fetchData();
    }, [])

    return (
        <Container className="Profile">
            <h1>Profile</h1>
            <form>
                <Container>
                    <span>Username: {currentUser}</span>
                </Container>
                <Container>
                    <label htmlFor="firstName">First Name: </label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                </Container>
                <Container>
                    <label htmlFor="lastName">Last Name: </label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                </Container>
                <Container>
                    <label htmlFor="email">Email: </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </Container>
                
                
                
                <Container>
                    <label htmlFor="password">Confirm Password To Make Changes: </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </Container>
                
                <Button onClick={handleSubmit}>Save Changes</Button>
            </form>
        </Container>
    )
}

export default Profile;