import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "reactstrap";
import JoblyApi from "./api";
import currentUserContext from "./currentUserContext";

const Profile = ()=>{
    const INIT_DATA = {password:"", firstName:"", lastName:"", email:""};
    const [formData, setFormData] = useState(INIT_DATA);
    const { currentUser } = useContext(currentUserContext);
    
    useEffect(()=>{
        async function fetchData(){
            const userDetails = await JoblyApi.getUser(currentUser.username);
            setFormData(userDetails);
        }
        fetchData();
    }, [])

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(formData);
    }

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setFormData(data=>({...data, [name]:value}));
    }
    return (
        <Container className="Profile">
            Profile
            <form>
                <label htmlFor="username">Username: </label>
                <span>{formData.username}</span>
                
                <label htmlFor="firstName">First Name: </label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                />
                <label htmlFor="lastName">Last Name: </label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                />
                <label htmlFor="email">Email: </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <label htmlFor="password">Confirm Password To Make Changes: </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <Button onClick={handleSubmit}>Save Changes</Button>
            </form>
        </Container>
    )
}

export default Profile;